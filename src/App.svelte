<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
	import { javascript } from "@codemirror/lang-javascript"
	import { onMount } from "svelte"
	import { ViewPlugin, keymap } from "@codemirror/view"
	import { indentWithTab } from "@codemirror/commands"
	import logPlugin from "./log-babel"
	import strayExpression from "./stray-expression-babel"

	let value: string = ""

	const updatePlugin = ViewPlugin.fromClass(class {
		constructor() {}

		update(update) {
			if (update.docChanged) value = update.state.doc.toString()
		}
	})


	let editor: HTMLDivElement

	onMount(() => {
		let view = new EditorView({
			state: EditorState.create({
				extensions: [
					basicSetup,
					javascript({ jsx: false, typescript: true }),
					updatePlugin,
					EditorView.lineWrapping,
					keymap.of([indentWithTab])
				],
			}),
			parent: editor
		})
	})


	const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

	interface Result {
		lineNumber: number,
		content?: any
	}

	window["Babel"].registerPlugin("log-transform", logPlugin)
	window["Babel"].registerPlugin("stray-expression-babel", strayExpression)

	async function run(string: string): Promise<Result[] | Error | null> {

		if (string == "") return null
		try {

			let unparsedResults: Result[] = []
			const babelled = window["Babel"].transform(string, { 
				filename: "index.ts",
				presets: ["env", "typescript"],
				parserOpts: {
					allowReturnOutsideFunction: true
				},
				plugins: ["log-transform", "stray-expression-babel"]
			}).code

			const asyncFunction = AsyncFunction("debug", babelled)
			
			await asyncFunction((lineNumber: number, content?: any) => {
				unparsedResults = [...unparsedResults, { lineNumber, content }]
			})

			if (unparsedResults.length == 0) return []

			const results: Result[] = unparsedResults.map(result => {
				const content = (() => {

					const content = result.content

					if (Array.isArray(content)) {
						return `Array(${content.length}) [${content.join(", ")}]`
					}

					if (typeof content == "object") {
						return JSON.stringify(content)
					}

					if (typeof content == "string") {
						return `"${content}"`
					}

					if (typeof content == "bigint") {
						return `${content}n`
					}

					return content
				})()

				return {
					lineNumber: result.lineNumber,
					content
				}
			}).sort((a, b) => a.lineNumber - b.lineNumber)

			return results;
		} catch(e) {
			return e
		}
	}
</script>
<div class="gap-0 grid grid-rows-1 grid-cols-2">
	<div bind:this={editor}></div>
	{#await run(value) then results}
		<p class="px-1 text-[1rem] leading-[1.4058rem]">
			{#if results instanceof Error}
				{#each results.toString().split("\n") as resultLine}
					<p>{resultLine}</p>
				{/each}
			{:else}
				{#each results as result, i}
					{@const lastLineNumber = i == 0 ? 0 : results[i - 1].lineNumber}
					{#each Array((result.lineNumber - lastLineNumber) - 1) as _}
						<br/>
					{/each}
					<p>{result.content}</p>
				{/each}
			{/if}
		</p>
	{/await}
</div>
<Tailwindcss />
<style>
	:global(.cm-scroller) { 
		overflow: scroll-y;
		min-height: 100vh;
		max-height: 100vh; 
	}

	:global(.cm-content) {
		font-size: 16px;
	}
</style>