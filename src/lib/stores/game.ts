import { writable } from 'svelte/store';
import { NUMBER_OF_PLAYERS } from './player';

const BOARD_SIZE = 9;
export const NUM_MOVES_PER_TURN = 3;

export type Move = {
	cell: number | null;
};

export type Turn = {
	playerIndex: number;
	moves: [Move, Move, Move];
};

export type Game = {
	boardState: (number | null)[];
	currentTurn: Turn;
};

export const turns = writable<Turn[]>([]);

function createGame() {
	const INITIAL_STATE: Game = {
		boardState: Array(BOARD_SIZE ** 2).fill(null),
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
		cellClick: (index: number) => {
			update((game) => {
				// check if the cell is already taken
				if (game.boardState[index] !== null) return game;

				// check if one of the players moves is already in this cell
				if (game.currentTurn.moves.some((move) => move.cell === index)) {
					// remove the move from the current turn
					game.currentTurn.moves = game.currentTurn.moves.map((move) => {
						if (move.cell === index) return { cell: null };
						return move;
					}) as [Move, Move, Move];
					return game;
				}

				// update the next available move
				const nextMoveIndex = game.currentTurn.moves.findIndex((move) => move.cell === null);
				if (nextMoveIndex === -1) return game;

				// update this move
				game.currentTurn.moves[nextMoveIndex].cell = index;

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
					if (move.cell !== null) game.boardState[move.cell] = game.currentTurn.playerIndex;
					move.cell = null;
				});
				game.currentTurn.playerIndex = (game.currentTurn.playerIndex + 1) % NUMBER_OF_PLAYERS;

				return game;
			});
		}
	};
}

export const game = createGame();
