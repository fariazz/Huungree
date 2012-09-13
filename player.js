goog.provide('huungry.Player');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Player class for tile-based games
 */
huungry.Player = function() {
    goog.base(this);
    
    this.inFightScene = false;
    
    this.canMove = false;
}

goog.inherits(huungry.Player, huungry.Character);

/*
 * Init
 */
huungry.Player.prototype.init = function() {

    this.initGamepad();

    
}

/**
 * show gamepad after movement
 */
huungry.Player.prototype.updateGamepad = function() {
    this.toggleGamepad(true);
}