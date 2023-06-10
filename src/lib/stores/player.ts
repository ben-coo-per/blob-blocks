import { writable } from 'svelte/store';
export const NUMBER_OF_PLAYERS = 2;

export type Player = {
	score: number;
};

export const players = writable<Player[]>(Array(NUMBER_OF_PLAYERS).fill({ score: 0 }));
