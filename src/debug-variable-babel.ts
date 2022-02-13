export default function({ types: t }) {

	function visit(path) {
		if (path.parentPath.node.type !== "VariableDeclarator") return
		if (path.parentPath.parentPath.parentPath.node.type !== "Program") return
		const variableName = path.parentPath.node.id.name

		path.parentPath.parentPath.insertAfter(
			t.callExpression(t.identifier("debug"), [t.identifier(path.node.loc.start.line.toString()), t.identifier(variableName)])
		);
  }

	return {
		visitor: {
			BinaryExpression(path) {
				visit(path)
			},
			CallExpression(path) {
				visit(path)
			}
		}
	}
}