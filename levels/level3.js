if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level3 = new Object();
huungryGameMaps.level3.width = 360;
huungryGameMaps.level3.height = 180;
huungryGameMaps.level3.image = 'assets/images/levels/level3.png';
huungryGameMaps.level3.playerInitialX = 2;
huungryGameMaps.level3.playerInitialY = 2;

huungryGameMaps.level3.tiledData = {
 "layers":[ 
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 0, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 0, 193, 193, 0, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 193, 193, 0, 193, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":12,
         "name":"blocked",
         "opacity":0.620000004768372,
         "type":"tilelayer",
         "visible":true,
         "width":18,
         "x":0,
         "y":0
        }]
};


huungryGameMaps.level3.enemyArmies = [
    {
        isQuestGoal: false,
        x: 12,
        y: 3,
        image: 'axeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'axeman',
                    power: 300,
                    maxNum: 5
                },
                {
                    typeid: 'wolf',
                    power: 100,
                    maxNum: 2
                }
            ],

        ]
    },
    {
        isQuestGoal: false,
        x: 13,
        y: 6,
        image: 'archer.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'archer',
                    power: 300,
                    maxNum: 4
                },
                {
                    typeid: 'wolf',
                    power: 150,
                    maxNum: 1
                }
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 7,
        image: 'peasant.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'peasant',
                    power: 200,
                    maxNum: 6
                }               
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 7,
        image: 'axeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'axeman',
                    power: 250,
                    maxNum: 4
                },
                {
                    typeid: 'wolf',
                    power: 150,
                    maxNum: 2
                }
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 2,
        y: 8,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'wolf',
                    power: 300,
                    maxNum: 8
                }                
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 17,
        y: 4,
        image: 'halfling.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'halfling',
                    power: 200,
                    maxNum: 3
                },
                {
                    typeid: 'archer',
                    power: 200,
                    maxNum: 2
                }                
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 15,
        y: 8,
        image: 'halfling.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'halfling',
                    power: 200,
                    maxNum: 3
                },
                {
                    typeid: 'wolf',
                    power: 200,
                    maxNum: 2
                }                
            ],
                        
        ]
    },
    
];

huungryGameMaps.level3.shops = [
    {
        x: 5,
        y: 10,
        name: 'LE MIRAGE INN',
        image: 'house-2.png',
        units: [
            {
                typeid: 'halfling',
                price: 20,
                qty: 30
            },
            {
                typeid: 'archer',
                price: 30,
                qty: 20
            }
        ]
    }
];

huungryGameMaps.level3.items = [
    {
        x: 5,
        y: 1,
        name: 'Gold',
        gold: 90,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 8,
        name: 'Gold',
        gold: 70,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 2,
        y: 10,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 1,
        y: 10,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 10,
        name: 'Fire Spell',
        attack: 60,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        isQuestGoal: true,
        x: 16,
        y: 10,
        name: 'Nothul Treasure',
        gold: 600,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 13,
        y: 10,
        name: 'Nothul Treasure',
        gold: 400,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 1,
        y: 5,
        name: 'Nothul Treasure',
        gold: 700,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 8,
        y: 1,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    }
   
];

huungryGameMaps.level3.quest = {
    screens: ['Mercenaries trade with the Nothul in this area. Having access to their bounty would allow you to\
    buy more troops for the adventures to come.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Seize the treasures kept by the mercenaries. \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-ITEMS'}],
    totalNumGoals: 3
};

huungryGameMaps.level3.nextLevel = 'level4';