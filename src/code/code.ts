import { writable, derived } from "svelte/store"
import { run } from "./run"
import { lineByLine } from "../settings/settings"
import { isBeingDragged } from "../dragbar"
import { transformCode } from "./run"

export const code = writable("")

export const babelledCode = derived(code, newCode => {

	if (!newCode) return ""
	try {
		return transformCode(newCode)
	} catch (e) {
		return e
	}
})

export const runCode = derived([babelledCode, lineByLine, isBeingDragged], async ([newCode]) => {
	if (!newCode) return []

	if (newCode instanceof Error) return newCode

	return await run(newCode)
})