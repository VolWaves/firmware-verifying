<script>
	import { fade, fly } from 'svelte/transition';
	export let firmwareInfo = Array();
	export let warning = '';
	export let sha1Value = '';
</script>

<div class="w-full mt-4 font-mono text-lg border-collapse text-slate-100">
	{#each firmwareInfo as item}
		{#if item.exist}
			<div
				transition:fade|local
				class:bg-red-700={item.valid != true}
				class="overflow-hidden items flex flex-row mt-1 rounded-xl border-neutral-600 border-2"
			>
				<div
					class:bg-neutral-700={item.valid == true}
					class="flex items-center font-bold item-name w-2/6 text-left p-4"
				>
					{item.name}
				</div>
				{#if Array.isArray(item.value)}
					<div
						class:bg-green-800={item.valid == true}
						class="flex items-center justify-center divide-x-2 divide-slate-100 flex-1 item-value bg-green-700 text-center"
					>
						{#each item.value as subitem}
							<div class="flex-1 h-full">
								<p class="item-subname bg-white/20 text-xs pt-1">{subitem.name}</p>
								<p class="item-subvalue">{subitem.value}</p>
							</div>
						{/each}
					</div>
				{:else}
					<div
						class:bg-green-800={item.valid == true}
						class="flex items-center justify-center flex-1 p-2 item-value text-center px-4"
					>
						{item.value}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</div>

{#if warning != ''}
	<div
		transition:fly={{ y: 100, duration: 300 }}
		class="overflow-hidden font-mono font-bold text-black text-lg bg-amber-600 mt-1 rounded-xl border-neutral-600 border-2 text-center p-4"
	>
		<p>警告: {warning}</p>
	</div>
{/if}
{#if sha1Value != ''}
	<div
		transition:fly={{ y: 100, duration: 300 }}
		class="overflow-hidden font-mono font-bold text-green-600 text-lg bg-amber-600 mt-1 rounded-xl border-neutral-600 border-2 text-center p-4"
	>
		<p>SHA-1: {sha1Value}</p>
	</div>
{/if}

<style>
	.fail {
		background-color: darkred;
	}
</style>
