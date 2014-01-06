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
        .setFontColor('#000000').setFontSize(14).setFontFamily('Courier').setFontWeight('bold');
    this.sideBar.appendChild(this.goldValue);    
    
    var goldIcon = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/gold.png')
        .setPosition(0, this.gameObj.tileSize*6.2);
    this.sideBar.appendChild(goldIcon);

    //goals info
    this.goalValue = new lime.Label().setPosition(this.gameObj.tileSize/2,this.gameObj.tileSize*5.9).setText()
        .setFontColor('#000000').setFontSize(14).setFontFamily('Courier').setFontWeight('bold');
    this.sideBar.appendChild(this.goalValue);    
    
    var goalIcon = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.tileSize*0.8, this.gameObj.tileSize*0.8)
        .setFill('assets/images/backgrounds/trophy.png')
        .setPosition(this.gameObj.tileSize*0.1, this.gameObj.tileSize*4.7);
    this.sideBar.appendChild(goalIcon);

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
    this.goalValue.setText(this.gameObj.goalsCompleted+'/'+huungryGameMaps[this.gameObj.currentLevel].quest.totalNumGoals);
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

    //launch event
    var that = this;
    goog.events.listen(questWindowBtn,['mousedown', 'touchstart'], function(e) {
        that.gameObj.showQuest();
    });     
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
        that.gameObj.saveGame(true);
    });       
};

