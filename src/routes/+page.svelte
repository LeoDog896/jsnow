<script lang="ts">
	import { flattenColoredElement } from '$lib/elementParser';
	import { runCode } from '$lib/code/code';
	import Settings from '$lib/settings/Settings.svelte';
	import Info from '$lib/Info.svelte';
	import { getContext } from 'svelte';
	import { isBeingDragged, dragDistance, cappedDragDistance } from '$lib/dragbar';
	import { lineByLine } from '$lib/settings/settings';
	const { open } = getContext('simple-modal');
	import Editor from '$lib/Editor.svelte';
	import { SettingsIcon } from '@indaco/svelte-iconoir/icons/SettingsIcon';
	import { QuestionMarkIcon } from '@indaco/svelte-iconoir/icons/QuestionMarkIcon';
</script>

<svelte:body
	on:mousemove={(e) => {
		if ($isBeingDragged) $dragDistance = e.clientX;
	}}
	on:mouseup={(_) => {
		$isBeingDragged = false;
	}}
/>
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
<div
	style="grid-template-columns: {$cappedDragDistance}px {window.innerWidth -
		$cappedDragDistance}px;"
	class="gap-0 grid grid-rows-1 grid-cols-2 w-screen h-screen"
>
	<div class="flex">
		<div
			class="grow outline-none"
			data-gramm="false"
			data-gramm_editor="false"
			data-enable-grammarly="false"
			spellcheck="false"
		>
			<Editor />
		</div>
		<div
			class="absolute translate-x-[-50%] w-[2px] cursor-col-resize h-screen bg-grey border-2"
			style="left: {$cappedDragDistance}px;"
		/>
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			class="absolute px-2 w-[2px] translate-x-[-50%] cursor-col-resize h-screen bg-transparent"
			style="left: {$cappedDragDistance}px;"
			on:mousedown={() => {
				$isBeingDragged = true;
			}}
		/>
	</div>
	{#await $runCode then results}
		<p class="px-1 w-full text-[1rem] leading-[1.4058rem] overflow-scroll h-full">
			{#if results instanceof Error}
				<pre class="text-red-700">{results.stack}</pre>
			{:else if $lineByLine}
				{#each results.sort((a, b) => a.lineNumber - b.lineNumber) as result}
					<p
						class="absolute"
						style="
							top: {document
							.querySelector('.cm-content')
							?.children[result.lineNumber - 1]?.getBoundingClientRect()?.y ??
							12 * result.lineNumber}px;
							"
					>
						{#each flattenColoredElement(result.content) as line}
							<span style="color: {line.color};">{@html line.content}</span>
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
