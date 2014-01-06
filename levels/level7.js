if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level7 = new Object();
huungryGameMaps.level7.width = 400;
huungryGameMaps.level7.height = 260;
huungryGameMaps.level7.image = 'assets/images/levels/level7.png';
huungryGameMaps.level7.playerInitialX = 8;
huungryGameMaps.level7.playerInitialY = 11;

huungryGameMaps.level7.tiledData = {
    "layers":[
        {
         "data":[193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 193, 193, 0, 193, 193, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 193, 193, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 193, 193, 0, 193, 193, 0, 0, 193, 0, 193, 193, 193, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 193, 193, 193, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 0, 0, 193, 193, 193, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 193, 0, 193, 0, 193, 193, 0, 0, 193, 193, 0, 0, 0, 193, 193, 193, 0, 193, 193, 0, 193, 0, 193, 0, 193, 193, 0, 0, 0, 0, 193, 193, 193, 193, 0, 0, 0, 193, 193, 0, 193, 0, 0, 0, 0, 193, 193, 0, 0, 193, 193, 193, 0, 193, 193, 193, 0, 193, 193, 0, 193, 193, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 193, 0, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":13,
         "name":"blocked",
         "opacity":0.680000007152557,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level7.enemyArmies = [
    {
        isQuestGoal: false,
        x: 11,
        y: 8,
        image: 'lion.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'lion',
                    power: 700,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 5,
        y: 8,
        image: 'orc.png',
        background: 'grass_background.png',
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
        x: 2,
        y: 6,
        image: 'wolf.png',
        background: 'grass_background.png',
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
        x: 4,
        y: 4,
        image: 'troll.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'troll',
                    power: 650,
                    maxNum: 6
                },
                {
                    id: 'orc',
                    power: 100,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 1,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'snake',
                    power: 500,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 8,
        y: 1,
        image: 'orc.png',
        background: 'grass_background.png',
        unitsSummary: [
            [              
                {
                    id: 'orc',
                    power: 600,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 16,
        y: 5,
        image: 'centaur.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'centaur',
                    power: 400,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 18,
        y: 7,
        image: 'tribalwarrior.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'tribalwarrior',
                    power: 700,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 1,
        y: 10,
        image: 'tribalwarrior.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'tribalwarrior',
                    power: 700,
                    maxNum: 7
                },
                {
                    id: 'lion',
                    power: 40,
                    maxNum: 1
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 18,
        y: 2,
        image: 'ritualwarrior.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    id: 'ritualwarrior',
                    power: 700,
                    maxNum: 6
                },
                {
                    id: 'snake',
                    power: 60,
                    maxNum: 2
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 9,
        y: 2,
        image: 'ritualwarrior.png',
        background: 'dirt_background.png',
        unitsSummary: [
            [              
                {
                    id: 'ritualwarrior',
                    power: 700,
                    maxNum: 6
                },
                {
                    id: 'lion',
                    power: 60,
                    maxNum: 2
                }
            ]
        ]
    },
];

huungryGameMaps.level7.shops = [
    {
        x: 3,
        y: 11,
        name: 'MOON CORNER TAVERN',
        image: 'house-1.png',
        units: [
            {
                id: 'armoredaxeman',
                price: 50,
                qty: 30
            }           
        ]
    },
    {
        x: 4,
        y: 3,
        name: 'LAKE BARNYARD',
        image: 'fence.png',
        units: [
            {
                id: 'wolf',
                price: 35,
                qty: 45
            },
            {
                id: 'lion',
                price: 35,
                qty: 30
            },
            {
                id: 'centaur',
                price: 45,
                qty: 55
            }           
        ]
    }
];

huungryGameMaps.level7.items = [
    {
        x: 6,
        y: 0,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 7,
        y: 0,
        name: 'Gold',
        gold: 240,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 5,
        y: 7,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 6,
        name: 'Gold',
        gold: 180,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 6,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 12,
        y: 1,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 14,
        y: 9,
        name: 'Fire Spell',
        attack: 50,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 17,
        y: 1,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    }
];

huungryGameMaps.level7.quest = {
    screens: ['You\'ve reached the city of Crisal but Jekkel is not there. Tiego, your brother\'s liutenant tells \
    you they are fighting over the Mystical Cities against another privateer from Ingeber named Kraul. \
    Also, they are all fighting Nothul Empire troops in the north. Lastly, there have been rebelions among the mysticals.',

    'Stopping the rebelion is the first priority. Without a secure post it will be impossible to defend against \
    the other attacking forces.',

     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Find and defeat the Mystical rebels.<br/> \
<img src="assets/images/units/tribalwarrior.png" width="20" /> \
<img src="assets/images/units/tribalwarrior.png" width="20" /> \
<img src="assets/images/units/ritualwarrior.png" width="20" /> \
<img src="assets/images/units/ritualwarrior.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}],
    totalNumGoals: 4
};

huungryGameMaps.level7.nextLevel = 'level8';