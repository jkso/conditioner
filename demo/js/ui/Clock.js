define(['conditioner/BehaviorBase'],function(BehaviorBase){

    'use strict';

    // reference to parent class
    var _parent = BehaviorBase;

    // Clock Class
    var Clock = function(element,options) {

        // set default options
        this._options = {
            'time':true
        };

        // call BehaviourBase constructor
        _parent.call(this,element,options);

        // backup content
        this._inner = this._element.innerHTML;

        // start ticking
        this._tick();
    };

    // Extend from BehaviourBase
    var p = Clock.prototype = Object.create(_parent.prototype);

    // Update time
    p._tick = function() {

        var self = this,
            pad = function(n){return n<10 ? '0'+n : n},
            now = new Date(),
            date = pad(now.getDate()) + '/' + (now.getMonth()+1) + '/'+ now.getFullYear(),
            time = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());

        // write inner html
        this._element.innerHTML = date + (this._options.time ? ' - ' + time : '');

        // if time is not enabled, don't start ticking
        if (!this._options.time) {
            return;
        }

        // wait timeout milliseconds till next clock tick
        this._timer = setTimeout(function(){
            self._tick();
        },900);

    };

    // Unload Clock behaviour
    p._unload = function() {

        // call BehaviourBase unload method
        _parent.prototype._unload.call(this);

        // stop ticking
        clearTimeout(this._timer);

        // restore content
        this._element.innerHTML = this._inner;
    };

    return Clock;

});