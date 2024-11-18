# Restart
My [wordpress blog](https://blog.zhoulingyu.net) crashed, completely. It was build on a Racknerd server and for no reasons it just crashed and reset SSH password from time to time. Even worse, my [backup blog site](https://cfblog.xoysroam.workers.dev/) on Cloudflare is inoperably laggy, like loading using 3G. I am tired of maintaining all this. So at the end of the day, I choose to use existing PaaS like Github pages (currently decided) or Vercel. At least it's their responsibility to do the maintainence and trivals. 

I wrote a compiler that can handle the display of most recent articles, and tags, in the near future. I preliminary set the format of title to be something like this:
```
{userDefinedDate}[tag1,...,tagN]Main title
``` 

so that the parser can automatically organize all posts and show them in the blog index page. Isn't that great? 

The only drawback for GP is no KaTeX support, but i have found out KaTeX is not that frequently used anyway. So I might be stick on GP for a period. And using markdown, I can immerse myself in content creation instead of unnecessary deployment process.

As for the article in previous blog, I will try to reset SSH password manually and download all them back, hopefully. Then I can gradually convert all them into markdown format.

I remember you can still add custom HTML element in github markdown like

<detials>
<summary>
Click me
</summary>
This is an accordian.
</detials>
