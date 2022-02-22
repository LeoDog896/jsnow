<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"
	import { EditorState, EditorView, basicSetup } from "./setup"
	import { onMount } from "svelte"
	import { ViewPlugin } from "@codemirror/view"
	import { flattenColoredElement } from "./elementParser"
	import { code, runCode } from "./code"
	import Modal from 'svelte-simple-modal';

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

	function openSettingsModal() {

	}
</script>
<svelte:body
	on:mousemove={e => {
		if (isBeingDragged) dragValue = e.clientX
	}}
	on:mouseup={_ => {
		isBeingDragged = false
	}}
></svelte:body>
<Modal>
	<img 
		src="./gear.svg" alt="Settings"
		class="scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-5"
		on:click={openSettingsModal}
	>
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
				on:mousedown={() => {
					isBeingDragged = true
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
	</div>
</Modal>
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