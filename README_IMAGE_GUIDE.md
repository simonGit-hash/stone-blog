# 如何在项目中引用内部图片

在 Nuxt.js 项目中，你可以通过以下方式引用内部图片：

## 1. 静态资源目录

项目的静态资源存放在 `/public` 目录下。例如：
- `/public/blog/qt1.png`
- `/public/hero/random-1.avif`

## 2. 在 Markdown 文件中引用图片

### 2.1 Frontmatter 中的 image 字段

在 Markdown 文件的 frontmatter 中，你可以使用以下格式引用内部图片：

```yaml
image: /blog/qt1.png
```

这会引用 `/public/blog/qt1.png` 图片。

### 2.2 Markdown 内容中的图片

在 Markdown 内容中，你可以使用标准的 Markdown 图片语法：

```markdown
![图片描述](/blog/qt1.png)
```

## 3. 示例

假设你有一张图片 `my-image.png`，放在 `/public/images/` 目录下：

```
/public/
  └── images/
      └── my-image.png
```

你可以这样引用它：

```yaml
image: /images/my-image.png
```

或者在 Markdown 内容中：

```markdown
![我的图片](/images/my-image.png)
```

## 4. 注意事项

- 所有内部图片必须放在 `/public` 目录下
- 引用路径必须以 `/` 开头
- 不需要包含 `/public` 前缀在引用路径中

## 5. @nuxt/image 模块

项目中已经配置了 `@nuxt/image` 模块，它会自动处理图片的优化和响应式显示。

在 Vue 组件中，你可以使用 `<NuxtImg>` 组件：

```vue
<NuxtImg src="/blog/qt1.png" alt="图片描述" />
```

但在 Markdown 文件中，你只需要使用标准的 Markdown 图片语法或 frontmatter 的 image 字段即可。