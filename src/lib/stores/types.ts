export type Player = {
	score: number;
};

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
