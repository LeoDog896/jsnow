<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte"

	let value: string
</script>
<textarea bind:value={value}></textarea>
<p>{eval(value)}</p>
<Tailwindcss />