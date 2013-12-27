if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1 = new Object();
huungryGameMaps.level1.width = 460;
huungryGameMaps.level1.height = 300;
huungryGameMaps.level1.image = 'assets/levels/level1.png';
huungryGameMaps.level1.playerInitialX = 9;
huungryGameMaps.level1.playerInitialY = 8;

huungryGameMaps.level1.tiledData = { 
 "height":15,
 "layers":[
        {
         "data":[42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 17, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 42, 42, 42, 42, 31, 31, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 31, 31, 42, 42, 42, 42, 31, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 31, 31, 31, 31, 42, 42, 31, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 42, 42, 31, 42, 31, 31, 31, 31, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 42, 42, 9, 9, 9, 9, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 9, 9, 9, 9, 9, 14, 17, 17, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 9, 9, 14, 14, 9, 9, 9, 9, 9, 8, 9, 17, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 9, 9, 9, 9, 14, 17, 17, 17, 17, 8, 14, 9, 17, 42, 42, 42, 42, 42, 42, 42, 42, 9, 31, 22, 1, 9, 9, 9, 14, 9, 35, 1, 35, 14, 9, 17, 42, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 31, 31, 21, 9, 9, 9, 9, 8, 9, 9, 9, 17, 42, 42, 42, 42, 42, 42, 42, 42, 42, 31, 42, 42, 42, 42, 31, 21, 21, 9, 9, 9, 35, 9, 17, 42, 42, 42, 42, 42, 42, 42, 31, 31, 31, 31, 31, 31, 42, 42, 31, 14, 14, 9, 9, 8, 9, 17, 42, 42, 42, 42, 9, 9, 31, 31, 22, 14, 14, 22, 31, 31, 31, 42, 31, 14, 14, 14, 9, 9, 17, 42, 42, 42, 22, 31, 22, 31, 31, 31, 22, 31, 22, 31, 31, 31, 22, 42, 8, 8, 17, 17, 17, 17],
         "height":15,
         "name":"map1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":23,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 21, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 0, 44, 21, 21, 0, 44, 0, 44, 44, 44, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"map2",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":23,
         "x":0,
         "y":0
        }, 
        {
         "data":[130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 0, 0, 130, 130, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 130, 130, 0, 130, 0, 0, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 130, 130, 0, 0, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 0, 0, 0, 130, 0, 0, 0, 0, 130, 0, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 0, 0, 0, 130, 130, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 130, 130, 0, 0, 0, 0, 0, 130, 130, 130, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 130, 0, 0, 0, 0, 130, 0, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 0, 130, 130, 130, 130, 0, 130, 130, 0, 0, 0, 130, 0, 130, 130, 130, 130, 130, 130, 130, 130, 0, 0, 0, 0, 0, 0, 130, 130, 0, 0, 0, 0, 0, 130, 0, 130, 130, 130, 130, 130, 0, 0, 0, 0, 130, 0, 0, 130, 0, 0, 0, 130, 0, 0, 0, 0, 0, 0, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130, 130],
         "height":15,
         "name":"blocked",
         "opacity":0.720000028610229,
         "type":"tilelayer",
         "visible":false,
         "width":23,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 122, 0, 113, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 113, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"enemies",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":23,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 59, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 72, 0, 0, 68, 0, 0, 0, 0, 0, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"items",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":23,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":20,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/assets\/huungree_tileset (copy).png",
         "imageheight":211,
         "imagewidth":274,
         "margin":1,
         "name":"huungree_tileset (copy)",
         "properties":
            {

            },
         "spacing":1,
         "tileheight":20,
         "tilewidth":20
        }],
 "tilewidth":20,
 "version":1,
 "width":23
};

