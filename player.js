goog.provide('huungry.Player');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Player class for tile-based games
 */
huungry.Player = function() {
    goog.base(this);

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
    target = this.movementTargets[0];
    goog.events.listen(this.movementTargets[0].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target.dx, currentPos.y + tileSize*target.dy);
        player.setCanMove(true);
    });

    target1 = this.movementTargets[1];
    goog.events.listen(this.movementTargets[1].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target1.dx, currentPos.y + tileSize*target1.dy);
        player.setCanMove(true);
    });

    target2 = this.movementTargets[2];
    goog.events.listen(this.movementTargets[2].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target2.dx, currentPos.y + tileSize*target2.dy);
        player.setCanMove(true);
    });

    target3 = this.movementTargets[3];
    goog.events.listen(this.movementTargets[3].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target3.dx, currentPos.y + tileSize*target3.dy);
        player.setCanMove(true);
    });

    target4 = this.movementTargets[4];
    goog.events.listen(this.movementTargets[4].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target4.dx, currentPos.y + tileSize*target4.dy);
        player.setCanMove(true);
    });

    target5 = this.movementTargets[5];
    goog.events.listen(this.movementTargets[5].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target5.dx, currentPos.y + tileSize*target5.dy);
        player.setCanMove(true);
    });

    target6 = this.movementTargets[6];
    goog.events.listen(this.movementTargets[6].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target6.dx, currentPos.y + tileSize*target6.dy);
        player.setCanMove(true);
    });

    target7 = this.movementTargets[7];
    goog.events.listen(this.movementTargets[7].sprite,['mousedown', 'touchstart'], function(e) {

        e.event.stopPropagation();
        var currentPos = player.getPosition();
        var tileSize = player.gameObj.tileSize;
        player.setPosition(currentPos.x + tileSize*target7.dx, currentPos.y + tileSize*target7.dy);
        player.setCanMove(true);
    });

       
}

/*
 * set whether the player can move or is blocked, show/hide movement targets
 */
huungry.Player.prototype.setCanMove = function(canMove) {
    this.canMove = canMove;

    if(canMove) {
        var pos = this.getPosition();
        var tileSize = this.gameObj.tileSize;

        for(var i=0; i<this.movementTargets.length; i++) {
            this.movementTargets[i].sprite.setHidden(false);
            this.movementTargets[i].sprite.setPosition(pos.x+tileSize*this.movementTargets[i].dx,pos.y+tileSize*this.movementTargets[i].dy);
        }
    }

}

/*
 *
 */
