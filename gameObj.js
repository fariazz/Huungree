goog.provide('huungry.GameObj');

/*
 * GameObj
 */
huungry.GameObj = function(document, params) {

    this.isFullVersion = params.isFullVersion;
    this.upgradeURL = params.upgradeURL;

    this.GAME_VERSION = '1.1';
    this.COMPATIBLE_VERSIONS = ['1.0', '1.1'];
    this.developmentMode = false;
    this.initialLevel = 'level1';
    this.renderer = lime.Renderer.DOM;

    this.screenWidth = 480;
    this.screenHeight= 320;
    this.tileSize= 40;
    this.FREE_TARGET= 1;
    this.PLAYER_ARMY= 2;
    this.ENEMY_ARMY= 3;
    this.PLAYER_UNIT= 4;
    this.ENEMY_UNIT= 5;
    this.BLOCKED_TARGET= 6;
    this.ITEM_TARGET= 7;
    this.SHOP_TARGET= 8;
    this.CITY_TARGET= 9;
    this.QUEST_TARGET= 10;

    //inanimated types
    this.HUMAN_SKELLETON = 1;
    this.NONHUMAN_SKELLETON = 2;
    this.TREE = 3;
    this.ROCK = 4;

    //map attacks
    this.PROB_MAP_ARMY_ATTACK = 0.15;

    //this.API_BATTLE_URL = 'http://localhost:8097/huungreeBattle';
    this.API_BATTLE_URL = 'http://zenva.com/huungreeBattle';
    this.API_EVENT_URL = 'http://zenva.com/huungreeEvent';
    this.unsavedMinutes = 0;
    this.sessionId = null;
    this.timeInCurrentLevel = 0;
    this.notifyInterval = null;

    this.powerNumFactor = 0.3;

    //probability to reach target for range attack units
    this.accuracyProbability = 0.55;

    this.screenNumTilesX = this.screenWidth/this.tileSize;
    this.screenNumTilesY = this.screenHeight/this.tileSize;

    //area in fight scene where units appear
    this.fightScenePlayerStartX = 2;
    this.fightScenePlayerEndX = 4;
    this.fightScenePlayerStartY = 0;
    this.fightScenePlayerEndY = this.screenNumTilesY-2;

    this.fightSceneEnemyStartX = this.screenNumTilesX-5;
    this.fightSceneEnemyEndX = this.screenNumTilesX-3;
    this.fightSceneEnemyStartY = 0;
    this.fightSceneEnemyEndY = this.screenNumTilesY-2;

    this.maxRandPercentage = 0.15;

    //probability that a range attack unit shoots
    this.shootProbability = 0.80;

    //animation
    this.animationOn = true;
    this.movementDuration = 0.2;

    //get platform
    this.AUDIO_EXTENSION = 'ogg';
    this.CLICK_EVENT = 'click';

    if(window.device) {
      this.platform = window.device.platform;
      this.platform_version = window.device.version;

      if(this.platform == 'iOS') {
        this.AUDIO_EXTENSION = 'mp3';
        this.CLICK_EVENT = 'touchstart';
      }
    }
    else {
      this.platform = 'Browser';
    }

    //register event
    this.sendEvent('GAME_INIT', 1, null);
    this.notifyServer();

    this.director = new lime.Director(document.body, this.screenWidth, this.screenHeight);
    //this.director.makeMobileWebAppCapable();

    //pause music on pause and resume
    var that = this;
    document.addEventListener("pause", function(){
      that.isInBackground = true;
      that.activeSounds = [];

      _.each(that.currentSounds, function(element, key){
          element.getCurrentPosition(function(pos){
            if(that.player.inFightScene) {
              if(key == "royal-jester") {
                pos = false;
              }
            }

            if(pos && !element.zvaTurnedOff) {
              that.activeSounds.push(key);
            }
          });
      });

      that.pauseSound();
    }, false);

    document.addEventListener("resume", function(){
      that.isInBackground = false;
      _.each(that.activeSounds, function(element, key){
        that.playSound(element);
      });
    }, false);

};

