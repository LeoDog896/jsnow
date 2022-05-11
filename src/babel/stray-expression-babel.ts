import { lineByLine } from "../settings/settings";
import { get } from "svelte/store"
import type { TraverseOptions, Node } from "@babel/traverse";

export default function({ types: t }): { visitor: TraverseOptions<Node> } {

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

		if (path.parentPath.node.type != "ExpressionStatement") return;
		if (path.node.callee?.identifier == "debug") return;

		if (get(lineByLine)) {
			if (path.parentPath.parentPath?.node?.type == "WhileStatement") return;
			if (path.parentPath.parentPath?.node?.type == "ForStatement") return;
		}
		if (path.node.loc?.start == null) return

		path.replaceWith(
			t.callExpression(t.identifier("debug"), [t.numericLiteral(path.node.loc.start.line), replace])
		);
	}

	return { visitor: {
		BinaryExpression(path) {
			expression(path)
			visit(path)
		},
		UnaryExpression(path) {
			expression(path)
			visit(path)
		},
		CallExpression(path) {
			if (path.node.callee["object"] && path.node.callee["object"].name == "console") return
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
			if (!path.node.loc?.start?.line) return
			path.parentPath.replaceWith(
				t.callExpression(t.identifier("debug"), [
					t.numericLiteral(path.node.loc.start.line),
					t.stringLiteral(path.node.value)
				])
			);
		},
		AssignmentExpression(path) {
			if (path.node.loc?.start == null) return
			path.insertAfter(
				t.callExpression(t.identifier("debug"), [
					t.numericLiteral(path.node.loc.start.line),
					t.identifier(path.node.left["name"])
				])
			)
		},
		Identifier(path) {
			expression(path)
			visit(path)
		},
		ArrayExpression(path) {
			expression(path)
			visit(path)
		},
		MemberExpression(path) {
			expression(path)
			visit(path)
		},
		ObjectExpression(path) {
			expression(path)
			visit(path)
		},
		TaggedTemplateExpression(path) {
			if (path.parentPath.node.type != "ExpressionStatement") return
			if (path.node.loc?.start == null) return

			path.parentPath.insertAfter(
				t.callExpression(t.identifier("debug"), [
					t.numericLiteral(path.node.loc.start.line),
					t.identifier(path.toString())
				])
			)
		
			path.remove()
		},
		UpdateExpression(path) {
			expression(path)
			visit(path)
		},
		Literal(path) {
			if (path.type == "TemplateLiteral") return
			expression(path)
			visit(path)
		}
	
  }}
}