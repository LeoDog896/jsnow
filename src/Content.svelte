<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "./setup"
	import { onMount } from "svelte"
	import { ViewPlugin } from "@codemirror/view"
	import { flattenColoredElement } from "./elementParser"
	import { code, runCode } from "./code"
	import Settings from "./Settings.svelte"
	import { getContext } from 'svelte';
	import { isBeingDragged, dragDistance } from "./dragbar"
	import { lineByLine } from "./settings";
	const { open } = getContext('simple-modal');

	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('/service-worker.js');
    }

	const updatePlugin = ViewPlugin.fromClass(class {
		constructor() {}

		update(update) {
			if (update.docChanged) code.set(update.state.doc.toString())
		}
	})


	let editor: HTMLDivElement

	onMount(() => new EditorView({
		state: EditorState.create({
			extensions: [
				basicSetup,
				updatePlugin
			],
		}),
		parent: editor
	}))
</script>
<svelte:body
	on:mousemove={e => {
		if ($isBeingDragged) $dragDistance = e.clientX
	}}
	on:mouseup={_ => {
		$isBeingDragged = false
	}}
></svelte:body>
<img 
	src="./gear.svg" alt="Settings"
	class="scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-5"
	on:click={() => open(Settings)}
>
<div style="grid-template-columns: {$dragDistance}px {window.innerWidth - $dragDistance}px;" class="gap-0 grid grid-rows-1 grid-cols-2">
	<div class="flex">
		<div 
			class="grow" bind:this={editor}
			data-gramm="false"
			data-gramm_editor="false"
			data-enable-grammarly="false"
			spellcheck="false"
		></div>
		<div class="absolute translate-x-[-50%] w-[2px] cursor-col-resize h-screen bg-grey" style="left: {$dragDistance}px;"></div>
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			class="absolute px-2 w-[2px] translate-x-[-50%] cursor-col-resize h-screen bg-transparent"
			style="left: {$dragDistance}px;"
			on:mousedown={() => {
				$isBeingDragged = true
			}}
		></div>
	</div>
		{#await $runCode then results}
			<p class="px-1 w-full text-[1rem] leading-[1.4058rem]">
				{#if results instanceof Error}
					{#each results.toString().split("\n") as resultLine}
						<p class="text-red-700">{resultLine}</p>
					{/each}
				{:else}
					{#each results as result}
						{#if $lineByLine}
							<p class="absolute" style="
							top: {document.querySelector(".cm-content").children[result.lineNumber - 1].getBoundingClientRect().y}px;
							">
								{#each flattenColoredElement(result.content) as line}
									<span style="color: {line.color};">{@html
										line.content
									}</span>
								{/each}
							</p>
						{:else}
							<p>
								{#each flattenColoredElement(result.content) as line}
									<p style="color: {line.color};">{@html line.content}</p>
								{/each}
							</p>
						{/if}
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