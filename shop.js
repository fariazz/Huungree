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
            for(var i=0; i < len; i++) {
                if(this.gameObj.player.units[i].id == unit.id) {
                    this.gameObj.player.buyAdd(this.gameObj.player.units[i], unit.price, 1);
                    unit.qty--;
                    return {success: 1, msg: 'Thanks for your business!'};
                }
            }
            return {success: 0, msg: 'No room available'};
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
 * refresh player's units
 */
huungry.Shop.prototype.refreshPlayerUnits = function() {
    this.playerUnitsLayer.removeAllChildren();
    var gridX = 0, gridY = 0;
    var playerUnitsRect = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/units_grid.png')
        .setPosition(gridX,gridY).setSize(this.gameObj.tileSize*5,this.gameObj.tileSize*2);
    this.playerUnitsLayer.appendChild(playerUnitsRect);    
    
    this.thumbnailLayers = new Array();
    var thumbnail, thumbX, thumbY = gridY+1, lifeBar;
    for(i=0; i < this.gameObj.player.units.length; i++) {  
        
        thumbX = gridX + 1 + i%5*(this.gameObj.tileSize+1);
        
        if(i == 5) {
            thumbY += this.gameObj.tileSize+1;
        }
        
        this.thumbnailLayers.push(
            new lime.Layer().setAnchorPoint(0,0).setPosition(thumbX, thumbY));
        
        thumbnail = new lime.Sprite().setAnchorPoint(0,0)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize)
            .setFill('assets/images/units/'+this.gameObj.player.units[i].image)
            .setPosition(0,0);        
        
        lifeBar = new lime.Label().setPosition(this.gameObj.tileSize/2,this.gameObj.tileSize/2)
            .setText(Math.ceil(this.gameObj.player.units[i].life)).setFontSize(18)
            .setAnchorPoint(0,0).setFontColor('#E8FC08');
        
        this.thumbnailLayers[i].unit = this.gameObj.player.units[i];
        this.thumbnailLayers[i].index = i;
        this.thumbnailLayers[i].appendChild(thumbnail);       
        this.thumbnailLayers[i].appendChild(lifeBar);       
        this.playerUnitsLayer.appendChild(this.thumbnailLayers[i]);  
        
        (function(thumbnailLayers, i, gameObj, currentObj) {
            goog.events.listen(thumbnailLayers[i], ['mousedown', 'touchstart'], function(e) {
                e.stopPropagation();
                
                if(thumbnailLayers[i].highlightCell) {
                    thumbnailLayers[i].removeChild(thumbnailLayers[i].highlightCell);
                    thumbnailLayers[i].highlightCell = undefined;
                }
                else {
                    //check if a unit is selected, if not, select current
                    var prevSelected;
                    for(var j=0, arrLen2 = thumbnailLayers.length; j < arrLen2; j++) {
                        if(i != j && thumbnailLayers[j].highlightCell) {
                            prevSelected = thumbnailLayers[j]
                        }
                    }
                    
                    if(!prevSelected) {                    
                        thumbnailLayers[i].highlightCell = new lime.Sprite().setAnchorPoint(0,0)
                            .setPosition(0,0).setSize(gameObj.tileSize, gameObj.tileSize)
                            .setFill(232,252,8,0.5);
                        thumbnailLayers[i].appendChild(thumbnailLayers[i].highlightCell);
                    }
                    
                    else {
                        //if it's the same unit, merge
                        if(prevSelected.unit.id == thumbnailLayers[i].unit.id) {
                            gameObj.player.units[i].life += prevSelected.unit.life;
                            gameObj.player.units.splice(prevSelected.index,1);
                            thumbnailLayers[prevSelected.index].removeChild(thumbnailLayers[prevSelected.index].highlightCell);
                            currentObj.refreshPlayerUnits();
                        }
                    }
                }
                
            });
        })(this.thumbnailLayers, i, this.gameObj, this);
    }
}

/**
 * get data
 */
huungry.Shop.prototype.getData = function() {
    return _.extend(this.data, {x: this.getPosition().x, y: this.getPosition().y});
};