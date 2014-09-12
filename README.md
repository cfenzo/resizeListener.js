resizeListener.js
==============

Listen to `resize` on HTML elements (with polling-fallback for SVG elements).

1,231 bytes minified+gzip

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
* Only apply this to elements that can have child elements (with SVG as exception), as technique involves adding a `<object>` to the element.

### Browser support
Latest browser versions supported, test-suite in the works

### Why not just check size on `window.resize`?
Because the size of an element can be changed by more than a resize of the browser/window, and some times you need to detect that too.
