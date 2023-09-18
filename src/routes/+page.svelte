<script>
	import Variables from 'svelte-atoms/Variables.svelte';
	import DropZone from 'svelte-atoms/DropZone.svelte';
	import sha1 from 'crypto-js/sha1';
	let sha1Value;
	let selectFile;
	let fileName = '';
	let isCalc = false;
	async function getSHA1(file) {
		isCalc = true;
		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
		await delay(3000);
		const reader = new FileReader();
		console.log('file', file);
		reader.readAsArrayBuffer(file);
		let fileBuffer = reader.result;
		console.log('fileBuffer', fileBuffer);
		const hex = sha1(fileBuffer);
		isCalc = false;
		return hex;
	}
	const onChange = (e) => {
		console.log('onChange', e);
		const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		fileName = file ? file.name : 'Invalid file';
		selectFile = file;
		sha1Value = getSHA1(file);
	};
	const onDrop = (e) => {
		onChange(e);
	};
</script>

<h1>VFVT</h1>
<h2>沃尔微固件校验工具</h2>
<h2>Volwave Firmware Verification Tool</h2>
<Variables />

<DropZone
	title="直接拖入固件 或者"
	activeTitle="开始校验"
	buttonTitle="点击选择固件"
	fileLoadingTitle="正在校验"
	fileTitle={fileName}
	isLoading={isCalc}
	on:drop={onDrop}
	on:change={onChange}
/>

{#if selectFile}
	<p>Name: {selectFile.name}</p>
	<p>Size: {selectFile.size} Bytes</p>
{/if}

{#await sha1Value}
	<p>sha-1: Calculating...</p>
{:then sha1Value}
	<p>sha-1: {sha1Value}</p>
{/await}
