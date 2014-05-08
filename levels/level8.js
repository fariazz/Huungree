if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level8 = new Object();
huungryGameMaps.level8.width = 300;
huungryGameMaps.level8.height = 460;
huungryGameMaps.level8.image = 'assets/images/levels/level8.png';
huungryGameMaps.level8.playerInitialX = 0;
huungryGameMaps.level8.playerInitialY = 22;

huungryGameMaps.level8.tiledData = {"layers":[       
        {
         "data":[193, 193, 193, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 193, 193, 193, 0, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 0, 193, 193, 0, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 193, 0, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 0, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 0, 0, 193, 193, 0, 193, 0, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 193, 0, 0, 193, 0, 0, 193, 193, 0, 193, 193, 0, 0, 193, 193, 193, 0, 0, 193, 0, 0, 193, 200, 0, 193, 193, 0, 0, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193],
         "height":23,
         "name":"blocked",
         "opacity":0.600000023841858,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        },] 
};

huungryGameMaps.level8.enemyArmies = [
    {
        isQuestGoal: false,
        x: 3,
        y: 13,
        image: 'tribalwarrior.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'tribalwarrior',
                    power: 700,
                    maxNum: 8
                },
                {
                    typeid: 'snake',
                    power: 120,
                    maxNum: 3
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 10,
        y: 22,
        image: 'armoredaxeman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'armoredaxeman',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 7,
        image: 'wolf.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 10,
        image: 'ritualwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'ritualwarrior',
                    power: 600,
                    maxNum: 6
                },
                {
                    typeid: 'insectman',
                    power: 100,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 2,
        y: 7,
        image: 'tribalwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'tribalwarrior',
                    power: 500,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 1,
        image: 'orc.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'orc',
                    power: 700,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 3,
        image: 'ritualwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'ritualwarrior',
                    power: 1000,
                    maxNum: 6
                },
                {
                    typeid: 'tribalwarrior',
                    power: 300,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 0,
        y: 9,
        image: 'lion.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'lion',
                    power: 600,
                    maxNum: 6
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 7,
        y: 17,
        image: 'centaur.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'centaur',
                    power: 500,
                    maxNum: 4
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 17,
        image: 'tribalwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'tribalwarrior',
                    power: 500,
                    maxNum: 4
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 14,
        image: 'tribalwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'tribalwarrior',
                    power: 500,
                    maxNum: 4
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 18,
        image: 'snake.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'snake',
                    power: 600,
                    maxNum: 10
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 12,
        y: 12,
        image: 'ritualwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'ritualwarrior',
                    power: 700,
                    maxNum: 6
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 10,
        image: 'ritualwarrior.png',
        background: 'darkgrass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'ritualwarrior',
                    power: 700,
                    maxNum: 6
                }
            ]
        ]
    },
  
];

huungryGameMaps.level8.shops = [
    {
        x: 11,
        y: 22,
        name: 'BROWN BIG INN',
        image: 'house-1.png',
        units: [
            {
                typeid: 'armoredaxeman',
                price: 40,
                qty: 40
            },
            {
                typeid: 'elitearcher',
                price: 45,
                qty: 30
            }              
        ]
    },
    {
        x: 10,
        y: 9,
        name: 'CENTAUR TRIBE',
        image: 'tribe-house.png',
        units: [
            {
                typeid: 'wolf',
                price: 35,
                qty: 75
            },
            {
                typeid: 'centaur',
                price: 50,
                qty: 60
            }        
        ]
    },
    {
        x: 13,
        y: 7,
        name: 'THE DARK WISPER',
        image: 'house-1.png',
        units: [
            {
                typeid: 'orc',
                price: 45,
                qty: 75
            },
            {
                typeid: 'troll',
                price: 55,
                qty: 50
            }        
        ]
    }
];

huungryGameMaps.level8.items = [
    {
        x: 9,
        y: 10,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 10,
        name: 'Gold',
        gold: 150,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 10,
        name: 'Gold',
        gold: 250,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 5,
        y: 0,
        name: 'Gold',
        gold: 220,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 0,
        name: 'Gold',
        gold: 200,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 9,
        y: 1,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 7,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 7,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 10,
        y: 14,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 13,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 10,
        y: 3,
        name: 'Kooghul',
        image: 'shrine.png',
        type: 'ITEM.LANDMARK',
        text: 'The Kooghul appears as a small shrine emanating the black energy that powers the mystical chamans. \
        Not without fear, you order your troops to burn it to the ground.'
    },
    {
        x: 9,
        y: 9,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 9,
        y: 5,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 9,
        y: 2,
        name: 'Resurrection Spell',
        numHits: 7,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 10,
        y: 5,
        name: 'Resurrection Spell',
        numHits: 5,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 13,
        y: 8,
        name: 'Resurrection Spell',
        numHits: 8,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 13,
        y: 9,
        name: 'Resurrection Spell',
        numHits: 5,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 7,
        y: 15,
        name: 'Possession Spell',
        numHits: 4,
        image: 'scroll-possession.png',
        type: 'ITEM.POSSESSION-SPELL'
    },
    {
        x: 8,
        y: 12,
        name: 'Yellow Key',
        attribute: 'yellow',
        image: 'key-yellow.png',
        type: 'ITEM.KEY',
    },
    {
        x: 5,
        y: 3,
        name: 'Yellow Door',
        attribute: 'yellow',
        image: 'door-yellow.png',
        type: 'ITEM.DOOR',
    },    
];

huungryGameMaps.level8.quest = {
    screens: ['What powers the mystical rebels is the Kooghul, a sacred temple that acts as an \
    antenna for the dark mana coming from the rebel gods. The temple is hidden in the dangerous Grey Wood, an \
    enchanted forest filled with black magic and rebel strongholds.',


     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Seize and destroy the Kooghul.  \
<img src="assets/images/places/shrine.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level8.nextLevel = 'level9';