/**
 * create a deep copy of a unit
 * @param {huungry.Unit} unit
 * @param number
 */
huungry.GameObj.prototype.cloneUnit = function(unit, number) {
    var cloned = _.clone(unit);
    cloned.life = number;
    return cloned;
};

/**
 * load and open a level
 * @param levelName
 */
huungry.GameObj.prototype.runLevel = function(levelName, pos, darkness, mapItems, enemyArmies, mapShops) {

    this.currentLevel = levelName;

    //game scene
    this.gameScene = new lime.Scene().setRenderer(this.renderer);
    this.gameLayer = new lime.Layer().setAnchorPoint(0, 0);
    this.darknessLayer = new lime.Layer().setAnchorPoint(0, 0);
    this.gameScene.appendChild(this.gameLayer);
    this.gameScene.appendChild(this.darknessLayer);

    //game map
    this.map = new huungry.Map().setGameObj(this)
        .setLevel(levelName);
    this.map.init();
    this.map.initLevel(mapItems, enemyArmies, mapShops);

    if(!darkness) {
      //init map visibility
      this.darkness = [];
      for(i = 0, arrayLen = this.map.num_cols; i<arrayLen; i++) {
          this.darkness.push([]);
          for(var j = 0, arrayLen2 = this.map.num_rows; j<arrayLen2; j++) {
              this.darkness[i][j] = 1;
          }
      }
    }
    else {
      this.darkness = darkness;
    }

    //place player
    var posRC;
    if(!pos) {
      posCR = {col: this.map.playerInitialX, row: this.map.playerInitialY};
      pos = this.map.getXYFromColRow(this.map.playerInitialX,this.map.playerInitialY);
    }
    else {
      posCR = this.map.getColRowFromXY(pos.x, pos.y);
    }
    this.player.setPosition(pos.x, pos.y);
    this.player.setMap(this.map);
    this.player.refreshMapPos();
    this.player.init();

    this.gameLayer.appendChild(this.player);
    this.player.toggleGamepad(true);
    this.centerCameraTo(pos.x,pos.y);
    this.updateVisiblity(posCR.col, posCR.row);

    //controls layer
    this.controlsLayer = new huungry.ControlsLayer().setGameObj(this);
    this.controlsLayer.init();
    this.gameScene.appendChild(this.controlsLayer);

    this.director.replaceScene(this.gameScene);

    //show quest
    if(!darkness) {
      this.showQuest();
    }

    this.checkQuestCompletion(true);
    this.controlsLayer.refreshInfo();
};

