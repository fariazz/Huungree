goog.provide('huungry.ControlsLayer');

goog.require('lime.Layer');
goog.require('lime.Sprite');

/*
 * Show game controls
 */
huungry.ControlsLayer = function() {
    goog.base(this);
    this.tileFactorLSide = 3;
    this.tileFactorSSide = 1;
    this.setAnchorPoint(0, 0);
    this.setRenderer(lime.Renderer.DOM);
}

goog.inherits(huungry.ControlsLayer,lime.Layer);

huungry.ControlsLayer.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.ControlsLayer.prototype.init = function() {
    this.btnMapMoveRight = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/btnMapMoveRight.png')
        .setPosition(this.gameObj.screenWidth - this.gameObj.tileSize*this.tileFactorSSide-this.gameObj.tileSize,this.gameObj.screenHeight/2-this.gameObj.tileSize*this.tileFactorLSide/2);

    this.btnMapMoveLeft = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/btnMapMoveLeft.png')
        .setPosition(0 ,this.gameObj.screenHeight/2-this.gameObj.tileSize*this.tileFactorLSide/2);

    this.btnMapMoveUp = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/btnMapMoveUp.png')
        .setPosition(this.gameObj.screenWidth/2-this.gameObj.tileSize*this.tileFactorLSide/2 ,0);

    this.btnMapMoveDown = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/btnMapMoveDown.png')
        .setPosition(this.gameObj.screenWidth/2-this.gameObj.tileSize*this.tileFactorLSide/2 ,this.gameObj.screenHeight - this.gameObj.tileSize*this.tileFactorSSide);
    
    this.sideBar = new lime.Sprite().setAnchorPoint(0,0).setFill('#D6B896')
        .setPosition(this.gameObj.screenWidth - this.gameObj.tileSize*this.tileFactorSSide,0)
        .setSize(this.gameObj.tileSize, this.gameObj.screenHeight);
    
    
//    this.appendChild(this.btnMapMoveLeft);
//    this.appendChild(this.btnMapMoveRight);
//    this.appendChild(this.btnMapMoveUp);
//    this.appendChild(this.btnMapMoveDown);
    this.appendChild(this.sideBar);

    //listeners for map navigation
    map = this.gameObj.map;

    goog.events.listen(this.btnMapMoveLeft, ['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();

        var current_pos = map.gameObj.gameLayer.getPosition();

        if(current_pos.x < 0) {
            map.gameObj.gameLayer.setPosition(current_pos.x+map.tileSize, current_pos.y);
            map.gameObj.updateVisiblity(map.gameObj.player.cell.col,map.gameObj.player.cell.row);
        }
    });

    goog.events.listen(this.btnMapMoveRight, ['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();

        var current_pos = map.gameObj.gameLayer.getPosition();

        if(current_pos.x > -map.width + map.gameObj.screenWidth) {
            map.gameObj.gameLayer.setPosition(current_pos.x-map.tileSize, current_pos.y);
            map.gameObj.updateVisiblity(map.gameObj.player.cell.col,map.gameObj.player.cell.row);
        }
    });

    goog.events.listen(this.btnMapMoveUp, ['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();

        var current_pos = map.gameObj.gameLayer.getPosition();

        if(current_pos.y < 0) {
            map.gameObj.gameLayer.setPosition(current_pos.x, current_pos.y+map.tileSize);
            map.gameObj.updateVisiblity(map.gameObj.player.cell.col,map.gameObj.player.cell.row);
        }
    });

    goog.events.listen(this.btnMapMoveDown, ['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();

        var current_pos = map.gameObj.gameLayer.getPosition();

        if(current_pos.y > -map.height + map.gameObj.screenHeight) {
            map.gameObj.gameLayer.setPosition(current_pos.x, current_pos.y-map.tileSize);
            map.gameObj.updateVisiblity(map.gameObj.player.cell.col,map.gameObj.player.cell.row);
        }
    });
    
    //side bar
    this.goldValue = new lime.Label().setPosition(2,5).setText()
        .setAnchorPoint(0,0).setFontColor('#000000').setFontSize(8);
        
    this.sideBar.appendChild(this.goldValue);    
    
    //player details window
    this.initPlayerInfoWindow();
    this.initArrangeArmiesWindow();
    this.initItemsWindow();
    
}

