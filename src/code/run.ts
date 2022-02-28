import { transform, registerPlugins } from "@babel/standalone"
import logPlugin from "../babel/log-babel"
import strayExpression from "../babel/stray-expression-babel"
import { ColoredElement, stringify } from "../elementParser"

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

export function transformCode(code: string): string {
	return transform(code, { 
		filename: "index.ts",
		presets: ["env", "typescript"],
		parserOpts: {
			allowAwaitOutsideFunction: true
		},
		plugins: ["log-transform", "stray-expression-babel"]
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
		})).sort((a, b) => a.lineNumber - b.lineNumber)

		return results;
	} catch(e) {
		return e
	}
}