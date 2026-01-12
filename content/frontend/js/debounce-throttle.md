---
title: "JavaScript性能优化：防抖与节流详解"
description: 深入探讨JavaScript中的两种重要性能优化技术：防抖（Debounce）和节流（Throttle），详细讲解它们的实现原理、使用场景和最佳实践。
date: 2026-01-10
image: /frontend/js.png
minRead: 10
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

在现代 Web 开发中，性能优化是一个永恒的话题。特别是在处理用户交互、网络请求等高频操作时，不合理的代码设计可能导致页面卡顿、响应缓慢，严重影响用户体验。防抖（Debounce）和节流（Throttle）是 JavaScript 中两种常用的性能优化技术，它们可以有效地减少函数的执行次数，提高页面性能。本文将深入探讨这两种技术的实现原理、使用场景和最佳实践。

## 一、为什么需要防抖和节流

在 Web 开发中，我们经常会遇到一些高频触发的事件，比如：

1. **窗口调整**：`resize`事件
2. **页面滚动**：`scroll`事件
3. **输入框输入**：`input`、`keyup`、`keydown`事件
4. **鼠标移动**：`mousemove`事件
5. **频繁点击**：`click`事件

这些事件如果不加以处理，会导致函数被频繁调用，从而引发性能问题。例如，在输入框输入时，如果每次输入都发送一个网络请求来搜索建议，会导致大量的网络请求，不仅浪费带宽，还会增加服务器压力。

防抖和节流技术可以有效地解决这个问题，它们通过限制函数的执行次数来提高性能。

## 二、防抖（Debounce）

### 1. 防抖的概念

防抖的核心思想是：**如果一个函数被频繁调用，防抖技术可以保证在指定时间内只执行最后一次调用**。也就是说，当函数被调用后，需要等待一段时间才能再次执行，如果在这段时间内又被调用，则重新开始计时。

### 2. 防抖的实现原理

防抖的实现原理主要是通过定时器来延迟函数的执行。当函数被调用时，先清除之前的定时器，然后设置一个新的定时器，在指定时间后执行函数。如果在定时器执行之前函数又被调用，则重复这个过程。

```javascript
// 基础防抖函数实现
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### 3. 防抖的使用示例

```javascript
// 示例：输入框搜索
const searchInput = document.getElementById("search-input");

function search(query) {
  console.log("搜索:", query);
  // 发送网络请求搜索建议
}

// 使用防抖函数包装搜索函数
const debouncedSearch = debounce(search, 500);

// 绑定事件监听器
searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

在这个示例中，当用户在输入框中输入时，`debouncedSearch`函数会被调用。如果用户在 500 毫秒内连续输入，`search`函数不会立即执行，而是会等待用户停止输入 500 毫秒后才执行。

### 4. 防抖的高级实现

上面的基础实现已经可以满足大多数需求，但我们还可以添加一些高级功能，比如：

- **立即执行选项**：让函数在第一次调用时立即执行，然后再开始防抖
- **取消功能**：允许取消正在等待执行的函数

```javascript
// 高级防抖函数实现
function debounce(func, wait, immediate = false) {
  let timeout;

  const debounced = function (...args) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };

  // 添加取消功能
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
```

### 5. 防抖的使用场景

防抖适用于以下场景：

- **搜索框输入**：等待用户停止输入后再发送搜索请求
- **窗口调整**：等待用户调整完窗口大小后再执行布局调整
- **表单验证**：等待用户输入完成后再进行表单验证
- **按钮点击**：防止用户频繁点击按钮导致重复提交

## 三、节流（Throttle）

### 1. 节流的概念

节流的核心思想是：**如果一个函数被频繁调用，节流技术可以保证在指定时间内只执行一次**。也就是说，无论函数被调用多少次，在指定时间内只会执行一次。

### 2. 节流的实现原理

节流的实现原理主要有两种：

1. **时间戳法**：记录上次执行的时间戳，每次调用时检查当前时间与上次执行时间的差是否大于等于指定时间，如果是则执行函数
2. **定时器法**：使用定时器来延迟函数的执行，当函数执行后，设置一个定时器，在指定时间后才能再次执行

#### 时间戳法实现

```javascript
// 时间戳法节流函数实现
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

#### 定时器法实现

```javascript
// 定时器法节流函数实现
function throttle(func, limit) {
  let timeout;
  return function (...args) {
    const context = this;
    if (!timeout) {
      func.apply(context, args);
      timeout = setTimeout(() => (timeout = null), limit);
    }
  };
}
```

### 3. 节流的高级实现

上面的两种实现各有优缺点：

- **时间戳法**：函数会在时间间隔的开始执行
- **定时器法**：函数会在时间间隔的结束执行

我们可以结合这两种方法，实现一个更完善的节流函数：

```javascript
// 高级节流函数实现
function throttle(func, limit) {
  let inThrottle;
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}
```

### 4. 节流的使用示例

```javascript
// 示例：页面滚动
function handleScroll() {
  console.log("滚动位置:", window.scrollY);
  // 执行滚动相关操作
}

// 使用节流函数包装滚动处理函数
const throttledScroll = throttle(handleScroll, 100);

