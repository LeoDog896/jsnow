import { ColoredElement, stringify } from "../elementParser"

const swc = await import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@swc/wasm-web@1.2.156/wasm.js")

await swc.default()

// A reflection trick to get the constructor of an async function.
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

interface Result {
	lineNumber: number,
	content?: ColoredElement
}

export function transformCode(code: string): string {
  return swc.transformSync(code, {
    strictMode: false
  }).code
}

export async function run(string: string): Promise<Result[] | Error> {

	if (string == "") return []
	try {

		let unparsedResults: Result[] = []

		const asyncFunction = AsyncFunction("debug", string)
		
		await asyncFunction((lineNumber: number, content?: any) => {
			unparsedResults = [...unparsedResults, { lineNumber, content }]
		})

		if (unparsedResults.length == 0) return []

		const results: Result[] = unparsedResults.map(result => ({
			lineNumber: result.lineNumber,
			content: stringify(result.content)
		}))

		return results;
	} catch(e) {

    console.error(e)

		return e
	}
}