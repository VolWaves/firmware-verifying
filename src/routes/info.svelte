<script>
	export let firmwareInfo = Array();
	export let warning = '';
	export let sha1Value = '';
</script>

<table>
	{#each firmwareInfo as item}
		{#if item.valid}
			<tr class="items flex flex-row p-2">
				<td class="item-name text-left pr-4">{item.name}</td>
				{#if Array.isArray(item.value)}
					<td class="item-value text-center flex flex-row ">
						{#each item.value as subitem}
							<div class="pr-4">
								<p class="item-subname">{subitem.name}</p>
								<p class="item-subvalue">{subitem.value}</p>
							</div>
						{/each}
					</td>
				{:else}
					<td class="item-value text-center px-4">{item.value}</td>
				{/if}
			</tr>
		{/if}
	{/each}
</table>

{#if warning != ''} <p>警告: {warning}</p> {/if}
{#if sha1Value != ''} <p>SHA-1: {sha1Value}</p> {/if}

<style>
	.item-name {
	}
	.item-value {
	}
</style>
