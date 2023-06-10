<script lang="ts">
	import { game, BOARD_SIZE } from '../stores/game';
</script>

<div class="grid grid-cols-5 gap-px w-full aspect-square p-3 sm:p-0 rounded-lg">
	{#each $game.boardState as columns, row}
		{#each columns as val, col}
			<button
				on:click={() => game.cellClick(row, col)}
				class={`
		cursor-pointer
		p-4
		shadow shadow-surface-500
		bg-surface-50-900-token 
		bg-primary-hover-token
		border border-surface-400-500-token
		${col == 0 && row == 0 && 'rounded-tl-container-token '} 
		${col + 1 == BOARD_SIZE && row == 0 && 'rounded-tr-container-token '} 
		${col == 0 && row + 1 == BOARD_SIZE && 'rounded-bl-container-token '} 
		${col + 1 == BOARD_SIZE && row + 1 == BOARD_SIZE && 'rounded-br-container-token '} 
		${row + 1 == BOARD_SIZE && 'shadow-xl '} 
		`}
			>
				{#if $game.currentTurn.moves
					.map((m) => m.cell && m.cell[0] == row && m.cell[1] == col)
					.includes(true)}
					<div
						class={`circle ${
							$game.currentTurn.playerIndex === 0
								? 'bg-primary-600-300-token'
								: 'bg-secondary-600-300-token'
						}`}
					/>
				{:else if val !== null}
					<div
						class={`square ${
							val && val > 0 ? 'bg-secondary-600-300-token' : 'bg-primary-600-300-token'
						}`}
					/>
				{/if}
			</button>
		{/each}
	{/each}
</div>

<style>
	.circle {
		@apply shadow-md shadow-surface-500;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.square {
		@apply shadow-md shadow-surface-500;
		width: 100%;
		height: 100%;
	}
</style>
