# A new possibility for creation
My [wordpress blog](https://blog.zhoulingyu.net) crashed, completely. It was build on a Racknerd server and for no reasons it just crashed and reset SSH password from time to time. Even worse, my [backup blog site](https://cfblog.xoysroam.workers.dev/) on Cloudflare is inoperably laggy, like loading using 3G. I am tired of maintaining all this. So at the end of the day, I choose to use existing PaaS like Github pages (currently decided) or Vercel. At least it's their responsibility to do the maintainence and trivals. 

I wrote a compiler that can handle the display of most recent articles, and tags, in the near future.

A mature schema of blog post repo. usually contain the following fields：

> &nbsp;
> \* for mandatory items
> &nbsp;

- **id (PK)**: an unique id for each post
- ***title**
- ***content**
- **author**
- ***createTime**
- ***lastModifiedTime**
- **tags**
- **isPublished**



so,... You might ask: "How can a single file contains all this info?"

Well in modern blog complier (Jekyll), they create a separate region at the top of each md file, surronded by `---` to contain all the info needed for the database, like this:

```
---
title: 'A whole new world'
date: '2023-11-29T13:51:54+08:00'
status: publish
permalink: '/?p=171'
author: admin
excerpt: ''
type: post
...
---
```

**However**, this might cause stress to **both** developers and content creator because developers either have to specify strict format to parse these at ease, or come up with lots of code handling many edge cases users might type those information like format of date, use of quotation marks, what format should tags be in,... Content creator on the other side, have to also rememeber these rules.

So my solution, although has compromises, yet creates a great way to distract content creator less and also brings less workload for developers (which in this case is me). Let's go thru each previously-mentioned field:

- **id (PK)**: this is combined with title, since almost any operating system that stores these files will not allow 2 files with the same name 
- ***title**: ~
- ***content**: just the content in markdown
- **author**: for balance of simplicty and usefulness, this is omitted because in rarely casee (at least for personal blog), a blog is written by multiple persons
- ***createTime**: almost any operating system has the meta data of creation time along with the file. Nice!
- ***lastModifiedTime**: if user want to 'import' a old posts, which is quite common, they can just specify the date in curly brackets at the beginning of that markdown's name like:

    ```
    {20170819}Main title
    ``` 
I even set it to be all-numbers so no symbols/deliminator needed to be remembered and considered

- **tags**: Similarly, users can specify tags in square brackets like this: 

    ```
    [life,travel]Main title
    ``` 

    This is so convenient if you know `eval()` in python can literally take in a string like `[life,travel]` and convert it into a list. Wow!

- isPublished: If you want to set a blog to be private and not listed, just place a dot (`.`) in front of the file name.

Basically I set the format of title to be something like this:
```
{userDefinedDate}[tag1,...,tagN]Main title
``` 

so that the parser can automatically organize all posts and show them in the blog index page. 

As you can see, this simple schema covers 7/8 the field needed.

Isn't that great? 

However, there are also drawback for GP:
1.  **GP has no KaTeX support**, but i have found out KaTeX is not that frequently used anyway. So I might be stick on GP for a period. And using markdown, I can immerse myself in content creation instead of unnecessary deployment process.
2.  **Less probability for customization**, which in some extent is a good thing, it reduce hugely the time of content creators. 
3.  Github Page has a delay for deployment

But basically, if you are willing to invest more time in js and import them in each post, all these drawbacks except for the last one can be solved anyway.

As for the article in previous blog, I will try to reset SSH password manually and download all them back, hopefully. Then I can gradually convert all them into markdown format.

I remember you can still add custom HTML element in github markdown like

<details>
<summary>
Click me
</summary>
This is an accordian.
</details>



<script src="../widgets/a11y-m-customized.js"></script>