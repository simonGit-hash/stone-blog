---
title: "HTML响应式设计基础：创建适配多设备的网站"
description: 全面介绍HTML响应式设计的基础知识，包括视口设置、流体布局、响应式图片、媒体查询和移动优先设计等核心概念与实践技巧。
date: 2026-01-10
image: /frontend/html.png
minRead: 12
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

随着移动设备的普及，越来越多的用户通过智能手机、平板电脑等不同尺寸的设备访问网站。响应式网页设计（Responsive Web Design，简称 RWD）已经成为现代网站开发的标配，它能够使网站根据不同设备的屏幕尺寸和特性自动调整布局和内容，提供一致且良好的用户体验。本文将全面介绍 HTML 响应式设计的基础知识，包括视口设置、流体布局、响应式图片、媒体查询和移动优先设计等核心概念与实践技巧。

## 一、响应式设计概述

### 1. 什么是响应式设计

响应式网页设计是一种网页设计方法，它能够使网页在不同设备上（从桌面电脑到移动电话）都能提供良好的浏览体验。响应式设计的核心是"一次设计，处处适用"，通过灵活的布局和智能的内容调整，使网站能够自适应不同的屏幕尺寸、分辨率和输入方式。

### 2. 响应式设计的优势

- **改善用户体验**：无论使用什么设备，用户都能获得一致且良好的浏览体验
- **提高可访问性**：确保所有用户都能轻松访问网站内容
- **降低维护成本**：只需要维护一个版本的网站，而不是多个版本（桌面版、移动版等）
- **提升 SEO 表现**：Google 等搜索引擎优先收录响应式网站
- **适应未来设备**：能够轻松适配未来可能出现的新设备和屏幕尺寸

### 3. 响应式设计的核心原则

响应式设计基于三个核心原则：

1. **流体布局**：使用百分比、em、rem 等相对单位代替固定像素值
2. **响应式图片**：根据设备屏幕尺寸加载合适大小的图片
3. **媒体查询**：根据设备特性应用不同的 CSS 样式

## 二、视口设置

### 1. 什么是视口

视口（Viewport）是指浏览器中用于显示网页内容的区域。对于桌面设备，视口通常等于浏览器窗口的大小；而对于移动设备，视口通常大于屏幕尺寸，浏览器会自动缩放网页以适应屏幕。

### 2. 视口元标签

为了实现响应式设计，我们需要使用视口元标签（Viewport Meta Tag）来控制浏览器如何渲染网页。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>响应式设计示例</title>
  </head>
  <body>
    <!-- 网页内容 -->
  </body>
</html>
```

视口元标签的关键参数：

- **width=device-width**：将视口宽度设置为设备的屏幕宽度
- **initial-scale=1.0**：将初始缩放比例设置为 1.0，即不进行缩放
- **minimum-scale=1.0**：设置最小缩放比例
- **maximum-scale=1.0**：设置最大缩放比例
- **user-scalable=no**：禁止用户手动缩放（不推荐，会影响可访问性）

### 3. 视口设置的最佳实践

- 始终在 HTML 文档的`<head>`部分添加视口元标签
- 不要禁止用户缩放网页，这会影响可访问性
- 使用`width=device-width`确保视口宽度与设备屏幕宽度一致
- 使用`initial-scale=1.0`确保初始缩放比例正确

## 三、流体布局

### 1. 什么是流体布局

流体布局（Fluid Layout）是指使用相对单位（如百分比、em、rem 等）代替固定像素值来定义网页元素的尺寸和位置，使网页能够根据容器宽度自动调整布局。

### 2. 使用百分比宽度

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>流体布局示例</title>
    <style>
      .container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
      }

      .header {
        width: 100%;
        background-color: #333;
        color: white;
        padding: 20px;
        box-sizing: border-box;
      }

      .main-content {
        width: 70%;
        float: left;
        background-color: #f0f0f0;
        padding: 20px;
        box-sizing: border-box;
      }

      .sidebar {
        width: 30%;
        float: left;
        background-color: #e0e0e0;
        padding: 20px;
        box-sizing: border-box;
      }

      .footer {
        width: 100%;
        background-color: #333;
        color: white;
        padding: 20px;
        box-sizing: border-box;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>网站标题</h1>
      </div>

      <div class="main-content">
        <h2>主要内容</h2>
        <p>这是网站的主要内容区域，占据了容器宽度的70%。</p>
      </div>

      <div class="sidebar">
        <h2>侧边栏</h2>
        <p>这是网站的侧边栏区域，占据了容器宽度的30%。</p>
      </div>

      <div class="footer">
        <p>网站底部信息</p>
      </div>
    </div>
  </body>
</html>
```

