goog.provide('huungry.Place');
goog.require('lime.Sprite');

/*
 * Place
 */
huungry.Place = function() {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(40,40);
}

goog.inherits(huungry.Place,lime.Sprite);

huungry.Place.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.Place.prototype.init = function() {
    
}
