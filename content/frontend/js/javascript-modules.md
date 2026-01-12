---
title: "JavaScript模块化：从CommonJS到ES6 Modules"
description: 深入探讨JavaScript模块化的发展历程，从早期的模块化解决方案到CommonJS，再到ES6 Modules，详细讲解它们的使用方法、特点和最佳实践。
date: 2026-01-10
image: /frontend/js.png
minRead: 12
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

模块化是现代 JavaScript 开发的核心概念之一。它允许我们将代码分割成独立的、可复用的模块，每个模块只关注特定的功能，从而提高代码的可维护性、可测试性和可扩展性。本文将带你深入了解 JavaScript 模块化的发展历程，从早期的模块化解决方案到 CommonJS，再到 ES6 Modules，详细讲解它们的使用方法、特点和最佳实践。

## 一、模块化的必要性

在 JavaScript 的早期，并没有官方的模块化机制。开发者通常将所有代码写在一个文件中，或者将代码分割成多个文件，通过`<script>`标签引入。这种方式存在很多问题：

1. **全局命名冲突**：所有变量和函数都共享同一个全局作用域，容易导致命名冲突。
2. **依赖管理混乱**：需要手动管理脚本的加载顺序，确保依赖的脚本先加载。
3. **代码复用困难**：无法方便地复用代码，需要通过复制粘贴的方式。
4. **代码维护困难**：随着代码量的增加，代码结构变得越来越混乱，难以维护。

为了解决这些问题，开发者们开始探索各种模块化解决方案。

## 二、早期的模块化解决方案

在官方模块化标准出现之前，开发者们使用了各种非官方的模块化解决方案，主要包括：

### 1. 立即执行函数表达式（IIFE）

IIFE 是一种常见的模块化模式，它通过创建一个独立的作用域来避免全局命名冲突。

```js
// IIFE模块化示例
const myModule = (function () {
  // 私有变量
  const privateVar = "私有变量";

  // 私有函数
  function privateFunc() {
    console.log("这是一个私有函数");
  }

  // 暴露公共API
  return {
    publicVar: "公共变量",
    publicFunc: function () {
      console.log("这是一个公共函数");
      console.log("访问私有变量:", privateVar);
      privateFunc();
    },
  };
})();

// 使用模块
console.log(myModule.publicVar); // 公共变量
myModule.publicFunc(); // 这是一个公共函数
```

### 2. AMD（Asynchronous Module Definition）

AMD 是一种异步模块化规范，主要用于浏览器端。它允许模块在加载完成后异步执行，避免阻塞页面渲染。RequireJS 是 AMD 规范的主要实现。

```javascript
// AMD模块定义
define(["dependency1", "dependency2"], function (dep1, dep2) {
  // 模块代码
  return {
    method1: function () {
      return dep1.someMethod() + dep2.anotherMethod();
    },
    method2: function () {
      return "Hello AMD";
    },
  };
});

// AMD模块使用
require(["myModule"], function (myModule) {
  console.log(myModule.method2()); // Hello AMD
});
```

### 3. CMD（Common Module Definition）

CMD 是一种通用模块化规范，它结合了 AMD 和 CommonJS 的特点。SeaJS 是 CMD 规范的主要实现。

```javascript
// CMD模块定义
define(function (require, exports, module) {
  // 按需加载依赖
  const dep1 = require("dependency1");

  // 模块代码
  exports.method1 = function () {
    return dep1.someMethod();
  };

  module.exports = {
    method1: method1,
    method2: function () {
      return "Hello CMD";
    },
  };
});
```

## 三、CommonJS：服务器端模块化标准

CommonJS 是 Node.js 采用的模块化规范，它主要用于服务器端。CommonJS 的出现解决了服务器端 JavaScript 的模块化问题，推动了 Node.js 的发展。

### 1. CommonJS 的基本语法

CommonJS 使用`require()`函数加载模块，使用`module.exports`或`exports`导出模块。

```javascript
// 模块定义：math.js
const PI = Math.PI;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// 导出模块
module.exports = {
  PI,
  add,
  subtract,
};

// 或者使用exports
// exports.PI = PI;
// exports.add = add;
// exports.subtract = subtract;

// 模块使用
const math = require("./math");
console.log(math.PI); // 3.141592653589793
console.log(math.add(2, 3)); // 5
console.log(math.subtract(5, 2)); // 3
```

### 2. CommonJS 的特点

- **同步加载**：CommonJS 模块是同步加载的，这在服务器端是合理的，因为文件都存储在本地，加载速度快。
- **动态加载**：CommonJS 模块可以在运行时动态加载，支持条件加载。
- **值拷贝**：CommonJS 模块导出的是值的拷贝，一旦导出，模块内部的变化不会影响到外部。
- **单例模式**：每个模块只加载一次，多次加载会返回同一个实例。

### 3. CommonJS 的局限性

- **浏览器兼容性**：CommonJS 是为服务器端设计的，同步加载机制不适合浏览器端，因为浏览器需要从网络加载模块，同步加载会阻塞页面渲染。
- **无法静态分析**：CommonJS 的动态加载机制使得工具无法在编译时进行静态分析，影响代码优化和 Tree Shaking。

## 四、ES6 Modules：官方模块化标准

ES6 Modules 是 ECMAScript 2015（ES6）引入的官方模块化标准，它统一了浏览器端和服务器端的模块化规范。

### 1. ES6 Modules 的基本语法

ES6 Modules 使用`import`语句导入模块，使用`export`语句导出模块。

