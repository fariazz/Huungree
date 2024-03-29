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
                    typeid: 'wolf',
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
                    typeid: 'lion',
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
                    typeid: 'insectman',
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
                    typeid: 'halfling',
                    power: 100,
                    maxNum: 2
                },
                {
                    typeid: 'axeman',
                    power: 200,
                    maxNum: 4
                },
                {
                    typeid: 'wolf',
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
                    typeid: 'insectman',
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
                    typeid: 'insectman',
                    power: 600,
                    maxNum: 3
                }                
            ],
                        
        ]
    },
    {
        isQuestGoal: false,
        x: 21,
        y: 6,
        image: 'ritualwarrior.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'ritualwarrior',
                    power: 450,
                    maxNum: 4
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
                typeid: 'insectman',
                price: 45,
                qty: 40
            }          
        ]
    }
];

huungryGameMaps.level4.items = [
    {
        x: 9,
        y: 1,
        name: 'Gold',
        gold: 150,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 20,
        y: 0,
        name: 'Gold',
        gold: 170,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 21,
        y: 14,
        name: 'Gold',
        gold: 180,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 7,
        name: 'Gold',
        gold: 140,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 7,
        name: 'Gold',
        gold: 130,
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
        gold: 800,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 20,
        y: 14,
        name: 'Insect Treasure',
        gold: 600,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 22,
        y: 1,
        name: 'Insect Treasure',
        gold: 500,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 7,
        name: 'Paralyze Spell',
        numHits: 4,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 20,
        y: 13,
        name: 'Possession Spell',
        numHits: 3,
        image: 'scroll-possession.png',
        type: 'ITEM.POSSESSION-SPELL'
    }   
];

huungryGameMaps.level4.quest = {
    screens: ['The Phanol Lake is a dangerous place. Home of the insect men, adventurers and \
    mercenaries have disappeared in it\'s surroundings carrying precious treasure. If you can \
    recruit some insect men you might be able to survive the crossing and find bounty.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find the treasures hidden by the insect men. \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-ITEMS'}],
    totalNumGoals: 3
};

huungryGameMaps.level4.nextLevel = 'level5';