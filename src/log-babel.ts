// Changes all instances of console.log to use the debug(line, param, ...params) function
// Based off of https://babeljs.io/docs/en/babel-plugin-transform-remove-console/#usage

export default function({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.get("callee");

        if (!callee.isMemberExpression()) return;

        if (isIncludedConsole(callee, state.opts.exclude)) {
          // console.log()
          if (path.parentPath.isExpressionStatement()) {
            path.remove();
          } else {
            path.replaceWith(createVoid0());
          }
        }
      },
      MemberExpression: {
        exit(path, state) {
          if (
            isIncludedConsole(path, state.opts.exclude) &&
            !path.parentPath.isMemberExpression()
          ) {
            if (
              path.parentPath.isAssignmentExpression() &&
              path.parentKey === "left"
            ) {
              path.parentPath.get("right").replaceWith(createNoop());
            } else {
              path.replaceWith(createNoop());
            }
          }
        }
      }
    }
  };

  function isGlobalConsoleId(id) {
    const name = "console";
    return (
      id.isIdentifier({ name }) &&
      !id.scope.getBinding(name) &&
      id.scope.hasGlobal(name)
    );
  }

  function isExcluded(property, excludeArray) {
    return (
      excludeArray && excludeArray.some(name => property.isIdentifier({ name }))
    );
  }

  function isIncludedConsole(memberExpr, excludeArray) {
    const object = memberExpr.get("object");
    const property = memberExpr.get("property");

    if (isExcluded(property, excludeArray)) return false;

    if (isGlobalConsoleId(object)) return true;

    return (
      isGlobalConsoleId(object.get("object")) &&
      (property.isIdentifier({ name: "call" }) ||
        property.isIdentifier({ name: "apply" }))
    );
  }

  function createNoop() {
    return t.functionExpression(null, [], t.blockStatement([]));
  }

  function createVoid0() {
    return t.unaryExpression("void", t.numericLiteral(0));
  }
};