```javascript
// 模块定义：math.js
const PI = Math.PI;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export const multiply = (a, b) => a * b;

export const divide = (a, b) => a / b;

// 默认导出
export default {
  PI,
  add,
  subtract,
};

// 模块使用
import math, { add, multiply } from "./math.js";

console.log(math.PI); // 3.141592653589793
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
```

### 2. ES6 Modules 的特点

- **静态加载**：ES6 Modules 是静态加载的，导入和导出语句只能放在模块的顶层，不能放在函数、条件语句等代码块中。
- **引用传递**：ES6 Modules 导出的是值的引用，模块内部的变化会影响到外部。
- **支持 Tree Shaking**：由于 ES6 Modules 是静态加载的，工具可以在编译时进行静态分析，移除未使用的代码（Tree Shaking）。
- **异步加载**：ES6 Modules 在浏览器端是异步加载的，不会阻塞页面渲染。

### 3. ES6 Modules 的导入导出方式

ES6 Modules 提供了多种导入导出方式：

#### 命名导出（Named Exports）

```javascript
// 单独导出
export const name = "JavaScript";
export function hello() {
  return "Hello";
}

// 批量导出
const version = "ES6";
function world() {
  return "World";
}

export { version, world };

// 导入命名导出
import { name, hello, version, world } from "./module.js";
```

#### 默认导出（Default Exports）

```javascript
// 默认导出
const myModule = {
  name: 'JavaScript',
  version: 'ES6'
};

export default myModule;

// 或者直接导出
export default {
  name: 'JavaScript',
  version: 'ES6'
};

// 导入默认导出
import myModule from './module.js';
```

#### 混合导出

```javascript
// 混合导出
const name = "JavaScript";
export function hello() {
  return "Hello";
}
export default {
  name,
  version: "ES6",
};

// 导入混合导出
import myModule, { hello } from "./module.js";
```

#### 重命名导入导出

```javascript
// 重命名导出
export { name as moduleName, hello as sayHello };

// 重命名导入
import { moduleName, sayHello } from "./module.js";
import { moduleName as name, sayHello as hello } from "./module.js";
```

#### 导入所有内容

```javascript
// 导入所有内容
import * as myModule from "./module.js";
console.log(myModule.name);
console.log(myModule.hello());
```

## 五、CommonJS 与 ES6 Modules 的区别

| 特性         | CommonJS                   | ES6 Modules               |
| ------------ | -------------------------- | ------------------------- |
| 加载方式     | 同步                       | 静态（编译时）            |
| 导出方式     | `module.exports`/`exports` | `export`/`export default` |
| 导入方式     | `require()`                | `import`                  |
| 值传递       | 值拷贝                     | 引用传递                  |
| 动态加载     | 支持                       | 不支持                    |
| Tree Shaking | 不支持                     | 支持                      |
| 主要应用     | 服务器端（Node.js）        | 浏览器端和服务器端        |

## 六、ES6 Modules 在浏览器中的使用

在浏览器中使用 ES6 Modules，需要在`<script>`标签中添加`type="module"`属性。

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>ES6 Modules</title>
  </head>
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>

<!-- main.js -->
import { add, subtract } from './math.js'; console.log(add(2, 3)); // 5
console.log(subtract(5, 2)); // 3

<!-- math.js -->
export function add(a, b) { return a + b; } export function subtract(a, b) {
return a - b; }
```

## 七、ES6 Modules 在 Node.js 中的使用

Node.js 从 v12 开始支持 ES6 Modules，需要将文件扩展名改为`.mjs`，或者在`package.json`中设置`"type": "module"`。

### 1. 使用`.mjs`扩展名

```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

// main.mjs
import { add } from "./math.mjs";
console.log(add(2, 3)); // 5
```

### 2. 在`package.json`中设置`"type": "module"`

```json
// package.json
{
  "name": "my-project",
  "type": "module",
  "version": "1.0.0"
}
```

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(2, 3)); // 5
```

## 八、模块化最佳实践

1. **优先使用 ES6 Modules**：ES6 Modules 是官方标准，支持浏览器端和服务器端，提供了更好的性能和开发体验。

2. **保持模块的单一职责**：每个模块只关注一个特定的功能，避免模块过大。

3. **使用清晰的命名**：为模块和导出的函数、变量使用清晰、有意义的命名，提高代码的可读性。

4. **避免循环依赖**：尽量避免模块之间的循环依赖，这会导致代码结构复杂，难以维护。

5. **合理使用默认导出和命名导出**：默认导出适合导出一个主要功能，命名导出适合导出多个相关功能。

6. **使用 Tree Shaking**：利用 ES6 Modules 的静态特性，通过 Tree Shaking 移除未使用的代码，减小 bundle 体积。

## 九、总结

JavaScript 模块化经历了从早期的 IIFE、AMD、CMD 到 CommonJS，再到 ES6 Modules 的发展历程。每一次进步都使模块化机制更加完善，代码的可维护性、可测试性和可扩展性不断提高。

- **早期解决方案**：IIFE、AMD、CMD 等，解决了基本的模块化需求。
- **CommonJS**：Node.js 采用的模块化规范，主要用于服务器端，推动了 Node.js 的发展。
- **ES6 Modules**：官方模块化标准，统一了浏览器端和服务器端的模块化规范，提供了更好的性能和开发体验。

在实际开发中，我们应该优先使用 ES6 Modules，遵循模块化的最佳实践，写出高质量的模块化代码。

希望本文对你理解 JavaScript 模块化有所帮助！如果有任何问题或建议，欢迎留言讨论。
