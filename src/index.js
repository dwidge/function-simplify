const acorn = require("acorn");
const walk = require("acorn-walk");
const astring = require("astring");
const typeOf = require("type-of");
const sleep = require("await-sleep");

function parse(fn) {
  return acorn.parse(fn.toString(), { ecmaVersion: 2020 });
}

function generate(ast) {
  return astring.generate(ast);
}

function simplify(ast) {
  let deepest = [];

  function keepIfDeeper(node, ancestors) {
    if (ancestors.length >= deepest.length) deepest = [...ancestors];
  }
  walk.ancestor(ast, {
    ArrowFunctionExpression: keepIfDeeper,
    BinaryExpression: keepIfDeeper,
    BlockStatement: keepIfDeeper,
    ObjectExpression: keepIfDeeper,
    MemberExpression: keepIfDeeper,
  });

  deepest.reverse().find((n) => {
    const props = Object.keys(n).filter(
      (k) => !["type", "start", "end"].includes(k)
    );
    const removed = props.find((k) => {
      const p = n[k];
      const t = typeOf(p);

      const types = {
        string: () => {
          if (p !== "") {
            n[k] = "";
            return true;
          }
        },
        array: () => {
          if (p.length > 0) {
            n[k].pop();
            return true;
          }
        },
      };

      //console.log(t, k, p);
      if (types[t]) return types[t]();
    });
    return removed;
  });

  return ast;
}

async function sequence(code, max = 1000) {
  const steps = [];
  let ast = parse(code);
  let before = "",
    after = generate(ast);
  while (after !== before && max-- > 0) {
    steps.push(after);
    before = after;
    await sleep(0);
    ast = simplify(ast);
    after = generate(ast);
  }
  return steps;
}

module.exports = {
  parse,
  simplify,
  generate,
  sequence,
};
