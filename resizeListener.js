/*! resizeListener.js | Author: Jens Anders Bakke (http://webfreak.no), 2014 | URL: https://github.com/cfenzo/resizeListener.js | Credits: object-based resize detection based on http://www.backalleycoder.com/2014/04/18/element-queries-from-the-feet-up/ | License: MIT */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.resizeListener = factory();
    }
}(this, function () {

    var isIE = /*@cc_on!@*/0,
        requestFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(fn){ return window.setTimeout(fn, 20);},
        styles_added = [],
        stylesheet,
        _poller_interval = 250,
        _poller_runner,
        _poller_elements = [],
        object_style = 'display: block;position: absolute;top: 0;left: 0;width: 100%;height: 100%;border: none;padding: 0;margin: 0;opacity: 0;z-index: -1000;pointer-events: none;';

    function debounceTrigger(){
        var el = this;
        if (!el.__trigger__) {
            el.__trigger__ = requestFrame(function(){
                var size = el._lastSize || {width:el.offsetWidth,height:el.offsetHeight};
                el.__eq__.fn.forEach(function(fn){
                    fn.call(el, size);
                });
                el.__trigger__ = null;
            });
        }
    }

    // for non-svg
    function attachObject(element,sensorDataAttr){
        element.setAttribute(sensorDataAttr,'true');
        addSensorStyles(sensorDataAttr);
        var obj = document.createElement('object');
        obj.__queryelement__ = element;
        obj.onload = objectLoad;
        obj.type = 'text/html';
        if (!isIE) obj.data = 'about:blank';
        element.appendChild(obj);
        if (isIE) obj.data = 'about:blank'; // must add data source after insertion, because IE is a goon
        return obj;
    }
    function objectLoad(){
        var element = this.__queryelement__,
            doc = element.__eq__.doc = this.contentDocument,
            win = doc.defaultView || doc.parentWindow;

        doc.__queryelement__ = element;
        win.addEventListener('resize', function(){
            debounceTrigger.call(element);
        });
        element.__eq__.loaded = true;
        debounceTrigger.call(element);
    }
    function addSensorStyles(sensorDataAttr){
        if(!styles_added[sensorDataAttr]){
            var style = '['+sensorDataAttr+'] {position: relative;} ['+sensorDataAttr+'] > object {'+object_style+'}';
            if(!stylesheet){
                stylesheet = document.createElement('style');
                stylesheet.type = 'text/css';
                stylesheet.id = 'resize-listener-styles';
                document.getElementsByTagName("head")[0].appendChild(stylesheet);
            }

            if (stylesheet.styleSheet) {
                stylesheet.styleSheet.cssText = style;
            }else {
                stylesheet.appendChild(document.createTextNode(style));
            }
            styles_added[sensorDataAttr] = true;
        }
    }

    // for svg/fallback
    function use_poll(element){
        // TODO add more tests for elements that needs poll (svg++, video?, audio?, iframe?)
        return element instanceof SVGElement || !!element.ownerSVGElement || false;
    }
    function addResizePoller(element){
        if(_poller_elements.indexOf(element) === -1) _poller_elements.push(element);
        if(!_poller_runner) setPollerRunner();
    }
    function removeResizePoller(element){
        var index = _poller_elements.indexOf(element);
        if(index > -1) _poller_elements.splice(index,1);
        if(_poller_elements.length < 1) window.clearInterval(_poller_runner);
    }
    function setPollerRunner(){
        _poller_runner = window.setInterval(function(){
            _poller_elements.forEach(function(element){
                var _lastSize = element._lastSize || {width:0,height:0},
                    _newSize = element.getBoundingClientRect?element.getBoundingClientRect():{width:element.offsetWidth,height:element.offsetHeight}; // getBoundingClientRect or getBBox...

                if(_newSize.width !== _lastSize.width || _newSize.height !== _lastSize.height){
                    element._lastSize = _newSize;
                    debounceTrigger.call(element);
                }
            });
        },_poller_interval);
    }

    // the add/remove methods
    function addResizeListener(element,fn,force_poll){
        if (!element.__eq__) {
            element.__eq__ = {};
            element.__eq__.fn = [fn];
            if(force_poll || use_poll(element)){
                addResizePoller(element);
                element.__eq__.poller = true;
            }else{
                element.__eq__.object = attachObject(element,'resize-sensor');
            }
        }else{
            element.__eq__.fn.push(fn);
        }
    }
    function removeResizeListener(element,fn){
        if (element.__eq__) {
            if(fn){
                var index = element.__eq__.fn.indexOf(fn);
                if(index > -1) element.__eq__.fn.splice(index,1);
                if(element.__eq__.fn.length > 0) return;
            }
            if(element.__eq__.object) element.removeChild(element.__eq__.object);
            if(element.__eq__.poller) removeResizePoller(element);
            delete element.__eq__;
        }
    }

    // export!
    return {
        add:addResizeListener,
        remove:removeResizeListener
    };
}));
