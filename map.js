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
    
    console.log(blockedMap);
    
    this.blockedMap = new Graph(blockedMap);
    
    //console.log(this.blockedMap);
    
    //save map dimensions
    this.width = this.tmx.width * this.tmx.tilewidth;
    this.height = this.tmx.height * this.tmx.tileheight;
}

/*
 * get map cell row and col from map x and y
 * @param x map x coordinate
 * @param y map y coordinate
 */
huungry.Map.prototype.getColRowFromXY = function(x,y) {
        
	var col = parseInt((x - x%this.tmx.tilewidth)/this.tmx.tilewidth);
	var row = parseInt((y - y%this.tmx.tileheight)/this.tmx.tileheight);
	
	return {'col': col, 'row': row};
}