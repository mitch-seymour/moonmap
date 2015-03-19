# Moon Map

<a href="http://d3js.org"><img src="http://moonmapjs.com/www/img/logo.png" align="left" hspace="10" vspace="6"></a>

**MoonMap** is a JavaScript library for positioning DOM elements (called moons) evenly around a central point. It also acts as a carousel, and can be used for creating radial menus.

## Basic usage ##

Include the MoonMap stylesheet and javascript file in your HTML page. Now, create a div to put the moon map in:

```html
<div id="center" class="orbit-center">
  <span>Center</span>
</div>
```

Finally, run the following code.

```js
var map = new MoonMap('#center', {
  n: 8
});
```

To change the number of moons, simple modify the value of **n**.

```js
var map = new MoonMap('#center', {
  n: 4
});
```

We can also provide a value for the **radius** parameter to control how far apart the moons are.
Note: the radius refers to the orbit radius, and not the moon radius. You can control the
width of the moons in the css file provided.

```js
var map = new MoonMap('#center', {
  n: 4,
  radius: 140
});
```


## Notes ##
For additional documentation and examples, please [see our website.](http://moonmapjs.com/)
