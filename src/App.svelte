<script lang="ts">
	import Modal from 'svelte-simple-modal';
	import Content from "./Content.svelte"
	import { fade } from 'svelte/transition';
</script>
<svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css" rel="stylesheet" />
</svelte:head>
<Modal 
	transitionBg={element => fade(element, { duration: 150 })}
	transitionWindow={element => fade(element, { duration: 150 })}
>
	<Content/>
</Modal>
