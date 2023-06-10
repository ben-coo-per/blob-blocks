<script lang="ts">
	import { NUM_MOVES_PER_TURN, type Move } from '$lib/stores/game';

	export let move: Move;
	export let index: number;

	$: isUsed = move.cell !== null;
</script>

<div class={`flex flex-row ${isUsed ? 'opacity-20' : 'opacity-100'}`}>
	<p>{NUM_MOVES_PER_TURN - index}</p>
</div>
