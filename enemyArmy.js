goog.provide('huungry.EnemyArmy');

goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Enemy armies
 */
huungry.EnemyArmy = function() {
    goog.base(this);
}

goog.inherits(huungry.EnemyArmy, huungry.Character);

/**
 * Init
 */
huungry.EnemyArmy.prototype.init = function() {
    this.elementType = this.gameObj.ENEMY_ARMY;
    this.gold = 0;
    this.units = new Array();
    
    for(var i = 0, arrayLen = this.unitsSummary.length; i < arrayLen; i++) {
        var unit = this.gameObj.unitTypes[this.unitsSummary[i].id];
        
        this.gold += unit.gold * this.unitsSummary[i].number;
        
        for(var j = 0; j< this.unitsSummary[i].number; j++) {
            this.units.push(this.gameObj.cloneUnit(unit,this.unitsSummary[i].number ));
        }
    }
    
}