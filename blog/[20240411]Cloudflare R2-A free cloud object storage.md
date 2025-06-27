---
title: 'Cloudflare R2-免费的云对象存储'
date: '2024-04-11T03:03:24+08:00'
status: publish
permalink: '/?p=345'
author: lingyu
excerpt: ''
type: post
id: 345
category:
    - web
tag: []
post_format: []
---
说起[Cloudflare](https://cloudflare.com)，真的算是良心企业了。建站到目前为止，用了很多他家的服务。身为世界上最大的CDN提供商，不仅UX特别好，而且绝大部分的服务free tier对于个人使用者都完全够用。今天推荐他家的对象存储服务-[R2](https://developers.cloudflare.com/r2/).

> 对象存储将数据作为对象进行存储，每个对象都有唯一的URI。与传统的文件存储系统不同，对象存储**不会**以文件夹层次结构来组织数据，而是将数据以对象的形式直接存储在存储系统中。每个对象都有自己的唯一标识符和相关的元数据，这也是对象存储名字的由来。
> 
> 对象存储强调了数据的独立性和可扩展性，使得数据管理更加灵活和高效。

[免费方案](https://developers.cloudflare.com/r2/pricing/#class-a-operations)提供一个月10GiB的免费空间以及一百万次的A类操作（即上传下载等），这对于个人用户完全够用。

使用教程
----

![](../uploads/2024/04/image.png)开始前需要去[Cloudflare](https://cloudflare.com)免费注册一个账号。如果想采用自己的域名访问R2下的文件，需要先在域名提供商后台将name server的2个值修改为Cloudflare主页提供的值来将域名托管至Cloudflare。如果没有域名，R2提供一个以`r2.dev`结尾的URL以供访问，只不过三级域名很长难以记忆。之后进入Cloudflare仪表盘，选择R2，绑定银行卡以开通服务。在不超过10GiB或者一百万次A类操作前，不会收取任何费用。

开通R2后，在R2标签下选择新建存储桶并取名。然后就可以往该存储桶内上传数据了。可以上传文件夹和文件。Cloudflare为了方便会将文件以文件夹的形式显示，但是实际文件的存储结构并不是这样而是以对象的形式存储的。

如果你需要存储桶在互联网上可以被任何人访问，单击该存储桶进入设置，允许R2.dev子域名访问即可。可以在“自定义域名”中绑定你自己的域名，Cloudflare会自动帮你设置CNAME DNS记录，只需要你在弹窗中点确定即可。完成后即可通过给定的URL访问存储桶内的文件了。要注意的是，光访问URL是连不通的，这是由于该URL的80/443端口没有任何内容或者规则。（如果想要显示内容，需要借助[Cloudflare Worker](https://developers.cloudflare.com/workers/)等其他工具来实现）需要在URL后面加上伪文件路径（即文件显示在Cloudflare存储桶上的路径）。

举个例子：如果你的存储桶文件结构如下：

```
<pre class="wp-block-code">
file1.txt
file2.txt
folder/
├─ file3.txt
├─ file4.txt

```

则文件`file1`对应的URI为`mydomain.com/file1.txt或xxx.r2.dev/file1.txt`，文件`file3`对应的URI为`mydomain.com/folder/file3.txt或xxx.r2.dev/folder/file3.txt`

R2的玩法远比想象的丰富，最简单的方法可以将html文件存入存储桶，访问对应的URI时，会直接渲染网页而不是下载文件。例如：<https://f.xoy.one/index.html>。最强的一点是R2还可以选北美亚太欧洲等多个数据湖地点可以说秒杀阿里云OSS了。甚至受益于Cloudflare的网站托管，域名连接比OSS还简单，缓存延迟也比OSS小很多，对于删除重新上传的同名文件，基本是瞬间更新的。唯一的缺陷就是不借助workers无法设置主页，只能访问特定的HTML文件。更进阶的玩法有使用脚本为博客搭建图床，搭配Alist实现无服务器搭建私人聚合网盘等等。我会在后续文章陆续介绍这些。

<script src="../widgets/a11y-m.js"></script>
<script src="../widgets/a11y-m-customized.js"></script>