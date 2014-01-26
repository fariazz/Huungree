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
    this.gold = 0;
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
    var that = this;
    this.gameObj.centerCameraTo(pos.x,pos.y);
    this.gameObj.updateVisiblity(this.cell.col,this.cell.row);
    
    //check for enemy collision
    for(var i=0; i < this.map.elements.length; i++) {    
        if(this.cell.col == this.map.elements[i].cell.col && this.cell.row == this.map.elements[i].cell.row 
            && this.id != this.map.elements[i].id) {
            if(this.map.elements[i].elementType == this.gameObj.ENEMY_ARMY) {
                this.gameObj.fight(this.map.elements[i]);
                break;
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
                    case 'ITEM.DEFENSE-SPELL':
                        message = "Use in battle to protect a unit against "+this.map.elements[i].numHits+" enemy hits";
                        break;
                    case 'ITEM.PARALYZE-SPELL':
                        message = "Use in battle to freeze an enemy unit for "+this.map.elements[i].numHits+" turns";
                        break;
                    case 'ITEM.LANDMARK':
                        message = this.map.elements[i].text;
                        break;       
                }
                
                if(item.type != 'ITEM.LANDMARK') {
                    this.gameObj.numItems--;  
                }                              

                HuungryUI.showDialog(that.map.elements[i].name,'<div class="item-img"><img width="40" src="assets/images/items/' + item.image +'" /></div><div class="centered">'+message+'</div>'
                    ,[{text: 'OK', btnClass: 'button-home', callback: function() {
                        HuungryUI.hideDialog();     
                                                
                        if(item.type != 'ITEM.LANDMARK') {
                            that.collect(item);  
                            that.gameObj.checkQuestCompletion(); 
                        }
                        else {
                            if(item.isQuestGoal) {
                                that.gameObj.levelCompleted();
                            }
                        }  
                        that.gameObj.controlsLayer.refreshInfo();                                           
                }}]);                  
            }
            else if(this.map.elements[i].elementType == this.gameObj.SHOP_TARGET) {
                this.map.elements[i].showDialog();
                break;
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
huungry.Player.prototype.collect = function(item, loading) {
    switch(item.type) {
        case 'ITEM.GOLD':
            this.gold += item.gold;   
            item.die();         
            break;
        default:
            if(this.items.length < 12) {
                this.items.push(item.clone());
                item.die();
            }
            else {
                HuungryUI.showDialog('TOO MANY ITEMS!', 'You don\'t have any room for more items..',
                    [{text: 'OK', btnClass: 'button-home', callback: function(){}}]);
            }
            
            break;        
    }
    

    if(!loading) {
        this.gameObj.controlsLayer.refreshInfo();             
    }
    
}

/**
 * buy a unit
 * @param unitType
 * @param price
 * @param qty
 */
huungry.Player.prototype.buy = function(unitType, price, qty) {
    this.gold -= price;
    this.units.push(this.gameObj.cloneUnit(unitType, qty));
    this.gameObj.controlsLayer.refreshInfo();
};

/**
 * buy a unit
 * @param unit
 * @param price
 * @param qty
 */
huungry.Player.prototype.buyAdd = function(unit, price, qty) {
    this.gold -= price;
    unit.life += qty;
    this.gameObj.controlsLayer.refreshInfo();
};

/**
* get army strengy
*/
huungry.Player.prototype.getPower = function() {
    var power = 0;
    var unit;
    _.each(this.units, function(value, key) {
        unit = new huungry.Unit()
                .setGameObj(this.gameObj)
                .setUnitData(this.units[key],true);
        power += unit.getPower();
    }, this);
    power *= 1 + this.gameObj.powerNumFactor*(this.units.length-1);
    return power;
};