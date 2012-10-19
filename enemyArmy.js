goog.provide('huungry.EnemyArmy');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Enemy armies
 */
huungry.EnemyArmy = function() {
    goog.base(this);
}

goog.inherits(huungry.EnemyArmy, huungry.Character);

/*
 * Init
 */
huungry.EnemyArmy.prototype.init = function() {
    this.unitType = this.gameObj.ENEMY_ARMY;
//    lime.scheduleManager.schedule(function(dt) {
//        if(!this.gameObj.player.inFightScene) {     
//            if(goog.math.Box.intersectsWithPadding(this.getBoundingBox(),this.gameObj.player.getBoundingBox(), -1)) {
//                this.gameObj.fight(this);
//            }
//        }
//    }, this);
}