<script>
	import { FileDropzone } from '@skeletonlabs/skeleton';

	// @ts-ignore
	import CryptoJS from 'crypto-js';
	// @ts-ignore
	import sha1 from 'crypto-js/sha1';

	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	import FirmwareInfo from './info.svelte';
	dayjs.extend(customParseFormat);
	let sha1Value = '';
	let firmwareFile = Object({ valid: false });
	let firmwareInfo = Array();
	let firmwareDateValid = false;
	let fileTitle = '';
	let fileError = '';
	let warning = '';
	let isLoading = false;
	let filenameParse = Object({ valid: false });
	// @ts-ignore
	function getSHA1(file) {
		isLoading = true;
		const reader = new FileReader();
		console.log('file', file);
		console.log('readAsArrayBuffer', reader.readAsArrayBuffer(file));
		reader.onload = function () {
			console.log(reader.result);
			let hex = sha1(CryptoJS.lib.WordArray.create(reader.result)).toString();
			console.log('hex', hex);
		};
		reader.onerror = function () {
			console.log(reader.error);
		};
		isLoading = false;
		return '';
	}
	// @ts-ignore
	const onChange = (e) => {
		firmwareFile.valid = false;
		filenameParse.valid = false;
		fileError = '';
		sha1Value = '';
		console.log('onChange', e);
		const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		if (file == null) {
			fileTitle = '无效输入';
			fileError = '无效文件';
			return;
		}
		if (file.size > 16777216) {
			fileTitle = '无效输入';
			fileError = '文件体积过大';
			return;
		}
		firmwareFile = file;
		firmwareFile.valid = true;
		fileTitle = firmwareFile.name;
		firmwareInfo = [{ name: '文件名', value: firmwareFile.name, exist: true, valid: true }];
		firmwareInfo = [
			...firmwareInfo,
			{ name: '大小', value: firmwareFile.size + ' Bytes', exist: true, valid: true }
		];
		// 解析文件名
		const patt =
			/^(\w+)-(\d{2})(\d{2})(\d{2})(\d{2})-\[([a-f0-9]{6})\]-(?:\{([a-f0-9]{4})\}-?)?([^\.]*)/i;
		let match = fileTitle.match(patt);
		if (match == null) {
			warning = '文件名不符合Volwave固件规范，仅计算SHA-1校验和';
		} else {
			warning = '';
			filenameParse.name = match[1];
			filenameParse.year = '20' + match[2];
			filenameParse.month = match[3];
			filenameParse.day = match[4];
			filenameParse.ver = match[5];
			filenameParse.sha1 = match[6];
			filenameParse.crc = match[7];
			filenameParse.info = match[8];
			filenameParse.valid = true;
			firmwareDateValid = dayjs(
				filenameParse.year + filenameParse.month + filenameParse.day,
				'YYYYMMDD',
				true
			).isValid();
			firmwareInfo = [
				...firmwareInfo,
				{ name: '项目', value: filenameParse.name, exist: true, valid: true }
			];
			firmwareInfo = [
				...firmwareInfo,
				{
					name: '日期',
					value: [
						{ name: '年', value: filenameParse.year },
						{ name: '月', value: filenameParse.month },
						{ name: '日', value: filenameParse.day }
					],
					exist: true,
					valid: true
				}
			];
			firmwareInfo = [
				...firmwareInfo,
				{ name: '编译序号', value: filenameParse.ver, exist: true, valid: true }
			];
			if (filenameParse.crc) {
				firmwareInfo = [
					...firmwareInfo,
					{ name: '烧录器校验码', value: filenameParse.crc, exist: true, valid: true }
				];
			}
			firmwareInfo = [
				...firmwareInfo,
				{ name: '备注', value: filenameParse.info, exist: true, valid: true }
			];
		}
		// 若文件名不符合规范，则只进行sha-1计算
		sha1Value = getSHA1(firmwareFile);
	};
	// @ts-ignore
	const onDrop = (e) => {
		if (isLoading) {
			return;
		}
		onChange(e);
	};
</script>

<div class="flex flex-col justify-center items-center mt-8">
	{#if sha1Value == ''}
		<FileDropzone
			class="w-9/12 min-w-fit max-w-2xl bg-white/20 dragover:bg-red/20 text-slate-100"
			name="files"
			regionInterfaceText="test"
			slotMeta="opacity-50"
			on:drop={onDrop}
			on:change={onChange}
		>
			<svelte:fragment slot="message">点击选择固件<br />或者<br />直接拖入固件</svelte:fragment>
			<svelte:fragment slot="meta">.hex .tenx .bin</svelte:fragment>
		</FileDropzone>
	{/if}
	<div class="w-9/12 min-w-fit max-w-2xl">
		<FirmwareInfo {firmwareInfo} {warning} {sha1Value} />
	</div>
</div>
