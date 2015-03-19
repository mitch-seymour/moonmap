# Moon Map

<a href="http://moonmapjs.com"><img src="http://moonmapjs.com/www/img/logo.png" align="right" hspace="10" vspace="6" height="160"></a>

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
### Moon Selectors ###
Instead of specifying the number of moons with the **n** parameter, you can instead provide a **moonSelector**. This allows us to create moons from existing DOM elements. For example, using the following markup, we can create 7 moons, each with different content.

```html
<div id="center" class="orbit-center">
  <span>Center</span>
</div>
<span class="moonSelector">1</span>
<span class="moonSelector">2</span>
<span class="moonSelector">3</span>
<span class="moonSelector">4</span>
<span class="moonSelector">5</span>
<span class="moonSelector">6</span>
<span class="moonSelector">7</span>
```
Now, we can create the *MoonMap* using the following javascript.

```js
var map = new MoonMap('#center', {
  moonSelector: '.moonSelector',
  radius: 140
});
```

## Notes ##
For additional documentation and examples, please [see our website.](http://moonmapjs.com/)
