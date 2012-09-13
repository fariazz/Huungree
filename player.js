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
 * Move the character through the current path
 */
huungry.Player.prototype.walkPath = function() {
    huungry.Character.prototype.walkPath.call(this);

    this.map.removeHighlightPath();
}

/*
 * Init
 */
huungry.Player.prototype.init = function() {

    //create movement targets where the user touches
    this.movementTargets = [];

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': 0,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': 0,
        'dy': 1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': -1,
        'dy': 0
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': 1,
        'dy': 0
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': 1,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': -1,
        'dy': 1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': -1,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#00EE76').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize),
        'dx': 1,
        'dy': 1
    });

    for(var i=0; i<this.movementTargets.length; i++) {
        this.gameObj.gameLayer.appendChild(this.movementTargets[i].sprite)
    }

    //register movement according to user input
    player = this;
    
    for(i=0; i<this.movementTargets.length; i++) {
        (function (i) {
            goog.events.listen(player.movementTargets[i].sprite,['mousedown', 'touchstart'], function(e) {

                e.event.stopPropagation();
                var currentPos = player.getPosition();
                var tileSize = player.gameObj.tileSize;
                player.setPosition(currentPos.x + tileSize*player.movementTargets[i].dx, currentPos.y + tileSize*player.movementTargets[i].dy);
                player.showGamepad(true);
            });
        })(i);
    }       
}