export default function({ types: t }) {

	function expression(path) {
		if (path.parentPath.node.type == "CallExpression") return;
		if (path.parentPath.node.type == "BinaryExpression") return;
		if (path.parentPath.node.type == "UnaryExpression") return;

		path.replaceWith(
			t.callExpression(t.identifier("debug"), [t.identifier(path.node.loc.start.line.toString()), path.node])
		);
	}

	return {
    	visitor: {
			BinaryExpression(path) {
				expression(path)
			},
			UnaryExpression(path) {
				expression(path)
			}
		}
	}
}