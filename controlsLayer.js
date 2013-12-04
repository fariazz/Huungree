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
    //this.initHelp();
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
 * init player quest window
 */
huungry.ControlsLayer.prototype.initQuestWindow = function() {
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
    var btn = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/btn_save.png')
        .setPosition(0, this.gameObj.tileSize*3);
    this.sideBar.appendChild(btn);

    var that = this;
    goog.events.listen(btn,['mousedown', 'touchstart'], function(e) {
        //save level
        localStorage.setItem('currentLevel', that.gameObj.currentLevel);

        //save player location
        localStorage.setItem('currentLocation', JSON.stringify(that.gameObj.player.getPosition()));

        //save gold
        localStorage.setItem('currentGold', that.gameObj.player.gold);

        //save units
        localStorage.setItem('currentUnits', JSON.stringify(that.gameObj.player.units));

        //save player items
        var items = [];
        var itemsLen = that.gameObj.player.items.length;
        for(var i=0; i<itemsLen; i++) {
            items.push(that.gameObj.player.items[i].getData());
        }
        localStorage.setItem('currentItems', JSON.stringify(items));

        //save map items
        var mapItems = [];
        var mapItemsLen = that.gameObj.mapItems.length;
        for(var i=0; i<mapItemsLen; i++) {
            mapItems.push(that.gameObj.mapItems[i].getData());
        }
        localStorage.setItem('mapItems', JSON.stringify(mapItems));

        //save map enemy armies
        var enemyArmies = [];
        var enemyArmiesLen = that.gameObj.enemyArmies.length;
        for(var i=0; i<enemyArmiesLen; i++) {
            enemyArmies.push(that.gameObj.enemyArmies[i].getData());
        }
        localStorage.setItem('enemyArmies', JSON.stringify(enemyArmies));
        
        //save map enemy armies
        var mapShops = [];
        var mapShopsLen = that.gameObj.mapShops.length;
        for(var i=0; i<mapShopsLen; i++) {
            mapShops.push(that.gameObj.mapShops[i].getData());
        }
        localStorage.setItem('mapShops', JSON.stringify(mapShops));

        //save visibility
        localStorage.setItem('currentDarkness', JSON.stringify(that.gameObj.darkness));

        HuungryUI.showDialog('GAME SAVED!', '', [{
            text: 'OK',
            class: 'button-home', 
            callback: HuungryUI.hideDialog}]);

    });       
};