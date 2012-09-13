goog.provide('huungry.FightEngine');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
    this.floorColor = 'rgb(0,125,0)';
}

huungry.FightEngine.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.FightEngine.prototype.setEnemyArmy = function(enemyArmy) {
    this.enemyArmy = enemyArmy;
    return this;
}

/**
 * initiate fighting
 */
huungry.FightEngine.prototype.init = function() {
    this.fightScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);    
    this.fightLayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
    this.floor = new lime.Sprite().setSize(WIDTH,HEIGHT).setPosition(0,0).setAnchorPoint(0,0).setFill(this.floorColor);
    
    this.fightLayer.appendChild(this.floor);
    this.fightScene.appendChild(this.fightLayer);

    this.gameObj.player.inFightScene = true;
    
    this.initArmies();
    
    this.gameObj.director.replaceScene(this.fightScene);
    
    var runButton = new lime.GlossyButton().setSize(70,40).setPosition(120,300)
        .setText('Run').setColor('#00CD00'); 

    this.fightLayer.appendChild(runButton);

    //run away
    currentObj = this;
    goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
        //go back to the map
        currentObj.gameObj.director.replaceScene(currentObj.gameObj.gameScene);
        currentObj.gameObj.gameLayer.setDirty(255);
        currentObj.gameObj.controlsLayer.setDirty(255);
        currentObj.gameObj.gameScene.setDirty(255);

        //move the hero away from the monster, or the fight scene will be triggered again!
        //this is just a quick, non-elegant way of doing this
        currentPos = currentObj.gameObj.player.getPosition();
        currentObj.gameObj.player.setPosition(currentPos.x-currentObj.gameObj.tileSize, currentPos.y-currentObj.gameObj.tileSize);
        currentObj.gameObj.player.showGamepad(true);
        currentObj. gameObj.player.inFightScene = false;
    });
}

/**
 * initiate armies
 */
huungry.FightEngine.prototype.initArmies = function() {
    //init player army
    var playerUnitPositions = [];

    while(playerUnitPositions.length < this.gameObj.player.army) {
        var position = {
            col: this.gameObj.fightScenePlayerStartX + goog.math.randomInt(this.gameObj.fightScenePlayerEndX-this.gameObj.fightScenePlayerStartX),
            row: this.gameObj.fightScenePlayerStartY + goog.math.randomInt(this.gameObj.fightScenePlayerEndY-this.gameObj.fightScenePlayerStartY)
        };

        var repeated = false;

        for(j=0; j < playerUnitPositions.length; j++) {
            if(playerUnitPositions[j].row == position.row && playerUnitPositions[j].col == position.col) {
                repeated = true;
                break;
            }
        }

        if(!repeated) {
            playerUnitPositions.push(position);
        }            
    }

    for(i=0;i<this.gameObj.player.army;i++) {
        var pos = this.gameObj.map.getXYFromColRow(playerUnitPositions[i].col,playerUnitPositions[i].row);
        var unit = new huungry.Character().setFill('assets/player.png').setPosition(pos.x, pos.y)
            .setGameObj(this.gameObj);

        this.fightLayer.appendChild(unit);
    }

    //init enemy army
    var enemyUnitPositions = [];

    while(enemyUnitPositions.length < this.enemyArmy.army) {
        var position = {
            col: this.gameObj.fightSceneEnemyStartX + goog.math.randomInt(this.gameObj.fightSceneEnemyEndX-this.gameObj.fightSceneEnemyStartX),
            row: this.gameObj.fightSceneEnemyStartY + goog.math.randomInt(this.gameObj.fightSceneEnemyEndY-this.gameObj.fightSceneEnemyStartY)
        };

        var repeated = false;

        for(j=0; j < enemyUnitPositions.length; j++) {
            if(enemyUnitPositions[j].row == position.row && enemyUnitPositions[j].col == position.col) {
                repeated = true;
                break;
            }
        }

        if(!repeated) {
            enemyUnitPositions.push(position);
        }            
    }

    for(i=0;i<this.enemyArmy.army;i++) {
        var pos = this.gameObj.map.getXYFromColRow(enemyUnitPositions[i].col,enemyUnitPositions[i].row);
        var unit = new huungry.Character().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
            .setGameObj(this.gameObj);

        this.fightLayer.appendChild(unit);
    }
}