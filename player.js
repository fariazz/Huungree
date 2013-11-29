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
                        message = "Use in battle to damage your enemies. Damage: "+this.map.elements[i].attack;
                        break;        
                }
                
                this.gameObj.numItems--;
                
                HuungryUI.showDialog(this.map.elements[i].name,'<div class="item-img"><img width="40" src="assets/images/items/' + item.image +'" /></div><div class="centered">'+message+'</div>'
                    ,[{text: 'OK', class: 'button-home', callback: HuungryUI.hideDialog}]);

                this.collect(item);     
            }
            else if(this.map.elements[i].elementType == this.gameObj.SHOP_TARGET) {
                this.map.elements[i].showDialog();
            }
            else {
                //console.log(this.map.elements[i]);
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
    
    this.gameObj.controlsLayer.refreshInfo();
    
    //game goal for now..
    if(this.gameObj.numItems == 0) {
        HuungryUI.showEndofGameDialog(this.gameObj);
    }
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