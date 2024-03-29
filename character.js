goog.provide('huungry.Character');

goog.require('lime.Sprite');

/**
 * Game character class for tile-based games
 */
huungry.Character = function() {
    goog.base(this);

    this.setAnchorPoint(0, 0);    
    this.path = [];
    this.isMoving = false;
    this.currentTarget = [];
    
    //unique id
    this.id = Math.floor(Math.random() * 10000000000);
}

goog.inherits(huungry.Character,lime.Sprite);

/**
 *Get the character tile column and row
 */
huungry.Character.prototype.getCell = function() {
    return this.gameObj.map.getColRowFromXY(this.getPosition().x, this.getPosition().y);
}


/**
 * set game object
 * @param {} gameObj
 * @return {}
 */
huungry.Character.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    this.setSize(this.gameObj.tileSize,this.gameObj.tileSize);
    return this;
}

/**
 * set map
 * @param {} map
 * @return {}
 */
huungry.Character.prototype.setMap = function(map) {
    this.map = map;
    this.map.addElement(this);
    return this;
}

/**
 * keep updated map column and row position record
*/
huungry.Character.prototype.refreshMapPos = function() {
    var pos = this.getPosition();
    this.cell = this.map.getColRowFromXY(pos.x, pos.y);
    return this;
}


/**
 * set the characters attributes
 * @param {} attributes
 */
huungry.Character.prototype.setAttributes = function(attributes) {
    this.life = attributes.life;
    return this;
}

/**
 * init on screen gamepad
 * 
 */
huungry.Character.prototype.initGamepad = function() {

    //create movement targets where the user touches
    this.movementTargets = [];

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_up.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 0,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_down.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 0,
        'dy': 1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_left.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': 0
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_right.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': 0
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_up_right.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_down_left.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': 1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_up_left.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': -1
    });

    this.movementTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('assets/arrow_down_right.png').setOpacity(0.8)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': 1
    });
    
    //create attack targets where the user touches
    this.attackTargets = [];

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 0,
        'dy': -1
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 0,
        'dy': 1
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': 0
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': 0
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': -1
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': 1
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': -1,
        'dy': -1
    });

    this.attackTargets.push({
        'sprite': new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C').setOpacity(0.5)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize).setHidden(true),
        'dx': 1,
        'dy': 1
    });
    
    var targetLayer = (this.customLayer === undefined) ? this.gameObj.gameLayer : this.customLayer;
    
    for(var i=0; i<this.movementTargets.length; i++) {
        targetLayer.appendChild(this.movementTargets[i].sprite);
        targetLayer.appendChild(this.attackTargets[i].sprite);
    }

    //show highlighted
    this.currentHighlight = new lime.Sprite().setAnchorPoint(0,0).setFill('#FFF000')
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setOpacity(0.3).setHidden(true);
    targetLayer.appendChild(this.currentHighlight);

    
    //register movement according to user input
    var character = this;
    
    for(i=0; i<this.movementTargets.length; i++) {
        (function (i) {
            goog.events.listen(character.movementTargets[i].sprite,['mousedown', 'touchstart'], function(e) {

                e.event.stopPropagation();
                character.toggleGamepad(false);
                
                var currentPos = character.getPosition();
                var tileSize = character.gameObj.tileSize;
                character.previousPosition = currentPos;
                
                var targetX = currentPos.x + tileSize*character.movementTargets[i].dx;
                var targetY = currentPos.y + tileSize*character.movementTargets[i].dy;
                
                if(character.gameObj.animationOn) {
                    var movement = new lime.animation.MoveTo(targetX,targetY).setDuration(character.gameObj.movementDuration);                    
                    character.runAction(movement);                    
                    goog.events.listen(movement,lime.animation.Event.STOP,function(){
                        character.playerMoved();
                    });
                }
                else {
                    character.setPosition(targetX, targetY);
                    character.playerMoved();
                }

                if(character.fightEngine) {                    
                    character.fightEngine.remainingMoves--;
                    //console.log(character.fightEngine.remainingMoves);
                }           
            });
            
            //attack
            goog.events.listen(character.attackTargets[i].sprite,['mousedown', 'touchstart'], function(e) {
                e.event.stopPropagation();
                if(character.currentTarget.length) {
                    character.toggleGamepad(false);
                    //console.log(character);
                    character.attackUnit(character.currentTarget[i]);
                }                
            });

        })(i);
    }       
}

/**
 * set whether the player can move or is blocked, show/hide movement targets
 * 
 * @param boolean isVisible
 */
huungry.Character.prototype.toggleGamepad = function(isVisible) {
    this.isGamepadVisible = isVisible;
    if(isVisible) {
        var pos = this.getPosition();
        var currentCell = this.getCell();
        
        var tileSize = this.gameObj.tileSize;

        for(var i=0; i<this.movementTargets.length; i++) {

            var targetCol = currentCell.col+this.movementTargets[i].dx;
            var targetRow = currentCell.row+this.movementTargets[i].dy;
            
            //show if it can move
            if(!this.gameObj.map.isCellBlocked(targetCol, targetRow)) {
                var posX=pos.x+tileSize*this.movementTargets[i].dx;//+(this.movementTargets[i].dx < 0 ? tileSize/2 : this.movementTargets[i].dx == 0 ? tileSize/4 : 0),
                var posY=pos.y+tileSize*this.movementTargets[i].dy;//+(this.movementTargets[i].dy > 0 ? tileSize/2 : this.movementTargets[i].dy == 0 ? tileSize/4 : 0);
                this.movementTargets[i].sprite.setHidden(false);
                this.movementTargets[i].sprite.setPosition(posX,posY);
            }
            else {
                this.movementTargets[i].sprite.setHidden(true);
                this.attackTargets[i].sprite.setHidden(true);
            }
        }    
    }
    else {
        this.currentHighlight.setHidden(true);
        for(var i=0; i<this.movementTargets.length; i++) {
            this.movementTargets[i].sprite.setHidden(true);
            this.attackTargets[i].sprite.setHidden(true);
        }
        
        if(this.fightEngine) {
            this.fightEngine.clearRangeTargets();
        }
    }    
    
}

/**
 * by default hide gamepad
 */
huungry.Character.prototype.playerMoved = function() {
    this.toggleGamepad(false);
}

/**
 * kill unit
 */
huungry.Character.prototype.die = function() {
    this.setHidden(true);
    if(this.map) {
        this.map.removeElement(this);
    }
}

/**
 * set element type
 * 
 * @param int elementType
 * @return huungry.Character
 */
huungry.Character.prototype.setElementType = function(elementType) {
    this.elementType = elementType;
    return this;
}

/**
* get the center of the unit
*/
huungry.Character.prototype.getCenter = function() {
    var pos = this.getPosition();
    return {x: pos.x + this.gameObj.tileSize/2, y: pos.y + this.gameObj.tileSize/2}
}

/**
* show goal icon
*/
huungry.Character.prototype.showGoalIcon = function() {
    if(this.isQuestGoal) {
            var goalIcon = new lime.Sprite()
            .setSize(this.gameObj.tileSize*0.32, this.gameObj.tileSize*0.32)
            .setFill('assets/images/backgrounds/trophy.png')
            .setPosition(this.gameObj.tileSize*0.85, this.gameObj.tileSize*0.85);
        this.appendChild(goalIcon);
    }    
}