### 3. 使用相对单位

除了百分比，还可以使用其他相对单位：

- **em**：相对于父元素的字体大小
- **rem**：相对于根元素（`<html>`）的字体大小
- **vh/vw**：相对于视口高度和宽度的百分比
- **vmin/vmax**：相对于视口最小/最大维度的百分比

```css
/* 使用em单位 */
.container {
  font-size: 16px;
}

.heading {
  font-size: 2em; /* 32px */
}

/* 使用rem单位 */
html {
  font-size: 16px;
}

.heading {
  font-size: 2rem; /* 32px */
}

/* 使用vh/vw单位 */
.full-height {
  height: 100vh;
}

.full-width {
  width: 100vw;
}

/* 使用vmin/vmax单位 */
.square {
  width: 50vmin;
  height: 50vmin;
}
```

### 4. 盒模型与 box-sizing

在使用百分比宽度时，需要注意盒模型的影响。默认情况下，元素的宽度不包括内边距（padding）和边框（border），这可能导致元素超出预期宽度。使用`box-sizing: border-box`可以解决这个问题。

```css
* {
  box-sizing: border-box;
}

.container {
  width: 90%;
  padding: 20px;
  /* 此时容器的总宽度仍然是90%，内边距包含在宽度内 */
}
```

## 四、响应式图片

### 1. 为什么需要响应式图片

在响应式设计中，图片是一个重要的考虑因素。如果直接使用固定大小的图片，在小屏幕设备上可能会导致图片过大或失真，影响用户体验和页面加载速度。

### 2. 使用 max-width 属性

最简单的响应式图片实现方式是使用`max-width: 100%`，确保图片不会超出其容器的宽度。

```css
img {
  max-width: 100%;
  height: auto;
}
```

### 3. 使用 srcset 和 sizes 属性

HTML5 提供了`srcset`和`sizes`属性，可以根据设备屏幕尺寸和像素密度加载合适大小的图片。

```html
<!-- 根据屏幕宽度加载不同大小的图片 -->
<img
  src="image-small.jpg"
  srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px, 
            (max-width: 1200px) 800px, 
            1200px"
  alt="响应式图片示例"
/>
```

- **srcset**：指定不同尺寸的图片和对应的宽度（w 单位表示图片的实际像素宽度）
- **sizes**：指定不同屏幕尺寸下图片的显示宽度，浏览器会根据这个信息选择合适的图片

### 4. 使用 picture 元素

对于更复杂的场景，可以使用`<picture>`元素提供多个图片源，浏览器会根据条件选择最合适的图片。

```html
<!-- 根据屏幕宽度和格式加载不同的图片 -->
<picture>
  <!-- 小屏幕设备 -->
  <source
    media="(max-width: 600px)"
    srcset="small-image.webp"
    type="image/webp"
  />
  <source media="(max-width: 600px)" srcset="small-image.jpg" />

  <!-- 中等屏幕设备 -->
  <source
    media="(max-width: 1200px)"
    srcset="medium-image.webp"
    type="image/webp"
  />
  <source media="(max-width: 1200px)" srcset="medium-image.jpg" />

  <!-- 默认图片 -->
  <img src="large-image.jpg" alt="响应式图片示例" />
</picture>
```

`<picture>`元素可以用于：

- 根据屏幕尺寸加载不同裁剪比例的图片
- 根据浏览器支持情况加载不同格式的图片（如 WebP、AVIF 等）
- 根据设备像素密度加载不同分辨率的图片

### 5. 使用 CSS background-image

对于作为背景的图片，可以使用 CSS 的`background-image`结合媒体查询实现响应式。

```css
.hero {
  height: 400px;
  background-size: cover;
  background-position: center;
  background-image: url("small-image.jpg");
}

/* 中等屏幕 */
@media (min-width: 768px) {
  .hero {
    background-image: url("medium-image.jpg");
  }
}

/* 大屏幕 */
@media (min-width: 1200px) {
  .hero {
    background-image: url("large-image.jpg");
  }
}
```

## 五、CSS 媒体查询

### 1. 什么是媒体查询

