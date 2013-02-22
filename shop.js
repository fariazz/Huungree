goog.provide('huungry.Shop');
goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Shop
 */
huungry.Shop = function() {
    goog.base(this);
    
}

goog.inherits(huungry.Shop,huungry.Character);


huungry.Shop.prototype.init = function() {
    this.elementType = this.gameObj.SHOP_TARGET;
    return this;
}

/**
 * pass data
 * @param {} data
 */
huungry.Shop.prototype.setData = function(data) {
    this.setFill('assets/'+data.image);
    this.data = data;
    
    return this;
}

/**
 * show details dialog
 */
huungry.Shop.prototype.showDialog = function() {
    this.scene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.screenWidth, this.gameObj.screenHeight).setFill('#0D0D0D');
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')        
        .setPosition(this.gameObj.tileSize*10.5, this.gameObj.tileSize*7.5)
        .setSize(this.gameObj.tileSize*2, this.gameObj.tileSize);
    this.scene.appendChild(winBackground);
    this.scene.appendChild(closeButton);
    
    //close event
    var currentObj = this;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        currentObj.gameObj.director.replaceScene(currentObj.gameObj.gameScene);
    });
    
    //show units
    for(var i=0; i < this.data.units.length; i++) {
        var unit = this.gameObj.unitTypes[this.data.units[i].id];
        var productLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(this.gameObj.tileSize/2,this.gameObj.tileSize*1.5+i*this.gameObj.tileSize*1.2);
        var productImg = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setAnchorPoint(0, 0)
            .setFill('assets/'+unit.image).setSize(this.gameObj.tileSize,this.gameObj.tileSize);
        productLayer.appendChild(productImg);
        
        var productLabel = new lime.Label().setText(unit.name+' - $'+this.data.units[i].price)
            .setFontColor('#E8FC08').setAnchorPoint(0,0)
            .setPosition(this.gameObj.tileSize*1.1,2)
            .setFontSize(7);
        productLayer.appendChild(productLabel);
        
        var availableLabel = new lime.Label().setText(this.data.units[i].qty+' available')
            .setFontColor('#E8FC08').setAnchorPoint(0,0)
            .setPosition(this.gameObj.tileSize*1.1,this.gameObj.tileSize/2+2)
            .setFontSize(7);
        productLayer.appendChild(availableLabel);        
        this.scene.appendChild(productLayer);        
        
        (function(productLayer, i, unit, availableLabel) {
            goog.events.listen(productLayer,['mousedown', 'touchstart'], function(e) {
                if(currentObj.gameObj.player.gold >= currentObj.data.units[i].price && currentObj.data.units[i].qty > 0) {
                    if(currentObj.gameObj.player.units.length < currentObj.gameObj.player.maxNumUnits ) {
                        currentObj.gameObj.player.buy(unit, currentObj.data.units[i].price, 1);
                        currentObj.refreshPlayerInfo();
                        currentObj.refreshPlayerUnits();
                        currentObj.data.units[i].qty--;
                        availableLabel.setText(currentObj.data.units[i].qty+' available');
                    }
                }
            })
        })(productLayer, i, unit, availableLabel);        
    }
    
    //show player units
    var gridX = 5, gridY= 110;
    this.playerUnitsLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(gridX, gridY);
        
    this.playerResources = new lime.Label().setFontColor('#E8FC08')
        .setAnchorPoint(0,0).setPosition(10,5);                    
    this.scene.appendChild(this.playerUnitsLayer);
    this.scene.appendChild(this.playerResources);
        
    this.refreshPlayerInfo();
    this.refreshPlayerUnits();        
    this.gameObj.director.replaceScene(this.scene);
}

/**
 * refresh player's info
 */
huungry.Shop.prototype.refreshPlayerInfo = function() {
    this.playerResources.setText(this.data.name+' - $'+this.gameObj.player.gold);
}

/**
 * refresh player's units
 */
huungry.Shop.prototype.refreshPlayerUnits = function() {
    this.playerUnitsLayer.removeAllChildren();
    var gridX = 0, gridY = 0;
    var playerUnitsRect = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/units_grid.png')
        .setPosition(gridX,gridY).setSize(106,43);
    this.playerUnitsLayer.appendChild(playerUnitsRect);    
    
    var thumbnail, thumbX, thumbY = gridY+1;
    for(i=0; i < this.gameObj.player.units.length; i++) {  
        
        thumbX = gridX + 1 + i%5*(this.gameObj.tileSize+1);
        
        if(i == 5) {
            thumbY += this.gameObj.tileSize+1;
        }
        
        thumbnail = new lime.Sprite().setAnchorPoint(0,0)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize)
            .setFill('assets/'+this.gameObj.player.units[i].image)
            .setPosition(thumbX, thumbY);
        this.playerUnitsLayer.appendChild(thumbnail);        
    }
}