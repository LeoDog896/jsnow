<script lang="ts">
	import { lineByLine } from './settings';
	import * as Prism from 'prismjs';
	import { babelledCode } from '../code/code';

	function highlight(text: string): string {
		if (!text) return '';

		try {
			return Prism.highlight($babelledCode, Prism.languages['javascript'], 'js');
		} catch {
			return '';
		}
	}

	$: highlightedCode = highlight($babelledCode);
</script>

<div class="flex flex-row w-full">
	<div id="settings" class="w-1/2">
		<h1 class="text-2xl">Settings</h1>
		<span>Display line by line input </span><input
			bind:checked={$lineByLine}
			type="checkbox"
			name="lineByLine"
		/>
	</div>
	{#if highlightedCode}
		<div id="code" class="w-1/2">
			<h1 class="text-2xl">Transformed Code</h1>
			<pre><code class="language-js">{@html highlightedCode}</code></pre>
		</div>
	{/if}
</div>
