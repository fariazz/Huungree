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
    console.log('show dialog');
    this.scene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.screenWidth, this.gameObj.screenHeight).setFill('#0D0D0D');
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')        
        .setPosition(this.gameObj.tileSize*10, this.gameObj.tileSize*7)
        .setSize(this.gameObj.tileSize*3, this.gameObj.tileSize);
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
        var productLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(this.gameObj.tileSize/2,this.gameObj.tileSize+i*this.gameObj.tileSize*1.1);
        var productImg = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setAnchorPoint(0, 0)
            .setFill('assets/'+unit.image).setSize(this.gameObj.tileSize,this.gameObj.tileSize);
        productLayer.appendChild(productImg);
        
        var productLabel = new lime.Label().setText(unit.name+' ('+this.data.units[i].price+' gold)')
            .setFontColor('#E8FC08').setAnchorPoint(0,0).setPosition(this.gameObj.tileSize*1.1,0);
        productLayer.appendChild(productLabel);
        
        this.scene.appendChild(productLayer);        
        
        (function(productLayer, i, unit) {
            goog.events.listen(productLayer,['mousedown', 'touchstart'], function(e) {
                if(currentObj.gameObj.player.gold >= currentObj.data.units[i].price) {
                    if(currentObj.gameObj.player.units.length < currentObj.gameObj.player.maxNumUnits ) {
                        currentObj.gameObj.player.buy(unit, currentObj.data.units[i].price);
                        currentObj.refreshPlayerInfo();
                    }
                }
            })
        })(productLayer, i, unit);
        
    }
    
    this.playerResources = new lime.Label().setText('You have: '+this.gameObj.player.gold+' gold')
            .setFontColor('#E8FC08').setAnchorPoint(0,0).setPosition(50,this.gameObj.screenHeight-50);
    this.scene.appendChild(this.playerResources);
    
    this.gameObj.director.replaceScene(this.scene);
}

/**
 * refresh player's info
 */
huungry.Shop.prototype.refreshPlayerInfo = function() {
    this.playerResources.setText('You have: '+this.gameObj.player.gold+' gold');
}