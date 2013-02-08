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
        .setFill('assets/knight1.png')
        .setPosition(this.gameObj.tileSize*0.1, this.gameObj.tileSize);
    this.sideBar.appendChild(infoWindowBtn);
    
    //player details screen
    this.gameObj.playerInfoScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.width, this.gameObj.height).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(this.gameObj.tileSize*10, this.gameObj.tileSize*7)
        .setSize(this.gameObj.tileSize*2, this.gameObj.tileSize);
    this.gameObj.playerInfoScene.appendChild(winBackground);
    this.gameObj.playerInfoScene.appendChild(closeButton);
    this.gameObj.playerInfoLayer = new lime.Layer().setAnchorPoint(0, 0);            
    this.gameObj.playerInfoScene.appendChild(this.gameObj.playerInfoLayer);
    
    //close event
    var gameObj = this.gameObj;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });

    //launch event
    goog.events.listen(infoWindowBtn,['mousedown', 'touchstart'], function(e) {
        gameObj.playerInfoLayer.removeAllChildren();
        
        //title
        var y_title = gameObj.tileSize/2;
        var h_row = gameObj.tileSize/2+2;
        var title = new lime.Label().setText('Units').setFontColor('#E8FC08')
            .setPosition(gameObj.tileSize/3, y_title).setAnchorPoint(0,0)
            .setFontSize(11);
            gameObj.playerInfoLayer.appendChild(title);
        
        //player units
        for(var i=0; i<gameObj.player.units.length; i++) {          
            var thumbnail = new lime.Sprite().setAnchorPoint(0,0)
                .setSize(gameObj.tileSize/2*0.8,gameObj.tileSize/2*0.8)
                .setFill('assets/'+gameObj.player.units[i].image)
                .setPosition(gameObj.tileSize/3, y_title+gameObj.tileSize+h_row*i);
            gameObj.playerInfoLayer.appendChild(thumbnail);
            
            var label = new lime.Label().setText(Math.ceil(gameObj.player.units[i].life)+' x '+gameObj.player.units[i].name+' (attack:'+gameObj.player.units[i].attack+' defense:'+gameObj.player.units[i].defense+')')
            .setFontColor('#E8FC08').setFontSize(9)
            .setPosition(gameObj.tileSize, y_title+gameObj.tileSize+h_row*i).setAnchorPoint(0,0);
            gameObj.playerInfoLayer.appendChild(label);
        }
        gameObj.director.replaceScene(gameObj.playerInfoScene);
    });
}