/**
* set visiblity of map cells that are on the screen. Create darkness
* black polygons to cover unvisible areas
*
* @param col location of the player
* @param row location of the player
*/
huungry.GameObj.prototype.updateVisiblity = function(col,row) {
   this.darkness[col][row]= 0;

   if(col-1 >= 0 && row-1 >= 0) {
       this.darkness[col-1][row-1]= 0;

       if(col-2 >= 0 && row-1 >= 0) {
           this.darkness[col-2][row-1]= 0;
       }

       if(col-1 >= 0 && row-2 >= 0) {
           this.darkness[col-1][row-2]= 0;
       }
   }
   if(col-1 >= 0) {
       this.darkness[col-1][row]= 0;

       if(col-2 >= 0) {
           this.darkness[col-2][row]= 0;
       }
   }
   if(col-1 >= 0 && row+1 < this.map.num_rows) {
       this.darkness[col-1][row+1]= 0;

       if(col-2 >= 0 && row+1 < this.map.num_rows) {
           this.darkness[col-2][row+1]= 0;
       }
       if(col-1 >= 0 && row+2 < this.map.num_rows) {
           this.darkness[col-1][row+2]= 0;
       }
   }
   if(row-1 >= 0) {
       this.darkness[col][row-1]= 0;

       if(row-2 >= 0) {
           this.darkness[col][row-2]= 0;
       }
   }
   if(row+1 < this.map.num_rows) {
       this.darkness[col][row+1]= 0;

       if(row+2 < this.map.num_rows) {
           this.darkness[col][row+2]= 0;
       }

   }
   if(col+1 < this.map.num_cols && row-1 >= 0) {
       this.darkness[col+1][row-1]= 0;

       if(col+2 < this.map.num_cols && row-1 >= 0) {
           this.darkness[col+2][row-1]= 0;
       }
       if(col+1 < this.map.num_cols && row-2 >= 0) {
           this.darkness[col+1][row-2]= 0;
       }
   }
   if(col+1 < this.map.num_cols) {
       this.darkness[col+1][row]= 0;

       if(col+2 < this.map.num_cols) {
           this.darkness[col+2][row]= 0;
       }
   }
   if(col+1 < this.map.num_cols && row+1 < this.map.num_rows) {
       this.darkness[col+1][row+1]= 0;

       if(col+2 < this.map.num_cols && row+1 < this.map.num_rows) {
           this.darkness[col+2][row+1]= 0;
       }
       if(col+1 < this.map.num_cols && row+2 < this.map.num_rows) {
           this.darkness[col+1][row+2]= 0;
       }
   }

   var layerPos = this.gameLayer.getPosition();
   var offsetX = -layerPos.x/this.tileSize;
   var offsetY = -layerPos.y/this.tileSize;

   //console.log('offsetX:'+offsetX);
   //console.log('offsetY:'+offsetY);

   this.darknessLayer.removeAllChildren();
   this.darknessLayer.setPosition(0,0);
   var darknessCell;
   //console.log(this.darkness);
   var currStart;
   var creatingBlock = false;
   for(i=0; i < this.screenNumTilesY; i++) {
       for(j=0; j < this.screenNumTilesX; j++) {

           //if it's dark, then start or continue darkness
           //console.log('offsetY+i:'+(offsetY+i));
           //console.log('offsetX+j:'+(offsetX+j));
           if(offsetY+i != -1 && offsetX+j != -1 && this.darkness[offsetX+j] !== undefined) {
               if(this.darkness[offsetX+j][offsetY+i]) {
                   if(!creatingBlock) {
                       creatingBlock = true;
                       currStart = {col: j, row: i};
                   }
               }
               else {
                   if(creatingBlock) {
                       creatingBlock = false;
                       darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
                           setPosition(currStart.col*this.map.tileSize,currStart.row*this.map.tileSize).
                           setSize(this.map.tileSize*(j - currStart.col),this.map.tileSize);
                       this.darknessLayer.appendChild(darknessCell);
                   }
               }
           }
       }
       if(creatingBlock) {
           creatingBlock = false;
//                console.log('i:'+i);
//                console.log('start position x:'+currStart.col*this.map.tileSize);
//                console.log('start position y:'+currStart.row*this.map.tileSize);
//                console.log('size x:'+this.map.tileSize*(j-1 - currStart.col));
           darknessCell = new lime.Sprite().setAnchorPoint(0,0).setFill('#000000').
               setPosition(currStart.col*this.map.tileSize,currStart.row*this.map.tileSize).
               setSize(this.map.tileSize*(j-1 - currStart.col),this.map.tileSize);
           this.darknessLayer.appendChild(darknessCell);
       }
   }

};

/**
 * center map layer to a coordinate
 * @param x
 * @param y
 */
huungry.GameObj.prototype.centerCameraTo = function(x,y) {
//        console.log('x:'+x);
//        console.log('y:'+y);
//
//        console.log('x+gameObj.screenWidth/2:'+Math.round((-x+gameObj.screenWidth/2)));
//        console.log('y+gameObj.screenHeight/2:'+Math.round((-y+gameObj.screenHeight/2)));
//

    this.gameLayer.setPosition(Math.min(0,Math.round(-x+this.screenWidth/2-this.tileSize)),Math.min(0,Math.round(-y+this.screenHeight/2)));
};