媒体查询（Media Queries）是 CSS3 的一个特性，它允许我们根据设备的特性（如屏幕宽度、高度、分辨率、方向等）应用不同的 CSS 样式。

### 2. 媒体查询的基本语法

```css
/* 基本语法 */
@media media-type and (media-feature) {
  /* 在此处编写CSS样式 */
}
```

- **media-type**：媒体类型，如 screen（屏幕）、print（打印）、speech（屏幕阅读器）等
- **media-feature**：媒体特性，如 width（宽度）、height（高度）、orientation（方向）等

### 3. 常用媒体特性

| 媒体特性            | 描述                           | 示例                               |
| ------------------- | ------------------------------ | ---------------------------------- |
| width               | 视口宽度                       | @media (max-width: 768px)          |
| height              | 视口高度                       | @media (min-height: 600px)         |
| device-width        | 设备屏幕宽度                   | @media (max-device-width: 768px)   |
| device-height       | 设备屏幕高度                   | @media (min-device-height: 600px)  |
| orientation         | 设备方向（portrait/landscape） | @media (orientation: landscape)    |
| aspect-ratio        | 视口宽高比                     | @media (aspect-ratio: 16/9)        |
| device-aspect-ratio | 设备屏幕宽高比                 | @media (device-aspect-ratio: 16/9) |
| resolution          | 设备分辨率                     | @media (min-resolution: 2dppx)     |
| color               | 设备颜色位数                   | @media (min-color: 16)             |
| hover               | 设备是否支持悬停               | @media (hover: hover)              |

### 4. 媒体查询的使用方式

#### （1）内部样式表

```html
<style>
  /* 默认样式 */
  body {
    font-size: 16px;
  }

  /* 小屏幕设备 */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* 大屏幕设备 */
  @media (min-width: 1200px) {
    body {
      font-size: 18px;
    }
  }
</style>
```

#### （2）外部样式表

```html
<!-- 加载默认样式 -->
<link rel="stylesheet" href="styles.css" />

<!-- 根据条件加载不同的样式表 -->
<link rel="stylesheet" media="(max-width: 768px)" href="styles-mobile.css" />
<link rel="stylesheet" media="(min-width: 1200px)" href="styles-desktop.css" />
```

#### （3）多种媒体特性组合

```css
/* 横屏且宽度大于768px的设备 */
@media (orientation: landscape) and (min-width: 768px) {
  /* CSS样式 */
}

/* 宽度在768px到1200px之间的设备 */
@media (min-width: 768px) and (max-width: 1200px) {
  /* CSS样式 */
}

/* 支持悬停的设备 */
@media (hover: hover) {
  button:hover {
    background-color: #0056b3;
  }
}
```

### 5. 媒体查询断点

媒体查询断点（Breakpoints）是指触发 CSS 样式变化的屏幕尺寸。选择合适的断点是响应式设计的关键。

常见的断点设置：

- **移动设备**：max-width: 767px
- **平板设备**：min-width: 768px and max-width: 1023px
- **桌面设备**：min-width: 1024px

但需要注意的是，断点不应该基于特定的设备型号，而应该基于内容的自然断点。

## 六、移动优先设计

### 1. 什么是移动优先设计

移动优先设计（Mobile-First Design）是一种响应式设计方法，它首先为移动设备设计网站，然后逐步为更大的屏幕添加功能和样式。

### 2. 移动优先设计的优势

- **提高性能**：首先针对移动设备进行优化，确保在资源有限的设备上也能良好运行
- **简化决策**：从简单的移动布局开始，逐步添加复杂功能，避免过度设计
- **更好的可访问性**：移动设备的交互方式（触摸）更注重内容的可访问性
- **符合渐进增强原则**：从基础功能开始，逐步增强用户体验

### 3. 移动优先设计的实现

移动优先设计通过媒体查询的`min-width`来实现：

```css
/* 默认样式（移动设备） */
.container {
  width: 100%;
  padding: 10px;
}

.main-content {
  width: 100%;
}

.sidebar {
  width: 100%;
}

/* 平板设备（768px以上） */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* 桌面设备（1024px以上） */
@media (min-width: 1024px) {
  .container {
    width: 1024px;
    margin: 0 auto;
  }

  .main-content {
    width: 70%;
    float: left;
  }

  .sidebar {
    width: 30%;
    float: left;
  }
}
```

### 4. 渐进增强与优雅降级

