//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.Frame');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.FadeTo');
goog.require('goog.math');
goog.require('huungry.Map');
goog.require('huungry.Character');
goog.require('huungry.Player');
goog.require('huungry.Item');
goog.require('huungry.Shop');
goog.require('huungry.EnemyArmy');
goog.require('huungry.ControlsLayer');
goog.require('huungry.DialogScene');
goog.require('huungry.FightEngine');
goog.require('huungry.Unit');
goog.require('lime.GlossyButton');

// entrypoint
huungry.start = function(){

    //main game object
    var gameObj = {
        screenWidth: 240,
        screenHeight: 160,
        tileSize: 20,
        width: 1000,
        height: 1000,
        FREE_TARGET: 1,
        PLAYER_ARMY: 2,
        ENEMY_ARMY: 3,
        PLAYER_UNIT: 4,
        ENEMY_UNIT: 5,
        BLOCKED_TARGET: 6,
        ITEM_TARGET: 7,
        SHOP_TARGET: 8,
        CITY_TARGET: 9,
        QUEST_TARGET: 10
    };    
    gameObj.screenNumTilesX = gameObj.screenWidth/gameObj.tileSize;
    gameObj.screenNumTilesY = gameObj.screenHeight/gameObj.tileSize;
    
    //area in fight scene where units appear
    gameObj.fightScenePlayerStartX = 5;
    gameObj.fightScenePlayerEndX = 6;
    gameObj.fightScenePlayerStartY = 0;
    gameObj.fightScenePlayerEndY = gameObj.screenNumTilesY-2;
    
    gameObj.fightSceneEnemyStartX = gameObj.screenNumTilesX-4;
    gameObj.fightSceneEnemyEndX = gameObj.screenNumTilesX-2;
    gameObj.fightSceneEnemyStartY = 0;
    gameObj.fightSceneEnemyEndY = gameObj.screenNumTilesY-2;
    
    gameObj.maxRandPercentage = 0.2;
    
    //probability that a range attack unit shoots
    gameObj.shootProbability = 0.85;
    
    //animation
    gameObj.animationOn = true;
    gameObj.movementDuration = 0.2;
    

    gameObj.director = new lime.Director(document.body, gameObj.screenWidth, gameObj.screenHeight);
    gameObj.director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);

    //game scene
    gameObj.gameScene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    gameObj.gameLayer = new lime.Layer().setAnchorPoint(0, 0);
    gameObj.darknessLayer = new lime.Layer().setAnchorPoint(0, 0);
    gameObj.gameScene.appendChild(gameObj.gameLayer);
    gameObj.gameScene.appendChild(gameObj.darknessLayer);

    //game map
    gameObj.map = new huungry.Map().setGameObj(gameObj)
        .setJsonMap(BlockedCells.mainMap, 'blocked')
        .setBackground('assets/world_map.png');

    gameObj.map.init();
    
    //items
    gameObj.loadItems = function() {        
        for(var i=0, arrayLen = MapItems.length; i<arrayLen; i++) {
            var pos = gameObj.map.getXYFromColRow(MapItems[i].x,MapItems[i].y);
            var item = new huungry.Item()
                .setGameObj(gameObj)
                .setPosition(pos.x, pos.y)
                .setMap(gameObj.map)
                .refreshMapPos()
                .setData(MapItems[i])
                .init();
            gameObj.gameLayer.appendChild(item);
        }
    };
    gameObj.loadItems();
    
    //init unit types
    gameObj.cloneUnit = function(unit) {
        var cloned= {
                id: unit.id,
                name: unit.name,
                image: unit.image,
                attack: unit.attack,
                defense: unit.defense,
                canShoot: unit.canShoot,
                life: unit.life,
                gold: unit.gold
        }
        return cloned;
    }
    
    gameObj.unitTypes = new Array();
    for(var i=0, arrayLen = UnitTypes.length; i<arrayLen; i++) {
        gameObj.unitTypes[UnitTypes[i].id] = UnitTypes[i];
    }
    
    //shops
    gameObj.loadShops = function() {        
        for(var i=0, arrayLen = MapShops.length; i<arrayLen; i++) {
            var pos = gameObj.map.getXYFromColRow(MapShops[i].x,MapShops[i].y);
            var shop = new huungry.Shop()
                .setGameObj(gameObj)
                .setPosition(pos.x, pos.y)
                .setMap(gameObj.map)
                .refreshMapPos()
                .setData(MapShops[i])
                .init();
            gameObj.gameLayer.appendChild(shop);
        }
    };
    gameObj.loadShops();

    //player
    var pos = gameObj.map.getXYFromColRow(10,2);
    gameObj.player = new huungry.Player().setFill('assets/player.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();
    
    gameObj.player.init();
    gameObj.player.maxNumUnits = 14;   
    gameObj.player.units = [
        gameObj.cloneUnit(gameObj.unitTypes['axeman']),
        gameObj.cloneUnit(gameObj.unitTypes['axeman']),
        gameObj.cloneUnit(gameObj.unitTypes['soldier']),
        gameObj.cloneUnit(gameObj.unitTypes['soldier']),
        gameObj.cloneUnit(gameObj.unitTypes['archer'])
    ];
    
    
    gameObj.gameLayer.appendChild(gameObj.player);

    gameObj.player.toggleGamepad(true);
    
    //enemyArmies
    gameObj.loadEnemies = function() {        
        gameObj.enemyArmies = new Array();
        for(var i=0, arrayLen = MapEnemyArmies.length; i<arrayLen; i++) {
            var pos = gameObj.map.getXYFromColRow(MapEnemyArmies[i].x,MapEnemyArmies[i].y);
            gameObj.enemyArmies.push(new huungry.EnemyArmy().setFill('assets/'+MapEnemyArmies[i].image).setPosition(pos.x, pos.y)
                .setGameObj(gameObj)
                .setMap(gameObj.map)
                .refreshMapPos()); 
            gameObj.enemyArmies[i].unitsSummary = MapEnemyArmies[i].unitsSummary;
            gameObj.enemyArmies[i].init();
            gameObj.gameLayer.appendChild(gameObj.enemyArmies[i]);
        }
    };
    gameObj.loadEnemies();
    
     
    //init map visibility
    gameObj.darkness = new Array();
    for(i = 0, arrayLen = gameObj.map.num_cols; i<arrayLen; i++) {        
        gameObj.darkness.push(new Array());
        for(var j = 0, arrayLen2 = gameObj.map.num_rows; j<arrayLen2; j++) {
            gameObj.darkness[i][j] = 1;            
        }        
    }
    
    /**
     * set visiblity of map cells that are on the screen. Create darkness
     * black polygons to cover unvisible areas
     */
    gameObj.updateVisiblity = function(col,row) {
        gameObj.darkness[col][row]= 0;;
        
        if(col-1 >= 0 && row-1 >= 0) {
            gameObj.darkness[col-1][row-1]= 0;  
            
            if(col-2 >= 0 && row-1 >= 0) {
                gameObj.darkness[col-2][row-1]= 0;
            }
            
            if(col-1 >= 0 && row-2 >= 0) {
                gameObj.darkness[col-1][row-2]= 0;
            }
        }
        if(col-1 >= 0) {
            gameObj.darkness[col-1][row]= 0;
            
            if(col-2 >= 0) {
                gameObj.darkness[col-2][row]= 0;
            }
        }
        if(col-1 >= 0 && row+1 < gameObj.map.num_rows) {
            gameObj.darkness[col-1][row+1]= 0;
            
            if(col-2 >= 0 && row+1 < gameObj.map.num_rows) {
                gameObj.darkness[col-2][row+1]= 0;
            }
            if(col-1 >= 0 && row+2 < gameObj.map.num_rows) {
                gameObj.darkness[col-1][row+2]= 0;
            }
        }
        if(row-1 >= 0) {
            gameObj.darkness[col][row-1]= 0;
            
            if(row-2 >= 0) {
                gameObj.darkness[col][row-2]= 0;
            }
        }
        if(row+1 < gameObj.map.num_rows) {
            gameObj.darkness[col][row+1]= 0;
            
            if(row+2 < gameObj.map.num_rows) {
                gameObj.darkness[col][row+2]= 0;
            }
            
        }
        if(col+1 < gameObj.map.num_cols && row-1 >= 0) {
            gameObj.darkness[col+1][row-1]= 0;
            
            if(col+2 < gameObj.map.num_cols && row-1 >= 0) {
                gameObj.darkness[col+2][row-1]= 0;
            }
            if(col+1 < gameObj.map.num_cols && row-2 >= 0) {
                gameObj.darkness[col+1][row-2]= 0;
            }
        }
        if(col+1 < gameObj.map.num_cols) {
            gameObj.darkness[col+1][row]= 0;
            
            if(col+2 < gameObj.map.num_cols) {
                gameObj.darkness[col+2][row]= 0;
            }
        }
        if(col+1 < gameObj.map.num_cols && row+1 < gameObj.map.num_rows) {
            gameObj.darkness[col+1][row+1]= 0;
            
            if(col+2 < gameObj.map.num_cols && row+1 < gameObj.map.num_rows) {
                gameObj.darkness[col+2][row+1]= 0;
            }            
            if(col+1 < gameObj.map.num_cols && row+2 < gameObj.map.num_rows) {
                gameObj.darkness[col+1][row+2]= 0;
            }            
        }
        
        var layerPos = gameObj.gameLayer.getPosition();
        var offsetX = -layerPos.x/gameObj.tileSize; 
        var offsetY = -layerPos.y/gameObj.tileSize; 
        
        console.log('offsetX:'+offsetX);
        console.log('offsetY:'+offsetY);
        
        gameObj.darknessLayer.removeAllChildren(); 
        gameObj.darknessLayer.setPosition(0,0); 
        var darknessCell;
        //console.log(gameObj.darkness);
        var currStart;
        var creatingBlock = false;
        for(i=-1; i < gameObj.screenNumTilesY+1; i++) {
            for(j=-1; j < gameObj.screenNumTilesX+1; j++) {    
                
                //if it's dark, then start or continue darkness      
                if(offsetY+i != -1 && offsetX+j != -1) {
                    if(gameObj.darkness[offsetX+j][offsetY+i]) {
                        if(!creatingBlock) {
                            creatingBlock = true;
                            currStart = {col: j, row: i};
                        }
                    }
                    else {
                        if(creatingBlock) {
                            creatingBlock = false;
                            darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
                                setPosition(currStart.col*gameObj.map.tileSize,currStart.row*gameObj.map.tileSize).
                                setSize(gameObj.map.tileSize*(j - currStart.col),gameObj.map.tileSize);
                            gameObj.darknessLayer.appendChild(darknessCell);
                        }
                    }            
                } 
            }
            if(creatingBlock) {
                creatingBlock = false;
//                console.log('i:'+i);
//                console.log('start position x:'+currStart.col*gameObj.map.tileSize);
//                console.log('start position y:'+currStart.row*gameObj.map.tileSize);
//                console.log('size x:'+gameObj.map.tileSize*(j-1 - currStart.col));
                darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
                    setPosition(currStart.col*gameObj.map.tileSize,currStart.row*gameObj.map.tileSize).
                    setSize(gameObj.map.tileSize*(j-1 - currStart.col),gameObj.map.tileSize);
                gameObj.darknessLayer.appendChild(darknessCell);
            }
        }
               
    };
    
    /**
     * center map layer to a coordinate
     * @param x
     * @param y
     */
    gameObj.centerCameraTo = function(x,y) {
//        console.log('x:'+x);
//        console.log('y:'+y);
//        
//        console.log('x+gameObj.screenWidth/2:'+Math.round((-x+gameObj.screenWidth/2)));
//        console.log('y+gameObj.screenHeight/2:'+Math.round((-y+gameObj.screenHeight/2)));
//               

        
        gameObj.gameLayer.setPosition(Math.min(0,Math.round(-x+gameObj.screenWidth/2)),Math.min(0,Math.round(-y+gameObj.screenHeight/2)));
    };
    
    var playerPos = gameObj.player.getPosition();
    var playerPosCR = gameObj.map.getColRowFromXY(playerPos.x,playerPos.y);
    gameObj.updateVisiblity(playerPosCR.col, playerPosCR.row);
    
    //controls layer
    gameObj.controlsLayer = new huungry.ControlsLayer().setGameObj(gameObj);
    gameObj.controlsLayer.init();
    gameObj.gameScene.appendChild(gameObj.controlsLayer);
    
    gameObj.controlsLayer.refreshInfo();

    
    //fight scene
    gameObj.fight = function(enemy) {        
        var FightEngine = new huungry.FightEngine().setGameObj(gameObj).setEnemyArmy(enemy);
        FightEngine.init();
    }
    
    //player details screen
    gameObj.playerInfoScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(gameObj.width, gameObj.height-500).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(gameObj.tileSize*10, gameObj.tileSize*7)
        .setSize(gameObj.tileSize*2, gameObj.tileSize);
    gameObj.playerInfoScene.appendChild(winBackground);
    gameObj.playerInfoScene.appendChild(closeButton);
    gameObj.playerInfoLayer = new lime.Layer().setAnchorPoint(0, 0);            
    gameObj.playerInfoScene.appendChild(gameObj.playerInfoLayer);
    
    //close event
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });

    //launch event
    goog.events.listen(gameObj.player,['mousedown', 'touchstart'], function(e) {
        console.log(gameObj.playerInfoScene);
        gameObj.playerInfoLayer.removeAllChildren();
        
        //player units
        for(var i=0; i<gameObj.player.units.length; i++) {          
            var label = new lime.Label().setText(gameObj.player.units[i].name+' - '+Math.ceil(gameObj.player.units[i].life)).setFontColor('#E8FC08')
            .setPosition(gameObj.tileSize/4, gameObj.tileSize+gameObj.tileSize*2/3*i).setAnchorPoint(0,0);
            gameObj.playerInfoLayer.appendChild(label);
        }
        gameObj.director.replaceScene(gameObj.playerInfoScene);
    });
    
    //open when clicking on the player
    //goog.events.listen()
    //
    //
    //
    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);
    
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
