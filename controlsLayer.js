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
    this.sideBar = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/images/backgrounds/sidebar_noicons.png')
        .setPosition(this.gameObj.screenWidth - this.gameObj.tileSize*this.tileFactorSSide,0)
        .setSize(this.gameObj.tileSize, this.gameObj.screenHeight);

    this.appendChild(this.sideBar);

    //listeners for map navigation
    map = this.gameObj.map;

    //gold info
    this.goldValue = new lime.Label().setPosition(this.gameObj.tileSize/2,this.gameObj.tileSize*7.5).setText()
        .setFontColor('#000000').setFontSize(16).setFontFamily('Courier').setFontWeight('bold');
    this.sideBar.appendChild(this.goldValue);    
    
    var goldIcon = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/gold.png')
        .setPosition(0, this.gameObj.tileSize*6.2);
    this.sideBar.appendChild(goldIcon);

    //player details window
    this.initPlayerInfoWindow();
    this.initItemsWindow();
    this.initQuestWindow();
    this.initHelp();
    this.initSave();    
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
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_army.png')
        .setPosition(0, 0);
    this.sideBar.appendChild(infoWindowBtn);
        
    //launch event
    goog.events.listen(infoWindowBtn,['mousedown', 'touchstart'], function(e) {
        HuungryUI.showPlayerInfoWindow();
    });
}

/**
 * init items window
 */
huungry.ControlsLayer.prototype.initItemsWindow = function() {
    //icon to launch
    var itemsBtn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_items.png')
        .setPosition(0, this.gameObj.tileSize*1);
    this.sideBar.appendChild(itemsBtn);
        
    //launch event
    goog.events.listen(itemsBtn,['mousedown', 'touchstart'], function(e) {
        HuungryUI.showItemsWindow();
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
            .setFill('assets/images/items/'+this.gameObj.player.items[i].image)
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

/**
 * init player quest window
 */
huungry.ControlsLayer.prototype.initQuestWindow = function() {
    //icon to launch
    var questWindowBtn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_quest.png')
        .setPosition(0, this.gameObj.tileSize*2);
    this.sideBar.appendChild(questWindowBtn);
};

/**
 * help button
 */
huungry.ControlsLayer.prototype.initHelp = function() {
    //icon to launch
    var btn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_help.png')
        .setPosition(0, this.gameObj.tileSize*3);
    this.sideBar.appendChild(btn);
};
/**
 * init save game btn
 */
huungry.ControlsLayer.prototype.initSave = function() {
    //icon to launch
    var btn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_save.png')
        .setPosition(0, this.gameObj.tileSize*4);
    this.sideBar.appendChild(btn);
};