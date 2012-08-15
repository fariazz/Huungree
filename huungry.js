//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.Frame');
goog.require('lime.animation.MoveTo');
goog.require('goog.math');
goog.require('huungry.Map');
goog.require('huungry.Character');
goog.require('huungry.Player');
goog.require('huungry.City');
goog.require('huungry.Enemy');
goog.require('huungry.DialogScene');
goog.require('lime.GlossyButton');

WIDTH = 176*2;
HEIGHT = 128*2;

// entrypoint
huungry.start = function(){
    
    var newMap = { "height":20,
 "layers":[
        {
         "data":[74, 74, 74, 241, 241, 29, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 74, 74, 26, 26, 29, 56, 56, 241, 241, 241, 241, 241, 241, 243, 241, 241, 243, 243, 241, 241, 241, 241, 241, 206, 66, 67, 68, 241, 241, 241, 74, 74, 26, 26, 29, 74, 55, 55, 241, 241, 241, 241, 241, 241, 241, 243, 241, 206, 64, 241, 241, 206, 206, 241, 84, 85, 86, 241, 241, 241, 241, 241, 26, 29, 29, 74, 92, 92, 92, 241, 241, 241, 241, 241, 241, 241, 206, 241, 241, 241, 241, 241, 55, 55, 55, 55, 55, 241, 241, 241, 241, 241, 241, 29, 74, 74, 74, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 29, 92, 92, 92, 92, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 29, 29, 241, 241, 241, 241, 10, 11, 11, 11, 11, 11, 11, 11, 12, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 29, 241, 241, 241, 28, 29, 29, 29, 29, 29, 29, 29, 29, 11, 11, 11, 11, 11, 11, 12, 241, 241, 241, 243, 241, 241, 241, 241, 243, 241, 241, 29, 241, 241, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 30, 241, 243, 243, 241, 241, 241, 241, 243, 241, 241, 243, 29, 29, 29, 29, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 47, 48, 241, 241, 243, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 185, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 185, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 243, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 64, 241, 241, 241, 241, 241, 55, 55, 55, 55, 241, 241, 241, 241, 241, 241, 241, 241, 241, 243, 241, 55, 55, 55, 55, 241, 241, 241, 241, 241, 64, 241, 241, 241, 241, 241, 241, 74, 74, 74, 74, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 206, 64, 64, 35, 35, 241, 241, 241, 241, 74, 74, 74, 74, 74, 74, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 64, 64, 64, 35, 35, 35, 35, 35, 241, 92, 92, 92, 92, 92, 92, 241, 241, 241, 241, 241, 241, 185, 241, 241, 241, 241, 241, 241, 64, 64, 64, 64, 64, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 53, 2, 2, 2, 2, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 20, 20, 20, 53, 20, 20, 20, 20, 53, 53, 20, 20, 20, 20, 20, 20, 53, 20, 20, 63, 63, 63, 63, 63, 63, 64, 63, 63, 63, 63],
         "height":20,
         "name":"map",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":30,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 0, 0, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307, 307],
         "height":20,
         "name":"blocked",
         "opacity":0.75,
         "type":"tilelayer",
         "visible":true,
         "width":30,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "image":"set_0.gif",
         "imageheight":288,
         "imagewidth":288,
         "margin":0,
         "name":"set_0",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":16,
         "tileproperties":
            {
             "25":
                {
                 "blocked":"1"
                },
             "28":
                {
                 "blocked":"1"
                }
            },
         "tilewidth":16
        }],
 "tilewidth":16,
 "version":1,
 "width":30
};
  
    
    //main game object
    var gameObj = {};
    
    gameObj.director = new lime.Director(document.body,WIDTH, HEIGHT);
    gameObj.director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);
    
    //lime.scheduleManager.setDisplayRate(1000/30);
    
    //game scene
    gameObj.gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    gameObj.gameLayer = new lime.Layer().setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
    gameObj.gameScene.appendChild(gameObj.gameLayer);
    
    
    
    console.log(newMap);
    
    //load tileset
    tile_image = 'assets/'+newMap.tilesets[0].image;
    tileset = {};    
    tileset_w = newMap.tilesets[0].imagewidth/newMap.tilesets[0].tilewidth;
    tileset_h = newMap.tilesets[0].imageheight/newMap.tilesets[0].tileheight;    
    num_tiles = tileset_w*tileset_h;
    
    for(var i=0; i < num_tiles; i++) {
        var tile = {};
        
        var col = i % tileset_w;
        var row = Math.floor(i/tileset_w);
        var pos_x = col*newMap.tilesets[0].tilewidth;
        var pos_y = row*newMap.tilesets[0].tileheight;
        
        tile.frame = new lime.fill.Frame(tile_image, pos_x, pos_y, newMap.tilesets[0].tilewidth, newMap.tilesets[0].tileheight);
        tileset[i] = tile;
        
//        s = new lime.Sprite().setAnchorPoint(0, 0).setFill(tile.frame).setPosition(pos_x, pos_y).setSize(newMap.tilesets[0].tilewidth,newMap.tilesets[0].tileheight);
//        gameObj.gameScene.appendChild(s);
    }
    
    
    
    map_tiles = {};
    map_w = newMap.layers[0].width;
    map_h = newMap.layers[0].height;
    
    for(var i=0; i < newMap.layers[0].data.length; i++) {
        
        var col = i % map_w;
        var row = Math.floor(i/map_w);
        var pos_x = col*newMap.tilesets[0].tilewidth;
        var pos_y = row*newMap.tilesets[0].tileheight;
        
        map_tiles[i] = new lime.Sprite().setAnchorPoint(0, 0).setFill(tileset[newMap.layers[0].data[i]-1].frame).setPosition(pos_x, pos_y).setSize(newMap.tilesets[0].tilewidth,newMap.tilesets[0].tileheight);
        gameObj.gameScene.appendChild(map_tiles[i]);
    }
    
    
    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
