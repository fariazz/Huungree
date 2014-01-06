if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level5 = new Object();
huungryGameMaps.level5.width = 240;
huungryGameMaps.level5.height = 340;
huungryGameMaps.level5.image = 'assets/images/levels/level5.png';
huungryGameMaps.level5.playerInitialX = 8;
huungryGameMaps.level5.playerInitialY = 1;

huungryGameMaps.level5.tiledData = { 
 "layers":[
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 193, 0, 0, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 0, 193, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 0, 193, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 0, 193, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":17,
         "name":"blocked",
         "opacity":0.620000004768372,
         "type":"tilelayer",
         "visible":false,
         "width":12,
         "x":0,
         "y":0
        }],

};

huungryGameMaps.level5.enemyArmies = [
    {
        isQuestGoal: false,
        x: 6,
        y: 3,
        image: 'axeman.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'axeman',
                    power: 200,
                    maxNum: 5
                },
                {
                    id: 'archer',
                    power: 100,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 4,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 300,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 3,
        image: 'lion.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'lion',
                    power: 400,
                    maxNum: 6
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 8,
        image: 'dwarfaxe.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'dwarfaxe',
                    power: 400,
                    maxNum: 6
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 11,
        image: 'dwarfaxe.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'dwarfaxe',
                    power: 400,
                    maxNum: 6
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 10,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 300,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 2,
        y: 13,
        image: 'insectman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'insectman',
                    power: 550,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 7,
        y: 14,
        image: 'troll.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'troll',
                    power: 550,
                    maxNum: 6
                },
                {
                    id: 'insectman',
                    power: 300,
                    maxNum: 3
                }
            ]
        ]
    }
];

huungryGameMaps.level5.shops = [
    {
        x: 3,
        y: 2,
        name: 'RED CAT INN',
        image: 'house-2.png',
        units: [
            {
                id: 'wolf',
                price: 30,
                qty: 35
            },
            {
                id: 'axeman',
                price: 35,
                qty: 45
            },
            {
                id: 'archer',
                price: 45,
                qty: 30
            }                     
        ]
    }
];

huungryGameMaps.level5.items = [
    {
        x: 1,
        y: 2,
        name: 'Gold',
        gold: 50,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 2,
        name: 'Gold',
        gold: 50,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 9,
        name: 'Gold',
        gold: 40,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 10,
        name: 'Gold',
        gold: 60,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },    
    {
        x: 4,
        y: 7,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 9,
        y: 6,
        name: 'Fire Spell',
        attack: 40,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 8,
        y: 7,
        name: 'Fire Spell',
        attack: 50,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 2,
        y: 15,
        name: 'Fire Spell',
        attack: 60,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        isQuestGoal: true,
        x: 11,
        y: 15,
        name: 'Mountain Door',
        image: 'white-door.png',
        type: 'ITEM.LANDMARK',
        text: 'You\'ve reach the door to the second half of the mountain'
    }
];

huungryGameMaps.level5.quest = {
    screens: ['In order to reach the Mystical City of Crisal you have to cross the Tunnels of the Tear, \
    guarded by dwarfs and other creatures, you\'ll have to make your way through the entire mountain.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find the door to the second half of the mountain. \
<img src="assets/images/items/white-door.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level5.nextLevel = 'level6';