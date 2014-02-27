if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level8 = new Object();
huungryGameMaps.level8.width = 240;
huungryGameMaps.level8.height = 320;
huungryGameMaps.level8.image = 'assets/images/levels/level8.png';
huungryGameMaps.level8.playerInitialX = 0;
huungryGameMaps.level8.playerInitialY = 15;

huungryGameMaps.level8.tiledData = {"layers":[       
        {
         "data":[193, 193, 193, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 0, 193, 193, 0, 193, 193, 193, 0, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 0, 0, 193, 0, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":16,
         "name":"blocked",
         "opacity":0.600000023841858,
         "type":"tilelayer",
         "visible":false,
         "width":12,
         "x":0,
         "y":0
        }] 
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
                    id: 'tribalwarrior',
                    power: 700,
                    maxNum: 8
                },
                {
                    id: 'snake',
                    power: 120,
                    maxNum: 3
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 10,
        y: 15,
        image: 'armoredaxeman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'armoredaxeman',
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
                    id: 'wolf',
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
                    id: 'ritualwarrior',
                    power: 600,
                    maxNum: 6
                },
                {
                    id: 'insectman',
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
                    id: 'tribalwarrior',
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
                    id: 'orc',
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
                    id: 'ritualwarrior',
                    power: 1000,
                    maxNum: 6
                },
                {
                    id: 'tribalwarrior',
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
                    id: 'lion',
                    power: 600,
                    maxNum: 6
                }
            ]
        ]
    }
  
];

huungryGameMaps.level8.shops = [
    {
        x: 11,
        y: 15,
        name: 'BROWN BIG INN',
        image: 'house-1.png',
        units: [
            {
                id: 'armoredaxeman',
                price: 40,
                qty: 40
            },
            {
                id: 'elitearcher',
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
                id: 'wolf',
                price: 25,
                qty: 55
            },
            {
                id: 'centaur',
                price: 30,
                qty: 40
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
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    }    

];

huungryGameMaps.level8.quest = {
    screens: ['What powers the mystical rebels is the Kooghul, a sacred temple that acts as an \
    antenna for the dark mana coming from the rebel gods. The temple is hidden in the dangerous Grey Wood, an \
    enchanted forest filled with black magic and rebel strongholds.',


     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Cross the Grey Woods, seize and destroy the Kooghul.  \
<img src="assets/images/places/shrine.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level8.nextLevel = 'level9';