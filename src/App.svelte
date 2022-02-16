<script lang="ts">
	import Babel from "@babel/standalone"
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "./setup"
	import { onMount } from "svelte"
	import { ViewPlugin } from "@codemirror/view"
	import logPlugin from "./log-babel"
	import strayExpression from "./stray-expression-babel"
	import { ColoredElement, stringify, flattenColoredElement } from "./elementParser"

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


	let editor: HTMLDivElement

	let dragValue = window.innerWidth / 2
	let isBeingDragged = false

	onMount(() => new EditorView({
		state: EditorState.create({
			extensions: [
				basicSetup,
				updatePlugin
			],
		}),
		parent: editor
	}))


	// A reflection trick to get the constructor of an async function.
	const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

	interface Result {
		lineNumber: number,
		content?: ColoredElement
	}

	Babel.registerPlugin("log-transform", logPlugin)
	Babel.registerPlugin("stray-expression-babel", strayExpression)

	async function run(string: string): Promise<Result[] | Error | null> {

		if (string == "") return null
		try {

			let unparsedResults: Result[] = []
			const babelled = Babel.transform(string, { 
				filename: "index.ts",
				presets: ["env", "typescript"],
				parserOpts: {
					allowReturnOutsideFunction: true,
					allowAwaitOutsideFunction: true
				},
				plugins: ["log-transform", "stray-expression-babel"]
			}).code

			const asyncFunction = AsyncFunction("debug", babelled)
			
			await asyncFunction((lineNumber: number, content?: any) => {
				unparsedResults = [...unparsedResults, { lineNumber, content }]
			})

			if (unparsedResults.length == 0) return []

			const results: Result[] = unparsedResults.map(result => ({
				lineNumber: result.lineNumber,
				content: stringify(result.content)
			})).sort((a, b) => a.lineNumber - b.lineNumber)

			return results;
		} catch(e) {
			return e
		}
	}
</script>
<svelte:body
	on:mousemove={e => {
		if (isBeingDragged) dragValue = e.clientX
	}}
	on:mouseup={e => {
		isBeingDragged = false
	}}
></svelte:body>
<div style="grid-template-columns: {dragValue}px {window.innerWidth - dragValue}px;" class="gap-0 grid grid-rows-1 grid-cols-2">
	<div class="flex">
		<div 
			class="grow" bind:this={editor}
			data-gramm="false"
			data-gramm_editor="false"
			data-enable-grammarly="false"
			spellcheck="false"
		></div>
		<div class="absolute translate-x-[-50%] w-[2px] cursor-col-resize h-screen bg-grey" style="left: {dragValue}px;"></div>
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			class="absolute px-2 w-[2px] translate-x-[-50%] cursor-col-resize h-screen bg-transparent"
			style="left: {dragValue}px;"
			on:mousedown={e => {
				isBeingDragged = true
			}}
		></div>
	</div>
	{#if value}
		{#await run(value) then results}
			<p class="px-1 w-full text-[1rem] leading-[1.4058rem]">
				{#if results instanceof Error}
					{#each results.toString().split("\n") as resultLine}
						<p>{resultLine}</p>
					{/each}
				{:else}
					{#each results as result, i}
						<p class="absolute" style="
						top: {document.querySelector(".cm-content").children[result.lineNumber - 1].getBoundingClientRect().y}px;
						">
							{#each flattenColoredElement(result.content) as line}
								<span style="color: {line.color};">{@html
									line.content
								}</span>
							{/each}
						</p>
					{/each}
				{/if}
			</p>
		{/await}
	{/if}
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