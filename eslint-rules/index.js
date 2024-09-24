export const customRules = {
  rules: {
    "retry-dynamic-imports": {
      meta: {
        fixable: "code",
      },
      create(context) {
        const sourceCode = context.getSourceCode();
        return {
          "ImportExpression:not([parent.parent.callee.name='retry'])"(node) {
            context.report({
              node,
              message:
                "Import expressions should be wrapped in a retry function",
              fix(fixer) {
                let text = sourceCode.getText(node);
                return fixer.replaceText(node, `retry(() => ${text})`);
              },
            });
          },
        };
      },
    },
  },
};
