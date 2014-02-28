if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level6 = new Object();
huungryGameMaps.level6.width = 220;
huungryGameMaps.level6.height = 340;
huungryGameMaps.level6.image = 'assets/images/levels/level6.png';
huungryGameMaps.level6.playerInitialX = 0;
huungryGameMaps.level6.playerInitialY = 14;

huungryGameMaps.level6.tiledData = { 
 "layers":[       
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 0, 193, 0, 193, 193, 193, 0, 0, 0, 0, 193, 0, 193, 0, 193, 0, 0, 0, 193, 0, 0, 193, 0, 193, 0, 193, 0, 193, 0, 193, 0, 0, 193, 0, 193, 0, 193, 0, 193, 193, 193, 0, 193, 193, 0, 193, 0, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 193, 193, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":17,
         "name":"blocked",
         "opacity":0.680000007152557,
         "type":"tilelayer",
         "visible":true,
         "width":11,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level6.enemyArmies = [
    {
        isQuestGoal: false,
        x: 3,
        y: 15,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 16,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 5,
        y: 14,
        image: 'orc.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'orc',
                    power: 800,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 1,
        y: 8,
        image: 'troll.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'troll',
                    power: 500,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 10,
        y: 12,
        image: 'insectman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'insectman',
                    power: 500,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 7,
        image: 'insectman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'insectman',
                    power: 500,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 7,
        y: 5,
        image: 'dwarfaxe.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'dwarfaxe',
                    power: 800,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 5,
        y: 3,
        image: 'dwarfaxe.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'dwarfaxe',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
   
];

huungryGameMaps.level6.shops = [
    {
        x: 8,
        y: 11,
        name: 'IRON BEER ROOM',
        image: 'house-3.png',
        units: [
            {
                id: 'dwarfaxe',
                price: 30,
                qty: 45
            },
            {
                id: 'insectman',
                price: 45,
                qty: 45
            }                  
        ]
    }
];

huungryGameMaps.level6.items = [
    {
        x: 10,
        y: 14,
        name: 'Gold',
        gold: 70,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 12,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 10,
        name: 'Gold',
        gold: 60,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 11,
        name: 'Gold',
        gold: 80,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 8,
        y: 6,
        name: 'Gold',
        gold: 150,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },        
    {
        x: 6,
        y: 12,
        name: 'Defense Spell',
        numHits: 4,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 0,
        y: 16,
        name: 'Defense Spell',
        numHits: 4,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 1,
        y: 16,
        name: 'Fire Spell',
        attack: 70,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        isQuestGoal: true,
        x: 10,
        y: 1,
        name: 'Mountain Exit',
        image: 'white-door.png',
        type: 'ITEM.LANDMARK',
        text: 'You\'ve reach the exit of the Tunnels of the Tear. The Mystical city of Crisal is on the other side!'
    },
    {
        x: 10,
        y: 13,
        name: 'Red Key',
        attribute: 'red',
        image: 'key-red.png',
        type: 'ITEM.KEY',
    },
    {
        x: 4,
        y: 2,
        name: 'Red Door',
        attribute: 'red',
        image: 'door-red.png',
        type: 'ITEM.DOOR',
    },
];

huungryGameMaps.level6.quest = {
    screens: ['The Tunnels of the Tear extends for a few more miles until you can finally leave the mountain and \
    arrive to the Mystical city of Crisal. Orcs, trolls and other evil creatures wander around so be careful!',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find the exit of the Tunnels of the Tear. \
<img src="assets/images/items/white-door.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level6.nextLevel = 'level7';