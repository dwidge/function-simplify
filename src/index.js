const acorn = require("acorn");
const walk = require("acorn-walk");
const astring = require("astring");
const typeOf = require("type-of");
const { count } = require("@dwidge/diff-step");

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

function isValidFunction(fstring) {
  try {
    new Function(fstring);
  } catch (e) {
    return false;
  }
  return true;
}

function* sequence(code, { minStep = 1, maxSteps = 1000 } = {}) {
  let ast = parse(code);
  let prev = "";
  let i = 0;
  while (i < maxSteps) {
    const next = generate(ast);
    if (next === prev) break;
    if (isValidFunction(next) && count(prev, next) >= minStep) {
      yield next;
      prev = next;
    }
    ast = simplify(ast);
    i++;
  }
}

module.exports = sequence;
