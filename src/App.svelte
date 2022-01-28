<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
	import { linter as linterExtension } from "@codemirror/lint"
	import { javascript, esLint } from "@codemirror/lang-javascript"
	import { onMount } from "svelte"
	import { ViewPlugin } from "@codemirror/view"

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
				],
			}),
			parent: editor
		})
	})


	const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor

	async function run(string: string): Promise<string> {

		if (string == "") return ""
		try {

			const babelled = Babel.transform(string, { 
				filename: "index.ts",
				presets: ["env", "typescript"],
				parserOpts: {
					allowReturnOutsideFunction: true
				}
			}).code

			const asyncFunction = AsyncFunction(babelled)
			
			const element = await asyncFunction({
				log: (element) => alert(element)
			})

			if (Array.isArray(element)) {
				return `Array(${element.length}) [${element.join(", ")}]`
			}

			if (typeof element == "object") {
				return JSON.stringify(element)
			}

			if (typeof element == "string") {
				return `"${element}"`
			}

			if (typeof element == "bigint") {
				return `${element}n`
			}

			return element;
		} catch(e) {
			return e
		}
	}
</script>
<div class="gap-0 grid grid-rows-1 grid-cols-2">
	<div bind:this={editor}></div>
	{#await run(value) then result}
		<p>{result}</p>
	{/await}
</div>
<Tailwindcss />
<style>
	:global(.cm-scroller) { 
		overflow: scroll-y;
		min-height: 100vh; 
	}
</style>