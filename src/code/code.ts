import { writable, derived, Readable } from "svelte/store"
import { run } from "./run"
import { lineByLine } from "../settings/settings"
import { isBeingDragged } from "../dragbar"
import { transformCode } from "./run"

export const code = writable(`// Welcome to JSNow!

5 + 5 // Unused expressions are outputted to the right

Array(5).fill(4).map(it => it * 2) // *any* unused expression

function reverse(param) {
	return param.split("").reverse().join("")
}

reverse("Hello World!")

// Try it out! Stay with the examples here or CTRL + A and delete.
`)

export const transformedCode: Readable<string | Error> = derived(code, newCode => {

	if (!newCode) return ""
	try {
		return transformCode(newCode)
	} catch (e) {

    if (!(e instanceof Error)) return ""

		return e
	}
})

export const runCode = derived([transformedCode, lineByLine, isBeingDragged], ([newCode]) => {
	if (!newCode) return []

	if (newCode instanceof Error) return newCode

	return run(newCode)
})