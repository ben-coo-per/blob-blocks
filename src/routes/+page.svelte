<script>
	import GameBoard from '$lib/components/GameBoard.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="fixed top-0 w-full p-2 flex flex-row-reverse">
	<LightSwitch />
</div>
<div class="container max-w-md h-full mx-auto flex justify-center items-center">
	<GameBoard />
</div>
