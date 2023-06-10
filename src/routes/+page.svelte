<script>
	import Game from '$lib/components/Game.svelte';
	import { LightSwitch, AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar class="shadow-lg">
	<svelte:fragment slot="lead"
		><h1 class="gradient-heading uppercase text-xl select-none">Blob Blocks</h1></svelte:fragment
	>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

<Game />

<style>
	.gradient-heading {
		@apply bg-clip-text text-transparent box-decoration-clone;
		@apply bg-gradient-to-br;
		@apply from-primary-500 to-secondary-500;
	}
</style>
