import { transform, registerPlugins } from "@babel/standalone"
import logPlugin from "./log-babel"
import strayExpression from "./stray-expression-babel"
import { ColoredElement, stringify } from "./elementParser"

// A reflection trick to get the constructor of an async function.
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

interface Result {
	lineNumber: number,
	content?: ColoredElement
}

registerPlugins({
	"stray-expression-babel": strayExpression,
	"log-transform": logPlugin
})

export const code = writable

export async function run(string: string): Promise<Result[] | Error | null> {

	if (string == "") return null
	try {

		let unparsedResults: Result[] = []
		const babelled = transform(string, { 
			filename: "index.ts",
			presets: ["env", "typescript"],
			parserOpts: {
				allowReturnOutsideFunction: true,
				allowAwaitOutsideFunction: true
			},
			plugins: ["log-transform", "stray-expression-babel"]
		}).code

		const asyncFunction = AsyncFunction("debug", babelled)
		
		await asyncFunction((lineNumber: number, content?: any) => {
			unparsedResults = [...unparsedResults, { lineNumber, content }]
		})

		if (unparsedResults.length == 0) return []

		const results: Result[] = unparsedResults.map(result => ({
			lineNumber: result.lineNumber,
			content: stringify(result.content)
		})).sort((a, b) => a.lineNumber - b.lineNumber)

		return results;
	} catch(e) {
		return e
	}
}