//fight scene
huungry.GameObj.prototype.fight = function(enemy) {
    this.pauseSound('royal-jester');
    this.playSound('enemy-offense', {loop: true});
    var FightEngine = new huungry.FightEngine().setGameObj(this).setEnemyArmy(enemy);
    FightEngine.init();
};

/**
 * load and open a level
 * @param {Array} unitTypes
 */
huungry.GameObj.prototype.setUnitTypes = function(unitTypes) {

    this.unitTypes = [];
    for(var i=0, arrayLen = unitTypes.length; i<arrayLen; i++) {
        this.unitTypes[unitTypes[i].typeid] = unitTypes[i];
    }
    return this;
};

/**
* show splash screen
*
*/
huungry.GameObj.prototype.showSplashScreen = function() {
    this.splashScreen = {};
    this.splashScreen.scene = new lime.Scene().setRenderer(this.renderer);
    this.splashScreen.background = new lime.Sprite().setAnchorPoint(0,0).
        setFill('assets/images/backgrounds/home.png').setSize(this.screenWidth, this.screenHeight);

    this.splashScreen.startBtn = new lime.Sprite().
        setFill('assets/images/backgrounds/home_button.png').setSize(this.tileSize*3, this.tileSize)
        .setPosition(this.screenWidth/2, this.tileSize*4);
   var startBtnTxt = new lime.Label().setText('NEW').setPosition(0,2).
        setFontColor('#E9DDB9').setFontSize(16);
   this.splashScreen.startBtn.appendChild(startBtnTxt);

    this.splashScreen.loadBtn = new lime.Sprite().
            setFill('assets/images/backgrounds/home_button.png').setSize(this.tileSize*3, this.tileSize)
            .setPosition(this.screenWidth/2, this.tileSize*5.4);
    var loadBtnTxt = new lime.Label().setText('LOAD').setPosition(0,2).
        setFontColor('#E9DDB9').setFontSize(16);
   this.splashScreen.loadBtn.appendChild(loadBtnTxt);


    this.splashScreen.aboutBtn = new lime.Sprite().
            setFill('assets/images/backgrounds/home_button.png').setSize(this.tileSize*3, this.tileSize)
            .setPosition(this.screenWidth/2, this.tileSize*6.8);

    var aboutTxt = this.isFullVersion ? 'ABOUT' : 'UPGRADE';

    var aboutBtnTxt = new lime.Label().setText(aboutTxt).setPosition(0,2).
        setFontColor('#E9DDB9').setFontSize(16);
   this.splashScreen.aboutBtn.appendChild(aboutBtnTxt);

    this.splashScreen.scene.appendChild(this.splashScreen.background);
    this.splashScreen.scene.appendChild(this.splashScreen.startBtn);
    this.splashScreen.scene.appendChild(this.splashScreen.aboutBtn);
    this.splashScreen.scene.appendChild(this.splashScreen.loadBtn);

    var currentObj = this;
    goog.events.listen(this.splashScreen.startBtn,['mousedown', 'touchstart'], function(e) {
        currentObj.runLevel(currentObj.initialLevel);
    });
    goog.events.listen(this.splashScreen.loadBtn,['mousedown', 'touchstart'], function(e) {
        currentObj.loadGame();
    });
    goog.events.listen(this.splashScreen.aboutBtn,['mousedown', 'touchstart'], function(e) {
      if (currentObj.isFullVersion) {
        HuungryUI.showAboutDialog(currentObj);
      }
      else {
        window.location = currentObj.upgradeURL;
      }
    });

    this.director.replaceScene(this.splashScreen.scene);
}

