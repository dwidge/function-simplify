# function-simplify

Tools for simplifying JavaScript functions and generating a sequence of steps that lead to the most basic version of the function. If reversed, this can be useful for showing how to write the function step by step.

## functions

This package provides four functions for simplifying and manipulating JavaScript code:

| Function | Description                                                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| parse    | This function takes a JavaScript function as a string and returns an abstract syntax tree (AST) representation of that function.          |
| generate | This function takes an AST and returns a string representation of the corresponding JavaScript function.                                  |
| simplify | This function takes an AST and returns a simplified version of that AST.                                                                  |
| sequence | This function takes a JavaScript function and an optional max parameter, and returns a promise that resolves to an array of strings. [^1] |

[^1]: Where each subsequent string in the array is a simplified version of the previous one. The first element in the array is the original function as a string, and the last element is the fully simplified version. The length of the array is capped at max.

## Installation

To install this package, run the following command:

`npm install @dwidge/function-simplify`

## Usage

To use this package, require it in your project and call the desired function:

```js
const {
  parse,
  generate,
  simplify,
  sequence,
} = require("@dwidge/function-simplify");

const ast = parse("function foo() { console.log('Hello, world!') }");
const simplifiedAst = simplify(ast);
const fooString = generate(simplifiedAst);

sequence(fooString, 300).then((sequence) =>
  sequence.map((s) => console.log(s.length, s))
);
```

## Testing

To run the test suite for this package, use the following command:

`npm test`

## Credits

acorn  
acorn-walk  
astring  
just-typeof  
await-sleep  
ChatGPT

## License

This package is licensed under the Boost Software License. See the LICENSE file for more information.
