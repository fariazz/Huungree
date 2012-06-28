goog.provide('huungry.Player');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Player class for tile-based games
 */
huungry.Player = function() {
    goog.base(this);
}

goog.inherits(huungry.Player, huungry.Character);

/*
 * Move the character through the current path
 */
huungry.Player.prototype.walkPath = function() {
    huungry.Character.prototype.walkPath.call(this);
    
    this.map.removeHighlightPath();
}