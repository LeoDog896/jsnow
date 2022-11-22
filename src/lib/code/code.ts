import { writable, derived } from 'svelte/store';
import { run } from './run';
import { lineByLine } from '../settings/settings';
import { isBeingDragged } from '../dragbar';
import { transformCode } from './run';

export const code = writable(`// Welcome to JSNow!

5 + 5 // expressions are outputted to the right

Array.from({ length: 5 }, (_, i) => i * 2) // including these expressions!

function reverse(str) {
	return str.split("").reverse().join("")
}

reverse("Hello World!")

// Try it out! Stay with the examples here or CTRL + A and delete.
`);

export const babelledCode = derived(code, (newCode) => {
	if (!newCode) return '';
	try {
		return transformCode(newCode);
	} catch (e) {
		return e;
	}
});

export const runCode = derived([babelledCode, lineByLine, isBeingDragged], async ([newCode]) => {
	if (!newCode) return [];

	if (newCode instanceof Error) return newCode;

	return await run(newCode);
});
