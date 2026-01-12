---
title: VScode远程开发
description: 搭建服务器，配置SSH登录，配置VScode远程开发项目.
date: 2025-03-05
image: /frontend/vue.png
minRead: 6
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---

# 关于服务器初学的全套流程

<font color=#999AAA >本篇内容适合服务器小白。学了前端界面之后，是不是感觉界面的编写已经不能满足自己的动手欲望了呢？是不是想自己搭建服务器创建自己的网站呢？ 好， 那么恭喜你看到了这篇博文。这是博主花了半周时间实践出来的经验，以及遇到的各种坑。网上的资料各有版本，如果是一般的错误，百度一下花不了多久，但是有些错误真的找不到出处，可能是各个环节多个疏忽造成的，那花费的时间太长了。希望我下面的博文能帮助各位小白快速学会服务器的基本操作，同时也是为我自己做个总结。

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">
接下来的文章主要分三大部分：

- 购买及配置服务器
- Putty 远程连接服务器
- VSCode 远程开发

<font color=#999AAA >

@[TOC](文章目录)

</font>

<hr style=" border:solid; width:100px; height:1px;" color=#000000 size=1">

# 一、购买及配置服务器

## 1、购买服务器（以腾讯云为例）

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1c43bf909906847a736c939b643c16e5.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/15560fc985afcb509d6f23e2d20586d8.png)

购买注意：地域选择离自己近的服务器；根据自己需要选择配置（建议新手选配置最低的那个）；机型选择可以是 Windows、Ubuntu、CentOS(本文以 CentOS 为例)。

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8221e608c6a3adf9569a103aed8205b7.png)
购买之后进入操作台，可以看到你购买的服务器

## 服务器配置

### 1、安全组

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c3582c3a9ae2162b020c40b6cd165d44.png)
刚购买的服务器默认安全组配置都是端口全开的，这样是不安全的，根据自己需求开通对应的端口，具体方法可按此链接操作
[添加链接描述](https://oneinstack.com/docs/securitygroup/#12)

### 2、创建、绑定 SSH 密匙

    			(1) 点击操作台界面的**SSH密匙**

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e1a4311313cc8384d3438c36d0fe5ca4.png)
(2)点击创建密匙,点击确定后会下载密匙到本地电脑
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bc171e0c73fa78cdcf76f6523aeaa7a7.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1c8d4e9b1ca169c4cbed6ea4adabb163.png)
(3) 服务器实例绑定密匙：进入控制台，点击实例，选择需要绑定密匙的服务器，如下图操作：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c6429da88114e9eaef525bac7a916e73.png)
选择需要绑定的密匙，点击下一步就可
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/79d7a687132337237c1e53eb8d2dc150.png)

## 2、SSH 连接服务器

### 2.3 Putty SSH 连接服务器

##### 密码登陆

(1) 准备软件 Putty，获取方式：[点此获取](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
(2) 双击 Putty.exe，打开 Putty 客户端
(3) 在 PuTTY Configuration 窗口中，输入以下内容。如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1120e2a3e03e6863337ab789d931a42a.png)
参数举例说明如下：

- Host Name ( or IP address): 云服务器的公网 IP
- Port ：云服务器的端口，必须设置为 22
- Connect type： 选择“SSH”
- Saved Sessions：填写回话名称，例如 test
  配置 “Host Name” 后，再配置 “Saved Sessions” 并保存，则后续使用时您可直接双击 “Saved Sessions” 下保存的会话名称即可登录服务器。
  (4) 单击【Open】，进入 “PuTTY” 的运行界面，提示 “login as:”
  (5) 在 “login as” 后输入用户名，按 Enter
  (6) 在 “Password” 后输入密码，按 Enter。输入的密码默认不显示。
  登陆完成后，命令提示符左侧将显示当前登陆云服务器的信息
  ![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/3f45e7bf1dec05b441f82721732eec80.png)

##### 密匙登陆（安全系数高，建议）

