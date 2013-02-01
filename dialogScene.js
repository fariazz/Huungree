goog.provide('huungry.DialogScene');

goog.require('lime.Scene');
goog.require('lime.Sprite');

/*
 * Scene where a dialog is shown
 */
huungry.DialogScene = function() {
    goog.base(this);
    
    this.callback = function() {};    
}

goog.inherits(huungry.DialogScene,lime.Scene);

huungry.DialogScene.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.DialogScene.prototype.setTitleText = function(title) {
    this.titleText = new lime.Label().setText(title)
        .setPosition(this.gameObj.screenWidth/2, this.gameObj.screenHeight*3/10);
        return this;
}

huungry.DialogScene.prototype.setMainText = function(title) {
    this.mainText = new lime.Label().setText(title)
        .setMultiline(true)
        .setPosition(this.gameObj.screenWidth/2, this.gameObj.screenHeight*1/2);
        return this;
}

huungry.DialogScene.prototype.setCallback = function(callback, callbackParameters) {
    this.callback = callback;
    this.callbackParameters = callbackParameters;
    return this;
}

huungry.DialogScene.prototype.init = function() {
    this.dialogLayer = new lime.Layer().setRenderer(lime.Renderer.DOM).setAnchorPoint(0, 0);
    this.appendChild(this.dialogLayer);

    this.dialogBackground = new lime.Sprite().setAnchorPoint(0, 0)
        .setPosition(this.gameObj.screenWidth/8, this.gameObj.screenHeight/8)
        .setSize(this.gameObj.screenWidth*3/4, this.gameObj.screenHeight*3/4)
        .setFill('assets/dialogBackground.png');

    this.dialogClose = new lime.GlossyButton().setSize(this.gameObj.tileSize*3,this.gameObj.tileSize)
        .setPosition(this.gameObj.screenWidth/2,this.gameObj.screenHeight*3/4)
        .setText('Ok').setColor('#EECFA1');

    this.appendChild(this.dialogBackground);
    this.appendChild(this.dialogClose);        
    this.appendChild(this.titleText);        
    this.appendChild(this.mainText);        
    
    var currentObj = this;
    goog.events.listen(this.dialogClose,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        this.parent_.gameObj.director.popScene();
        currentObj.callback(currentObj.callbackParameters);
    });
    this.gameObj.director.replaceScene(this);
}
