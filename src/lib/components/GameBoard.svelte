<script lang="ts">
	import { cellIsAdjacentToExistingTile } from '$lib/utils/checks';
	import { game, BOARD_SIZE, remainingMoves } from '../stores/game';
	import MoveIndicator from './MoveIndicator.svelte';

	$: currentUser = $game.currentTurn.playerIndex;
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
		aspect-square
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
					<MoveIndicator user={currentUser} isPending={true} />
				{:else if val !== null}
					<MoveIndicator user={val} isPending={false} />
				{:else if cellIsAdjacentToExistingTile($game, [row, col]) && $remainingMoves > 0}
					<MoveIndicator user={currentUser} isOption={true} />
				{/if}
			</button>
		{/each}
	{/each}
</div>