(1) 准备软件：putty.exe 和 puttygen.exe 软件，获取方式：[点击获取](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
(2) 双击【puttygen.exe】，打开 PuTTy Key 客户端。
(3) 单击【Load】，选择并打开已下载的私钥存储路径。如下图所示：
例如，选择并打开文件名为 david 的私钥文件
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/859f1268955d5e4153bc85f52bcc7ae4.png)
(4) 在 PuTTY Key Generator 窗口中，输入密钥名，并设置 PuTTY 用于加密私钥的密码（可选）。设置完成后单击【Save private key】。如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/de765c0897d8bf252d12b5f28abe1dc3.png)
(5) 在弹出的窗口中，选择您存放密钥的路径，并在文件名栏输入“密钥名.ppk”，单击【保存】。例如，将 david 私钥文件另存为 david.ppk 密钥文件。如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/16e55c786939c1a7f74783e5b26f0515.png)
(6) 双击【putty.exe】，打开 PuTTY 客户端。
(7) 在左侧导航栏中，选择【Connection】>【SSH】>【Auth】，进入 Auth 配置界面。
(8) 单击【Browse】，选择并打开密钥的存储路径。如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9f8f3786a4df71488c5af209072d7cac.png)
(9) 切换至 Session 配置界面，配置服务器的 IP、端口，以及连接类型。如下图所示：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e74c3ac1063962901b4f15932598fc3a.png)
(10) 单击【Open】，进入 “PuTTY” 的运行界面，提示 “login as:”
(11) 在 “login as” 后输入用户名 root(一般都是 root)，按 Enter。
(12) 成功登陆
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c6ebfb7601d4b1bf0aa2b5e3dce15586.png)

### 2.2 windows 控制终端连接

解释：这步操作是为了 VSCode 远程连接服务器做的测试准备，要 VScode 能 SSH 上服务器，
首先 windows 能连接上服务器。
(1) Win+R 进入控制台；
(2) 输入 ssh，如果显示如下类似就表示电脑已经安装 ssh 功能
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/34c87fcefab1a95aa46687b8bdc59a71.png)
如果发现电脑没有这个功能，就需要网上下载：
[添加链接描述](https://www.mls-software.com/opensshd.html)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/dfcc8703bda8718629da23c295a4745b.png)

(3) 在已经有 ssh 功能的情况下，执行**ssh-keygen**，第一步是将密匙保存到的位置，请记住这个位置，enter 一直往下执行，什么都不要输入。如下图就已经生成密匙了。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/20eb5148a1d98a49da8894ce52c30bb9.png)
(4)进入保存密匙的文件夹，打开密匙文件 id_rsa.pub，复制里面内容
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/de5a5462056b04d99b2b7d0fd29d6430.png)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1d37b1e14c0c3cabcd0ada802f22f7a1.png)

(5) 服务器环境中添加本地密匙，实现密匙连接。（这一步需要已经连接上服务器，并且进入服务器终端的情况下。以 centOS7+Apache 系统为例）
输入

```c
cd ~/.ssh/
ls
vi authorized_keys
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/2701591f2a9ea0f1f949bff9814785b4.png)
显示已经添加的密匙，这里需要基本的 linux 语法进行操作。
ssh-rsa 开头的为一个密匙，切记不要误删了某个字符
英文输入法下点击 **i**进入输入模式，将光标移到文件末尾，粘贴上面**id_rsa.pub**里面的内容。
然后依次点击 **esc**，**shift+：**，**wq**，然后登记 enter 保存完成，并退到终端界面。
最后一步重启 apache(如果是其他 web 服务器，请自行搜索重启的命令)：输入

```c
systemctl restart httpd.service
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d5ed54ad63a708d184d9fdbf021b6fe1.png)
(6) 操作自己本机电脑终端，在终端输入以下代码，@号之前是服务器用户名（没有更改过的话都是 root），@号之后是服务器公网 IP

```c
ssh root@188.121.123.222
```

如果执行之后出现下图，说明已经连接上服务器终端
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/1de3b1224359d7720017fa930b6f2b0d.png)
(7) 未能连接，出现的错误类型：

1.  **Bad owner or permission on...**
2.  **permission denied (publickey,gssapi-keyex,gssapi-with-mic**

问题 1 解决：进入 C:\Users\Administrator\.ssh 删除目录下的 config 文件（可能是 VScode 远程连接配置的原因）
问题 2 解决：进入云服务器控制台，进入此配置文件
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/bfed9be0aaefe5a7d0bbbe05847e07fd.png)
修改以下内容：
**PasswordAuthentication** 后面改为**yes**
**PermitRootLogin** 后面改为 **yes**（不修改也可以，如果你喜欢以 root 用户登录的话就可以修改）

