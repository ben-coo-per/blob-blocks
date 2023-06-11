<script lang="ts">
	export let user: number;
	export let isPending: boolean = false;
	export let isOption: boolean = false;
</script>

{#if !isPending && !isOption}
	<div
		class={`square ${
			user > 0 ? 'bg-secondary-600-300-token' : 'bg-primary-600-300-token'
		} shadow-md shadow-surface-500`}
	/>
{:else if isPending}
	<div class={`relative square ring ${user > 0 ? 'ring-secondary-500' : 'ring-primary-500'}`}>
		<div
			class={`square opacity-30 ${
				user > 0 ? 'bg-secondary-600-300-token' : 'bg-primary-600-300-token'
			}`}
		/>
	</div>
{:else}
	<div class={`square border border-dashed border-surface-500`} />
{/if}
