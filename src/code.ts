import { writable, derived } from "svelte/store"
import { run } from "./run"
import { lineByLine } from "./settings"
import { isBeingDragged } from "./dragbar"

export const code = writable("")

export const runCode = derived([code, lineByLine, isBeingDragged], async ([newCode]) => {
	if (!newCode) return []

	return await run(newCode)
})