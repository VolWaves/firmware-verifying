<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function clickReset() {
		dispatch('message', {
			reset: true
		});
	}
	export let content = Object({ valid: false });
</script>

<aside class="alert {content.style}">
	<div class="alert-message">
		<h3 class="h3">{content.title}</h3>
		<p>{content.text}</p>
	</div>
	<div class="alert-actions">
		<button type="button" class="btn variant-ghost-surface" on:click={clickReset}>重置</button>
	</div>
</aside>
