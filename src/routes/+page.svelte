<script>
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	// @ts-ignore
	import CryptoJS from 'crypto-js';
	// @ts-ignore
	import sha1 from 'crypto-js/sha1';

	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	import FirmwareInfo from './info.svelte';
	import Alert from './alert.svelte';
	import Result from './result.svelte';
	dayjs.extend(customParseFormat);
	let sha1Value = '';
	let firmwareFile = null;
	let firmwareInfo = Array();
	let fileTitle = '';
	let alertContent = Object({ valid: false });
	let isLoading = false;
	let filenameParse = Object({ valid: false });
	// @ts-ignore
	function getSHA1(file) {
		isLoading = true;
		const reader = new FileReader();
		console.log('file', file);
		reader.readAsArrayBuffer(file);
		reader.onload = function () {
			// console.log(reader.result);
			let hex = sha1(CryptoJS.lib.WordArray.create(reader.result)).toString();
			console.log('hex', hex);
			sha1Value = hex;
		};
		reader.onerror = function () {
			console.log(reader.error);
		};
		isLoading = false;
		return '';
	}
	// @ts-ignore
	const onChange = (e) => {
		firmwareFile = Object();
		filenameParse.valid = false;
		sha1Value = '';
		console.log('onChange', e);
		const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		if (file == null) {
			fileTitle = '无效输入';
			alertContent.title = '警告';
			alertContent.text = '无效文件';
			alertContent.style = 'variant-filled-warning';
			alertContent.valid = true;
			return;
		}
		if (file.size > 16777216) {
			fileTitle = '无效输入';
			alertContent.title = '警告';
			alertContent.text = '文件体积过大';
			alertContent.style = 'variant-filled-warning';
			alertContent.valid = true;
			return;
		}
		firmwareFile = file;
		firmwareFile.valid = true;
		fileTitle = firmwareFile.name;
		firmwareInfo = [{ name: '文件名称', value: firmwareFile.name, exist: true, valid: true }];
		firmwareInfo = [
			...firmwareInfo,
			{ name: '文件大小', value: firmwareFile.size + ' Bytes', exist: true, valid: true }
		];
		// 解析文件名
		const patt =
			/^(\w+)-(\d{2})(\d{2})(\d{2})(\d{2})-\[([a-f0-9]{6})\](?:-\{([a-f0-9]{4})\})?-?(.*)\./i;
		let match = fileTitle.match(patt);
		if (match == null) {
			alertContent.title = '警告';
			alertContent.text = '文件名不符合Volwave固件规范，仅计算SHA-1校验和';
			alertContent.style = 'variant-filled-warning';
			alertContent.valid = true;
			firmwareInfo[0].valid = false;
			filenameParse.valid = false;
		} else {
			alertContent.title = '状态';
			alertContent.text = '正在解析中';
			alertContent.style = 'variant-ghost-warning text-white';
			alertContent.valid = true;
			filenameParse.name = match[1];
			filenameParse.year = '20' + match[2];
			filenameParse.month = match[3];
			filenameParse.day = match[4];
			filenameParse.ver = match[5];
			filenameParse.sha1 = match[6];
			filenameParse.crc = match[7];
			filenameParse.info = match[8];
			filenameParse.valid = true;
			firmwareInfo = [
				...firmwareInfo,
				{ name: '项目名称', value: filenameParse.name, exist: true, valid: true }
			];
			firmwareInfo = [
				...firmwareInfo,
				{
					name: '编译日期',
					value: [
						{ name: '年', value: filenameParse.year },
						{ name: '月', value: filenameParse.month },
						{ name: '日', value: filenameParse.day }
					],
					exist: true,
					valid: dayjs(
						filenameParse.year + filenameParse.month + filenameParse.day,
						'YYYYMMDD',
						true
					).isValid()
				}
			];
			firmwareInfo = [
				...firmwareInfo,
				{ name: '编译序号', value: filenameParse.ver, exist: true, valid: true }
			];
			if (filenameParse.crc) {
				firmwareInfo = [
					...firmwareInfo,
					{ name: '烧录校验', value: filenameParse.crc, exist: true, valid: true }
				];
			}
			firmwareInfo = [
				...firmwareInfo,
				{ name: '备注信息', value: filenameParse.info, exist: true, valid: true }
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
	const reset = (e) => {
		if (e.detail.reset) {
			firmwareInfo = Array();
			firmwareFile = null;
			alertContent.valid = false;
			sha1Value = '';
		}
	};
	const getResult = (e) => {
		if (e.detail.isSha1Match) {
			alertContent.title = '校验通过';
			alertContent.text = 'SHA-1校验和与文件名中对应字段匹配';
			alertContent.style = 'bg-green-600 text-white';
		} else {
			alertContent.title = '校验失败';
			alertContent.text = 'SHA-1校验和与文件名中对应字段不匹配，固件损坏不可使用';
			alertContent.style = 'bg-red-600 text-white';
		}
	};
	let alertVisible = 0;
	let fileDropzoneVisible = 1;
	let firmwareInfoVisible = 0;
	let resultVisible = 0;
	const animationEnd = (e) => {
		if (e.detail.isAnimationEnd) {
			firmwareInfoVisible = 2;
		}
	};
</script>

<div class="flex flex-col justify-center items-center mt-8">
	<div class="w-9/12 flex-1 min-w-fit max-w-2xl text-slate-100">
		{#if alertContent.valid && fileDropzoneVisible == 0}
			<div
				transition:fade={{ duration: 300 }}
				on:outroend={() => (alertVisible = 0)}
				on:introstart={() => (alertVisible = 1)}
				on:introend={() => (alertVisible = 2)}
			>
				<Alert on:message={reset} content={alertContent} />
			</div>
		{/if}
		{#if !firmwareFile && alertVisible + resultVisible == 0}
			<div
				transition:fade={{ duration: 300 }}
				on:outroend={() => (fileDropzoneVisible = 0)}
				on:introstart={() => (fileDropzoneVisible = 1)}
				on:introend={() => (fileDropzoneVisible = 2)}
			>
				<FileDropzone
					class="bg-white/20 dragover:bg-red/20"
					name="files"
					slotMeta="opacity-50"
					on:drop={onDrop}
					on:change={onChange}
				>
					<svelte:fragment slot="message">点击选择固件<br />或者<br />直接拖入固件</svelte:fragment>
					<svelte:fragment slot="meta">.hex .tenx .bin</svelte:fragment>
				</FileDropzone>
			</div>
		{:else if alertVisible == 2}
			<FirmwareInfo {firmwareInfo} on:message={animationEnd} />
			{#if firmwareInfoVisible == 2}
				<div
					transition:fade|global={{ duration: 300, delay: 100 }}
					on:outroend={() => ((resultVisible = 0), (firmwareInfoVisible = 0))}
					on:introstart={() => (resultVisible = 1)}
					on:introend={() => (resultVisible = 2)}
				>
					<Result on:message={getResult} {sha1Value} {filenameParse} />
				</div>
			{/if}
		{/if}
	</div>
</div>
