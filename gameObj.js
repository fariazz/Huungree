goog.provide('huungry.GameObj');

/*
 * GameObj
 */
huungry.GameObj = function(document) {
    this.screenWidth = 240;
    this.screenHeight= 160;
    this.tileSize= 20;
    this.FREE_TARGET= 1;
    this.PLAYER_ARMY= 2;
    this.ENEMY_ARMY= 3;
    this.PLAYER_UNIT= 4;
    this.ENEMY_UNIT= 5;
    this.BLOCKED_TARGET= 6;
    this.ITEM_TARGET= 7;
    this.SHOP_TARGET= 8;
    this.CITY_TARGET= 9;
    this.QUEST_TARGET= 10;
      
    this.screenNumTilesX = this.screenWidth/this.tileSize;
    this.screenNumTilesY = this.screenHeight/this.tileSize;
    
    //area in fight scene where units appear
    this.fightScenePlayerStartX = 5;
    this.fightScenePlayerEndX = 6;
    this.fightScenePlayerStartY = 0;
    this.fightScenePlayerEndY = this.screenNumTilesY-2;
    
    this.fightSceneEnemyStartX = this.screenNumTilesX-4;
    this.fightSceneEnemyEndX = this.screenNumTilesX-2;
    this.fightSceneEnemyStartY = 0;
    this.fightSceneEnemyEndY = this.screenNumTilesY-2;
    
    this.maxRandPercentage = 0.2;
    
    //probability that a range attack unit shoots
    this.shootProbability = 0.85;
    
    //animation
    this.animationOn = true;
    this.movementDuration = 0.2;
    

    this.director = new lime.Director(document.body, this.screenWidth, this.screenHeight);
    this.director.makeMobileWebAppCapable();
    
};

/**
 * create a deep copy of a unit
 * @param {huungry.Unit} unit
 */
huungry.GameObj.prototype.cloneUnit = function(unit) {
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
};

/**
 * load and open a level
 * @param levelName
 */
huungry.GameObj.prototype.runLevel = function(levelName) {
    
    //game scene
    this.gameScene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    this.gameLayer = new lime.Layer().setAnchorPoint(0, 0);
    this.darknessLayer = new lime.Layer().setAnchorPoint(0, 0);
    this.gameScene.appendChild(this.gameLayer);
    this.gameScene.appendChild(this.darknessLayer);
    
    //game map
    this.map = new huungry.Map().setGameObj(this)
        .setLevel(levelName);
    this.map.init();
    this.map.initLevel();
    
    //init map visibility
    this.darkness = new Array();
    for(i = 0, arrayLen = this.map.num_cols; i<arrayLen; i++) {        
        this.darkness.push(new Array());
        for(var j = 0, arrayLen2 = this.map.num_rows; j<arrayLen2; j++) {
            this.darkness[i][j] = 1;            
        }        
    }
    
    //place player
    var pos = this.map.getXYFromColRow(this.map.playerInitialX,this.map.playerInitialY);
    this.player.setPosition(pos.x, pos.y);
    this.player.setMap(this.map);
    this.player.refreshMapPos()
    this.player.init();
    
    this.gameLayer.appendChild(this.player);
    this.player.toggleGamepad(true);
    this.updateVisiblity(this.map.playerInitialX, this.map.playerInitialY);
    
    //controls layer
    this.controlsLayer = new huungry.ControlsLayer().setGameObj(this);
    this.controlsLayer.init();
    this.gameScene.appendChild(this.controlsLayer);    
    this.controlsLayer.refreshInfo();
    
    this.director.replaceScene(this.gameScene);
};

