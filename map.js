goog.provide('huungry.Map');

/*
 * Map class for tile-based games
 */
huungry.Map = function() {

    this.tileOffsetX = 0;
    this.tileOffsetY = 0;

    this.pixelOffsetX = 0;
    this.pixelOffsetY = 0;
    
    //map elements such as units, items, etc
    this.elements = [];
    this.units = [];
}

huungry.Map.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.Map.prototype.setJsonMap = function(jsonMap, collision_layer_name) {
    //map properties
    this.num_cols = jsonMap.layers[0].width;
    this.num_rows = jsonMap.layers[0].height;
    this.tileSize = jsonMap.tilewidth;
    this.width = this.num_cols * this.tileSize;
    this.height = this.num_rows * this.tileSize;

    //find collision layer
    for(var i=0; i < jsonMap.layers.length; i++) {
        if(jsonMap.layers[i].name == collision_layer_name) {
            var collision_i = i;
            break;
        }
    }
    
    //init map elements
    this.initEmptyElements(this.num_cols, this.num_rows);
    //load blocked cells    
    var current_row = 0;
    for(var i=0; i < jsonMap.layers[collision_i].data.length; i++) {
        var col = i % this.num_cols;
        var row = Math.floor(i/this.num_cols);

        if(jsonMap.layers[collision_i].data[i] > 0) {
            this.elements[row][col].blocked = 1;
        }
        else {
            this.elements[row][col].blocked = 0;
        }
    }
    return this;
}

/**
 * initiate an empty array of map elements
 * 
 * @param int num_cols
 * @param int num_rows
 */
 huungry.Map.prototype.initEmptyElements = function(num_cols, num_rows) {
     for(var i=0; i < num_rows; i++) {
        this.elements.push([]); 
        for(var j=0; j < num_rows; j++) {
            //this.elements[i].push({blocked: 0, units: []})
            this.elements[i].push({blocked: 0})
        } 
     }
 }


/**
 * set dimensions in pixels
 * @param {int,int} dimensions
*/
huungry.Map.prototype.setSize = function(dimensions) {
    this.width = dimensions.width;
    this.height = dimensions.height;
    return this;
}

/**
 * set background
 * @param string background
 */
huungry.Map.prototype.setBackground = function(background) {
    this.backgroundSprite = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setFill(background).setSize(this.width,this.height);
    return this;
}

huungry.Map.prototype.init = function() {
    this.gameObj.gameLayer.appendChild(this.backgroundSprite);

    var map = this;
//    goog.events.listen(this.backgroundSprite, ['mousedown', 'touchstart'], function(e) {
//        e.event.stopPropagation();
//
//        cell = map.getColRowFromXY(e.position.x, e.position.y);
//        console.log('blocked cell:'+map.blockedCells[cell.row][cell.col]);
//    });



}

/**
 * get map cell row and col from map x and y
 * @param float x map x coordinate
 * @param float y map y coordinate
 */
huungry.Map.prototype.getColRowFromXY = function(x,y) {

	var col = parseInt((x - x%this.tileSize)/this.tileSize);
	var row = parseInt((y - y%this.tileSize)/this.tileSize);

	return {'col': col, 'row': row};
}

/**
 * get map coordinate x,y from column and row tile number
 * @param int col tile column
 * @param int row tile row
 */
huungry.Map.prototype.getXYFromColRow = function(col,row) {
    var x = col*this.tileSize;
    var y = row*this.tileSize;

    return {'x':x, 'y':y};
}

/**
 * return whether a cell is blocked or not
 * @param int col tile column
 * @param int row tile column
 */
huungry.Map.prototype.isCellBlocked = function(col, row) {
    
    if(col >= this.num_cols || row >= this.num_rows || col < 0 || row < 0) {
        return 1;
    }
    else {
        return this.elements[row][col].blocked;
    }
}

/**
 * add a unit to the map
 * @param {} unit
 */
huungry.Map.prototype.addUnit = function(unit) {
    this.units.push(unit);
}

///**
// * add an element to the map
// * @param int col
// * @param int row
// * @param {} element
// */
//huungry.Map.prototype.addElement = function(col, row, unit) {
//    this.elements[row][col].units.push(unit);
//}

///**
// * get the unit type of a cell
// * @param int col
// * @param int row
// * @return int
// */
//huungry.Map.prototype.getUnitType = function(col, row) {
//    return this.unitCells[row][col];
//}