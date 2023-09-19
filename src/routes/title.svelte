<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center">
	<svelte:fragment slot="lead">
		<Avatar src="./favicon.png" />
	</svelte:fragment>
	<div class="flex flex-col text-center">
		<h1 class="text-7xl">VFVT</h1>
		<h2 class="text-base">沃尔微固件校验工具</h2>
		<h2 class="text-xs">Volwave Firmware Verification Tool</h2>
	</div>
</AppBar>
