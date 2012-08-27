goog.provide('huungry.Enemy');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Enemy class for tile-based games
 */
huungry.Enemy = function() {
    goog.base(this);
}

goog.inherits(huungry.Enemy, huungry.Character);
