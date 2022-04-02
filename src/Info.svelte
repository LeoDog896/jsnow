<script lang="ts">
	import * as Prism from "prismjs"
	import GithubIcon from '@indaco/svelte-iconoir/icons/GitHubIcon.svelte';
	
	function highlight(text: string): string {
		if (!text) return ""

		try {
			return Prism.highlight(text, Prism.languages["javascript"])
		} catch {
			return ""
		}
	}
</script>

<h1 class="text-3xl">Welcome to JSNow!<a href="https://github.com/LeoDog896/jsnow"><GithubIcon class="pl-4 inline"/></a></h1>

<p>Any unused expressions or variable assignments will be printed to the side.</p>

<code>{@html highlight("5 + 5 // outputs 10 to the side")}</code>
<br/>
<code>{@html highlight("const x = 15 / 5 // outputs 3 to the side")}</code>

<h2 class="text-xl">Planned Features</h2>
<ul>
	<li>- Tabs</li>
	<li>- Fancy Output (range, toggle buttons)</li>
	<li>- Interactive input (sliders, radio)</li>
	<li>- Github Gist intergration</li>
</ul>