huungryGameMaps.level1.enemyArmies = [
    {
        isQuestGoal: true,
        x: 21,
        y: 3,
        image: 'lion.png',
        background: 'sand_background.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 3
            },
            {
                id: 'lion',
                number: 3
            },
            {
                id: 'lion',
                number: 3
            },
            {
                id: 'lion',
                number: 5
            },
        ]
    },
    {
        isQuestGoal: true,
        x: 9,
        y: 11,
        image: 'lion.png',
        background: 'sand_background.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 10
            },            
        ]
    },
    {
        isQuestGoal: true,
        x: 11,
        y: 8,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            {
                id: 'wolf',
                number: 4
            },    
            {
                id: 'wolf',
                number: 7
            },     
            {
                id: 'lion',
                number: 5
            },            
        ]
    },
    {
        isQuestGoal: true,
        x: 6,
        y: 13,
        image: 'snake.png',
        background: 'sand_background.png',
        unitsSummary: [
            {
                id: 'snake',
                number: 3
            },    
            {
                id: 'snake',
                number: 3
            },     
            {
                id: 'snake',
                number: 6
            },     
            {
                id: 'snake',
                number: 3
            },     
            {
                id: 'snake',
                number: 1
            },      
            {
                id: 'snake',
                number: 1
            },            
        ]
    },
    {
        isQuestGoal: true,
        x: 20,
        y: 9,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            {
                id: 'snake',
                number: 1
            },    
            {
                id: 'snake',
                number: 4
            },
            {
                id: 'snake',
                number: 5
            },
            {
                id: 'snake',
                number: 5
            },    
            {
                id: 'snake',
                number: 1
            },    
            {
                id: 'snake',
                number: 2
            },     
            {
                id: 'snake',
                number: 2
            },                 
        ]
    },
    {
        isQuestGoal: true,
        x: 18,
        y: 12,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            {
                id: 'wolf',
                number: 5
            },    
            {
                id: 'snake',
                number: 2
            },     
            {
                id: 'snake',
                number: 4
            },     
            {
                id: 'snake',
                number: 2
            },     
            {
                id: 'snake',
                number: 7
            },                 
        ]
    }
    ];

    huungryGameMaps.level1.shops = [
      {
        x: 21,
        y: 9,
        name: 'THE CRAB INN',
        image: 'house-1.png',
        units: [
            {
                id: 'peasant',
                price: 15,
                qty: 20
            },
            {                
                id: 'wolf',
                price: 25,
                qty: 10
            }           
        ]
    }
  ];

  huungryGameMaps.level1.items = [
    {
        x: 7,
        y: 8,
        name: 'Magic Shield',
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL',
        numHits: 3
    },
    {
        x: 20,
        y: 1,
        name: 'Gold',
        gold: 20,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 3,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 8,
        name: 'Gold',
        gold: 28,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 5,
        y: 13,
        name: 'Gold',
        gold: 55,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    }, 
    {
        x: 9,
        y: 13,
        name: 'Gold',
        gold: 47,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },    
    {
        x: 21,
        y: 13,
        name: 'Gold',
        gold: 35,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 21,
        y: 2,
        name: 'Fire Scroll',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
     {
        x: 12,
        y: 13,
        name: 'Fire Scroll',
        attack: 25,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    ];

huungryGameMaps.level1.quest = {
    screens: ['Three maritime super powers dispute the new continent of Tamaca. \
        The Nothul Empire and their heavy troops occupy the north. \
        The Ghornia Queendom took over the coastal trade. \
        The Republic of Ingeber and their privateers went inland and took over the Mystical Cities.',

        'You play the role of Jakkal, aspiring privateer from Ingeber. \
        You\'ve just arrived to Crab Bay to join your older brother Jekkel,\
        a seasoned privateer who is in the Mystical City of Crisal, far inland in Tamaca.',

        'You\'ll need a few nights in Crab Bay to prepare your operations. \
        <div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Kill all the wild animals so you can set your camp in peace.\
        <div class="quest-icons-container"><img src="assets/images/units/snake.png" width="20" /> \
        <img src="assets/images/units/snake.png" width="20" /> \
        <img src="assets/images/units/snake.png" width="20" /> \
        <img src="assets/images/units/snake.png" width="20" /> \
        <img src="assets/images/units/wolf.png" width="20" /> \
        <img src="assets/images/units/lion.png" width="20" /> \
        <img src="assets/images/units/lion.png" width="20" /> \
        <img src="assets/images/units/lion.png" width="20" /> \
        </div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}]
};

huungryGameMaps.level1.nextLevel = 'level2';