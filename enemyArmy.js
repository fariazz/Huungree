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
    
    var i, j;
    var arrayLen = this.unitsSummary.length;
    var subArrayLen, unit, num, powerFactor, totalPower, unitPower, k, newUnits, newUnit; 
    for(i = 0; i < arrayLen; i++) {
        subArrayLen = this.unitsSummary[i].length;
        for(j = 0; j < subArrayLen; j++) {
            unit = this.gameObj.unitTypes[this.unitsSummary[i][j].typeid];
            num = _.random(Math.max(1, parseInt(this.unitsSummary[i][j].maxNum/2)), this.unitsSummary[i][j].maxNum);
            powerFactor = 1 + this.gameObj.powerNumFactor*(num -1);
            totalPower = 0;
            newUnits = new Array();

            //create temp unit
            tempUnit = new huungry.Unit()
                .setGameObj(this.gameObj)
                .setUnitData(_.extend(unit, {life: 1}), false);

            unitPower = tempUnit.getPower()*powerFactor;

            for(k = 0; k < num; k++) {
                totalPower += unitPower;
                newUnit = this.gameObj.cloneUnit(unit,1);
                this.units.push(newUnit);
                newUnits.push(newUnit);
                this.gold += parseInt(unit.gold * (1 + 0.2*(Math.random() - Math.random())));
            }
            
            while(totalPower < this.unitsSummary[i][j].power) {
                randomPos = 0 + Math.round(Math.random() * (num - 1));
                newUnits[randomPos].life++;
                totalPower += unitPower;
                this.gold += unit.gold;
            }
        }
    }  
    this.showGoalIcon();  
}

/**
* remove element
*/
huungry.EnemyArmy.prototype.die = function() {
    goog.base(this, 'die');
    var index;
    _.each(this.gameObj.enemyArmies, function(value, key) {
        if(value.id == this.id) {
            index = key;
        }
    }, this);
    if(index !== undefined) {
        this.gameObj.enemyArmies.splice(index, 1);
    }
};

/**
 * get data
 */
huungry.EnemyArmy.prototype.getData = function() {
    return {
        image: this.image,
        unitsSummary: this.unitsSummary,
        background: this.background,
        x: this.getPosition().x,
        y: this.getPosition().y,
        isQuestGoal: this.isQuestGoal ? this.isQuestGoal : false 
    };
};