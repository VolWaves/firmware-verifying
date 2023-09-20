<script>
	import { fade, fly } from 'svelte/transition';
	export let firmwareInfo = Array();
	export let sha1Value = '';
</script>

<div
	transition:fade={{ duration: 300 }}
	class="w-full mt-4 font-mono text-lg border-collapse text-slate-100"
>
	{#each firmwareInfo as item}
		{#if item.exist}
			<div
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
						class="flex items-center justify-center divide-x-2 divide-slate-100 flex-1 item-value text-center"
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