/**
 * refresh player info
 */
huungry.ControlsLayer.prototype.refreshInfo = function() {
    this.goldValue.setText(this.gameObj.player.gold);
}

/**
 * init player info window
 */
huungry.ControlsLayer.prototype.initPlayerInfoWindow = function() {
    //icon to launch
    var infoWindowBtn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize*0.8, this.gameObj.tileSize*0.8)
        .setFill('assets/images/units/knight.png')
        .setPosition(this.gameObj.tileSize*0.1, this.gameObj.tileSize);
    this.sideBar.appendChild(infoWindowBtn);
    
    //player details screen
    var playerInfoScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.width, this.gameObj.height).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(this.gameObj.tileSize*10, this.gameObj.tileSize*7)
        .setSize(this.gameObj.tileSize*2, this.gameObj.tileSize);
    playerInfoScene.appendChild(winBackground);
    playerInfoScene.appendChild(closeButton);         
        
    //title
    var y_title = this.gameObj.tileSize/2;
    var h_row = this.gameObj.tileSize/2+2;
    var title = new lime.Label().setText('Units').setFontColor('#E8FC08')
        .setPosition(this.gameObj.tileSize/3, y_title).setAnchorPoint(0,0)
        .setFontSize(11);
    playerInfoScene.appendChild(title);
    
    //close event
    var gameObj = this.gameObj;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });
    
    playerInfoLayer = new lime.Layer().setAnchorPoint(0, 0);       
    playerInfoScene.appendChild(playerInfoLayer);
    
    //launch event
    goog.events.listen(infoWindowBtn,['mousedown', 'touchstart'], function(e) {
        playerInfoLayer.removeAllChildren();
        
        //player units
        var thumbnail, label;
        for(var i=0; i<gameObj.player.units.length; i++) {          
            thumbnail = new lime.Sprite().setAnchorPoint(0,0)
                .setSize(gameObj.tileSize/2*0.8,gameObj.tileSize/2*0.8)
                .setFill('assets/'+gameObj.player.units[i].image)
                .setPosition(gameObj.tileSize/3, y_title+gameObj.tileSize+h_row*i);
            playerInfoLayer.appendChild(thumbnail);
            
            label = new lime.Label().setText(Math.ceil(gameObj.player.units[i].life)+' x '+gameObj.player.units[i].name+' (attack:'+gameObj.player.units[i].attack+' defense:'+gameObj.player.units[i].defense+')')
            .setFontColor('#E8FC08').setFontSize(9)
            .setPosition(gameObj.tileSize, y_title+gameObj.tileSize+h_row*i).setAnchorPoint(0,0);
            playerInfoLayer.appendChild(label);
        }
        gameObj.director.replaceScene(playerInfoScene);
    });
}

/**
 * init player arrange armies window
 */
