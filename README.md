resizeListener.js
==============

Listen to `resize` on HTML elements.
* Detects resize of elements using `<object>`*
* Polling-fallback for SVG.
* 1,231 bytes minified+gzip

### Use
```javascript
// element
var element = document.getElementById('#id');
// callbacks
function on_resize(size){
  console.log(size.width, size.height);
}
function on_resize2(size){
  console.log(size);
}

// add resize listener
resizeListener.add(element,on_resize);
resizeListener.add(element,on_resize2);

// remove one call
resizeListener.remove(element,on_resize);
// remove all
resizeListener.remove(element);
```

### Important!
* The elements `position` is set to `relative` when a `resizeListener` is added
* Only apply this to elements that can have `<object>` as child elements (with SVG as exception), as this technique involves adding a `<object>` to the element.

### Browser support
Latest browser versions supported, test-suite in the works

### Why not just check size on `window.resize`?
Because the size of an element can be changed by more than a resize of the browser/window, and some times you need to detect that too.


### TODO
* Look into using proper "resize" events on IE<10 (one thing besides box-model that old IE had right)
* Take a closer look at the SVG checks
* Improve `use_polling` to include checks for elements that cannot have `<object>` as child elements

### *Credits
The resize-detection would have been bollocks if it wasn't for ["Element Queries, From the Feet Up" by Back Alley Coder](http://www.backalleycoder.com/2014/04/18/element-queries-from-the-feet-up/), which the `<object>` based resize detection is based heavily on.
