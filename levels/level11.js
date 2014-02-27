if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level11 = new Object();
huungryGameMaps.level11.width = 520;
huungryGameMaps.level11.height = 200;
huungryGameMaps.level11.image = 'assets/images/levels/level11.png';
huungryGameMaps.level11.playerInitialX = 0;
huungryGameMaps.level11.playerInitialY = 9;
huungryGameMaps.level11.tiledData = { "layers":[
       
        {
         "data":[0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 193, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 0, 193, 0, 0, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 0, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 0, 0, 193, 193, 193, 193, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 193, 0, 193, 193, 0, 193, 193, 0, 0, 0, 193, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 193, 193, 193, 0, 0, 193, 193, 0, 193, 0, 0, 193, 193, 0, 0, 193, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 193, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0],
         "height":10,
         "name":"blocked",
         "opacity":0.310000002384186,
         "type":"tilelayer",
         "visible":true,
         "width":26,
         "x":0,
         "y":0
        }],
 
};

huungryGameMaps.level11.enemyArmies = [
    {
        isQuestGoal: false,
        x: 2,
        y: 8,
        image: 'valkyrie.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'valkyrie',
                    power: 900,
                    maxNum: 8
                },
                {
                    id: 'archer',
                    power: 500,
                    maxNum: 4
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 8,
        image: 'valkyrie.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'valkyrie',
                    power: 900,
                    maxNum: 8
                },
                {
                    id: 'wolf',
                    power: 500,
                    maxNum: 4
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 1,
        y: 4,
        image: 'elitearcher.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elitearcher',
                    power: 1500,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 1,
        image: 'centaur.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'centaur',
                    power: 1000,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 4,
        y: 2,
        image: 'armoredaxeman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'armoredaxeman',
                    power: 800,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 7,
        y: 0,
        image: 'prairiehorseman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'prairiehorseman',
                    power: 1000,
                    maxNum: 5
                },
                {
                    id: 'elitearcher',
                    power: 500,
                    maxNum: 3
                }             
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 7,
        image: 'prairiehorseman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'prairiehorseman',
                    power: 1000,
                    maxNum: 5
                },
                {
                    id: 'elitearcher',
                    power: 500,
                    maxNum: 3
                }             
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 13,
        y: 7,
        image: 'insectman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'insectman',
                    power: 1000,
                    maxNum: 5
                },
                {
                    id: 'snake',
                    power: 500,
                    maxNum: 3
                }             
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 11,
        y: 5,
        image: 'armoredaxeman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'armoredaxeman',
                    power: 800,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 8,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'wolf',
                    power: 800,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 16,
        y: 0,
        image: 'centaur.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'centaur',
                    power: 1200,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 23,
        y: 1,
        image: 'ritualwarrior.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'ritualwarrior',
                    power: 1000,
                    maxNum: 5
                },
                {
                    id: 'tribalwarrior',
                    power: 1000,
                    maxNum: 5
                },
                {
                    id: 'snake',
                    power: 500,
                    maxNum: 5
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 19,
        y: 5,
        image: 'elfswordman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elfswordman',
                    power: 1200,
                    maxNum: 8
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 25,
        y: 8,
        image: 'elfarcher.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elfswordman',
                    power: 500,
                    maxNum: 8
                },
                {
                    id: 'elfarcher',
                    power: 1500,
                    maxNum: 8
                }           
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 18,
        y: 6,
        image: 'satyr.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'satyr',
                    power: 1000,
                    maxNum: 8
                }                        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 24,
        y: 4,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 2000,
                    maxNum: 20
                }                        
            ]
        ]
    },
    ];

    huungryGameMaps.level11.shops = [
    {
        x: 3,
        y: 9,
        name: 'CAPRICIOUS EYE GUILD',
        image: 'tribe-house.png',
        units: [
            {
                id: 'valkyrie',
                price: 80,
                qty: 50
            },
            {
                id: 'centaur',
                price: 100,
                qty: 40
            },
            {
                id: 'armoredaxeman',
                price: 70,
                qty: 30
            }              
        ]
    },
    {
        x: 17,
        y: 9,
        name: 'ELF TOWNSHIP',
        image: 'house-2.png',
        units: [
            {
                id: 'elfswordman',
                price: 180,
                qty: 55
            },
            {
                id: 'elfarcher',
                price: 250,
                qty: 45
            }            
        ]
    }
];

huungryGameMaps.level11.items = [
    {
        x: 0,
        y: 4,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 1,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 7,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 9,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 19,
        y: 3,
        name: 'Gold',
        gold: 500,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 25,
        y: 1,
        name: 'Gold',
        gold: 900,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 25,
        y: 2,
        name: 'Gold',
        gold: 500,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 5,
        y: 9,
        name: 'Gold',
        gold: 500,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 7,
        y: 9,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 8,
        y: 9,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 11,
        y: 8,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 12,
        y: 0,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 5,
        y: 1,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 10,
        y: 9,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 13,
        y: 0,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 16,
        y: 8,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 18,
        y: 9,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 25,
        y: 4,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 6,
        y: 2,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 10,
        y: 8,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 20,
        y: 9,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        isQuestGoal: true,
        x: 0,
        y: 0,
        name: 'Kraul Treasure',
        gold: 1000,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 11,
        y: 0,
        name: 'Kraul Treasure',
        gold: 1000,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 25,
        y: 5,
        name: 'Kraul Treasure',
        gold: 1000,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 25,
        y: 0,
        name: 'Kraul Treasure',
        gold: 1000,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    }, 
];

huungryGameMaps.level11.quest = {
    screens: ['The Nothul troops have been defeated! Back in Crisal you find your brother. There is no time for hugs as the rival privateer Kraul is treatening to take over the Mystical Cities.',
'Kraul doesn\'t have a strong leadership and he is not loved by the troops, but he is wealthy and has been able to bribe his way to a strong mercenary army',
'His strength and weakness is gold. If you can find and take all of his hidden treasures, his own troops will eat him alive.',   

'<div class="quests-title">LEVEL QUESTS:</div><ul>\
<li>1-Find and seize Kraul\'s hidden treasures.<br/>\
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
    </li>\
<ul>'
    ],
    goals: [{type: 'QUEST-ITEMS'}],
    totalNumGoals: 4
};

huungryGameMaps.level11.nextLevel = 'level11';