import { writable } from 'svelte/store';
import { NUMBER_OF_PLAYERS } from './player';

export const BOARD_SIZE = 5;
const INITIAL_BOARD_STATE = () => {
	// create a 2D array of nulls of size BOARD_SIZE x BOARD_SIZE
	const board: (number | null)[][] = [];

	for (let i = 0; i < BOARD_SIZE; i++) {
		board[i] = [];
		for (let j = 0; j < BOARD_SIZE; j++) {
			board[i][j] = null;
		}
	}

	// set the bottom left to player 1
	board[BOARD_SIZE - 1][0] = 0;

	// set the top right to player 2
	board[0][BOARD_SIZE - 1] = 1;

	return board;
};

export const NUM_MOVES_PER_TURN = 3;

export type Move = {
	cell: [number, number] | null;
};

export type Turn = {
	playerIndex: number;
	moves: [Move, Move, Move];
};

export type Game = {
	boardState: (number | null)[][]; // 2D array of player indexes
	currentTurn: Turn;
};

export const turns = writable<Turn[]>([]);

function createGame() {
	const INITIAL_STATE: Game = {
		boardState: INITIAL_BOARD_STATE(),
		currentTurn: {
			playerIndex: 0,
			moves: [{ cell: null }, { cell: null }, { cell: null }]
		}
	};

	const { subscribe, set, update } = writable<Game>(INITIAL_STATE);

	return {
		subscribe,
		update,
		reset: () => set(INITIAL_STATE),
		cellClick: (row: number, col: number) => {
			update((game) => {
				const cellIsAlreadySelectedInThisTurn = (move: Move) =>
					move.cell && move.cell[0] === row && move.cell[1] === col;

				// check if the cell is already taken by the current player
				if (game.boardState[row][col] === game.currentTurn.playerIndex) return game;

				// check if the cell is adjacent to an existing tile
				if (!cellIsAdjacentToExistingTile(game, [row, col])) return game;

				// check if one of the players moves is already in this cell
				if (game.currentTurn.moves.some((move) => cellIsAlreadySelectedInThisTurn(move))) {
					// remove the move from the current turn
					game.currentTurn.moves = game.currentTurn.moves.map((move) => {
						if (cellIsAlreadySelectedInThisTurn(move)) return { cell: null };
						return move;
					}) as [Move, Move, Move];
					return game;
				}
				// check if the turn has any moves left
				const nextMoveIndex = game.currentTurn.moves.findIndex((move) => move.cell === null);
				console.log(nextMoveIndex);
				if (nextMoveIndex === -1) return game;

				// check if the cell is already taken by another player
				if (game.boardState[row][col] !== null) {
					// check if the user has at least 2 moves left
					if (game.currentTurn.moves.filter((move) => move.cell === null).length < 2) return game;

					// update the next 2 available moves
					game.currentTurn.moves[nextMoveIndex].cell = [row, col];
					game.currentTurn.moves[nextMoveIndex + 1].cell = [row, col];
				} else {
					// update the next available move
					game.currentTurn.moves[nextMoveIndex].cell = [row, col];
				}
				console.log('called');

				return game;
			});
		},
		finishTurn: () => {
			// locks in the moves of the current turn and starts a new turn
			update((game) => {
				// update the game history
				turns.update((turns) => [...turns, game.currentTurn]);

				// update the board state
				game.currentTurn.moves.forEach((move) => {
					if (move.cell !== null)
						game.boardState[move.cell[0]][move.cell[1]] = game.currentTurn.playerIndex;
					move.cell = null;
				});
				game.currentTurn.playerIndex = (game.currentTurn.playerIndex + 1) % NUMBER_OF_PLAYERS;

				return game;
			});
		}
	};
}

export const game = createGame();

export const cellIsAdjacentToExistingTile = (game: Game, index: [number, number]) => {
	// Reusable function to check if a given cell is adjacent to an existing tile
	// this is used both in the UI to determine if a cell is clickable and in the
	// game logic to determine if a move is valid
	const [row, col] = index;

	const adjacentCells = [
		[row - 1, col], // top
		[row + 1, col], // bottom
		[row, col - 1], // left
		[row, col + 1] // right
	].filter(cellIsInBounds);

	return adjacentCells.some(([row, col]) => {
		const existingTileInPreviousTurn = game.boardState[row][col] == game.currentTurn.playerIndex;
		const tileInThisTurn = game.currentTurn.moves.some(
			(move) => move.cell && move.cell[0] === row && move.cell[1] === col
		);
		return existingTileInPreviousTurn || tileInThisTurn;
	});
};

const cellIsInBounds = (index: number[]) => {
	const [row, col] = index;
	return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};