### 2.3 VScode SSH 连接服务器

(1) 安装 VScode
(2) 安装扩展 Remote-SSH
(3) 安装成功后，如下指示操作
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5dae619315a9820ef1d2c1dbcae13929.png)
(4) 填写要连接的服务器，@号之前是服务器用户名**root**，@号之后是服务器公网 IP
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/c6e87229105da3481eaf40c1b794805c.png)
(5) 上一步执行 enter，跳出下面界面。点击第一行填写连接服务器的具体信息（注意，这里你们跳出来的配置文件路径都是默认的，
我的默认的路径是 **C:\Users\Administrator\.ssh\ssh_config**，但是我一直没有成功，后来发现重新建个文件夹，把配置写在里面就能连接了。我重建的文件夹如图中**C:\ProgramData\ssh\ssh_config**。你们可以按我的这种方式来也可以按照本来路径来填写配置）
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ba27b4b89bf7d9d66b07baa6fb155e20.png)
(6) 如果和我一样自己建文件夹保存配置的，需要修改 Remote-ssh 的扩展配置：在红框位置写入你新建为文件夹内的 ssh_config 的路径， 如果不和我一样自检文件夹，用的是默认文件夹的话，就不需要修改。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/001b2d22c144bcdb79b00f3f20838e5b.png)
(7) 好了，不管自建文件夹路径还是默认文件路径，殊途同归。接下来完善**ssh_config**的内容：这里可以填写多台服务器连接的配置信息，直接在后面添加就行了
参数说明：
**Host**: 名字随便起，方便自己分辨服务器
**HostName**: 云服务器公网 IP
**User**: 云服务器用户名
**Port**: 云服务器端口号，填 **22**
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/62308c0870a31a1c700c9fcb8565acc8.png)
(8) 设置好**ssh-config**后，将 2.3 中 **ssh-keygen**生成的 **id_rsa**和**id_rsa.pub**复制粘贴到
**C:\Users\Administrator\.ssh**中，最终在文件夹中需要有的文件如下：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6b4ba5b2c98d261db019e9ab41cbf428.png)
(9) 以上配置完成后，右键点击序号 1，再点击序号 2
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5d926e43515dfda4c047c5a9c1d2422a.png)
新打开一个界面，按照你的环境选择 Linux, Windows,macOS ，我是 centOS，就选择 Linux。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/abfb1d03229ab05b66ba1e4c9374c61a.png)
(10) 如果没有报错，静静等待 VScode 连接服务器，并加载文件，成功后如下图：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/15cb777e6cb772c15d56fb427a9499a0.png)
左边工作区是服务器默认访问的文件夹，如果需要加载服务器中其他路径下的文件夹，先点击**文件**，再点击**将文件夹添加到工作区**，然后就自己选择文件夹咯。
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9734d956a012e704b65360b29950d26e.png)
(11) 如上已经连接并加载了服务器，可以在 VScode 上对服务器进行开发了。并且数据是是是更新的（服务端修改的数据，vscode 上里面会更新，反之亦然）。但是 vscode 的扩展不是远程分享的，需要将本地安装的 vscode 扩展同步到云端：
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/109ec98e8cd47c482ffc3202c61c67f1.png)
点击序号 1，再点击序号 2，选择要安装的扩展，点击确定，静等片刻就 OK 了
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f992be42aed01eea938d1787f93c4519.png)
如上就是 VScode 连接服务器的步骤，具体的开发细节，请各位攻城狮自己动手咯，

# 总结

<font color=#999AAA >新的领域就会有新的认知，一切从脚下出发。脚踏实地，选择一个方向不断前行，你已不是这条路的第一批路人，这点你是幸运的，因为你有别人的经验可以借鉴，如果不总结吸收，那么永远不能成为自己的。仰望星空，不要总是低头行走，这样容易迷失方向，既然天有北斗，那定是你的指路明灯。慢慢的，你会发现你要去的那片地域那么广袤，以至于你发现耗尽一生也无法走到边际。
当你越学越发现自己懂得知识越少的时候，正是你眼界慢慢放宽的时候，抓住时机，做一个滚雪球，你不必知道最终能变得多大，但生活也别想停止你的步伐。

如有疑问或者校正，请邮箱联系：18856496324@163.com
