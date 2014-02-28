if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level12 = new Object();
huungryGameMaps.level12.width = 300;
huungryGameMaps.level12.height = 340;
huungryGameMaps.level12.image = 'assets/images/levels/level12.png';
huungryGameMaps.level12.playerInitialX = 14;
huungryGameMaps.level12.playerInitialY = 7;
huungryGameMaps.level12.tiledData = {  "layers":[       
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 0, 0, 193, 0, 193, 193, 193, 193, 0, 193, 193, 0, 193, 0, 193, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 193, 0, 0, 0, 0, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 0, 193, 193, 0, 193, 193, 193, 193, 0, 0, 0, 193, 193, 0, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193],
         "height":17,
         "name":"blocked",
         "opacity":0.400000005960464,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level12.enemyArmies = [
    {
        isQuestGoal: false,
        x: 14,
        y: 4,
        image: 'valkyrie.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'valkyrie',
                    power: 900,
                    maxNum: 5
                },
                {
                    id: 'archer',
                    power: 500,
                    maxNum: 5
                },
                         
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 12,
        y: 9,
        image: 'prairiehorseman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'prairiehorseman',
                    power: 600,
                    maxNum: 6
                },
                {
                    id: 'elitearcher',
                    power: 600,
                    maxNum: 6
                },
                         
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 0,
        y: 6,
        image: 'prairiehorseman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'prairiehorseman',
                    power: 600,
                    maxNum: 5
                },
                {
                    id: 'elitearcher',
                    power: 600,
                    maxNum: 5
                },
                         
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 7,
        image: 'armoredaxeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'armoredaxeman',
                    power: 700,
                    maxNum: 6
                },
                {
                    id: 'lion',
                    power: 200,
                    maxNum: 4
                },
                         
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 4,
        y: 4,
        image: 'elitearcher.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elitearcher',
                    power: 1500,
                    maxNum: 10
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 5,
        y: 1,
        image: 'troll.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'troll',
                    power: 1000,
                    maxNum: 10
                },
                {
                    id: 'orc',
                    power: 800,
                    maxNum: 10
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 2,
        image: 'dwarfaxe.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'dwarfaxe',
                    power: 1000,
                    maxNum: 8
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 4,
        y: 9,
        image: 'peasant.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'peasant',
                    power: 1000,
                    maxNum: 12
                },
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
        x: 1,
        y: 12,
        image: 'armoredaxeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'armoredaxeman',
                    power: 1000,
                    maxNum: 6
                },
                {
                    id: 'elitearcher',
                    power: 500,
                    maxNum: 5
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 13,
        y: 15,
        image: 'elfswordman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elfswordman',
                    power: 1000,
                    maxNum: 7
                },
                {
                    id: 'elfarcher',
                    power: 700,
                    maxNum: 5
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 14,
        image: 'elfarcher.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'elfswordman',
                    power: 700,
                    maxNum: 7
                },
                {
                    id: 'elfarcher',
                    power: 1000,
                    maxNum: 5
                }        
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 1,
        y: 14,
        image: 'satyr.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'satyr',
                    power: 2200,
                    maxNum: 10
                },
                {
                    id: 'orc',
                    power: 1200,
                    maxNum: 5
                }        
            ]
        ]
    }
];

huungryGameMaps.level12.shops = [
    {
        x: 11,
        y: 15,
        name: 'ROOT BEER PUB',
        image: 'house-3.png',
        units: [
            {
                id: 'satyr',
                price: 140,
                qty: 50
            },
            {
                id: 'elfswordman',
                price: 200,
                qty: 45
            },
            {
                id: 'elfarcher',
                price: 250,
                qty: 40
            }              
        ]
    }
];

huungryGameMaps.level12.items = [
    {
        x: 12,
        y: 1,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 1,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 1,
        y: 1,
        name: 'Gold',
        gold: 700,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 1,
        y: 2,
        name: 'Gold',
        gold: 500,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 2,
        y: 1,
        name: 'Gold',
        gold: 300,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 10,
        name: 'Gold',
        gold: 500,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 12,
        name: 'Gold',
        gold: 500,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 8,
        y: 3,
        name: 'Gold',
        gold: 500,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 7,
        y: 9,
        name: 'Gold',
        gold: 500,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 9,
        name: 'Gold',
        gold: 500,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 9,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 9,
        y: 16,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 14,
        y: 0,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 6,
        y: 3,
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
        x: 7,
        y: 3,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 2,
        y: 2,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 1,
        y: 8,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        isQuestGoal: true,
        x: 1,
        y: 16,
        name: 'Grey Forest Exit',
        image: 'white-door.png',
        type: 'ITEM.LANDMARK',
        text: 'You\'ve reach the exit of the Grey Forest'
    },
    {
        x: 9,
        y: 3,
        name: 'Green Key',
        attribute: 'green',
        image: 'key-green.png',
        type: 'ITEM.KEY',
    },
    {
        x: 6,
        y: 11,
        name: 'Green Door',
        attribute: 'green',
        image: 'door-green.png',
        type: 'ITEM.DOOR',
    },
];

huungryGameMaps.level12.quest = {
    screens: ['Kraul was stabbed by one of his captains for unpaid debt, his body given to starving dogs, and his whole unpaid mercenary army deserted to loot on local farmers.',
    'This should be celebrated! But Jekkel seems uneasy and distant. Your informants say he is jelaous of your rising fortune and influence, and that there is a plan to murder you tomorrow.',
    'You can\'t rival Jekkel\'s army so you leave Crisal at dawn with your troops and head south.<br/><br/>If you can cross the Dindel Forest and the Crow Montains you\'ll reach unexplored lands which could be all yours.',

'<div class="quests-title">LEVEL QUESTS:</div><ul>\
<li>1-Cross the elf-infested Dindel Forest and find the path to the Crow Mountains.<br/>\
<img src="assets/images/places/white-door.png" width="20" /> \
    </li>\
<ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level12.nextLevel = null;