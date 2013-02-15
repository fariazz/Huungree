goog.provide('huungry.Player');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Player class for tile-based games
 */
huungry.Player = function() {
    goog.base(this);
    
    this.inFightScene = false;    
    this.canMove = false;
    this.gold = 1000;
}

goog.inherits(huungry.Player, huungry.Character);

/*
 * Init
 */
huungry.Player.prototype.init = function() {
    this.initGamepad();    
}

/**
 * show gamepad after movement
 */
huungry.Player.prototype.playerMoved = function() {
        
    this.refreshMapPos();
    this.toggleGamepad(true);
    
    var pos = this.getPosition();
    this.gameObj.centerCameraTo(pos.x,pos.y);
    this.gameObj.updateVisiblity(this.cell.col,this.cell.row);
    
    //check for enemy collision
    for(var i=0; i < this.map.elements.length; i++) {    
        if(this.cell.col == this.map.elements[i].cell.col && this.cell.row == this.map.elements[i].cell.row 
            && this.id != this.map.elements[i].id) {
            if(this.map.elements[i].elementType == this.gameObj.ENEMY_ARMY) {
                this.gameObj.fight(this.map.elements[i]);
            }
            else if(this.map.elements[i].elementType == this.gameObj.ITEM_TARGET) {
                this.gameObj.dialog = new huungry.DialogScene().setGameObj(this.gameObj)
                .setTitleText(this.map.elements[i].name)
                .setMainText("You've found "+this.map.elements[i].gold+'\npieces of gold.')
                .setSceneAfter(this.gameObj.gameScene)
                .setCallback(function(params) {
                    console.log(params);
                    var item = params.player.map.elements[params.i];
                    params.player.collect(item);
                }, {player: this, i: i}).init();                    
            }
            else if(this.map.elements[i].elementType == this.gameObj.SHOP_TARGET) {
                this.map.elements[i].showDialog();
                console.log('in shop');
            }
            else {
                console.log(this.map.elements[i]);
            }
            
        }
    }
}

/**
 * collect item
 * @param {} item
 */
huungry.Player.prototype.collect = function(item) {
    this.gold += item.gold;
    item.die();
    this.gameObj.controlsLayer.refreshInfo();
}

/**
 * buy a unit
 * @param unit
 * @param price
 * @param qty
 */
huungry.Player.prototype.buy = function(unit, price, qty) {
    this.gold -= price;
    unit.life = qty;
    this.units.push(unit);
    console.log(this.units);
}