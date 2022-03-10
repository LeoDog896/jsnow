<script lang="ts">
	import { EditorState, EditorView, basicSetup } from "./setup"
	import { onMount } from "svelte"
	import { ViewPlugin } from "@codemirror/view"
	import { flattenColoredElement } from "./elementParser"
	import { code, runCode } from "./code/code"
	import Settings from "./settings/Settings.svelte"
	import Info from "./Info.svelte"
	import { getContext } from 'svelte';
	import { isBeingDragged, dragDistance } from "./dragbar"
	import { lineByLine } from "./settings/settings"
	const { open } = getContext('simple-modal');
	import SettingsIcon from '@indaco/svelte-iconoir/icons/SettingsIcon.svelte';
	import QuestionMarkIcon from '@indaco/svelte-iconoir/icons/QuestionMarkIcon.svelte';

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
<SettingsIcon 
	alt="Settings"
	class="scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-5"
	on:click={() => open(Settings)}
/>
<QuestionMarkIcon 
	alt="Info"
	class="scale-125 hover:rotate-12 transition-transform fixed bottom-5 right-[60px]"
	on:click={() => open(Info)}
/>
<div style="grid-template-columns: {$dragDistance}px {window.innerWidth - $dragDistance}px;" class="gap-0 grid grid-rows-1 grid-cols-2">
	<div class="flex">
		<div 
			class="grow outline-none" bind:this={editor}
			data-gramm="false"
			data-gramm_editor="false"
			data-enable-grammarly="false"
			spellcheck="false"
		></div>
		<div class="absolute translate-x-[-50%] w-[2px] cursor-col-resize h-screen bg-grey border-2" style="left: {$dragDistance}px;"></div>
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
					{#if $lineByLine}
						{#each results.sort((a, b) => a.lineNumber - b.lineNumber) as result}
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
					{:else}
						{#each results as result}
							<p>
								{#each flattenColoredElement(result.content) as line}
									<span style="color: {line.color};">{@html line.content}</span>
								{/each}
							</p>
						{/each}
					{/if}
				{/if}
			</p>
		{/await}
</div>
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