goog.provide('huungry.Map');

/*
 * Map class for tile-based games
 */
huungry.Map = function() {

    this.tileOffsetX = 0;
    this.tileOffsetY = 0;

    this.pixelOffsetX = 0;
    this.pixelOffsetY = 0;

    this.elements = [];
    this.blocked = [];
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
            this.blocked[row][col] = 1;
        }
        else {
            this.blocked[row][col] = 0;
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
        this.blocked.push([]);
        for(var j=0; j < num_cols; j++) {
            this.blocked[i][j] =  0;
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

   if(this.gameObj.developmentMode) {
       goog.events.listen(this.backgroundSprite, ['mousedown', 'touchstart'], function(e) {
           e.event.stopPropagation();

           cell = map.getColRowFromXY(e.position.x, e.position.y);
           console.log(cell);
       });
    }
};

/**
 *Initiate level data, only for maps that are levels
 */
huungry.Map.prototype.initLevel = function(mapItems, enemyArmies, mapShops) {
    this.gameObj.map = this;

    //load items
    this.gameObj.numItems = 0;
    var item, pos, shop;
    var arrayLen;

    this.gameObj.mapItems = new Array();
    if(mapItems === undefined) {
        arrayLen = this.level.items.length;
        for(var i=0; i<arrayLen; i++) {
            pos = this.gameObj.map.getXYFromColRow(this.level.items[i].x,this.level.items[i].y);
            item = new huungry.Item()
                .setGameObj(this.gameObj)
                .setPosition(pos.x, pos.y)
                .setMap(this)
                .refreshMapPos()
                .setData(this.level.items[i])
                .init();
            this.gameObj.mapItems.push(item);
            this.gameObj.gameLayer.appendChild(item);
            this.gameObj.numItems++;
        }
    }
    else {
        arrayLen = mapItems.length;
        for(var i=0; i<arrayLen; i++) {
            item = new huungry.Item()
                .setGameObj(this.gameObj)
                .setPosition(mapItems[i].x, mapItems[i].y)
                .setMap(this)
                .refreshMapPos()
                .setData(mapItems[i])
                .init();
            this.gameObj.mapItems.push(item);
            this.gameObj.gameLayer.appendChild(item);
            this.gameObj.numItems++;
        }
    }


    //shops
    this.gameObj.mapShops = new Array();
    if(mapShops === undefined) {
        arrayLen = this.level.shops.length;
        for(i=0; i<arrayLen; i++) {
            pos = this.gameObj.map.getXYFromColRow(this.level.shops[i].x,this.level.shops[i].y);
            shop = new huungry.Shop()
                .setGameObj(this.gameObj)
                .setPosition(pos.x, pos.y)
                .setMap(this)
                .refreshMapPos()
                .setData(this.level.shops[i])
                .init();
            this.gameObj.mapShops.push(shop);
            this.gameObj.gameLayer.appendChild(shop);
        }
    }
    else {
        arrayLen = mapShops.length;
        for(i=0; i<arrayLen; i++) {
            shop = new huungry.Shop()
                .setGameObj(this.gameObj)
                .setPosition(mapShops[i].x, mapShops[i].y)
                .setMap(this)
                .refreshMapPos()
                .setData(mapShops[i])
                .init();
            this.gameObj.mapShops.push(shop);
            this.gameObj.gameLayer.appendChild(shop);
        }
    }

    //enemyArmies
    this.gameObj.enemyArmies = new Array();
    if(enemyArmies === undefined) {
        arrayLen = this.level.enemyArmies.length;
        for(var i=0; i<arrayLen; i++) {
            pos = this.gameObj.map.getXYFromColRow(this.level.enemyArmies[i].x,this.level.enemyArmies[i].y);
            this.gameObj.enemyArmies.push(new huungry.EnemyArmy().setFill('assets/images/units/'+this.level.enemyArmies[i].image).setPosition(pos.x, pos.y)
                .setGameObj(this.gameObj)
                .setMap(this.gameObj.map)
                .refreshMapPos());
            this.gameObj.enemyArmies[i].image = this.level.enemyArmies[i].image;
            this.gameObj.enemyArmies[i].isQuestGoal = this.level.enemyArmies[i].isQuestGoal;
            this.gameObj.enemyArmies[i].unitsSummary = this.level.enemyArmies[i].unitsSummary;
            this.gameObj.enemyArmies[i].background = this.level.enemyArmies[i].background;
            this.gameObj.enemyArmies[i].init();
            this.gameObj.gameLayer.appendChild(this.gameObj.enemyArmies[i]);
        }
    }
    else {
        arrayLen = enemyArmies.length;
        for(var i=0; i<arrayLen; i++) {
            this.gameObj.enemyArmies.push(new huungry.EnemyArmy().setFill('assets/images/units/'+enemyArmies[i].image).setPosition(enemyArmies[i].x, enemyArmies[i].y)
                .setGameObj(this.gameObj)
                .setMap(this.gameObj.map)
                .refreshMapPos());
            this.gameObj.enemyArmies[i].image = enemyArmies[i].image;
            this.gameObj.enemyArmies[i].isQuestGoal = enemyArmies[i].isQuestGoal;
            this.gameObj.enemyArmies[i].unitsSummary = enemyArmies[i].unitsSummary;
            this.gameObj.enemyArmies[i].background = enemyArmies[i].background;
            this.gameObj.enemyArmies[i].init();
            this.gameObj.gameLayer.appendChild(this.gameObj.enemyArmies[i]);
        }
    }

/*    if(!this.gameObj.isFullVersion) {
        HuungryUI.showUpgradeLink();
    }*/

};

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
        //console.log('col:'+col+' row:'+row+' blocked:'+this.blocked[row][col]);
        //console.log(this);
        return this.blocked[row][col];
    }
}

