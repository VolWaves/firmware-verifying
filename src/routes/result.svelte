<script>
	import { fade, fly } from 'svelte/transition';
	import { afterUpdate } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let sha1Value = '';
	export let filenameParse = Array();
	$: sha1ToCompare = sha1Value.substring(0, 6);
	$: sha1Tail = sha1Value.substring(7);
	const sha1Compare = (a, b) => {
		return a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0;
	};

	afterUpdate(() => {
		if (filenameParse.valid) {
			dispatch('message', {
				isSha1Match: sha1Compare(sha1ToCompare, filenameParse.sha1)
			});
		}
	});
</script>

{#if sha1Value != ''}
	<div
		class="flex content-stretch justify-center items-center overflow-hidden font-mono font-bold text-lg mt-4 rounded-xl border-2 text-center p-4"
		class:success={sha1Compare(sha1ToCompare, filenameParse.sha1)}
		class:fail={!sha1Compare(sha1ToCompare, filenameParse.sha1)}
	>
		<span class="text-gray-600">SHA-1:</span>
		<span class="pl-4 pr-4 text-3xl font-bold">{sha1ToCompare}</span>
		<span class="text-gray-600">{sha1Tail}</span>
	</div>
{/if}

<style>
	.success {
		color: rgb(22, 101, 52);
		border-color: rgb(22, 101, 52);
	}
	.fail {
		color: rgb(185, 28, 28);
		border-color: rgb(185, 28, 28);
	}
</style>
