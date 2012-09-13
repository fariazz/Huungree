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

/**
 * Load a path as a set of objects that have x and y (row and col)
 * @param {} path
 * @return {huungry.Character}
 */
huungry.Character.prototype.setPath = function(path) {
    this.path = path;
    return this;
}

/**
 * Set default speed
 * @param float speed
 * @return {huungry.Character}
 */
huungry.Character.prototype.setDefaultSpeed = function(defaultSpeed) {
    this.defaultSpeed = defaultSpeed;
    return this;
}

/**
 * Load the map the character is in
 * @param huungry.Map map
 * @return {huungry.Character}
 */
huungry.Character.prototype.setMap = function(map) {
    this.map = map;
    return this;
}

/*
 *Get the character tile column and row
 */
huungry.Character.prototype.getCell = function() {
    return this.map.getColRowFromXY(this.getPosition().x, this.getPosition().y);
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

/*
 * set whether the player can move or is blocked, show/hide movement targets
 */
huungry.Character.prototype.showGamepad = function(canMove) {
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