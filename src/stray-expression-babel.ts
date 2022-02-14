export default function({ types: t }) {

    function visit(path) {
          if (path.parentPath.node.type !== "VariableDeclarator") return
          if (path.parentPath.parentPath.parentPath.node.type !== "Program") return
          const variableName = path.parentPath.node.id.name

          path.parentPath.parentPath.insertAfter(
              t.callExpression(t.identifier("debug"), [t.identifier(path.node.loc.start.line.toString()), t.identifier(variableName)])
          );
    }
  
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
		if (path.parentPath.node.type == "AssignmentExpression") return
		if (path.parentPath.node.type == "ConditionalExpression") return
		if (path.node.loc?.start == null) return

		path.replaceWith(
			t.callExpression(t.identifier("debug"), [t.numericLiteral(path.node.loc.start.line), replace])
		);
	}

	return {
    	visitor: {
			BinaryExpression(path) {
				expression(path)
              	visit(path)
			},
			UnaryExpression(path) {
				expression(path)
              	visit(path)
			},
			CallExpression(path) {
				if (path.node.callee.object && path.node.callee.object.name == "console") return
				expression(path)
              	visit(path)
			},
          	AwaitExpression(path) {
             	expression(path) 
              	visit(path)
            },
          	NewExpression(path) {
            	expression(path) 
              	visit(path)
            },
			DirectiveLiteral(path) {
				if (!path.node?.value) return
				if (!path.node.loc?.start) return
				path.parentPath.replaceWith(
					t.callExpression(t.identifier("debug"), [
						t.numericLiteral(path.node.loc.start.line),
						t.stringLiteral(path.node.value)
					])
				);
			},
          	AssignmentExpression(path) {
            	path.insertAfter(
                	t.callExpression(t.identifier("debug"), [
                      	t.numericLiteral(path.node.loc.start.line),
                    	t.identifier(path.node.left.name)
                    ])
                )
            },
			Literal(path) {
				expression(path)
              	visit(path)
			}
		}
	}
}