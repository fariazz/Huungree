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
    this.scene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(this.gameObj.width, this.gameObj.height-500).setFill('#0D0D0D');
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(400, 280)
        .setSize(80, 40);
    this.scene.appendChild(winBackground);
    this.scene.appendChild(closeButton);
    //this.layer = new lime.Layer().setAnchorPoint(0, 0);            
    //this.scene.appendChild(this.layer);
    
    //close event
    var currentObj = this;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        currentObj.gameObj.director.replaceScene(currentObj.gameObj.gameScene);
    });
    
    this.gameObj.director.replaceScene(this.scene);
}