- **渐进增强（Progressive Enhancement）**：从基础功能开始，逐步为支持更多特性的设备添加增强功能
- **优雅降级（Graceful Degradation）**：从完整功能开始，逐步为不支持某些特性的设备提供替代方案

移动优先设计是渐进增强的一种具体实现方式。

## 七、响应式布局模式

### 1. 单列布局

单列布局是最简单的响应式布局，适用于移动设备。所有内容垂直排列，宽度为 100%。

```html
<div class="container">
  <header>Header</header>
  <main>Main Content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>
```

### 2. 双列布局

双列布局适用于平板设备，主要内容和侧边栏并排显示。

```css
@media (min-width: 768px) {
  main {
    width: 70%;
    float: left;
  }

  aside {
    width: 30%;
    float: left;
  }
}
```

### 3. 三列布局

三列布局适用于大屏幕设备，通常包含左侧边栏、主要内容和右侧边栏。

```css
@media (min-width: 1200px) {
  .left-sidebar {
    width: 20%;
    float: left;
  }

  main {
    width: 60%;
    float: left;
  }

  .right-sidebar {
    width: 20%;
    float: left;
  }
}
```

### 4. 弹性盒模型（Flexbox）

Flexbox 是 CSS3 的一个布局模块，非常适合实现响应式布局。

```html
<div class="container">
  <header>Header</header>
  <div class="flex-container">
    <main>Main Content</main>
    <aside>Sidebar</aside>
  </div>
  <footer>Footer</footer>
</div>
```

```css
.flex-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
  }

  main {
    flex: 3;
  }

  aside {
    flex: 1;
  }
}
```

### 5. 网格布局（Grid）

CSS Grid 是一个强大的二维布局系统，能够轻松实现复杂的响应式布局。

```html
<div class="grid-container">
  <header>Header</header>
  <main>Main Content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

header {
  grid-area: header;
}
main {
  grid-area: main;
}
aside {
  grid-area: sidebar;
}
footer {
  grid-area: footer;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: 3fr 1fr;
    grid-template-areas:
      "header header"
      "main sidebar"
      "footer footer";
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas:
      "header header header"
      "sidebar-left main sidebar-right"
      "footer footer footer";
  }
}
```

## 八、响应式排版

### 1. 使用相对单位

在响应式设计中，排版也需要考虑响应式。使用相对单位（如 em、rem、vw 等）可以确保字体大小在不同设备上都能良好显示。

```css
html {
  font-size: 16px;
}

body {
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

/* 小屏幕设备 */
@media (max-width: 768px) {
  html {
    font-size: 14px;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}
```

### 2. 使用视口单位

视口单位（vh、vw、vmin、vmax）可以使字体大小根据视口尺寸自动调整。

```css
/* 标题字体大小随视口宽度变化 */
h1 {
  font-size: 5vw;
}

/* 内容字体大小随视口高度变化 */
p {
  font-size: 2vh;
}

/* 使用clamp()函数设置字体大小范围 */
h2 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  /* 最小1.5rem，默认3vw，最大2.5rem */
}
```

### 3. 行高和字间距

在响应式设计中，不仅要调整字体大小，还需要调整行高和字间距，确保在不同设备上都有良好的可读性。

```css
body {
  line-height: 1.6;
  letter-spacing: 0.5px;
}

/* 小屏幕设备 */
@media (max-width: 768px) {
  body {
    line-height: 1.5;
    letter-spacing: 0.2px;
  }
}
```

## 九、响应式导航

### 1. 汉堡菜单

汉堡菜单是移动设备上常用的导航模式，通过点击汉堡图标展开或收起导航菜单。

```html
<nav class="responsive-nav">
  <div class="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </div>

  <ul class="nav-menu">
    <li><a href="#">首页</a></li>
    <li><a href="#">关于我们</a></li>
    <li><a href="#">产品</a></li>
    <li><a href="#">联系我们</a></li>
  </ul>
</nav>
```

```css
/* 默认隐藏导航菜单（移动设备） */
.nav-menu {
  display: none;
  list-style: none;
  padding: 0;
}

/* 汉堡菜单样式 */
.nav-toggle {
  display: block;
  cursor: pointer;
  padding: 10px;
}

.nav-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px 0;
}

/* 大屏幕设备显示完整导航 */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
  }

  .nav-menu li {
    margin-right: 20px;
  }
}
```

```javascript
// 点击汉堡菜单切换导航显示/隐藏
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
});
```

### 2. 下拉菜单

下拉菜单适用于包含多个子菜单的导航，能够节省空间并保持导航的整洁。

