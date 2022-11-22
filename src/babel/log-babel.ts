// Changes all instances of console.log to use the debug(line, param, ...params) function
// Based off of https://babeljs.io/docs/en/babel-plugin-transform-remove-console/#usage

import type { TraverseOptions, Node } from '@babel/traverse';

export default function ({ types: t }): { visitor: TraverseOptions<Node> } {
	return {
		visitor: {
			MemberExpression(path) {
				if (!path.node.object) return;
				if (!path.node.property) return;

				if (path.node.object['name'] != 'console') return;

				if (path.node.property['name'] != 'log') return;

				path.parentPath.node['arguments'] = [
					t.identifier(path.node.loc.start.line.toString()),
					...path.parentPath.node['arguments']
				];
				path.replaceWith(t.identifier('debug'));
			}
		}
	};
}
