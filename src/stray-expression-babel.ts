export default function({ types: t }) {

	function expression(path, replace?) {

		if (replace == null) replace = path.node

		if (path.parentPath.node.type == "CallExpression") return;
		if (path.parentPath.node.type == "BinaryExpression") return;
		if (path.parentPath.node.type == "UnaryExpression") return;
		if (path.parentPath.node.type == "MemberExpression") return;
		if (path.parentPath.node.type == "ArrowFunctionExpression") return;
		if (path.parentPath.node.type == "ReturnStatement") return;
		if (path.parentPath.node.type == "CallExpression") return
		if (path.parentPath.node.type == "AwaitExpression") return
      	if (path.parentPath.node.type == "VariableDeclarator") return
		if (path.parentPath.node.type == "ConditionalExpression") return
		if (path.node.loc == null) return

		path.replaceWith(
			t.callExpression(t.identifier("debug"), [t.identifier(path.node.loc.start.line.toString()), replace])
		);
	}

	return {
    	visitor: {
			BinaryExpression(path) {
				expression(path)
			},
			UnaryExpression(path) {
				expression(path)
			},
			CallExpression(path) {
				if (path.node.callee.object == null) return
				if (path.node.callee.object.name == "console") return
				expression(path)
			},
          	AwaitExpression(path) {
             	expression(path) 
            },
          	NewExpression(path) {
            	expression(path) 
            },
			Literal(path) {
				expression(path)
			},
			Directive(path) {
				if (path.node.value == null) return
				expression(path, t.stringLiteral(path.node.value.value))
			}
		}
	}
}