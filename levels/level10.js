if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level10 = new Object();
huungryGameMaps.level10.width = 320;
huungryGameMaps.level10.height = 180;
huungryGameMaps.level10.image = 'assets/images/levels/level10.png';
huungryGameMaps.level10.playerInitialX = 13;
huungryGameMaps.level10.playerInitialY = 0;
huungryGameMaps.level10.tiledData = { "layers":[        
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 0, 193, 0, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 193, 193, 0, 0, 193, 193, 193, 0, 200, 193, 193, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 193, 0, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 193, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0],
         "height":9,
         "name":"blocked",
         "opacity":0.75,
         "type":"tilelayer",
         "visible":false,
         "width":16,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level10.enemyArmies = [
    {
        isQuestGoal: true,
        x: 7,
        y: 0,
        image: 'armoredaxeman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'armoredaxeman',
                    power: 1200,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 3,
        image: 'insectman.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'insectman',
                    power: 1200,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 3,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 1200,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 4,
        y: 2,
        image: 'ritualwarrior.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'troll',
                    power: 800,
                    maxNum: 2
                },
                {
                    typeid: 'snake',
                    power: 400,
                    maxNum: 2
                },
                {
                    typeid: 'ritualwarrior',
                    power: 800,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 8,
        y: 6,
        image: 'prairiehorseman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'prairiehorseman',
                    power: 1700,
                    maxNum: 5
                },
                {
                    typeid: 'elitearcher',
                    power: 800,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 14,
        y: 5,
        image: 'tribalwarrior.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'tribalwarrior',
                    power: 700,
                    maxNum: 5
                },
                {
                    typeid: 'snake',
                    power: 400,
                    maxNum: 4
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 13,
        y: 7,
        image: 'elitearcher.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'elitearcher',
                    power: 1200,
                    maxNum: 6
                },
                {
                    typeid: 'armoredaxeman',
                    power: 800,
                    maxNum: 3
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 8,
        image: 'orc.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'orc',
                    power: 1000,
                    maxNum: 6
                }               
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 0,
        y: 7,
        image: 'armoredaxeman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'armoredaxeman',
                    power: 1400,
                    maxNum: 6
                },
                {
                    typeid: 'axeman',
                    power: 800,
                    maxNum: 4
                },
                {
                    typeid: 'wizardapprentice',
                    power: 700,
                    maxNum: 3
                },             
            ]
        ]
    }
];

huungryGameMaps.level10.shops = [
    {
        x: 4,
        y: 4,
        name: 'RED DEER INN',
        image: 'house-3.png',
        units: [
            {
                typeid: 'armoredaxeman',
                price: 80,
                qty: 100
            },
            {
                typeid: 'elitearcher',
                price: 105,
                qty: 60
            },
            {
                typeid: 'prairiehorseman',
                price: 140,
                qty: 80
            }              
        ]
    },
    {
        x: 15,
        y: 2,
        name: 'INSECT CAVE',
        image: 'cave.png',
        units: [
            {
                typeid: 'insectman',
                price: 55,
                qty: 120
            }            
        ]
    }
];

huungryGameMaps.level10.items = [
    {
        x: 15,
        y: 5,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 14,
        y: 8,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 8,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },    
    {
        x: 15,
        y: 7,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        isQuestGoal: true,
        x: 11,
        y: 8,
        name: 'Northul Treasure',
        gold: 400,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 7,
        y: 6,
        name: 'Northul Treasure',
        gold: 400,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },    
    {
        isQuestGoal: true,
        x: 1,
        y: 8,
        name: 'Northul Treasure',
        gold: 300,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        isQuestGoal: true,
        x: 3,
        y: 2,
        name: 'Northul Treasure',
        gold: 200,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },    
    /*{
        x: 0,
        y: 8,
        name: 'Afterlife Spell',
        image: 'scroll-skull.png',
        type: 'ITEM.AFTERLIFE-SPELL'
    },
    }  */

];

huungryGameMaps.level10.quest = {
    screens: ['Victory! The Nothul are retreating and leaving treasure behind. Its a good time to take it and defeat the escaping troops.',

'<div class="quests-title">LEVEL QUESTS:</div><ul>\
<li>1-Kill the remaining Northul troops.<br/>\
<img src="assets/images/units/elitearcher.png" width="20" /> \
<img src="assets/images/units/prairiehorseman.png" width="20" /> \
<img src="assets/images/units/armoredaxeman.png" width="20" /> \
</div></li><br/>\
    <li>2-Take the Northul treasures<br/>\
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
<img src="assets/images/items/chest-jewels.png" width="20" /> \
    </li>\
<ul>'
    ],
    goals: [{type: 'QUEST-KILL'}, {type: 'QUEST-ITEMS'}],
    totalNumGoals: 8
};

huungryGameMaps.level10.nextLevel = 'level11';