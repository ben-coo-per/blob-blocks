<script lang="ts">
	import { game, cellClick } from '../stores/game';
</script>

<div class="grid grid-cols-9 gap-0.5 w-full aspect-square p-3 sm:p-0 rounded-lg drop-shadow-xl">
	{#each $game.state as val, i}
		<button
			on:click={() => cellClick(i)}
			class={`
            cursor-pointer
            bg-surface-50-900-token 
            bg-primary-hover-token
            ${i == 0 && 'rounded-tl-container-token '} 
            ${i == 8 && 'rounded-tr-container-token '} 
            ${i == 72 && 'rounded-bl-container-token '} 
            ${i == 80 && 'rounded-br-container-token '} 
            `}
		>
			{val}
		</button>
	{/each}
</div>
