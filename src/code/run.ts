import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import logPlugin from "../babel/log-babel"
import strayExpression from "../babel/stray-expression-babel"
import { ColoredElement, stringify } from "../elementParser"

// A reflection trick to get the constructor of an async function.
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor

interface Result {
	lineNumber: number,
	content?: ColoredElement
}

export function transformCode(code: string): string {
	const ast = parse(code);
	traverse(ast, strayExpression());
	traverse(ast, logPlugin());
	return generate(ast).code;
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
		return e
	}
}