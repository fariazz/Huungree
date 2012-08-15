goog.provide('huungry.Map');

/*
 * Map class for tile-based games
 */
huungry.Map = function() {
        
    this.tileOffsetX = 0;
    this.tileOffsetY = 0;
    
    this.pixelOffsetX = 0;
    this.pixelOffsetY = 0;
    
    this.highlightedPath = [];
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
    
    //find collision layer
    for(var i=0; i < jsonMap.layers.length; i++) {
        if(jsonMap.layers[i].name == collision_layer_name) {
            var collision_i = i;
            break;
        }            
    }
    
    //load blocked cells
    this.blockedCells = [[]];
    var current_row = 0;
    for(var i=0; i < jsonMap.layers[collision_i].data.length; i++) {
        var col = i % this.num_cols;
        var row = Math.floor(i/this.num_cols);
        
        if(row > current_row) {
            current_row++;
            this.blockedCells.push([]);
        }
        
        if(jsonMap.layers[collision_i].data[i] > 0) {
            this.blockedCells[row][col] = 1;
        }
        else {
            this.blockedCells[row][col] = 0;
        }
    }
    return this;
}

huungry.Map.prototype.setBackground = function(image_path) {
    this.backgroundSprite = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0).setFill(image_path);
    
    this.moveLeftSprite = new lime.Sprite().setAnchorPoint(0, 0).setPosition(300,80).setFill('#8B5F65').setSize(20,100);
    
    
    
    return this;
}

huungry.Map.prototype.init = function() {
    this.gameObj.gameLayer.appendChild(this.backgroundSprite);
    this.gameObj.gameLayer.appendChild(this.moveLeftSprite);
    
    var map = this;
    goog.events.listen(this.backgroundSprite, ['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        
        cell = map.getColRowFromXY(e.position.x, e.position.y);
        console.log(map.blockedCells[cell.row][cell.col]);
    });
    
    goog.events.listen(this.moveLeftSprite, ['mousedown', 'touchstart'], function(e) {
        //e.event.stopPropagation();
        
        var current_pos = map.backgroundSprite.getPosition();
        map.backgroundSprite.setPosition(current_pos.x-map.tileSize, current_pos.y);
    });
    
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