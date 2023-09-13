<script lang="ts">
	import { code, runCode, babelledCode } from '$lib/code/code';
	import MonacoEditor from 'svelte-monaco';
	import type Monaco from 'monaco-editor';
	import { Range } from 'monaco-editor';
	import { flattenColoredElement } from '$lib/elementParser';
	import Terminal from '$lib/terminal/Terminal.svelte';

	let mainEditor: Monaco.editor.IStandaloneCodeEditor | undefined = undefined;
	let results: Awaited<typeof $runCode>;
	let terminal: Terminal | undefined;

	let output: string;
	$: if ($babelledCode instanceof Error) {
		output = $babelledCode.message;
	} else {
		output = $babelledCode;
	}

	let tab: 'terminal' | 'generated' = 'terminal';

	$: {
		const decorations = mainEditor
			?.getDecorationsInRange(new Range(1, 1, 1_000_000_000, 1))
			?.map((decoration) => decoration.id);

		if (decorations) {
			mainEditor?.removeDecorations(decorations);
		}

		if (results instanceof Error) {
			let result = results;
			terminal?.clear().then(() => terminal?.write(result.message));
		} else {
			terminal?.clear();
			let lines = $code.split('\n');
			mainEditor?.createDecorationsCollection(
				results
					.filter((result) => lines.length >= result.lineNumber)
					.map((result) => ({
						range: new Range(
							result.lineNumber,
							0,
							result.lineNumber,
							lines[result.lineNumber - 1].length + 1
						),
						options: {
							isWholeLine: true,
							className: 'result-decorator',
							hoverMessage: {
								value: flattenColoredElement(result.content)
									.map(
										(x) =>
											`<span class="preserve-whitespace-jsnow" style="color:${
												x.color
											};">${x.content.replaceAll(' ', '&nbsp;')}</span>`
									)
									.join(''),
								isTrusted: true,
								supportHtml: true
							},
							after: {
								inlineClassName: 'result-text-decorator',
								content:
									' '.repeat(8) +
									flattenColoredElement(result.content)
										.map((x) => x.content)
										.join(''),
								cursorStops: 3
							}
						}
					}))
			);
		}
	}

	$: $runCode.then((result) => (results = result));
</script>

<div class="container">
	<div
		class="editor"
		data-gramm="false"
		data-gramm_editor="false"
		data-enable-grammarly="false"
		spellcheck="false"
	>
		<MonacoEditor
			theme="github-dark"
			options={{
				automaticLayout: true,
				language: 'typescript'
			}}
			on:ready={(readyEditor) => {
				mainEditor = readyEditor.detail;
			}}
			bind:value={$code}
		/>
	</div>
	<div class="output">
		{#if tab == 'terminal'}
			<div class="terminal">
				<Terminal bind:this={terminal} />
			</div>
		{:else if tab == 'generated'}
			<div
				class="editor"
				data-gramm="false"
				data-gramm_editor="false"
				data-enable-grammarly="false"
				spellcheck="false"
			>
				<MonacoEditor
					theme="github-dark"
					options={{
						automaticLayout: true,
						language: 'typescript',
						readOnly: true
					}}
					bind:value={output}
				/>
			</div>
		{/if}
		<div class="options">
			<button on:click={() => (tab = 'terminal')}>Terminal</button>
			<button on:click={() => (tab = 'generated')}>Generated Code</button>
		</div>
	</div>
</div>

<style>
	div.terminal {
		height: calc(100% - 2rem);
		width: 100%;
		padding: 1rem;
		background: black;
	}

	div.options {
		padding: 1rem;
		background-color: #1e1e1e;
		width: 100%;
	}

	div.output {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	:global(.preserve-whitespace-jsnow) {
		white-space: pre;
	}

	:global(.icon) {
		transform: scale(1.25);
		transition-property: transform;
		position: fixed;
		bottom: 1.25rem;
		right: 1.25rem;
	}

	:global(.icon-2) {
		right: 60px;
	}

	:global(.result-decorator) {
		background-color: rgba(0, 255, 0, 0.1);
	}

	:global(.result-text-decorator) {
		color: rgba(255, 255, 255, 0.5) !important;
	}

	:global(.icon:hover) {
		transform: scale(1.25) rotate(12deg);
	}

	.container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
		width: 100vw;
		height: 100vh;
	}
	.editor {
		outline: none;
		resize: none;
		width: 100%;
		height: 100%;
	}
</style>