/**
load a game
*/
huungry.GameObj.prototype.loadGame = function() {
  if(localStorage.getItem('currentLevel')) {

    //check if the current game version is compatible with the saved one
    var savedVersion = localStorage.getItem('gameVersion');

    if($.inArray(savedVersion, this.COMPATIBLE_VERSIONS) == -1) {
      HuungryUI.showDialog(
        'A NEW JOURNEY AWAITS',
        'We have drastically improved the gameplay of Huungree and most levels have been modified so you can no longer resume your saved game. We are sure you will enjoy this new version much more!',
        [{text: 'OK', btnClass: 'button-home', callback: function(){}}]
      );
      return;
    }


    var playerPos = JSON.parse(localStorage.getItem('currentLocation'));
    var darkness = JSON.parse(localStorage.getItem('currentDarkness'));
    this.player.gold = parseInt(localStorage.getItem('currentGold'));

    //load units
    this.player.units = [];
    var units = JSON.parse(localStorage.getItem('currentUnits'));
    var unitsLen = units.length;
    for(var i=0; i<unitsLen; i++) {

      this.player.units.push(this.cloneUnit(this.unitTypes[units[i]['typeid']], units[i]['life']));
    }

    //load items
    var items = JSON.parse(localStorage.getItem('currentItems'));
    var itemsLen = items.length;
    var item;
    for(var i=0; i<itemsLen; i++) {
      item = new huungry.Item();
      item.setData(items[i]).setGameObj(this);
      this.player.collect(item, true);
    }

    var mapItems = JSON.parse(localStorage.getItem('mapItems'));
    var enemyArmies = JSON.parse(localStorage.getItem('enemyArmies'));
    var mapShops = JSON.parse(localStorage.getItem('mapShops'));

    //load analytics
    //console.log('time in level:'+localStorage.getItem('timeInCurrentLevel'));
    this.timeInCurrentLevel = parseFloat(localStorage.getItem('timeInCurrentLevel'));
    this.runLevel(localStorage.getItem('currentLevel'), playerPos, darkness, mapItems, enemyArmies, mapShops);
  }
}

