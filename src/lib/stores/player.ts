import { writable } from 'svelte/store';
import type { Player } from './types';
export const NUMBER_OF_PLAYERS = 2;

export const players = writable<Player[]>(Array(NUMBER_OF_PLAYERS).fill({ score: 0 }));
