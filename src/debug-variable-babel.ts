export default function({ types: t }) {

	return {
    	visitor: {
			VariableDeclarator(path) {
				const variableName = path.node.id.name
                
                path.parentPath.insertAfter(
                  t.callExpression(t.identifier("debug"), [t.identifier(path.node.loc.start.line.toString()), t.identifier(variableName)])
              );
			}
		}
	}
}