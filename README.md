resizeListener.js
==============

A small util for listening to `resize` on HTML elements.

## Use
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

## How
* Detects resize of HTML elements using:
  * Native `resize` event for IE < 11
  * Poll based fallback for `img`,`iframe`,`picture`,`audio`,`video`,`object`,`embed`, and any SVG element
  * `<object>`* for every other element
* Returns an object with width and height, and the element itself, as arguments to the callback
* 1,807 bytes minified+gzip

## Why not just check the size on `window.resize`?
Because the size of an element can be changed by more than a resize of the browser/window, and some times you need to detect that too.

## Important!
* IE < 8 can only trigger the resize event when it has layout. See [on having layout](http://www.satzansatz.de/cssd/onhavinglayout.html) for more info.
* The elements `position` is set to `relative` when a `resizeListener` is added (when ´<object>` is used). Only overwrite with `absolute` or `fixed`
* The following tags will get poll fallback: `img`,`iframe`,`picture`,`audio`,`video`,`object`,`embed`, and any SVG element.

## Browser support
Latest browser versions supported, test-suite in the works

## TODO
* Add more elements to the `use_polling` check.
* Look into detecting `position` and only set `relative` when needed.

## *Credits
The resize-detection would have been bollocks if it wasn't for ["Element Queries, From the Feet Up" by Back Alley Coder](http://www.backalleycoder.com/2014/04/18/element-queries-from-the-feet-up/), which the `<object>` based resize detection is based heavily on.