/**
  show quest of the current level
  */
  huungry.GameObj.prototype.showQuest = function() {
    HuungryUI.showSequence('LEVEL INTRO', huungryGameMaps[this.currentLevel].quest.screens)
  }

  /**
  check quest completion

  @param isLevelInit true if the level is being initiated, so that the total of goals can be extracted
  */
  huungry.GameObj.prototype.checkQuestCompletion = function(isLevelInit) {
    var i;
    var aliveEnemies;
    var numQuests = huungryGameMaps[this.currentLevel].quest.goals.length;
    this.numRemainingQuests = numQuests;
    this.numRemainingQuestsGoals = 0;

    for(i = 0; i < numQuests; i++) {
      if(huungryGameMaps[this.currentLevel].quest.goals[i].type == 'QUEST-KILL') {
        //for kill quests check that goal armies are dead
        aliveEnemies = 0;
        _.each(this.enemyArmies, function(value, key) {
          if(value.isQuestGoal) {
            aliveEnemies++;
            this.numRemainingQuestsGoals++;
          }
        }, this);

        if(aliveEnemies == 0) {
          this.numRemainingQuests--;
        }
      }
      else if(huungryGameMaps[this.currentLevel].quest.goals[i].type == 'QUEST-ITEMS' || huungryGameMaps[this.currentLevel].quest.goals[i].type == 'QUEST-LANDMARK') {
        remainingItems = 0;
        _.each(this.mapItems, function(value, key) {
          if(value.isQuestGoal) {
            remainingItems++;
            this.numRemainingQuestsGoals++;
          }
        }, this);

        if(remainingItems == 0) {
          this.numRemainingQuests--;
        }
      }
    }

    this.goalsCompleted = huungryGameMaps[this.currentLevel].quest.totalNumGoals-this.numRemainingQuestsGoals;

    if(this.numRemainingQuests == 0) {
      this.levelCompleted();
    }
  };

  /**
  move to the next level
  */
  huungry.GameObj.prototype.levelCompleted = function() {

    //save event
    this.sendEvent('LEVEL_COMPLETE', this.currentLevel, this.player.getPower());

    //reset level timing
    this.timeInCurrentLevel = 0;

    var that = this;
    HuungryUI.showDialog('LEVEL COMPLETED!', '<div class="centered">You have successfully completed all the quests of this level.</div>',
      [{text: 'NEXT LEVEL', btnClass: 'button-home', callback: function() {
          if(huungryGameMaps[that.currentLevel].nextLevel) {
            if(!that.isFullVersion && _.indexOf(['level1', 'level2', 'level3'], huungryGameMaps[that.currentLevel].nextLevel) == -1) {
              HuungryUI.showGoPremiumDialog();
            }
            else {
              that.runLevel(huungryGameMaps[that.currentLevel].nextLevel);
              HuungryUI.gameObj.saveGame(false);
            }
          }
          else {
            if(!that.completedGame) {
              that.completedGame = true;
              that.sendEvent('GAME_COMPLETE', that.currentLevel, that.player.getPower());
            }

            HuungryUI.showEndofGameDialog();
          }
      }}]);
  }

  /**
  save gameObj*/
  huungry.GameObj.prototype.saveGame = function(showSaveSuccess) {
    //save level
      localStorage.setItem('currentLevel', this.currentLevel);

      //save player location
      localStorage.setItem('currentLocation', JSON.stringify(this.player.getPosition()));

      //save gold
      localStorage.setItem('currentGold', this.player.gold);

      //save units
      var units = [];
      var unitsLen = this.player.units.length;
      for(var i=0; i<unitsLen; i++) {
        units.push({
          typeid: this.player.units[i].typeid,
          life: this.player.units[i].life
        });
      }
      localStorage.setItem('currentUnits', JSON.stringify(units));

      //save player items
      var items = [];
      var itemsLen = this.player.items.length;
      for(var i=0; i<itemsLen; i++) {
          items.push(this.player.items[i].getData());
      }
      localStorage.setItem('currentItems', JSON.stringify(items));

      //save map items
      var mapItems = [];
      var mapItemsLen = this.mapItems.length;
      for(var i=0; i<mapItemsLen; i++) {
          mapItems.push(this.mapItems[i].getData());
      }
      localStorage.setItem('mapItems', JSON.stringify(mapItems));

      //save map enemy armies
      var enemyArmies = [];
      var enemyArmiesLen = this.enemyArmies.length;
      for(var i=0; i<enemyArmiesLen; i++) {
          enemyArmies.push(this.enemyArmies[i].getData());
      }
      localStorage.setItem('enemyArmies', JSON.stringify(enemyArmies));

      //save map enemy armies
      var mapShops = [];
      var mapShopsLen = this.mapShops.length;
      for(var i=0; i<mapShopsLen; i++) {
          mapShops.push(this.mapShops[i].getData());
      }
      localStorage.setItem('mapShops', JSON.stringify(mapShops));

      //save visibility
      localStorage.setItem('currentDarkness', JSON.stringify(this.darkness));

      //save analytics
      localStorage.setItem('timeInCurrentLevel', this.timeInCurrentLevel);
      localStorage.setItem('gameVersion', this.GAME_VERSION);

      if(showSaveSuccess) {
        HuungryUI.showDialog('GAME SAVED!', '', [{
          text: 'OK',
          btnClass: 'button-home',
          callback: HuungryUI.hideDialog}]);
      }



  }

/**
* send stats to server
*/
huungry.GameObj.prototype.sendEvent = function(key, value, strength) {
    var that = this;
    var gold = this.player ? (this.player.gold !== undefined ? this.player.gold : null) : null;

    if(window.device) {
        $.ajax(this.API_EVENT_URL, {
          data: {
            platform: window.device.platform,
            platform_version: window.device.version,
            device_id: window.device.uuid,
            key: key,
            value: value,
            game_version: that.GAME_VERSION,
            strength: strength,
            gold: gold,
            sessionId: that.sessionId ? that.sessionId : '',
            level: that.currentLevel,
            unsavedMinutes: that.unsavedMinutes ? that.unsavedMinutes : 0,
            timeInCurrentLevel: that.timeInCurrentLevel,
            currTimestamp: (new Date).getTime(),
            isFullVersion: that.isFullVersion ? 1 : 0
          }
      })
      .done(function(data) {
        if(key == 'GAME_INIT' || key == 'NOTIFY') {
          if(!that.sessionId && data.sessionId) {
            that.unsavedMinutes = 0;
            that.sessionId = data.sessionId;
            console.log('new sessionId: '+that.sessionId);
          }
          else if(data.sessionId) {
            that.unsavedMinutes = 0;
            that.sessionId = data.sessionId;
          }
          else {
            console.log('no session id received');
          }
        }
      })
      ;
    }
}

