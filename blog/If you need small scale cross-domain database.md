
# If you need small scale cross-domain database

Let’s be honest: sometimes you just want to store some structured data and read it from another domain, without messing with a real backend or complicated APIs. But then, CORS shows up and ruins your fetch-from-anywhere dreams.

Actually, there’s a neat little hack: **just use a JavaScript file as your “database.”** 

Seriously.

## How does it work?

You basically create a `.js` file that contains your data as a JavaScript variable or array. Something like this:

```js
// blogs.js
var blogs = [
  {
    title: "First Post",
    date: "2020-01-01",
    content: "<p>Hello world!</p>"
  },
  {
    title: "Another Post",
    date: "2020-01-15",
    content: "<p>More content here.</p>"
  }
  // ...more entries
];
```

Then, on **any site**, even it's crossing domains, just import your JS file with a script tag:

```html
<script src="https://your.cdn.com/blogs.js"></script>
<script>
// you can basically just use any variable declared in blogs.js!
  blogs.forEach(post => {
    // Do something with post.title, post.content, etc.
  });
</script>
```

No CORS. No backend. Just data, ready to go.

---

## Why bother with this?

**Pros:**

* Super simple, zero backend.
* Works cross-domain thanks to how `<script>` tags behave (no CORS headaches).
* Perfect for small, static datasets like blog posts, product lists, or demo content.

**Cons:**

* Not for big data — you’re loading everything at once.
* Data isn’t secure (but, hey, your blog posts are public anyway).
* Editing or updating means re-deploying the JS file.
* Not ideal for user-generated or frequently-changing content.

*Still exploring!*

<script src="../widgets/a11y-m-customized.js"></script>
<script src="../js/ctrlCode.js></script>

