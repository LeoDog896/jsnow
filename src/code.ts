import { writable, derived } from "svelte/store"
import { run } from "./run"

export const code = writable("")

export const runCode = derived(code, async newCode => {
	if (!newCode) return []

	return await run(newCode)
})