/**
* play sound
* @param string sound file
* @param array parameters: unique:true if turns off all existing sounds, false if it doesn't. loop: true
*/
huungry.GameObj.prototype.playSound = function(fileName, params) {
  this.currentSounds = this.currentSounds || {};

  var unique;
  var loop;

  if(params) {
    unique = params.unique;
    loop = params.loop;
  }

  if(window.device) {
    var getPhonegaPath = function() {

      if(window.device.platform == "Android") {
        var path = window.location.pathname;
        path = path.substr(path, path.length - 10);
        return 'file://' + path;
      }
      else {
        return "";
      }

    };

    if(unique) {
      _.each(this.currentSounds, function(value, key) {
        if(key != fileName) {
          value.zvaTurnedOff = true;
          value.stop();
        }
      })
    }

    if(!this.currentSounds[fileName]) {
      var that = this;
      var replay = function (status) {
          if (status === Media.MEDIA_STOPPED && loop && !that.currentSounds[fileName].zvaTurnedOff) {
              that.currentSounds[fileName].play();
          }
      };
      console.log('play audio: '+getPhonegaPath() + fileName );
      this.currentSounds[fileName] = new Media(getPhonegaPath() + 'assets/music/' + fileName + '.' + this.AUDIO_EXTENSION, null, null, replay);
      this.currentSounds[fileName].setVolume('1.0');
    }
    this.currentSounds[fileName].play();
    this.currentSounds[fileName].zvaTurnedOff = false;

  }
};

/**
* stop the current sound
* @param string fileName leave empty to turn off all sounds
*/
huungry.GameObj.prototype.stopSound = function(fileName) {
  if(window.device) {

    if(fileName) {
      this.currentSounds[fileName].zvaTurnedOff = true;
      this.currentSounds[fileName].stop();
    }
    else {
      _.each(this.currentSounds, function(value) {
        value.zvaTurnedOff = true;
        value.stop();
      })
    }

  }
};

/**
* pause the current sound
* @param string fileName
*/
huungry.GameObj.prototype.pauseSound = function(fileName) {
  if(window.device) {

    if(fileName) {
      this.currentSounds[fileName].pause();
    }
    else {
      _.each(this.currentSounds, function(element){
        element.pause();
      });
    }

  }
};


/**
* notify the server after each minute of play
*/
huungry.GameObj.prototype.notifyServer = function() {
  var that = this;
  //.log('init notifying server');
  if(window.device) {
    that.notifyInterval = setInterval(function() {
      //console.log('notifying server');

      if(that.currentLevel) {
        that.timeInCurrentLevel += 1;
      }

      that.unsavedMinutes += 1;

      if(!that.isInBackground) {
        that.sendEvent('NOTIFY');
      }

    }, 60000);
  }
};

/**
* init ads
*/
huungry.GameObj.prototype.initAds = function(){

  if (typeof AdMob !== 'undefined' && AdMob) {

    var admobSettings = {};

    if(/(android)/i.test(navigator.userAgent)) {
      admobSettings = {
        banner: 'ca-app-pub-9663360399501946/2345264318',
        interstitial: 'ca-app-pub-9663360399501946/3821997513'
      };

      //prepare banner ad
      AdMob.createBanner({
        adId: admobSettings.banner,
        autoShow: true, //true the ad will start right away
        isTesting: this.developmentMode,
        overlap: false //over the webview
      });

      AdMob.prepareInterstitial({
        adId: admobSettings.interstitial,
        autoShow: false,
        isTesting: this.developmentMode
      });

      this.adsInitiated = true;
    }
  }


};