const simplify = require("./index");

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

test("sequence", async () => {
  expect([...simplify(foo)].length).toBe(9);
  expect([...simplify(foo)].slice(0, 3)).toEqual([
    [...simplify(foo)][0],
    [...simplify(foo1)][0],
    [...simplify(foo2)][0],
  ]);
});

test("minStep", async () => {
  expect([...simplify(foo, { minStep: 50 })].length).toBe(3);
});

test("maxSteps", async () => {
  expect([...simplify(foo, { maxSteps: 3 })].length).toBe(3);
});