/**
* set visiblity of map cells that are on the screen. Create darkness
* black polygons to cover unvisible areas
* 
* @param col location of the player
* @param row location of the player
*/
huungry.GameObj.prototype.updateVisiblity = function(col,row) {
   this.darkness[col][row]= 0;;

   if(col-1 >= 0 && row-1 >= 0) {
       this.darkness[col-1][row-1]= 0;  

       if(col-2 >= 0 && row-1 >= 0) {
           this.darkness[col-2][row-1]= 0;
       }

       if(col-1 >= 0 && row-2 >= 0) {
           this.darkness[col-1][row-2]= 0;
       }
   }
   if(col-1 >= 0) {
       this.darkness[col-1][row]= 0;

       if(col-2 >= 0) {
           this.darkness[col-2][row]= 0;
       }
   }
   if(col-1 >= 0 && row+1 < this.map.num_rows) {
       this.darkness[col-1][row+1]= 0;

       if(col-2 >= 0 && row+1 < this.map.num_rows) {
           this.darkness[col-2][row+1]= 0;
       }
       if(col-1 >= 0 && row+2 < this.map.num_rows) {
           this.darkness[col-1][row+2]= 0;
       }
   }
   if(row-1 >= 0) {
       this.darkness[col][row-1]= 0;

       if(row-2 >= 0) {
           this.darkness[col][row-2]= 0;
       }
   }
   if(row+1 < this.map.num_rows) {
       this.darkness[col][row+1]= 0;

       if(row+2 < this.map.num_rows) {
           this.darkness[col][row+2]= 0;
       }

   }
   if(col+1 < this.map.num_cols && row-1 >= 0) {
       this.darkness[col+1][row-1]= 0;

       if(col+2 < this.map.num_cols && row-1 >= 0) {
           this.darkness[col+2][row-1]= 0;
       }
       if(col+1 < this.map.num_cols && row-2 >= 0) {
           this.darkness[col+1][row-2]= 0;
       }
   }
   if(col+1 < this.map.num_cols) {
       this.darkness[col+1][row]= 0;

       if(col+2 < this.map.num_cols) {
           this.darkness[col+2][row]= 0;
       }
   }
   if(col+1 < this.map.num_cols && row+1 < this.map.num_rows) {
       this.darkness[col+1][row+1]= 0;

       if(col+2 < this.map.num_cols && row+1 < this.map.num_rows) {
           this.darkness[col+2][row+1]= 0;
       }            
       if(col+1 < this.map.num_cols && row+2 < this.map.num_rows) {
           this.darkness[col+1][row+2]= 0;
       }            
   }

   var layerPos = this.gameLayer.getPosition();
   var offsetX = -layerPos.x/this.tileSize; 
   var offsetY = -layerPos.y/this.tileSize; 

   //console.log('offsetX:'+offsetX);
   //console.log('offsetY:'+offsetY);

   this.darknessLayer.removeAllChildren(); 
   this.darknessLayer.setPosition(0,0); 
   var darknessCell;
   //console.log(this.darkness);
   var currStart;
   var creatingBlock = false;
   for(i=0; i < this.screenNumTilesY; i++) {
       for(j=0; j < this.screenNumTilesX; j++) {    

           //if it's dark, then start or continue darkness  
           //console.log('offsetY+i:'+(offsetY+i));
           //console.log('offsetX+j:'+(offsetX+j));
           if(offsetY+i != -1 && offsetX+j != -1 && this.darkness[offsetX+j] !== undefined) {
               if(this.darkness[offsetX+j][offsetY+i]) {
                   if(!creatingBlock) {
                       creatingBlock = true;
                       currStart = {col: j, row: i};
                   }
               }
               else {
                   if(creatingBlock) {
                       creatingBlock = false;
                       darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
                           setPosition(currStart.col*this.map.tileSize,currStart.row*this.map.tileSize).
                           setSize(this.map.tileSize*(j - currStart.col),this.map.tileSize);
                       this.darknessLayer.appendChild(darknessCell);
                   }
               }            
           } 
       }
       if(creatingBlock) {
           creatingBlock = false;
//                console.log('i:'+i);
//                console.log('start position x:'+currStart.col*this.map.tileSize);
//                console.log('start position y:'+currStart.row*this.map.tileSize);
//                console.log('size x:'+this.map.tileSize*(j-1 - currStart.col));
           darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
               setPosition(currStart.col*this.map.tileSize,currStart.row*this.map.tileSize).
               setSize(this.map.tileSize*(j-1 - currStart.col),this.map.tileSize);
           this.darknessLayer.appendChild(darknessCell);
       }
   }

};

/**
 * center map layer to a coordinate
 * @param x
 * @param y
 */
huungry.GameObj.prototype.centerCameraTo = function(x,y) {
//        console.log('x:'+x);
//        console.log('y:'+y);
//        
//        console.log('x+gameObj.screenWidth/2:'+Math.round((-x+gameObj.screenWidth/2)));
//        console.log('y+gameObj.screenHeight/2:'+Math.round((-y+gameObj.screenHeight/2)));
//               

    this.gameLayer.setPosition(Math.min(0,Math.round(-x+this.screenWidth/2-this.tileSize)),Math.min(0,Math.round(-y+this.screenHeight/2)));
};

//fight scene
huungry.GameObj.prototype.fight = function(enemy) {
    var FightEngine = new huungry.FightEngine().setGameObj(this).setEnemyArmy(enemy);
    FightEngine.init();
}

/**
 * load and open a level
 * @param {Array} unitTypes
 */
huungry.GameObj.prototype.setUnitTypes = function(unitTypes) {
    
    this.unitTypes = new Array();
    for(var i=0, arrayLen = unitTypes.length; i<arrayLen; i++) {
        this.unitTypes[unitTypes[i].id] = unitTypes[i];
    }
    return this;
};
