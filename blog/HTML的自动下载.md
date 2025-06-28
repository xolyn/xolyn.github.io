# 网页中的自动下载
最近iOS出现了一个很严重的bug，可以利用聊天记录来强制让微信闪退。其背后的原因，本质上是在聊天记录的头像图片地址中放入了非图像格式，而是一个超大文件的URI。这些下载内容会被存入内存中，从而导致内存溢出，微信闪退。

众所周知由于安全性的考虑，如果你创建一个`<a href='#' download>`元素。你是无法在js中用`click()`方法去模拟点击他的，这是W3C的规定。但是我在前些年写网页的时候无意中碰到一个很有意思的方法，可以实现在网页被加载的时候自动下载，听上去很无赖，感觉跟很多垃圾网站的自动软件包下载是一个实现原理。方法的核心就在于meta元素。

> **TLDR**:
>
> `<meta http-equiv="refresh" content="0; https://example.com/something.exe">`
>
> [HOW?](#anc1)



## 什么是`<meta>` 标签

> `<meta>` 标签是 HTML 文档中的 元数据（metadata）标签，它提供有关网页的信息，这些信息不会直接显示在页面内容中，但对浏览器、搜索引擎、社交平台等非常重要。
>
> [跳过这一段](#anc1)

常用的用途有如下：

1. 设置字符编码
```html
<meta charset="UTF-8">
```

说明网页使用 UTF-8 编码，这是国际通用的字符集，避免乱码。

2. **定义页面描述（用SEO）

```html
<meta name="description" content="这是一个关于HTML meta标签的简明介绍。">
```

搜索引擎会参考这个内容展示在搜索结果中。这方面的学问非常深，通常会和下面第三点的keyword一起使用

3. 关键词

```html
<meta name="keywords" content="HTML, meta, SEO, 网页开发">
```

4. 指定网页作者

```html
<meta name="author" content="张三">
```

5. 控制视口（移动端响应式布局）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
`content="width=device-width`应该是最简单的网站响应式手段了，对移动设备友好，可以确保网页在不同屏幕上良好显示。


6. 防止页面缓存

```html
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="pragma" content="no-cache">
```
<span id='anc1' name='anc1'></span>
7. 自动刷新或重定向

```html
<meta http-equiv="refresh" content="0; url=https://example.com">
```


**这就是自动下载的核心所在了。**
`http-equiv`是meta标签的一个大属性。具体语法如下：
```html
<meta http-equiv="content-security-policy|content-type|default-style|refresh">
```

它允许你在 HTML 文档中模拟或补充某些 HTTP 响应头的功能，尤其当你无法在服务器端设置这些响应头时。

其中的`refresh`参数可以实现实现定时刷新或跳转。`content`后的跟一个必填positional参数，和一个选填的关键字参数`url=`，之间用半角分号进行分割。

通常的用法是只跟一个参数，即秒数。这种情况下，页面会**每**隔指定的秒数后刷新一次。如果是`<meta http-equiv="refresh" content="0">`即会在刷新的瞬间刷新，导致**无限刷新**。浏览器可能变得卡顿甚至无法响应，有些浏览器会在检测到这种行为后弹出警告，提示“页面正在进行重定向循环”。

而第二个参数`url=`即指定了跳转的地址。相信你也发现了，如果这个地址填写了一个文件的URI，那么浏览器就会直接开始下载该文件（大部分。但是移动端通常浏览器会有优化，在询问用户意见之后再开始下载）

我在第一次了解这个功能的时候震惊与W3C竟会允许这种操作。在W3C 的 HTML 规范中，`<meta http-equiv="refresh">`的本意是用于页面自动跳转，不是为了下载文件。这种“边界利用”，虽然技术上符合规范，但从安全与用户体验的角度来看，是认为是有风险的行为。且在现代网站设计中，这种做法很容易被视为潜在的恶意行为（malware dropper）。

> **Fun Fact**
>
> 事实上，使用`<meta http-equiv="refresh">`将导致不符合 W3C 的 Web 内容可访问性指南。



<script src="../widgets/a11y-m-customized.js"></script>