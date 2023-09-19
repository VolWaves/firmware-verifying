<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<AppBar
	class="pt-8"
	background="bg-transparent"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
>
	<svelte:fragment slot="lead">
		<Avatar background="bg-transparent" rounded="" src="./favicon.png" />
	</svelte:fragment>
	<div class="flex flex-col text-center text-slate-200">
		<h1 class="text-7xl font-bold">VFVT</h1>
		<h2 class="text-base">沃尔微固件校验工具</h2>
		<h2 class="text-xs">Volwave Firmware Verification Tool</h2>
	</div>
</AppBar>
