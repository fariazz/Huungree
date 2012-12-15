goog.provide('huungry.DialogScene');

goog.require('lime.Scene');
goog.require('lime.Sprite');

/*
 * Scene where a dialog is shown
 */
huungry.DialogScene = function() {
    goog.base(this);

    this.dialogLayer = new lime.Layer().setRenderer(lime.Renderer.DOM).setAnchorPoint(0, 0);
    this.appendChild(this.dialogLayer);

    this.dialogBackground = new lime.Sprite().setAnchorPoint(0, 0)
        .setPosition(WIDTH/8, HEIGHT/8).setSize(WIDTH*3/4, HEIGHT*3/4).setFill('#9BCD9B');

    this.dialogClose = new lime.GlossyButton().setSize(25,10).setPosition(WIDTH/2,HEIGHT*3/4)
        .setText('Ok').setColor('#EECFA1');

    this.appendChild(this.dialogBackground);
    this.appendChild(this.dialogClose);

}

goog.inherits(huungry.DialogScene,lime.Scene);

huungry.DialogScene.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.DialogScene.prototype.init = function() {
    goog.events.listen(this.dialogClose,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        this.parent_.gameObj.director.popScene();
    });
}
