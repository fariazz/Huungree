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
    for(var i=0; i < this.map.units.length; i++) {      
        if(this.cell.col == this.map.units[i].cell.col && this.cell.row == this.map.units[i].cell.row 
            && this.id != this.map.units[i].id && this.map.units[i].unitType == this.gameObj.ENEMY_ARMY) {
            this.gameObj.fight(this.map.units[i]);
        }
    }
}