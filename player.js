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
    setTimeout(function() {
        for(var i=0; i < that.map.elements.length; i++) {    
            if(that.cell.col == that.map.elements[i].cell.col && that.cell.row == that.map.elements[i].cell.row 
                && that.id != that.map.elements[i].id) {
                if(that.map.elements[i].elementType == that.gameObj.ENEMY_ARMY) {
                    that.gameObj.fight(that.map.elements[i]);
                    break;
                }
                else if(that.map.elements[i].elementType == that.gameObj.ITEM_TARGET) {
                    
                    //item dialog content
                    var item = that.map.elements[i];
                    var message;
                    var title = that.map.elements[i].name;
                    switch(item.type) {
                        case 'ITEM.GOLD':
                            message = "You've found "+that.map.elements[i].gold+'\npieces of gold.';
                            break;
                        case 'ITEM.ATTACK-SPELL':
                            message = "Use in battle to damage your enemies. Damage: "+that.map.elements[i].attack;
                            break;       
                        case 'ITEM.DEFENSE-SPELL':
                            message = "Use in battle to protect a unit against "+that.map.elements[i].numHits+" enemy hits";
                            break;
                        case 'ITEM.PARALYZE-SPELL':
                            message = "Use in battle to freeze an enemy unit for "+that.map.elements[i].numHits+" turns";
                            break;
                        case 'ITEM.POSSESSION-SPELL':
                            message = "Use in battle to turn control an enemy for "+that.map.elements[i].numHits+" turns";
                            break;
                        case 'ITEM.LANDMARK':
                            message = that.map.elements[i].text;
                            break;
                        case 'ITEM.KEY':
                            message = "You've found a "+that.map.elements[i].attribute+" key! use it to open a door of the same color";
                            break;       
                        case 'ITEM.DOOR':
                            var key, pos;
                            _.each(that.items, function(element, index){
                                if(element.type == 'ITEM.KEY' && element.attribute == that.map.elements[i].attribute) {
                                    pos = index;
                                    key = element;
                                }
                            }, that);

                            if(key) {
                                message = 'You\'ve opened the door with the '+that.map.elements[i].attribute+' key';
                                that.items.splice(pos, 1);
                                that.map.elements[i].die();   

                            }
                            else {
                                message = 'You don\'t have the key to that door';
                                that.setPosition(that.previousPosition.x, that.previousPosition.y);
                                that.playerMoved();
                            }
                            break;       
                    }
                    
                    if(item.type != 'ITEM.LANDMARK') {
                        that.gameObj.numItems--;  
                    }                              
                    
                    HuungryUI.showDialog(title,'<div class="item-img"><img width="40" src="assets/images/items/' + item.image +'" /></div><div class="centered">'+message+'</div>'
                        ,[{text: 'OK', btnClass: 'button-home', callback: function() {
                            HuungryUI.hideDialog();     
                                                    
                            if(!_.contains(['ITEM.LANDMARK', 'ITEM.DOOR'],item.type)) {
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
                else if(that.map.elements[i].elementType == that.gameObj.SHOP_TARGET) {
                    that.map.elements[i].showDialog();
                    break;
                }
                else {
                    //console.log(that.map.elements[i]);
                }                
            }
        }
    }, this.gameObj.movementDuration*1000*0.4);  
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
            if(this.items.length < 12 || item.type == 'ITEM.KEY') {
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