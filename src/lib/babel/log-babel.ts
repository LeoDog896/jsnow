// Changes all instances of console.log to use the debug(line, param, ...params) function
// Based off of https://babeljs.io/docs/en/babel-plugin-transform-remove-console/#usage

import type { TraverseOptions, Node } from '@babel/traverse';
import type * as t from '@babel/types';

export default function ({ types }: { types: typeof t }): { visitor: TraverseOptions<Node> } {
	return {
		visitor: {
			MemberExpression(path) {
				if (!path.node.object) return;
				if (!path.node.property) return;

				if (path.node.object.name != 'console') return;

				if (path.node.property.name != 'log') return;

				path.parentPath.node.arguments = [
					types.identifier(path.node.loc.start.line.toString()),
					...path.parentPath.node.arguments
				];
				path.replaceWith(types.identifier('debug'));
			}
		}
	};
}
