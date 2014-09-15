var resizeListener = require('../resizeListener.js');
var test = require('tape');

test('simple test', function (t) {
    t.plan(2);

    var el = document.getElementById('test');
    // set the default size
    el.style.width = "400px";
    // get default
    t.equal(400,el.offsetWidth);
    // add the listener
    resizeListener.add(el,function(size){
        // size.width should be 200 when this is called
        t.equal(200,size.width);
    });
    // set width to 200px
    el.style.width = "200px";

    setTimeout(function(){
        // in case it all hangs..
        t.end();
    },1000);
});