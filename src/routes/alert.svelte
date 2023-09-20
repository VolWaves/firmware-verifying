<script>
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function clickReset() {
		dispatch('message', {
			reset: true
		});
	}

	export let warning = Object({ valid: false });
</script>

{#if warning.valid}
	<aside
		class="alert {warning.style}"
	>
		<div class="alert-message">
			<h3 class="h3">{warning.title}</h3>
			<p>{warning.text}</p>
		</div>
		<div class="alert-actions">
			<button type="button" class="btn variant-ghost-surface" on:click={clickReset}>重置</button>
		</div>
	</aside>
{/if}
