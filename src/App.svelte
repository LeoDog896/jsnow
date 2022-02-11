<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
	import { javascript } from "@codemirror/lang-javascript"
	import { onMount } from "svelte"
	import { ViewPlugin, keymap } from "@codemirror/view"
	import { indentWithTab } from "@codemirror/commands"
	import logPlugin from "./log-babel"
	import strayExpression from "./stray-expression-babel"

	enum Colors {
		TRUE = "#42f598",
		FALSE = "#f55442",
		NUMBER = "#368aa3",
		GRAY = "#807b7a"
	}

	function flattenColoredElement(element: ColoredElement): ColoredElement[] {

		if (typeof element.content == "string") return [{
			content: element.content,
			color: element.color
		}]

		return element.content.flat()
	}

	interface ColoredElement {
		content: string | ColoredElement[],
		color?: Colors
	}

	function stringify(element: any): ColoredElement {
		if (Array.isArray(element)) {

			return {
				content: [
					{
						content: "[",
						color: Colors.GRAY
					},
					...element.map((it, index) => {

						if (index + 1 == element.length) return stringify(it)

						return [stringify(it), {
							content: ", ",
							color: Colors.GRAY
						}]
					}).flat(),
					{
						content: "]",
						color: Colors.GRAY
					}
				]
			}
		}

		if (isPromise(element)) {
			return {
				content: "Promise",
				color: Colors.GRAY
			}
		}

		if (element === true) {
			return {
				content: "true",
				color: Colors.TRUE
			}
		}

		if (element === false) {
			return {
				content: "false",
				color: Colors.FALSE
			}
		}


		if (typeof element == "number") {
			return {
				content: element.toString(),
				color: Colors.NUMBER
			}
		}

		if (typeof element == "object") {
			return {
				content: JSON.stringify(element),
				color: Colors.GRAY
			}
		}

		if (typeof element == "string") {
			return {
				content: `"${element}"`,
				color: Colors.GRAY
			}
		}

		if (typeof element == "bigint") {
			return {
				content: `${element}n`,
				color: Colors.NUMBER
			}
		}

		return {
			content: element.toString(),
			color: Colors.GRAY
		}
	}

	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('/service-worker.js');
    }

	let value: string = ""

	const updatePlugin = ViewPlugin.fromClass(class {
		constructor() {}

		update(update) {
			if (update.docChanged) value = update.state.doc.toString()
		}
	})
	
	const isPromise = promiseToCheck => {
  		return promiseToCheck && Object.prototype.toString.call(promiseToCheck) === "[object Promise]";
	}


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
		content?: ColoredElement
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

				return {
					lineNumber: result.lineNumber,
					content: stringify(result.content)
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
					<p>
						{#each flattenColoredElement(result.content) as line}
							<span style="color: {line.color};">{line.content}</span>
						{/each}
					</p>
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