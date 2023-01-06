# @dwidge/function-simplify

Takes a JavaScript function and generates a sequence of steps that lead to the most basic version of the function. If reversed, this can be useful for showing how to write the function step by step.

## Overview

This function takes a JavaScript function and optional stepSize and maxSteps parameters, and returns a generator that yields progressively simpler function strings.

Each subsequent string in the array is a simplified version of the previous one. The first element in the array is the original function as a string, and the last element is an empty string. Only valid function strings that can be passed to `Function()` are returned.

## Installation

```
npm i @dwidge/function-simplify
```

## Options

```js
function* simplify(code, { minStep = 1, maxSteps = 1000 } = {})
```

| Name     | Type                | Required | Default | Description                                                       |
| -------- | ------------------- | -------- | ------- | ----------------------------------------------------------------- |
| code     | string              | Yes      | N/A     | The code to generate the sequence from.                           |
| options  | object              | No       | {}      | Optional parameters.                                              |
| minStep  | number              | No       | 1       | The minimum difference in characters between steps.               |
| maxSteps | number              | No       | 1000    | The maximum number of internal iterations.                        |
| returns  | `Iterable.<string>` | N/A      | N/A     | A generator object that produces the sequence of valid functions. |

## Usage

```js
const simplify = require("@dwidge/function-simplify");

function foo() {
  console.log("Hello, world!");
}

[...simplify(foo)].reverse().map((s) => console.log(s.length, s));
```

```
0

18 function foo() {}

36 function foo() {
  console.log();
}

51 function foo() {
  console.log('Hello, world!');
}
```

## Testing

`npm test`

## Credits

acorn  
acorn-walk  
astring  
type-of  
ChatGPT

## License

This package is licensed under the Boost Software License. See the LICENSE file for more information.
