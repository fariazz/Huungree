goog.provide('huungry.Character');

goog.require('lime.Sprite');

/*
 * Game character class for tile-based games
 */
huungry.Character = function() {
    goog.base(this);

    this.setAnchorPoint(0, 0);
    this.setSize(40,40);
    this.path = [];
    this.isMoving = false;
    this.setAnchorPoint(0, 0);
}

goog.inherits(huungry.Character,lime.Sprite);

/*
 *Get the character tile column and row
 */
huungry.Character.prototype.getCell = function() {
    return this.gameObj.map.getColRowFromXY(this.getPosition().x, this.getPosition().y);
}

/*
* Walk the character to a destination using the A* path finding algorithm
* @param int col target tile column
* @param int row target tile row
*/
huungry.Character.prototype.walkTo = function(col,row) {
    this.setPathTo(col, row);
    this.walkPath();
}

huungry.Character.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

/**
 * set the characters attributes
 * @param {} attributes
 */
huungry.Character.prototype.setAttributes = function(attributes) {
    this.life = attributes.life;
    return this;
}

/**
 * init on screen gamepad
 * 
 */
huungry.Character.prototype.initGamepad = function() {

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
}

/**
 * set whether the player can move or is blocked, show/hide movement targets
 */
huungry.Character.prototype.showGamepad = function() {
    var pos = this.getPosition();
    var currentCell = this.getCell();
    
    var tileSize = this.gameObj.tileSize;

    for(var i=0; i<this.movementTargets.length; i++) {
        
        var targetCol = currentCell.col+this.movementTargets[i].dx;
        var targetRow = currentCell.row+this.movementTargets[i].dy;
        
        //show if it can move
        if(!this.gameObj.map.isCellBlocked(targetCol, targetRow)) {
            this.movementTargets[i].sprite.setHidden(false);
            this.movementTargets[i].sprite.setPosition(pos.x+tileSize*this.movementTargets[i].dx,pos.y+tileSize*this.movementTargets[i].dy);
        }
        else {
            this.movementTargets[i].sprite.setHidden(true);
        }
        
        
    }    
}