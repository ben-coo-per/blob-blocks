import { BOARD_SIZE } from '$lib/stores/game';
import type { Game } from '$lib/stores/types';

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

export const cellIsInBounds = (index: number[]) => {
	const [row, col] = index;
	return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};
