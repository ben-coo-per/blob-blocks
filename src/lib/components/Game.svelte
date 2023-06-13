<script lang="ts">
	import GameBoard from '$lib/components/GameBoard.svelte';
	import { game, remainingMoves } from '$lib/stores/game';
	import { fade } from 'svelte/transition';

	$: currentTurn = $game.currentTurn;
	$: movesHaveBeenMade = currentTurn.moves.filter((m) => m.cell !== null).length > 0;
</script>

<div class="container max-w-md h-full mx-auto flex flex-col gap-4 justify-center items-center">
	{#if $game.status === 'in-progress'}
		<h1 class="text-4xl font-bold text-center">It's Player {currentTurn.playerIndex + 1}'s Turn</h1>
		<GameBoard />

		<div class="flex flex-col justify-center items-center gap-2">
			<div class="flex flex-col-reverse gap-1 h-16">
				<h1 class="text-2xl font-bold text-center">
					{$remainingMoves} remaining moves
				</h1>
				{#if movesHaveBeenMade}
					<button
						type="button"
						class="btn btn-sm variant-ghost"
						on:click={game.undoLastMove}
						transition:fade|local
					>
						<iconify-icon icon="heroicons:arrow-uturn-left-20-solid" />
						<span>Undo Last Move</span>
					</button>
				{/if}
			</div>
			<button
				type="button"
				class="btn variant-filled-surface"
				disabled={currentTurn.moves.some((m) => m.cell === null)}
				on:click={game.finishTurn}
			>
				End Turn
			</button>
		</div>
	{:else if $game.status === 'finished'}
		<h1 class="text-4xl font-bold text-center">Game Over!</h1>
		<button type="button" class="btn variant-filled-surface" on:click={game.reset}>
			Play Again
		</button>
	{/if}
</div>
