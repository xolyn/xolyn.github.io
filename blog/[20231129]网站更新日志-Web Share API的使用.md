# 网站更新日志-Web Share API的使用

排定的更新与2023年11月29日10:49执行。影响界面`zhoulingyu.net` , `zhoulingyu.net/about.html` , `zhoulingyu.net/faq.html`。本次更新新增share功能，新增顶层悬浮share图标，新增acknowledgements板块，修改首页banner 字体大小及字体格式。

说到字体格式，不得不吐槽一下Safari，许多设置在Safari上都会被修改或重置并且iOS上的所有浏览器，包括第三方（Chrome, Brave, Edge）用的都是Safari内核。video的`autoplay`属性在Safari上不起作用，需额外添加`playsinline`属性才能实现视频自动播放。同时所有的header都会被自动加粗，若自定义字体没有bold字重，系统会将文字强行拉宽来实现粗体的效果。

HTML中系统分享菜单的触发功能的实现在2016年初步提出，如今已大致完善，支持包括Chrome, Edge, Safari在内的多个及内核。该功能通过重写Web Share API的`navigator`的`share`属性来实现。其中`share`包含了多个值，包括分享时显示的标题，内容和URL。具体实现方法如下：

首先将需要触发的元素打上标签`id="shareButton"`，随后添加Javascript代码：

```
<pre class="wp-block-code">```
if (navigator.share) {

        document.getElementById('shareButton').addEventListener('click', () => {
            navigator.share({
            title: 'title',
            text: 'text',
            url: 'https://example.com'
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing:', error));
        });
        } else {

        document.getElementById('shareButton').style.display = 'none';
        console.log('Web share API not supported.');
        }
```
```

搭配SVG代码（这是我认为最方便的矢量图内嵌方式）即可轻松实现悬浮于页面顶层的分享图标。

此外，现在landscape窗口中终于没有横向滚动条了。在使用F12页面检视了许久后最终发现原因是footer的宽度导致的。landscape模式默认下宽度不会减去窗口中竖向滚动条的宽度，但是portrait窗口却没有这个问题，原因是其竖向滚动条是置于页面顶层的。

***仍在更新中…***