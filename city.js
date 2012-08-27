goog.provide('huungry.City');

goog.require('lime.Sprite');
goog.require('goog.math');

/*
 * City
 */
huungry.City = function() {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.dialogOpen = false;
}

goog.inherits(huungry.City,lime.Sprite);

huungry.City.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.City.prototype.init = function() {
    lime.scheduleManager.schedule(function(dt) {
        if(this.gameObj.player.isMoving === false) {
            if(!this.dialogOpen) {
                if(goog.math.Box.intersectsWithPadding(this.getBoundingBox(),this.gameObj.player.getBoundingBox(),-1)) {
                    //console.log('city box:'+JSON.stringify(this.getBoundingBox()));
                    //console.log('player box:'+JSON.stringify(this.gameObj.player.getBoundingBox()));
                    this.gameObj.director.pushScene(this.gameObj.dialogScene);
                    this.dialogOpen = true;
                    //console.log('player');
                    //console.log(this.gameObj.player.getPosition());
                }
            }

            else {
                if(!goog.math.Box.intersectsWithPadding(this.getBoundingBox(),this.gameObj.player.getBoundingBox(),-1)) {
                    this.dialogOpen = false;
                }
            }
        }
    }, this);
}