huungry.ControlsLayer.prototype.initArrangeArmiesWindow = function() {
    //icon to launch
    var arrangeArmiesBtn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize*0.8, this.gameObj.tileSize*0.8)
        .setFill('assets/images/units/knight.png')
        .setPosition(this.gameObj.tileSize*0.1, this.gameObj.tileSize*2.2);
    this.sideBar.appendChild(arrangeArmiesBtn);
    
    //player details screen
    arrangeArmiesScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.width, this.gameObj.height).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(this.gameObj.tileSize*10, this.gameObj.tileSize*7)
        .setSize(this.gameObj.tileSize*2, this.gameObj.tileSize);
    arrangeArmiesScene.appendChild(winBackground);
    arrangeArmiesScene.appendChild(closeButton);
    
    //title
    var y_title = this.gameObj.tileSize/2;
    var title = new lime.Label().setText('Arrange Units').setFontColor('#E8FC08')
        .setPosition(this.gameObj.tileSize/3, y_title).setAnchorPoint(0,0)
        .setFontSize(11);
    arrangeArmiesScene.appendChild(title);
    
    //close event
    var gameObj = this.gameObj;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });
    
    var gridX = 5, gridY= 40;
    this.playerUnitsLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(gridX, gridY);
    arrangeArmiesScene.appendChild(this.playerUnitsLayer);
    
    //launch event
    var currObj = this, helpMerge;
    goog.events.listen(arrangeArmiesBtn,['mousedown', 'touchstart'], function(e) {
        
        //show player units
        currObj.refreshPlayerUnits();        
    
        helpMerge = new lime.Label().setText('To merge units, touch source then target.')
            .setPosition(gridX, gridY + 45).setFontColor('#E8FC08').setFontSize(8)
            .setAnchorPoint(0,0);
        arrangeArmiesScene.appendChild(helpMerge);
        
        gameObj.director.replaceScene(arrangeArmiesScene);
    });        
};

/**
 * refresh player's units
 */
huungry.ControlsLayer.prototype.refreshPlayerUnits = function() {
    this.playerUnitsLayer.removeAllChildren();
    var gridX = 0, gridY = 0;
    var playerUnitsRect = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/units_grid.png')
        .setPosition(gridX,gridY).setSize(106,43);
    this.playerUnitsLayer.appendChild(playerUnitsRect);    
    
    this.thumbnailLayers = new Array();
    var thumbnail, thumbX, thumbY = gridY+1, lifeBar;
    for(i=0; i < this.gameObj.player.units.length; i++) {  
        
        thumbX = gridX + 1 + i%5*(this.gameObj.tileSize+1);
        
        if(i == 5) {
            thumbY += this.gameObj.tileSize+1;
        }
        
        this.thumbnailLayers.push(
            new lime.Layer().setAnchorPoint(0,0).setPosition(thumbX, thumbY));
        
        thumbnail = new lime.Sprite().setAnchorPoint(0,0)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize)
            .setFill('assets/'+this.gameObj.player.units[i].image)
            .setPosition(0,0);        
        
        lifeBar = new lime.Label().setPosition(11,10)
            .setText(Math.ceil(this.gameObj.player.units[i].life)).setFontSize(9)
            .setAnchorPoint(0,0).setFontColor('#E8FC08');
        
        this.thumbnailLayers[i].unit = this.gameObj.player.units[i];
        this.thumbnailLayers[i].index = i;
        this.thumbnailLayers[i].appendChild(thumbnail);       
        this.thumbnailLayers[i].appendChild(lifeBar);       
        this.playerUnitsLayer.appendChild(this.thumbnailLayers[i]);  
        
        (function(thumbnailLayers, i, gameObj, currentObj) {
            goog.events.listen(thumbnailLayers[i], ['mousedown', 'touchstart'], function(e) {
                e.stopPropagation();
                
                if(thumbnailLayers[i].highlightCell) {
                    thumbnailLayers[i].removeChild(thumbnailLayers[i].highlightCell);
                    thumbnailLayers[i].highlightCell = undefined;
                }
                else {
                    //check if a unit is selected, if not, select current
                    var prevSelected;
                    for(var j=0, arrLen2 = thumbnailLayers.length; j < arrLen2; j++) {
                        if(i != j && thumbnailLayers[j].highlightCell) {
                            prevSelected = thumbnailLayers[j]
                        }
                    }
                    
                    if(!prevSelected) {                    
                        thumbnailLayers[i].highlightCell = new lime.Sprite().setAnchorPoint(0,0)
                            .setPosition(0,0).setSize(gameObj.tileSize, gameObj.tileSize)
                            .setFill(232,252,8,0.5);
                        thumbnailLayers[i].appendChild(thumbnailLayers[i].highlightCell);
                    }
                    
                    else {
                        //if it's the same unit, merge
                        if(prevSelected.unit.id == thumbnailLayers[i].unit.id) {
                            gameObj.player.units[i].life += prevSelected.unit.life;
                            gameObj.player.units.splice(prevSelected.index,1);
                            thumbnailLayers[prevSelected.index].removeChild(thumbnailLayers[prevSelected.index].highlightCell);
                            currentObj.refreshPlayerUnits();
                        }
                    }
                }
                
            });
        })(this.thumbnailLayers, i, this.gameObj, this);
        
    }
};

