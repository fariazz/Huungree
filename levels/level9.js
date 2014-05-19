if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level9 = new Object();
huungryGameMaps.level9.width = 220;
huungryGameMaps.level9.height = 280;
huungryGameMaps.level9.image = 'assets/images/levels/level9.png';
huungryGameMaps.level9.playerInitialX = 0;
huungryGameMaps.level9.playerInitialY = 12;

huungryGameMaps.level9.tiledData = { 
 "layers":[
        
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 193, 193, 193, 193, 0, 0, 193, 0, 0, 0, 193, 193, 193, 0, 193, 193, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 193, 0, 193, 193, 193, 193, 193, 0, 0, 0, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 193, 193, 193, 0, 0, 0, 193, 193, 193, 193, 0, 193, 0, 193, 193, 0, 0, 0, 193, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 193, 193, 193, 193, 0, 193, 0, 0, 193, 0, 193, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":14,
         "name":"blocked",
         "opacity":0.680000007152557,
         "type":"tilelayer",
         "visible":true,
         "width":11,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level9.enemyArmies = [
    {
        isQuestGoal: false,
        x: 0,
        y: 70,
        image: 'orc.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'orc',
                    power: 700,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 10,
        y: 3,
        image: 'orc.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'orc',
                    power: 800,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 5,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 800,
                    maxNum: 8
                },                
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 10,
        y: 8,
        image: 'troll.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'troll',
                    power: 1000,
                    maxNum: 8
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 5,
        y: 8,
        image: 'prairiehorseman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'prairiehorseman',
                    power: 1500,
                    maxNum: 5
                },
                {
                    typeid: 'elitearcher',
                    power: 1500,
                    maxNum: 3
                },
                {
                    typeid: 'dwarfaxe',
                    power: 700,
                    maxNum: 3
                },
                {
                    typeid: 'wizardapprentice',
                    power: 300,
                    maxNum: 3
                }
            ]
        ]
    },
    {
        isQuestGoal: true,
        x: 6,
        y: 10,
        image: 'elitearcher.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'elitearcher',
                    power: 1400,
                    maxNum: 5
                },
                {
                    typeid: 'armoredaxeman',
                    power: 1200,
                    maxNum: 3
                },
                {
                    typeid: 'axeman',
                    power: 1000,
                    maxNum: 2
                },
                {
                    typeid: 'wolf',
                    power: 700,
                    maxNum: 4
                },
                {
                    typeid: 'wizardapprentice',
                    power: 200,
                    maxNum: 3
                }
            ]
        ]
    }
  
];

huungryGameMaps.level9.shops = [
    {
        x: 3,
        y: 12,
        name: 'KOLOSY MARKET',
        image: 'house-2.png',
        units: [
            {
                typeid: 'armoredaxeman',
                price: 50,
                qty: 80
            },
            {
                typeid: 'elitearcher',
                price: 45,
                qty: 70
            },
            {
                typeid: 'prairiehorseman',
                price: 55,
                qty: 60
            }              
        ]
    },
    {
        x: 10,
        y: 2,
        name: 'ORC TRIBE',
        image: 'tribe-house.png',
        units: [
            {
                typeid: 'orc',
                price: 35,
                qty: 130
            },
            {
                typeid: 'troll',
                price: 55,
                qty: 130
            }        
        ]
    }
];

huungryGameMaps.level9.items = [
    {
        x: 3,
        y: 11,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 5,
        y: 12,
        name: 'Gold',
        gold: 250,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 4,
        y: 4,
        name: 'Gold',
        gold: 250,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 7,
        y: 8,
        name: 'Gold',
        gold: 220,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 4,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 3,
        y: 9,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 4,
        y: 9,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 6,
        y: 12,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 10,
        y: 12,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    }   
 

];

huungryGameMaps.level9.quest = {
    screens: ['Now that the rebel menace is over, the troops of your brother asked you to launch an attack to \
    the Nothul. This is another chance to impress your brother Jekkel so you accept the quest.',

    'The Nothul camp has been spotted in the White Mountains. If you attack with a strong army by surprise you \
    could defeat them. Grow a huge army as this will be an epic battle.',


     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Defeat the Nothul troops.<br/>\
<img src="assets/images/units/elitearcher.png" width="20" /> \
<img src="assets/images/units/prairiehorseman.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}],
    totalNumGoals: 2
};

huungryGameMaps.level9.nextLevel = 'level10';