resizeListener.js
==============

Detect `resize` on elements.

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

### Notice
The elements `position` is set to `relative` when a `resizeListener` is added
