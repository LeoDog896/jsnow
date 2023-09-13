<script lang="ts">
	import 'xterm/css/xterm.css';
	import { Terminal } from 'xterm';
	import { FitAddon } from 'xterm-addon-fit';
	import { onMount } from 'svelte';

	let terminalContainer: HTMLDivElement;
	export let terminal: Terminal | undefined = undefined;
	export let fitAddon: FitAddon | undefined = undefined;

	onMount(() => {
		terminal = new Terminal({ convertEol: true });
		fitAddon = new FitAddon();
		terminal.loadAddon(fitAddon);
		terminal.open(terminalContainer);
		fitAddon.fit();
	});

	function resize() {
		fitAddon?.fit();
	}

	export function clear(): Promise<void> {
		return write('\x1Bc');
	}

	export function write(input: string | Uint8Array): Promise<void> {
		return new Promise((resolve) => terminal?.write(input, resolve));
	}
</script>

<div class="terminal" on:resize={resize} bind:this={terminalContainer} />

<style>
	.terminal {
		width: 100%;
		height: 100%;
	}
</style>
