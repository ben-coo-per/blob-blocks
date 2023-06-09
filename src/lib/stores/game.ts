// gameBoard, cellClick

import { writable } from 'svelte/store';

const size = 9;

export const game = writable({
	state: Array(size * size).fill(0)
});

export function cellClick(index: number) {
	game.update((game) => {
		game.state[index] = 1;
		return game;
	});
}
