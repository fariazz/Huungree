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

/*
 * Init
 */
huungry.Enemy.prototype.init = function() {
    
    lime.scheduleManager.schedule(function(dt) {
        if(!this.gameObj.player.inFightScene) {     
            if(this.life >0 && goog.math.Box.intersectsWithPadding(this.getBoundingBox(),this.gameObj.player.getBoundingBox(), -1)) {
                this.gameObj.fight(this);
            }
        }
    }, this);
}