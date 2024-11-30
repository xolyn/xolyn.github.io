Check out this new way to change font style for static website generator with limited css support like Github page!

```
<script src="https://f.zly.vg/css/changeFont.js"></script>
```

this file contains contents:

```
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://xolyn.github.io/font.css';
document.head.appendChild(link)
document.body.style.fontFamily = 'psu';
```

We are now working on the dynamic response handling by an API with rules:

```
https://myDomain.com/font?name={xxx}
```

> More to come...

