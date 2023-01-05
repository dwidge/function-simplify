const { parse, generate, simplify, sequence } = require("./index");

function foo() {
  console.log("Hello, world!");
  {
    console.log("Inner block");
  }
  console.log("Goodbye, world!");
}
const foo1 = function foo() {
  console.log("Hello, world!");
  {
    console.log();
  }
  console.log("Goodbye, world!");
};
const foo2 = function foo() {
  console.log("Hello, world!");
  {
  }
  console.log("Goodbye, world!");
};

test("simplify", () => {
  expect(generate(simplify(parse(foo)))).toBe(generate(parse(foo1)));
  expect(generate(simplify(parse(foo1)))).toBe(generate(parse(foo2)));
});

test("sequence", async () => {
  expect((await sequence(foo)).length).toBe(9);
});
