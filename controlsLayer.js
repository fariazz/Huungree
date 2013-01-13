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
    
    
    this.appendChild(this.btnMapMoveLeft);
    this.appendChild(this.btnMapMoveRight);
    this.appendChild(this.btnMapMoveUp);
    this.appendChild(this.btnMapMoveDown);
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
}

/**
 * refresh player info
 */
huungry.ControlsLayer.prototype.refreshInfo = function() {
    this.goldValue.setText(this.gameObj.player.gold);
}