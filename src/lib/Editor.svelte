<script lang="ts">
	import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';

	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import { code } from './code/code';
	import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker&url';

	let divEl: HTMLDivElement;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco: typeof monaco;

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker(workerId, label) {
				// @ts-ignore
				return new Worker(self["MonacoEnvironment"].getWorkerUrl(workerId, label), {
					name: label,
					type: 'module'
				});
			},
			getWorkerUrl: function (moduleId, label) {
				return TsWorker
			}
		};

		Monaco = await import('monaco-editor');

		Monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
		editor = Monaco.editor.create(divEl, {
			value: $code,
			language: 'typescript',
			automaticLayout: true
		});

		editor.getModel()?.onDidChangeContent(() => {
			$code = editor.getValue();
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<div class="editor" bind:this={divEl} />

<style>
	div.editor {
		display: block;
		position: relative;
		height: 100vh;
	}
</style>
