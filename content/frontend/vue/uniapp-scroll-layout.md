---
description: Uniapp滑动布局
date: 2025-03-05
image: /frontend/vue.png
minRead: 6
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

**uniapp 开发应用时经常会出现滑动页面内容被遮盖，或者滑不动的情况，在不引用外部插件的情况下，如何正确的使用 scroll-view, 达到丝滑滑动的效果呢？话不多说，看实例代码**

**页面内容代码**

```vue
<template>
  <view class="page-container">
    <!-- 1. 顶部 Header -->
    <view class="header">
      <view class="nav-bar">这里是顶部导航栏</view>
    </view>

    <!-- 2. 中间 Scroll-View -->
    <!-- scroll-y 开启纵向滚动 -->
    <scroll-view class="scroll-content" scroll-y="true" :show-scrollbar="false">
      <view class="content-list">
        <view class="item" v-for="(item, index) in 50" :key="index">
          这是第 {{ index + 1 }} 条丝滑滚动的内容
        </view>
      </view>
    </scroll-view>

    <!-- 3. 底部 Footer -->
    <view class="footer">
      <button class="btn">提交操作</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
```

**样式代码**

```scss
<style lang="scss">
/* 关键样式 */
page {
  /* 确保根节点铺满屏幕，防止 iOS 下回弹 */
  height: 100%;
  overflow: hidden;
}

.page-container {
  /* 使用视口高度 100vh，确保撑满屏幕 */
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止整体页面出现滚动条 */
}

.header {
  /* 头部样式，高度可以是固定的也可以是自适应内容的 */
  background-color: #f8f8f8;
  padding: 20rpx;
  /* 防止头部被压缩 */
  flex-shrink: 0;
}

.scroll-content {
  /* 核心：占据剩余空间 */
  flex: 1;
  /* 关键：在某些 flex 环境下，需要设置 height: 0 或 overflow: hidden
     才能让 scroll-view 正确计算高度，而不是被内容撑开 */
  height: 0;
  background-color: #ffffff;
}

.footer {
  /* 底部样式 */
  background-color: #f8f8f8;
  padding: 20rpx;
  /* 防止底部被压缩 */
  flex-shrink: 0;
  /* 适配 iPhone X 等机型底部安全区 */
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

/* 演示用的列表样式 */
.item {
  padding: 30rpx;
  border-bottom: 1px solid #eee;
}
</style>
```

##实现细节解析

1. **`height：0` 的作用**

   在 Flex 布局中，如果直接给  `scroll-view`  设置  `flex: 1`，在某些小程序或 H5 浏览器内核中，`scroll-view`  可能会被内部大量的子元素撑开，导致整个页面变长，而不是在区域内滚动。设置  `height: 0` (或  `overflow: hidden`) 配合  `flex: 1 `强行约束了其高度，迫使它在 flex 分配的区域内处理溢出（即滚动）。

2. **`page`  样式设置**

   UniApp 中  page  节点默认高度可能不是 100%，需要显式设置  `page { height: 100%; overflow: hidden; }`，这样可以防止整个页面在 iOS 上产生橡皮筋回弹效果，只保留  `scroll-view ` 内部的滚动。

3. **底部安全区适配**

   在 Footer 中添加  `padding-bottom: env(safe-area-inset-bottom)`  是为了兼容全面屏手机（如 iPhone 12/13/14 等），防止底部横条遮挡按钮 。

4. **关于  `calc()`  方案**

如果你知道 Header 和 Footer 的精确高度（例如 Header 是 100rpx，Footer 是 120rpx），也可以不使用 Flex，直接设置  **`scroll-view`**  的高度：

```css
.scroll-content {
  height: calc(100vh - 100rpx - 120rpx);
}
```

但 Flex 方案更为推荐，因为它不需要你每次修改 Header 内容高度时都去调整 CSS 计算公式 。

5.**隐藏滚动条**

如果追求视觉上的“丝滑”且不想要进度条，可以在 `scroll-view`

标签上添加 `:show-scrollbar="false"`,（App/小程序），或者使用 CSS 隐藏（H5）：

```css
/* H5 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
```

6.**存在的问题**

这个 CSS 布局在移动端浏览器中出现底部被遮挡的问题，主要原因是**移动端浏览器对  `100vh`{.code-highlight}  的定义与实际可视高度不一致**

简单来说，浏览器通常将  `100vh`{.code-highlight}  计算为**包含了地址栏和底部工具栏**的总高度。当底部的工具栏（操作栏）显示时，实际可视区域（Viewport）变小，导致你布局中位于最底部的  `.footer-fixed`{.code-highlight}  被挤到了浏览器操作栏的背后。

以下是详细原因分析和 3 种解决方案：

**核心原因分析**

在移动端（尤其是 iOS Safari 和 Chrome 安卓版），浏览器为了防止在滚动时因为工具栏的显示/隐藏导致页面跳动，将  `100vh`{.code-highlight}  定义为**最大视口高度**（即工具栏收起时的高度）。

- **实际效果**：`.pageContainer`{.code-highlight} 的高度 = 屏幕总高度（包含被工具栏遮住的部分）。
- **结果**：Flex 布局将 footer 推到了容器的最底部，而那个位置正好被浏览器的底部操作栏挡住了。

**解决方案**

- **方案一：使用  `dvh`{.code-highlight}  单位（推荐，最简单）**

  现代浏览器支持  `dvh`{.code-highlight} (Dynamic Viewport Height) 单位，它会动态计算可视区域高度（自动减去浏览器底栏高度）。
  只需修改  `.pageContainer`{.code-highlight} 的高度：

  ```css
  .footer-fixed {
    padding: 30rpx 24rpx;
    background: #fff;
    box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.06);

    /* 新增：适配底部安全区 */
    padding-bottom: calc(
      30rpx + constant(safe-area-inset-bottom)
    ); /* 兼容 iOS < 11.2 */
    padding-bottom: calc(
      30rpx + env(safe-area-inset-bottom)
    ); /* 兼容 iOS >= 11.2 */
  }
  ```

- **方案二：适配 iPhone 底部安全区 (Safe Area)**

  即使用了  **`dvh`**，在 iPhone X 及以上机型，底部的“黑条”（Home Indicator）也可能遮挡按钮。需要给 footer 增加底部内边距适配安全区。
  修改  `.footer-fixed`{.code-highlight}

  ```css
  .footer-fixed {
    padding: 30rpx 24rpx;
    background: #fff;
    box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.06);

    /* 新增：适配底部安全区 */
    padding-bottom: calc(
      30rpx + constant(safe-area-inset-bottom)
    ); /* 兼容 iOS < 11.2 */
    padding-bottom: calc(
      30rpx + env(safe-area-inset-bottom)
    ); /* 兼容 iOS >= 11.2 */
  }
  ```

  _注：这里在原有的  **`30rpx`** padding 基础上叠加了安全区高度，防止按钮贴底太近不好点击。_

- **方案三：JavaScript 动态计算（兼容性最好）**

  如果需要兼容很老的机型（不支持  **`dvh`**），可以使用 JS 获取准确的  **`window.innerHeight`**  并设置给 CSS 变量。

  **css 修改：**

  ```css
  .pageContainer {
    /* 默认 fallback */
    height: 100vh;
    /* 使用自定义变量，如果 JS 未执行则回退到 100vh */
    height: var(--app-height, 100vh);
    display: flex;
    flex-direction: column;
  }
  ```

  **JS 代码（在页面加载时执行）：**

  ```js
  const setAppHeight = () => {
    const doc = document.documentElement;
    // 获取真实的视口高度
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", setAppHeight);
  setAppHeight();
  ```