```html
<nav class="dropdown-nav">
  <ul>
    <li><a href="#">首页</a></li>
    <li class="dropdown">
      <a href="#">产品</a>
      <ul class="dropdown-menu">
        <li><a href="#">产品1</a></li>
        <li><a href="#">产品2</a></li>
        <li><a href="#">产品3</a></li>
      </ul>
    </li>
    <li><a href="#">关于我们</a></li>
    <li><a href="#">联系我们</a></li>
  </ul>
</nav>
```

```css
/* 默认隐藏下拉菜单 */
.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* 显示下拉菜单 */
.dropdown:hover .dropdown-menu {
  display: block;
}

/* 移动设备调整 */
@media (max-width: 768px) {
  .dropdown-menu {
    position: static;
  }
}
```

## 十、响应式设计测试

### 1. 使用浏览器开发者工具

现代浏览器（如 Chrome、Firefox、Safari 等）都提供了开发者工具，可以模拟不同设备的屏幕尺寸。

- **Chrome**：右键点击页面 → 检查 → 点击左上角的设备图标
- **Firefox**：右键点击页面 → 检查元素 → 点击右上角的响应式设计模式图标

### 2. 使用在线测试工具

有许多在线工具可以帮助测试响应式设计：

- [Responsive Design Checker](https://www.responsivedesignchecker.com/)
- [Am I Responsive?](http://ami.responsivedesign.is/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### 3. 在实际设备上测试

虽然浏览器开发者工具和在线测试工具很方便，但最好还是在实际设备上测试，以获得最真实的用户体验。

## 十一、响应式设计最佳实践

### 1. 规划断点

- 基于内容的自然断点设置媒体查询，而不是基于特定设备型号
- 保持断点数量合理，避免过度设计

### 2. 优化性能

- 压缩 CSS 和 JavaScript 文件
- 使用响应式图片，避免加载过大的图片
- 延迟加载非关键资源
- 减少 HTTP 请求次数

### 3. 确保可访问性

- 使用语义化 HTML 标签
- 确保文本和背景有足够的对比度
- 为图片添加 alt 属性
- 确保所有交互元素都可以通过键盘访问

### 4. 考虑触摸目标

- 在移动设备上，触摸目标应该足够大（至少 48x48 像素）
- 为触摸目标之间保留足够的间距（至少 8 像素）

### 5. 保持内容可读性

- 使用合适的字体大小和行高
- 避免使用过小的字体
- 确保文本和背景有良好的对比度

### 6. 测试，测试，再测试

- 在不同设备和浏览器上测试
- 测试不同的网络条件
- 收集用户反馈并持续改进

## 十二、实际案例

### 1. 响应式博客布局

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>响应式博客</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }

      .container {
        width: 95%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      header {
        background-color: #333;
        color: white;
        padding: 20px;
      }

      nav ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
      }

      nav ul li {
        margin-right: 20px;
        margin-bottom: 10px;
      }

      nav ul li a {
        color: white;
        text-decoration: none;
      }

      .main-content {
        margin-top: 20px;
      }

      .blog-post {
        background-color: #f0f0f0;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 5px;
      }

      .sidebar {
        background-color: #e0e0e0;
        padding: 20px;
        border-radius: 5px;
      }

      footer {
        background-color: #333;
        color: white;
        padding: 20px;
        text-align: center;
        margin-top: 20px;
      }

      /* 平板设备 */
      @media (min-width: 768px) {
        .main-content {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 20px;
        }
      }

      /* 桌面设备 */
      @media (min-width: 1024px) {
        nav ul {
          justify-content: flex-end;
        }

        .blog-post {
          display: flex;
        }

        .blog-post img {
          width: 300px;
          margin-right: 20px;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <h1>响应式博客</h1>
        <nav>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">文章</a></li>
            <li><a href="#">分类</a></li>
            <li><a href="#">关于</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container main-content">
      <section class="posts">
        <article class="blog-post">
          <img
            src="blog-image.jpg"
            alt="博客文章图片"
            style="max-width: 100%; height: auto;"
          />
          <div>
            <h2>文章标题1</h2>
            <p>
              这是一篇关于响应式设计的博客文章。响应式设计能够使网站在不同设备上都能提供良好的用户体验...
            </p>
            <a href="#">阅读更多</a>
          </div>
        </article>

        <article class="blog-post">
          <img
            src="blog-image.jpg"
            alt="博客文章图片"
            style="max-width: 100%; height: auto;"
          />
          <div>
            <h2>文章标题2</h2>
            <p>
              这是另一篇关于响应式设计的博客文章。响应式设计基于三个核心原则：流体布局、响应式图片和媒体查询...
            </p>
            <a href="#">阅读更多</a>
          </div>
        </article>
      </section>

      <aside class="sidebar">
        <h3>热门文章</h3>
        <ul>
          <li><a href="#">文章1</a></li>
          <li><a href="#">文章2</a></li>
          <li><a href="#">文章3</a></li>
        </ul>

        <h3>分类</h3>
        <ul>
          <li><a href="#">响应式设计</a></li>
          <li><a href="#">HTML</a></li>
          <li><a href="#">CSS</a></li>
        </ul>
      </aside>
    </div>

    <footer>
      <div class="container">
        <p>&copy; 2026 响应式博客. All rights reserved.</p>
      </div>
    </footer>
  </body>
</html>
```

### 2. 响应式产品展示

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>响应式产品展示</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }

      .container {
        width: 95%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      header {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid #ddd;
      }

      .product-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-top: 20px;
      }

      .product-card {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
      }

      .product-card img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
      }

      .product-card h3 {
        margin-bottom: 10px;
      }

      .product-card p {
        margin-bottom: 15px;
        color: #666;
      }

      .product-card .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: #e74c3c;
        margin-bottom: 15px;
      }

      .product-card button {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
      }

      /* 平板设备 */
      @media (min-width: 768px) {
        .product-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      /* 桌面设备 */
      @media (min-width: 1024px) {
        .product-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .product-card:hover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
      }

      /* 大屏幕设备 */
      @media (min-width: 1400px) {
        .product-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="container">
        <h1>响应式产品展示</h1>
        <p>浏览我们的产品系列</p>
      </div>
    </header>

    <div class="container">
      <div class="product-grid">
        <div class="product-card">
          <img src="product1.jpg" alt="产品1" />
          <h3>产品1</h3>
          <p>这是产品1的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥99.00</div>
          <button>加入购物车</button>
        </div>

        <div class="product-card">
          <img src="product2.jpg" alt="产品2" />
          <h3>产品2</h3>
          <p>这是产品2的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥199.00</div>
          <button>加入购物车</button>
        </div>

        <div class="product-card">
          <img src="product3.jpg" alt="产品3" />
          <h3>产品3</h3>
          <p>这是产品3的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥299.00</div>
          <button>加入购物车</button>
        </div>

        <div class="product-card">
          <img src="product4.jpg" alt="产品4" />
          <h3>产品4</h3>
          <p>这是产品4的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥399.00</div>
          <button>加入购物车</button>
        </div>

        <div class="product-card">
          <img src="product5.jpg" alt="产品5" />
          <h3>产品5</h3>
          <p>这是产品5的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥499.00</div>
          <button>加入购物车</button>
        </div>

        <div class="product-card">
          <img src="product6.jpg" alt="产品6" />
          <h3>产品6</h3>
          <p>这是产品6的详细描述，介绍产品的特点和优势。</p>
          <div class="price">¥599.00</div>
          <button>加入购物车</button>
        </div>
      </div>
    </div>
  </body>
</html>
```

## 十三、总结

响应式网页设计已经成为现代网站开发的标配，它能够使网站在不同设备上都能提供一致且良好的用户体验。本文介绍了 HTML 响应式设计的基础知识，包括：

1. **视口设置**：使用视口元标签控制浏览器如何渲染网页
2. **流体布局**：使用相对单位代替固定像素值
3. **响应式图片**：根据设备屏幕尺寸加载合适大小的图片
4. **CSS 媒体查询**：根据设备特性应用不同的 CSS 样式
5. **移动优先设计**：从移动设备开始设计，逐步增强功能
6. **响应式布局模式**：单列、双列、三列、Flexbox、Grid 等
7. **响应式排版**：使用相对单位和视口单位确保文本可读性
8. **响应式导航**：汉堡菜单、下拉菜单等

在实际开发中，我们应该根据具体需求选择合适的响应式设计方案，并且不断测试和优化，确保网站在不同设备上都能提供良好的用户体验。

响应式设计是一个持续学习和实践的过程，随着新设备和新技术的出现，我们需要不断更新我们的知识和技能。希望本文对你理解 HTML 响应式设计的基础知识有所帮助！
