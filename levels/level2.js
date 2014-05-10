if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level2 = new Object();
huungryGameMaps.level2.width = 460;
huungryGameMaps.level2.height = 180;
huungryGameMaps.level2.image = 'assets/images/levels/level2.png';
huungryGameMaps.level2.playerInitialX = 2;
huungryGameMaps.level2.playerInitialY = 2;

huungryGameMaps.level2.tiledData = {
 "layers":[
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":9,
         "name":"blocked",
         "opacity":0.540000021457672,
         "type":"tilelayer",
         "visible":true,
         "width":23,
         "x":0,
         "y":0
        }]
};


huungryGameMaps.level2.enemyArmies = [
    {
        isQuestGoal: true,
        x: 9,
        y: 2,
        image: 'peasant.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'peasant',
                    power: 200,
                    maxNum: 4
                },
                {
                    typeid: 'axeman',
                    power: 200,
                    maxNum: 3
                }
            ]            
        ]
    },
    {
        isQuestGoal: true,
        x: 19,
        y: 6,
        image: 'peasant.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'peasant',
                    power: 400,
                    maxNum: 3
                },
                {
                    typeid: 'halfling',
                    power: 200,
                    maxNum: 3
                }             
            ]            
        ]
    },
    {
        isQuestGoal: true,
        x: 5,
        y: 6,
        image: 'peasant.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'peasant',
                    power: 200,
                    maxNum: 3
                },
                {
                    typeid: 'archer',
                    power: 100,
                    maxNum: 2
                },
                {
                    typeid: 'wolf',
                    power: 100,
                    maxNum: 1
                }
            ]            
        ]
    },
    {
        isQuestGoal: false,
        x: 20,
        y: 2,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'snake',
                    power: 300,
                    maxNum: 6
                }                
            ]            
        ]
    },
    {
        isQuestGoal: false,
        x: 12,
        y: 5,
        image: 'lion.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'lion',
                    power: 400,
                    maxNum: 6
                }                
            ]            
        ]
    }
];

huungryGameMaps.level2.shops = [
    {
        x: 15,
        y: 3,
        name: 'WHITE CLOUD TAVERN',
        image: 'house-3.png',
        units: [
            {
                typeid: 'peasant',
                price: 35,
                qty: 40
            },
            {
                typeid: 'axeman',
                price: 45,
                qty: 30
            }
        ]
    }
];

huungryGameMaps.level2.items = [
    {
        x: 5,
        y: 2,
        name: 'Gold',
        gold: 70,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 4,
        name: 'Gold',
        gold: 80,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 2,
        y: 6,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 14,
        y: 3,
        name: 'Fire Spell',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 14,
        y: 5,
        name: 'Fire Spell',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 2,
        y: 5,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    }
];

huungryGameMaps.level2.quest = {
    screens: ['You\'ve reached an area occupied by Nothul farmers who provide supplies to their troops.\
Taking over these settlements can provide good bounty, \
but be prepared as they might have some protection.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Kill the 3 Nothul farmer settlers.<br/>\
<img src="assets/images/units/peasant.png" width="20" /> \
<img src="assets/images/units/peasant.png" width="20" /> \
<img src="assets/images/units/peasant.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}],
    totalNumGoals: 3
};

huungryGameMaps.level2.nextLevel = 'level3';