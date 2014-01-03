if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level4 = new Object();
huungryGameMaps.level4.width = 460;
huungryGameMaps.level4.height = 320;
huungryGameMaps.level4.image = 'assets/images/levels/level4.png';
huungryGameMaps.level4.playerInitialX = 5;
huungryGameMaps.level4.playerInitialY = 1;

huungryGameMaps.level4.tiledData = { 
    "layers":[        
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 0, 0, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 193, 0, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 0, 0, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 193, 193, 193, 193, 0, 193, 0, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 193, 0, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":16,
         "name":"blocked",
         "opacity":0.620000004768372,
         "type":"tilelayer",
         "visible":true,
         "width":23,
         "x":0,
         "y":0
        } 
     ]
};

huungryGameMaps.level4.enemyArmies = [
    {
        isQuestGoal: false,
        x: 19,
        y: 0,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'wolf',
                    power: 200,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 17,
        y: 3,
        image: 'lion.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'lion',
                    power: 200,
                    maxNum: 6
                }               
            ]                        
        ]
    },
    {
        isQuestGoal: false,
        x: 21,
        y: 12,
        image: 'insectman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'insectman',
                    power: 600,
                    maxNum: 6
                }               
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 11,
        y: 9,
        image: 'axeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'halfling',
                    power: 100,
                    maxNum: 2
                },
                {
                    id: 'axeman',
                    power: 200,
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
        x: 3,
        y: 12,
        image: 'insectman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'insectman',
                    power: 600,
                    maxNum: 6
                }                
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 1,
        y: 11,
        image: 'insectman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'insectman',
                    power: 500,
                    maxNum: 3
                }                
            ],
                        
        ]
    },
    
];

huungryGameMaps.level4.shops = [
    {
        x: 7,
        y: 2,
        name: 'INSECT HIVE',
        image: 'cave.png',
        units: [
            {
                id: 'insectman',
                price: 60,
                qty: 20
            }          
        ]
    }
];

huungryGameMaps.level4.items = [
    {
        x: 9,
        y: 1,
        name: 'Gold',
        gold: 50,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 20,
        y: 0,
        name: 'Gold',
        gold: 70,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 21,
        y: 14,
        name: 'Gold',
        gold: 80,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 7,
        name: 'Gold',
        gold: 40,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 7,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 2,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 22,
        y: 2,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 2,
        y: 13,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        isQuestGoal: true,
        x: 1,
        y: 14,
        name: 'Insect Treasure',
        gold: 300,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 20,
        y: 14,
        name: 'Insect Treasure',
        gold: 100,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 22,
        y: 1,
        name: 'Insect Treasure',
        gold: 200,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
   
];

huungryGameMaps.level4.quest = {
    screens: ['The Phanol Lake is a dangerous place. Home of the insect men, adventurers and \
    mercenaries have disappeared in it\'s surroundings carrying precious treasure. If you can \
    recruit some insect men you might be able to survive the crossing and find bounty.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find and seize the treasures hidden by the insect men. \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-ITEMS'}],
    totalNumGoals: 3
};

huungryGameMaps.level4.nextLevel = 'level5';