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
* evaluate and carry out purchase
*/
huungry.Shop.prototype.purchase = function(unit) {
    var unitType = this.gameObj.unitTypes[unit.id];
    if(this.gameObj.player.gold >= unit.price && unit.qty > 0) {
        if(this.gameObj.player.units.length < this.gameObj.player.maxNumUnits ) {
            this.gameObj.player.buy(unitType, unit.price, 1);
            unit.qty--;
            return {success: 1, msg: 'Thanks for your business!'};
        }
        else {
            //find if there are the same to add up
            var len = this.gameObj.player.units.length;
            var sameIndexes = new Array(); 
            _.each(this.gameObj.player.units, function(value, key){
                if(value.id == unit.id) {
                    sameIndexes.push(key);
                }
            }, this);

            if(sameIndexes.length) {
                if(this.prevUnit == unit.id) {
                    this.nextIndex++;
                    if(this.nextIndex == sameIndexes.length) {
                        this.nextIndex = 0;
                    }

                }
                else {
                    this.prevUnit = unit.id;
                    this.nextIndex = 0;
                }
                this.gameObj.player.buyAdd(this.gameObj.player.units[sameIndexes[this.nextIndex]], unit.price, 1);
                unit.qty--;                    
                return {success: 1, msg: 'Thanks for your business!'};
            }
            else {
                return {success: 0, msg: 'No room available'};
            }            
        }        
    }
    else if(unit.qty == 0) {
        return {success: 0, msg: 'We don\'t have more of that!'};
    }
    else {
        return {success: 0, msg: 'No gold no service mate'};
    }
}

/**
 * show details dialog
 */
huungry.Shop.prototype.showDialog = function() {
    HuungryUI.showShopWindow(this);
}

/**
 * refresh player's info
 */
huungry.Shop.prototype.refreshPlayerInfo = function() {
    this.playerResources.setText(this.data.name+' - $'+this.gameObj.player.gold);
}


/**
 * get data
 */
huungry.Shop.prototype.getData = function() {
    return _.extend(this.data, {x: this.getPosition().x, y: this.getPosition().y});
};