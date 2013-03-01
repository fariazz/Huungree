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
    this.items = new Array();
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
                
                //item dialog content
                var item = this.map.elements[i];
                var message;
                switch(item.type) {
                    case 'ITEM.GOLD':
                        message = "You've found "+this.map.elements[i].gold+'\npieces of gold.';
                        break;
                    case 'ITEM.ATTACK-SPELL':
                        message = "Use this spell on your enemies during battle.";
                        break;        
                }
                                
                this.gameObj.dialog = new huungry.DialogScene().setGameObj(this.gameObj)
                .setTitleText(this.map.elements[i].name)
                .setMainText(message)
                .setSceneAfter(this.gameObj.gameScene)
                .setCallback(function(params) {                    
                    params.player.collect(item);
                }, {player: this, item: item}).init();                    
            }
            else if(this.map.elements[i].elementType == this.gameObj.SHOP_TARGET) {
                this.map.elements[i].showDialog();
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
    switch(item.type) {
        case 'ITEM.GOLD':
            this.gold += item.gold;            
            break;
        default:
            this.items.push(item.clone());
            break;        
    }
    item.die();
    console.log(this.items);
    
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
    this.units.push(this.gameObj.cloneUnit(unit, qty));
}