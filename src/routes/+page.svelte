<script lang="ts">
	import { code, runCode } from '$lib/code/code';
	import MonacoEditor from 'svelte-monaco';
	import type Monaco from 'monaco-editor';
	import { Range } from 'monaco-editor';
	import { flattenColoredElement } from '$lib/elementParser';

	let editor: Monaco.editor.IStandaloneCodeEditor | undefined = undefined;
	let results: Awaited<typeof $runCode>;

	$: {
		const decorations = editor
			?.getDecorationsInRange(new Range(1, 1, 1_000_000_000, 1))
			?.map((decoration) => decoration.id);

		if (decorations) {
			editor?.removeDecorations(decorations);
		}

		if (results instanceof Error) {
			console.error(results);
		} else {
			editor?.createDecorationsCollection(
				results.map((result) => ({
					range: new Range(result.lineNumber, 0, result.lineNumber, $code.split("\n")[result.lineNumber - 1].length + 1),
					options: {
						isWholeLine: true,
						className: 'result-decorator',
						hoverMessage: {
							value: flattenColoredElement(result.content)
								.map((x) => `<span class="preserve-whitespace-jsnow" style="color:${x.color};">${x.content.replaceAll(" ", "&nbsp;")}</span>`)
								.join(''),
							isTrusted: true,
							supportHtml: true
						},
						after: {
							inlineClassName: 'result-text-decorator',
							content: " ".repeat(8) + flattenColoredElement(result.content)
								.map((x) => x.content)
								.join(''),
							cursorStops: 3
						},
					}
				}))
			);
		}
	}

	$: $runCode.then((result) => (results = result));
</script>

<div class="container">
	<div class="flex">
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
				}}
				on:ready={(readyEditor) => {
					editor = readyEditor.detail;
				}}
				bind:value={$code}
			/>
		</div>
	</div>
</div>

<style>
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

	.flex {
		display: flex;
	}

	.editor {
		outline: none;
		resize: none;
		width: 100%;
		height: 100%;
	}
</style>
