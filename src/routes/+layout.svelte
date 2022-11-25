<script lang="ts">
	import '../main.postcss';
	import Modal from 'svelte-simple-modal';
	import { fade } from 'svelte/transition';
	import '../../node_modules/prismjs/themes/prism.css';
</script>

<Modal
	transitionBg={(element) => fade(element, { duration: 150 })}
	transitionWindow={(element) => fade(element, { duration: 150 })}
>
	<slot></slot>
</Modal>
