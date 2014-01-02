if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level3 = new Object();
huungryGameMaps.level3.width = 460;
huungryGameMaps.level3.height = 180;
huungryGameMaps.level3.image = 'assets/images/levels/level3.png';
huungryGameMaps.level3.playerInitialX = 2;
huungryGameMaps.level3.playerInitialY = 2;

huungryGameMaps.level3.tiledData = {
 "layers":[ 
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 0, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 193, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":12,
         "name":"blocked",
         "opacity":0.639999985694885,
         "type":"tilelayer",
         "visible":true,
         "width":15,
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
                    id: 'axeman',
                    power: 300,
                    maxNum: 5
                },
                {
                    id: 'wolf',
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
                    id: 'archer',
                    power: 300,
                    maxNum: 4
                },
                {
                    id: 'wolf',
                    power: 50,
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
                    id: 'peasant',
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
                    id: 'axeman',
                    power: 250,
                    maxNum: 4
                },
                {
                    id: 'wolf',
                    power: 50,
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
                    id: 'wolf',
                    power: 300,
                    maxNum: 8
                }                
            ],
                        
        ]
    },
    
];

huungryGameMaps.level3.shops = [
    {
        x: 4,
        y: 1,
        name: 'LE MIRAGE INN',
        image: 'house-2.png',
        units: [
            {
                id: 'halfling',
                price: 25,
                qty: 12
            },
            {
                id: 'archer',
                price: 45,
                qty: 5
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
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        isQuestGoal: true,
        x: 13,
        y: 1,
        name: 'Ghornian Treasure',
        gold: 100,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 13,
        y: 10,
        name: 'Ghornian Treasure',
        gold: 100,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 1,
        y: 5,
        name: 'Ghornian Treasure',
        gold: 100,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
   
];

huungryGameMaps.level3.quest = {
    screens: ['Mercenaries trade with the Ghornians in this area. Having access their bounty would allow you to\
    buy more troops for the adventures to come and to slow down the Ghornians troops for a while.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find and seize the treasures kept by the mercenaries. \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-ITEMS'}],
    totalNumGoals: 3
};

huungryGameMaps.level3.nextLevel = 'level4';