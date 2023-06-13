import { derived, writable } from 'svelte/store';
import { NUMBER_OF_PLAYERS } from './player';
import type { Turn, Game, Move } from './types';
import { cellIsAdjacentToExistingTile } from '$lib/utils/checks';

export const NUM_MOVES_PER_TURN = 3;
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
		undoLastMove: () => {
			// undo the last move
			update((game) => {
				const currentTurn = game.currentTurn;
				// last move is the last move with a cell value that is not null
				const lastMove = currentTurn.moves.filter((move) => move.cell !== null).at(-1);

				if (lastMove?.cell === null || !lastMove) return game;
				// reset the last move
				lastMove.cell = null;

				return game;
			});
		},
		cellClick: (row: number, col: number) => {
			update((game) => {
				const cellIsAlreadySelectedInThisTurn = (move: Move) =>
					move.cell && move.cell[0] === row && move.cell[1] === col;

				// check if the cell is already taken by the current player
				if (
					game.boardState[row][col] === game.currentTurn.playerIndex ||
					game.currentTurn.moves.some((move) => cellIsAlreadySelectedInThisTurn(move))
				)
					return game;

				// check if the cell is adjacent to an existing tile
				if (!cellIsAdjacentToExistingTile(game, [row, col])) return game;

				// check if the turn has any moves left
				const nextMoveIndex = game.currentTurn.moves.findIndex((move) => move.cell === null);
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
export const remainingMoves = derived(game, ($game) => {
	return $game.currentTurn.moves.filter((move) => move.cell === null).length;
});
