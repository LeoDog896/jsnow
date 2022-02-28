<script lang="ts">
	import Modal from 'svelte-simple-modal';
	import Content from "./Content.svelte"
	import { fade } from 'svelte/transition';
	import "../node_modules/prismjs/themes/prism.css"
</script>
<Modal 
	transitionBg={element => fade(element, { duration: 150 })}
	transitionWindow={element => fade(element, { duration: 150 })}
>
	<Content/>
</Modal>