/**
 * add a element to the map
 * @param {} element
 */
huungry.Map.prototype.addElement = function(element) {
    this.elements.push(element);
}

/**
 * remove a element
 * @param {} element
 */
huungry.Map.prototype.removeElement = function(element) {
    var index = -1;
    for(var i=0; i<this.elements.length; i++) {
        if(element.id == this.elements[i].id) {
            //console.log(this.elements);
            //console.log('removed:'+i);
            index = i;
            break;
        }
    }
    if(index >= 0) {
        this.elements.splice(index,1);
        //console.log('after splice');
        //console.log(this.elements);
    }
}

///**
// * add an element to the map
// * @param int col
// * @param int row
// * @param {} element
// */
//huungry.Map.prototype.addElement = function(col, row, element) {
//    this.elements[row][col].elements.push(element);
//}

///**
// * get the element type of a cell
// * @param int col
// * @param int row
// * @return int
// */
//huungry.Map.prototype.getElementType = function(col, row) {
//    return this.elementCells[row][col];
//}

/**
 * get the target element type
 *
 * @param int col
 * @param int row
 */
huungry.Map.prototype.getTargetType = function(col,row) {
    var cellCoord = this.getXYFromColRow(col, row);
    for(var i=0; i<this.elements.length; i++) {
        var elementPos = this.elements[i].getPosition();
        if(cellCoord.x == elementPos.x && cellCoord.y == elementPos.y) {
            return this.elements[i].elementType;
        }
    }

    var blocked = this.isCellBlocked(col, row);
    return blocked ? this.gameObj.BLOCKED_TARGET : this.gameObj.FREE_TARGET;
}

/**
 * get the target element
 *
 * @param int col
 * @param int row
 */
huungry.Map.prototype.getTargetElement = function(col,row) {

    var cellCoord = this.getXYFromColRow(col, row);
    for(var i=0; i<this.elements.length; i++) {
        var elementPos = this.elements[i].getPosition();
        if(cellCoord.x == elementPos.x && cellCoord.y == elementPos.y) {
            return this.elements[i];
        }
    }
    return false;
}

/**
 * get an adyacent element if any
 *
 * @param {} element
 * @param int elementType
 * @return {}
 */
huungry.Map.prototype.getAdjacentElement = function(element, elementType) {
    var elementPos = element.getPosition();
    var cellPos = this.getColRowFromXY(elementPos.x, elementPos.y);

    var adjacentElements = [];
    var foundElement;
    if(cellPos.col-1 >= 0) {
        foundElement = this.getTargetElement(cellPos.col-1,cellPos.row);
//        console.log(foundElement);
//        console.log('type:'+foundElement.elementType);
//        console.log('type2:'+elementType);
//        console.log(foundElement && foundElement.elementType == elementType);

        if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}

        if(cellPos.row-1 >= 0) {
            foundElement = this.getTargetElement(cellPos.col-1,cellPos.row-1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}

            foundElement = this.getTargetElement(cellPos.col,cellPos.row-1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}
        }

        if(cellPos.row+1 < this.num_rows) {
            foundElement = this.getTargetElement(cellPos.col-1,cellPos.row+1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}

            foundElement = this.getTargetElement(cellPos.col,cellPos.row+1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}
        }

    }
    //console.log(adjacentElements);
    if(cellPos.col+1 < this.num_cols) {
        foundElement = this.getTargetElement(cellPos.col+1,cellPos.row);
        if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}

        if(cellPos.row-1 >= 0) {
            foundElement = this.getTargetElement(cellPos.col+1,cellPos.row-1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}
        }

        if(cellPos.row+1 < this.num_rows) {
            foundElement = this.getTargetElement(cellPos.col+1,cellPos.row+1);
            if(foundElement && foundElement.elementType == elementType) {adjacentElements.push(foundElement);}
        }

    }
    //console.log(adjacentElements.length);
    //console.log(adjacentElements.length > 0);
    if(adjacentElements.length > 0) {
        //console.log('in');
        var index = goog.math.randomInt(adjacentElements.length);
        //console.log('adjacent elements:'+JSON.stringify(adjacentElements));
        //console.log('chosen index:'+index);
        //console.log('chosen element:'+adjacentElements[index]);
        return adjacentElements[index];
    }
    else {
        //console.log('no adjacent elements');
        return false;
    }
};

/**
 * set level of the map, if any
 * @param level name of the level file
 */
huungry.Map.prototype.setLevel = function(level) {
    this.level = huungryGameMaps[level];

    this.gameObj.width = this.level.width;
    this.gameObj.height = this.level.height;
    this.setJsonMap(this.level.tiledData,'blocked');
    this.setBackground(this.level.image);
    this.playerInitialX = this.level.playerInitialX;
    this.playerInitialY = this.level.playerInitialY;

    return this;
};