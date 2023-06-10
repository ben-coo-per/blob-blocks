<script lang="ts">
	import GameBoard from '$lib/components/GameBoard.svelte';
	import MoveIndicator from '$lib/components/MoveIndicator.svelte';
	import { game } from '$lib/stores/game';

	$: currentTurn = $game.currentTurn;
</script>

<div class="container max-w-md h-full mx-auto flex flex-col gap-8 justify-center items-center">
	<h1 class="text-4xl font-bold text-center">It's Player {currentTurn.playerIndex + 1}'s Turn</h1>
	<GameBoard />

	<div class="flex flex-col justify-center items-center gap-4">
		<div>
			<h1 class="text-2xl font-bold text-center">Remaining moves</h1>
			<div class="flex flex-row-reverse justify-center gap-4">
				{#each currentTurn.moves.sort((m) => (m.cell === null ? 1 : -1)) as move, index}
					<MoveIndicator {index} bind:move />
				{/each}
			</div>
		</div>
		<button
			type="button"
			class="btn variant-filled-surface"
			disabled={currentTurn.moves.some((m) => m.cell === null)}
			on:click={() => game.finishTurn()}
		>
			End Turn
		</button>
	</div>
</div>
