<script lang="ts">
	import { game } from '../stores/game';
</script>

<div class="grid grid-cols-9 gap-px w-full aspect-square p-3 sm:p-0 rounded-lg">
	{#each $game.boardState as val, i}
		<button
			on:click={() => game.cellClick(i)}
			class={`
            cursor-pointer
            p-4
            shadow shadow-surface-500
            bg-surface-50-900-token 
            bg-primary-hover-token
            border border-surface-400-500-token
            ${i == 0 && 'rounded-tl-container-token '} 
            ${i == 8 && 'rounded-tr-container-token '} 
            ${i == 72 && 'rounded-bl-container-token '} 
            ${i == 80 && 'rounded-br-container-token '} 
            ${i >= 72 && 'shadow-xl '} 
            `}
		>
			<div
				class={`${val !== null && 'square'} ${
					val && val > 0 ? 'bg-secondary-600-300-token' : 'bg-primary-600-300-token'
				}`}
			/>
			{#if $game.currentTurn.moves.map((m) => m.cell).includes(i)}
				<div
					class={`circle ${
						$game.currentTurn.playerIndex === 0
							? 'bg-primary-600-300-token'
							: 'bg-secondary-600-300-token'
					}`}
				/>
			{/if}
		</button>
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
