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

    //register movement according to user input
    player = this;
    
    for(i=0; i<this.movementTargets.length; i++) {
        (function (i) {
            goog.events.listen(player.movementTargets[i].sprite,['mousedown', 'touchstart'], function(e) {

                e.event.stopPropagation();
                var currentPos = player.getPosition();
                var tileSize = player.gameObj.tileSize;
                player.previousPosition = currentPos;
                player.setPosition(currentPos.x + tileSize*player.movementTargets[i].dx, currentPos.y + tileSize*player.movementTargets[i].dy);
                player.showGamepad(true);
            });
        })(i);
    }       
}