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
    this.gold = 100;
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
    this.toggleGamepad(true);
    
    this.refreshMapPos();
    
    //check for enemy collision
    for(var i=0; i < this.map.elements.length; i++) {    
        if(this.cell.col == this.map.elements[i].cell.col && this.cell.row == this.map.elements[i].cell.row 
            && this.id != this.map.elements[i].id) {
            if(this.map.elements[i].elementType == this.gameObj.ENEMY_ARMY) {
                this.gameObj.fight(this.map.elements[i]);
            }
            else if(this.map.elements[i].elementType == this.gameObj.ITEM_TARGET) {
                var item = this.map.elements[i];
                this.collect(item);
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
 * @param {} unitData
 * @param int price
 */
huungry.Player.prototype.buy = function(unitData, price, qty) {
    this.gold -= price;
    unitData.life = qty;
    this.units.push(unitData);
}