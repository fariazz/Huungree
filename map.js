goog.provide('huungry.Map');
goog.require('lime.parser.TMX');

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

huungry.Map.prototype.setTMXFile = function(tmx_file) {
    this.tmx_file = tmx_file;
    return this;
}

huungry.Map.prototype.setLayer = function(layer) {
    this.layer = layer;
    return this;
}

huungry.Map.prototype.init = function() {
    
    //load tiled map
    this.tmx = new lime.parser.TMX(this.tmx_file);
    
    this.tileSize = this.tmx.tilewidth;

console.log(this.tmx);

    //map of blocked tiles for collision detection
    var blockedMap = [];
    var blocked_r = 0;
    var blocked_c = 0;

    for(var r=0; r< this.tmx.width; r++) {
        blockedMap.push([]);
    }
    
    for(var i = 0; i < this.tmx.layers[0].tiles.length; i++) {
        var tile = this.tmx.layers[0].tiles[i];
        var sprite = new lime.Sprite().setPosition(tile.px,tile.py).setAnchorPoint(0,0);
        sprite.setFill(tile.tile.frame);
        this.layer.appendChild(sprite);
       
        if(blocked_c >= this.tmx.width) {
            blocked_c = 0;
            blocked_r++;
        }
        
        if(tile.tile.properties[0] === undefined)
            blockedMap[blocked_c].push(0);
        
        else
            blockedMap[blocked_c].push(1);
        
        blocked_c++;
    }
    
    //console.log(blockedMap);
    
    this.blockedMap = new Graph(blockedMap);
    
    //console.log(this.blockedMap);
    
    //save map dimensions
    this.width = this.tmx.width * this.tileSize;
    this.height = this.tmx.height * this.tileSize;
}

/*
 * get map cell row and col from map x and y
 * @param float x map x coordinate
 * @param float y map y coordinate
 */
huungry.Map.prototype.getColRowFromXY = function(x,y) {
        
	var col = parseInt((x - x%this.tileSize)/this.tileSize);
	var row = parseInt((y - y%this.tileSize)/this.tileSize);
	
	return {'col': col, 'row': row};
}

/*
 * get map coordinate x,y from column and row tile number
 * @param int col tile column
 * @param int row tile row
 */
huungry.Map.prototype.getXYFromColRow = function(col,row) {
    var x = col*this.tileSize;
    var y = row*this.tileSize;

    return {'x':x, 'y':y};
}

/*
 * Highlight a path of cells
 * @param {} path
 * @param {} origin
 */
huungry.Map.prototype.highlightPath = function(path, origin) {
    
    this.removeHighlightPath();
    
    if(origin !== undefined && path.length > 0) {
        var highlightedCell = new lime.Sprite().setAnchorPoint(0,0).setPosition(origin.x, origin.y).setFill(0,0,0,.5).setSize(this.tileSize, this.tileSize);
        this.layer.appendChild(highlightedCell);
        this.highlightedPath.push(highlightedCell);
    }
    
    for(i=0; i<path.length; i++) {
        
        if(i == path.length-1)
        {
            var highlightedCell = new lime.Sprite().setAnchorPoint(0,0).setPosition(path[i].x*this.tileSize, path[i].y*this.tileSize).setFill(120,200,0,0.9).setSize(this.tileSize, this.tileSize);
            
            var map = this;
            goog.events.listen(highlightedCell,['mousedown', 'touchstart'], function(e) {
                e.event.stopPropagation();
                map.player.walkPath();
            });            
        }

        else
            var highlightedCell = new lime.Sprite().setAnchorPoint(0,0).setPosition(path[i].x*this.tileSize, path[i].y*this.tileSize).setFill(0,0,0,.5).setSize(this.tileSize, this.tileSize);
        
        this.layer.appendChild(highlightedCell);
        this.highlightedPath.push(highlightedCell);
     }
}

/*
 * Remove highlight path
 */
huungry.Map.prototype.removeHighlightPath = function() {
    for(i=0; i<this.highlightedPath.length; i++) {
        this.highlightedPath[i].setHidden(true).removeDomElement();
        delete this.highlightedPath[i];
    }
    
    this.highlightedPath = [];
}