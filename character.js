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
 * Move the character through the current path
 */
huungry.Character.prototype.walkPath = function() {
    var next_cell = this.path.shift();

    if(next_cell !== undefined) {
        this.isMoving =  true;
        //console.log('next_cell'+(next_cell.x));
        //console.log('path after shift'+this.path);
        var cellXY = this.map.getXYFromColRow(next_cell.x, next_cell.y);
        //console.log('cellXY '+JSON.stringify(cellXY));

        var animation = new lime.animation.MoveTo(cellXY.x, cellXY.y).setDuration(this.map.tileSize/this.defaultSpeed);
        this.runAction(animation);

        var character = this;

        goog.events.listen(animation,lime.animation.Event.STOP,function(){
            //console.log(this.path);
            character.walkPath();
        })
    }

    else {
        this.isMoving = false;
        //console.log('character pos:'+JSON.stringify(this.getPosition()));
    }
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

/**
 * set the path to a destination cell
 * @param int col target tile column
 * @param int row target tile row
 */
huungry.Character.prototype.setPathTo = function(col, row) {
    var character_pos = this.getCell();
    var start = this.map.blockedMap.nodes[character_pos.col][character_pos.row];
    var end = this.map.blockedMap.nodes[col][row];

    var path = astar.search(this.map.blockedMap.nodes, start, end, true);

    this.setPath(path);
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