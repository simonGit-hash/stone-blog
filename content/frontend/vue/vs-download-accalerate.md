---
title: Visual Studio下载扩展工具加速办法
description: 国内使用Microsoft Visual Studio下载扩展工具特别慢，亲测有效的方法，可以提高下载速度
date: 2025-03-05
image: /frontend/vue.png
minRead: 6
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

## 一、改用 iPV4 下载。

### 1.打开网络和共享中心，点击更改适配器设置。![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/21733442468dd0c02a79464235a4ba3c.png#pic_center)

### 2.右键本地连接，选择打开属性，若 IPV6 前面有钩则取消钩，点击确定保存设置。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ee9307ded82139620a8d25d8bbf8fc7d.png#pic_center)

## 二、修改 dns

### 1. 浏览器中打开 http://tool.chinaz.com/dns/?type=1&host=download.visualstudio.microsoft.com&ip=

选择 TTL 值最小的一个域名地址，复制前面的 119.36.60.147
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4cebb73b0c5332f9ae79429bc2d14d41.png#pic_center)

### 2.修改电脑中 C:\Windows\System32\drivers\etc 目录下的 hosts 文件。用记事本打开 hosts，在最后一行加上

119.36.60.147 download.visualstudio.microsoft.com。保存即可
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9409b1ac01119694ab54dc5973cdfcc8.png#pic_center)

## 三、ping download.visualstudio.microsoft.com 。

Win+R 唤出命令窗口，输出 cmd
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8943fa39a5441bb157a0cf80492bd035.png#pic_center)
输入 ipconfig /flushdns 刷新 dns
输入 ping download.visualstudio.microsoft.com -n 1000 ， ping 这个网址 1000 次。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/0dae0016298c7e7e1480c071c44e3a69.png#pic_center)

# 对于上面三种方法，我是全部都使用了，当时下载的是 QT tool。亲测有效。设置好上面几种方法后，重启 VS，重新下载扩展。可能中途进度条会卡住不动，如果长时间没动，可以取消再重新下载。虽然这些方法能加快下载，但是速度也不是很乐观，还是要花不少时间的。但是只要进度条在前进了。