// 绑定事件监听器
window.addEventListener("scroll", throttledScroll);
```

在这个示例中，当用户滚动页面时，`handleScroll`函数会被频繁调用。使用节流函数包装后，无论用户滚动多快，`handleScroll`函数在 100 毫秒内只会执行一次。

### 5. 节流的使用场景

节流适用于以下场景：

- **页面滚动**：限制滚动事件的执行频率
- **窗口调整**：限制窗口调整事件的执行频率
- **鼠标移动**：限制鼠标移动事件的执行频率
- **动画效果**：限制动画函数的执行频率，保证动画流畅

## 四、防抖与节流的区别

虽然防抖和节流都是用于减少函数执行次数的技术，但它们的应用场景和效果有所不同：

| 特性         | 防抖                                    | 节流                           |
| ------------ | --------------------------------------- | ------------------------------ |
| 核心思想     | 等待一段时间后执行最后一次调用          | 固定时间内只执行一次           |
| 执行时机     | 事件停止触发后等待一段时间执行          | 事件触发过程中定期执行         |
| 适用场景     | 搜索框输入、表单验证、按钮点击等        | 页面滚动、窗口调整、鼠标移动等 |
| 函数执行次数 | 可能为 0 次（如果在等待时间内一直触发） | 至少 1 次（如果事件持续触发）  |

## 五、实际应用案例

### 1. 搜索框防抖

```javascript
// HTML
<input type="text" id="search-input" placeholder="搜索...">
<div id="search-results"></div>

// JavaScript
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// 模拟搜索API
async function searchAPI(query) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 模拟搜索结果
  const results = [
    `${query} - 结果1`,
    `${query} - 结果2`,
    `${query} - 结果3`
  ];

  return results;
}

// 搜索函数
async function search(query) {
  if (!query.trim()) {
    searchResults.innerHTML = '';
    return;
  }

  searchResults.innerHTML = '<div class="loading">搜索中...</div>';

  try {
    const results = await searchAPI(query);
    searchResults.innerHTML = results.map(result => `<div class="result">${result}</div>`).join('');
  } catch (error) {
    searchResults.innerHTML = '<div class="error">搜索失败</div>';
  }
}

// 使用防抖函数包装搜索函数
const debouncedSearch = debounce(search, 500);

// 绑定事件监听器
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 2. 页面滚动节流

```javascript
// HTML
<div id="infinite-scroll" style="height: 10000px;"></div>
<div id="loading-indicator" style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);">加载中...</div>

// JavaScript
const loadingIndicator = document.getElementById('loading-indicator');

// 初始状态：隐藏加载指示器
loadingIndicator.style.display = 'none';

// 模拟加载更多数据
async function loadMoreData() {
  loadingIndicator.style.display = 'block';

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 模拟加载数据
  console.log('加载了更多数据');

  loadingIndicator.style.display = 'none';
}

// 滚动处理函数
function handleScroll() {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 当滚动到页面底部附近时加载更多数据
  if (scrollTop + windowHeight >= documentHeight - 200) {
    loadMoreData();
  }
}

// 使用节流函数包装滚动处理函数
const throttledScroll = throttle(handleScroll, 200);

// 绑定事件监听器
window.addEventListener('scroll', throttledScroll);
```

## 六、使用第三方库

虽然我们可以自己实现防抖和节流函数，但在实际开发中，我们也可以使用一些成熟的第三方库，比如：

### 1. Lodash

Lodash 是一个功能丰富的 JavaScript 实用工具库，它提供了`_.debounce`和`_.throttle`函数。

```javascript
// 安装Lodash
// npm install lodash

// 使用Lodash的防抖函数
const _ = require("lodash");

const debouncedFunction = _.debounce(() => {
  console.log("防抖函数执行");
}, 500);

// 使用Lodash的节流函数
const throttledFunction = _.throttle(() => {
  console.log("节流函数执行");
}, 500);
```

### 2. Underscore

Underscore 是另一个流行的 JavaScript 实用工具库，它也提供了`_.debounce`和`_.throttle`函数。

```javascript
// 安装Underscore
// npm install underscore

// 使用Underscore的防抖函数
const _ = require("underscore");

const debouncedFunction = _.debounce(() => {
  console.log("防抖函数执行");
}, 500);
```

## 七、最佳实践

1. **选择合适的技术**：根据具体场景选择防抖或节流技术。如果需要等待用户停止操作后执行，使用防抖；如果需要定期执行，使用节流。

2. **合理设置时间间隔**：时间间隔的设置要根据具体需求和用户体验来决定。一般来说，搜索框输入的防抖时间间隔可以设置为 300-500 毫秒，页面滚动的节流时间间隔可以设置为 100-200 毫秒。

3. **保留 this 上下文**：在实现防抖和节流函数时，要注意保留原函数的 this 上下文，使用`apply`或`call`方法来调用原函数。

4. **处理参数**：确保防抖和节流函数能够正确传递参数给原函数。

5. **添加取消功能**：为防抖和节流函数添加取消功能，以便在需要时可以取消正在等待执行的函数。

6. **考虑浏览器兼容性**：如果需要支持旧浏览器，要注意使用兼容性更好的实现方式。

## 八、总结

防抖和节流是 JavaScript 中两种重要的性能优化技术，它们可以有效地减少函数的执行次数，提高页面性能。

- **防抖**：等待一段时间后执行最后一次调用，适用于搜索框输入、表单验证等场景。
- **节流**：固定时间内只执行一次，适用于页面滚动、窗口调整等场景。

在实际开发中，我们可以自己实现防抖和节流函数，也可以使用 Lodash 等第三方库。无论使用哪种方式，都要根据具体场景选择合适的技术，并合理设置时间间隔，以达到最佳的性能优化效果。

希望本文对你理解 JavaScript 中的防抖和节流技术有所帮助！如果有任何问题或建议，欢迎留言讨论。