/**
 * init items window
 */
huungry.ControlsLayer.prototype.initItemsWindow = function() {
    //icon to launch
    var itemsBtn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize*0.8, this.gameObj.tileSize*0.8)
        .setFill('assets/scroll-fire.png')
        .setPosition(this.gameObj.tileSize*0.1, this.gameObj.tileSize*3.6);
    this.sideBar.appendChild(itemsBtn);
    
    //player details screen
    itemsScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.width, this.gameObj.height).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(this.gameObj.tileSize*10, this.gameObj.tileSize*7)
        .setSize(this.gameObj.tileSize*2, this.gameObj.tileSize);
    itemsScene.appendChild(winBackground);
    itemsScene.appendChild(closeButton);
    
    //title
    var y_title = this.gameObj.tileSize/2;
    var title = new lime.Label().setText('Items').setFontColor('#E8FC08')
        .setPosition(this.gameObj.tileSize/3, y_title).setAnchorPoint(0,0)
        .setFontSize(11);
    itemsScene.appendChild(title);
    
    //close event
    var gameObj = this.gameObj;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });
    
    var gridX = 5, gridY= 40;
    this.playerItemsLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(gridX, gridY);
    itemsScene.appendChild(this.playerItemsLayer);
    
    //launch event
    var currObj = this, helpMerge;
    goog.events.listen(itemsBtn,['mousedown', 'touchstart'], function(e) {
        
        //show player items
        currObj.refreshItems();        
        gameObj.director.replaceScene(itemsScene);
    });        
};

/**
 * refresh player's units
 */
huungry.ControlsLayer.prototype.refreshItems = function() {
    this.playerItemsLayer.removeAllChildren();
    var gridX = 0, gridY = 0;
    var playerItemsRect = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/items_grid.png')
        .setPosition(gridX,gridY);
    this.playerItemsLayer.appendChild(playerItemsRect);    
    
    var thumbnailLayers = new Array();
    var thumbnail, thumbX, thumbY = gridY+1, lifeBar;
    for(i=0; i < this.gameObj.player.items.length; i++) {  
        
        thumbX = gridX + 1 + i%5*(this.gameObj.tileSize+1);
        
        if(i == 5) {
            thumbY += this.gameObj.tileSize+1;
        }
        
        thumbnailLayers.push(
            new lime.Layer().setAnchorPoint(0,0).setPosition(thumbX, thumbY));
        
        thumbnail = new lime.Sprite().setAnchorPoint(0,0)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize)
            .setFill('assets/'+this.gameObj.player.items[i].image)
            .setPosition(0,0);        
        
        thumbnailLayers[i].item = this.gameObj.player.items[i];
        thumbnailLayers[i].index = i;
        thumbnailLayers[i].appendChild(thumbnail);       
        this.playerItemsLayer.appendChild(thumbnailLayers[i]);  
        
        (function(thumbnailLayers, i, gameObj, currentObj) {
            goog.events.listen(thumbnailLayers[i], ['mousedown', 'touchstart'], function(e) {
                e.stopPropagation();
                                
                
            });
        })(thumbnailLayers, i, this.gameObj, this);
        
    }
};