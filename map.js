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
    this.tileSize = this.gameObj.tileSize;
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
        for(var j=0; j < num_cols; j++) {
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
    this.num_cols = this.width/this.gameObj.tileSize;
    this.num_rows = this.height/this.gameObj.tileSize;   
    this.initEmptyElements(this.num_cols, this.num_rows);
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

	var col = parseInt((x - x%this.gameObj.tileSize)/this.gameObj.tileSize);
	var row = parseInt((y - y%this.gameObj.tileSize)/this.gameObj.tileSize);

	return {'col': col, 'row': row};
}

/**
 * get map coordinate x,y from column and row tile number
 * @param int col tile column
 * @param int row tile row
 */
huungry.Map.prototype.getXYFromColRow = function(col,row) {
    var x = col*this.gameObj.tileSize;
    var y = row*this.gameObj.tileSize;

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

/**
 * remove a unit
 * @param {} unit
 */
huungry.Map.prototype.removeUnit = function(unit) {
    var index = -1;
    for(var i=0; i<this.units.length; i++) {
        if(unit.id == this.units[i].id) {
            index = i;
            break;
        }
    }
    if(index >= 0) {
        this.units.splice(i,1)
    }
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

/**
 * get the target unit type
 * 
 * @param int col
 * @param int row
 */
huungry.Map.prototype.getTargetType = function(col,row) {
    
    var cellCoord = this.getXYFromColRow(col, row);    
    for(var i=0; i<this.units.length; i++) {
        var unitPos = this.units[i].getPosition();
        if(cellCoord.x == unitPos.x && cellCoord.y == unitPos.y) {
            return this.units[i].unitType;
        }
    }
    
    var blocked = this.isCellBlocked(col, row);    
    return blocked ? this.gameObj.BLOCKED_TARGET : this.gameObj.FREE_TARGET;
}

/**
 * get the target unit
 * 
 * @param int col
 * @param int row
 */
huungry.Map.prototype.getTargetUnit = function(col,row) {
    
    var cellCoord = this.getXYFromColRow(col, row);    
    for(var i=0; i<this.units.length; i++) {
        var unitPos = this.units[i].getPosition();
        if(cellCoord.x == unitPos.x && cellCoord.y == unitPos.y) {
            return this.units[i];
        }
    }
    return false;
}

/**
 * get an adyacent unit if any
 * 
 * @param {} unit
 * @param int unitType
 * @return {}
 */
huungry.Map.prototype.getAdjacentUnit = function(unit, unitType) {
    var unitPos = unit.getPosition();
    var cellPos = this.getColRowFromXY(unitPos.x, unitPos.y);
    
    var adjacentUnits = [];
    var foundUnit;
    if(cellPos.col-1 >= 0) {        
        foundUnit = this.getTargetUnit(cellPos.col-1,cellPos.row);
//        console.log(foundUnit);
//        console.log('type:'+foundUnit.unitType);
//        console.log('type2:'+unitType);
//        console.log(foundUnit && foundUnit.unitType == unitType);
        
        if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
        
        if(cellPos.row-1 >= 0) {
            foundUnit = this.getTargetUnit(cellPos.col-1,cellPos.row-1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
            
            foundUnit = this.getTargetUnit(cellPos.col,cellPos.row-1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
        }
        
        if(cellPos.row+1 < this.num_rows) {
            foundUnit = this.getTargetUnit(cellPos.col-1,cellPos.row+1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
            
            foundUnit = this.getTargetUnit(cellPos.col,cellPos.row+1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
        }
        
    }
    //console.log(adjacentUnits);
    if(cellPos.col+1 < this.num_cols) {        
        foundUnit = this.getTargetUnit(cellPos.col+1,cellPos.row);
        if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
        
        if(cellPos.row-1 >= 0) {
            foundUnit = this.getTargetUnit(cellPos.col+1,cellPos.row-1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}          
        }
        
        if(cellPos.row+1 < this.num_rows) {
            foundUnit = this.getTargetUnit(cellPos.col+1,cellPos.row+1);    
            if(foundUnit && foundUnit.unitType == unitType) {adjacentUnits.push(foundUnit);}
        }
        
    }
    //console.log(adjacentUnits.length);
    //console.log(adjacentUnits.length > 0);
    if(adjacentUnits.length > 0) {
        //console.log('in');
        var index = goog.math.randomInt(adjacentUnits.length);
        //console.log('adjacent units:'+JSON.stringify(adjacentUnits));
        //console.log('chosen index:'+index);
        //console.log('chosen unit:'+adjacentUnits[index]);
        return adjacentUnits[index];
    }
    else {
        //console.log('no adjacent units');
        return false;
    }
}