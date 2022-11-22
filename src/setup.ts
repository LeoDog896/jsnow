import {
	keymap,
	highlightSpecialChars,
	drawSelection,
	highlightActiveLine,
	dropCursor
} from '@codemirror/view';
import { Extension, EditorState } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/history';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { indentOnInput } from '@codemirror/language';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { defaultKeymap } from '@codemirror/commands';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { commentKeymap } from '@codemirror/comment';
import { rectangularSelection } from '@codemirror/rectangular-selection';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { lintKeymap } from '@codemirror/lint';
import { indentWithTab } from '@codemirror/commands';
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import type { CompletionContext } from '@codemirror/autocomplete';

const completePropertyAfter = ['PropertyName', '.', '?.'];
const dontCompleteIn = [
	'TemplateString',
	'LineComment',
	'BlockComment',
	'VariableDefinition',
	'PropertyDefinition'
];
function completeProperties(from: number, object: Object) {
	let options = [];
	for (let name in object) {
		options.push({
			label: name,
			type: typeof object[name] == 'function' ? 'function' : 'variable'
		});
	}
	return {
		from,
		options,
		span: /^[\w$]*$/
	};
}

function completeFromGlobalScope(context: CompletionContext) {
	let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

	if (
		completePropertyAfter.includes(nodeBefore.name) &&
		nodeBefore.parent?.name == 'MemberExpression'
	) {
		let object = nodeBefore.parent.getChild('Expression');
		if (object?.name == 'VariableName') {
			let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
			let variableName = context.state.sliceDoc(object.from, object.to);
			if (typeof window[variableName] == 'object')
				return completeProperties(from, window[variableName]);
		}
	} else if (nodeBefore.name == 'VariableName') {
		return completeProperties(nodeBefore.from, window);
	} else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
		return completeProperties(context.pos, window);
	}
	return null;
}

const javascriptCompletions = javascriptLanguage.data.of({
	autocomplete: completeFromGlobalScope
});

export const basicSetup: Extension = [
	lineNumbers(),
	highlightActiveLineGutter(),
	highlightSpecialChars(),
	history(),
	foldGutter(),
	drawSelection(),
	dropCursor(),
	EditorState.allowMultipleSelections.of(true),
	indentOnInput(),
	defaultHighlightStyle.fallback,
	bracketMatching(),
	closeBrackets(),
	autocompletion(),
	rectangularSelection(),
	highlightActiveLine(),
	highlightSelectionMatches(),
	keymap.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
		...commentKeymap,
		...completionKeymap,
		...lintKeymap
	]),
	javascript({ jsx: false, typescript: true }),
	javascriptCompletions,
	EditorView.lineWrapping,
	keymap.of([indentWithTab])
];
export { EditorView } from '@codemirror/view';
export { EditorState } from '@codemirror/state';
