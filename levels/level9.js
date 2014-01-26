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
                    id: 'orc',
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
                    id: 'orc',
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
                    id: 'wolf',
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
                    id: 'troll',
                    power: 800,
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
                    id: 'prairiehorseman',
                    power: 1200,
                    maxNum: 5
                },
                {
                    id: 'elitearcher',
                    power: 1200,
                    maxNum: 3
                },
                {
                    id: 'dwarfaxe',
                    power: 500,
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
                    id: 'elitearcher',
                    power: 1200,
                    maxNum: 5
                },
                {
                    id: 'armoredaxeman',
                    power: 800,
                    maxNum: 3
                },
                {
                    id: 'axeman',
                    power: 500,
                    maxNum: 2
                },
                {
                    id: 'wolf',
                    power: 500,
                    maxNum: 2
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
                id: 'armoredaxeman',
                price: 40,
                qty: 40
            },
            {
                id: 'elitearcher',
                price: 35,
                qty: 40
            },
            {
                id: 'prairiehorseman',
                price: 50,
                qty: 40
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
                id: 'orc',
                price: 25,
                qty: 35
            },
            {
                id: 'troll',
                price: 35,
                qty: 55
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
    /*{
        x: 5,
        y: 3,
        name: 'Afterlife Spell',
        image: 'scroll-skull.png',
        type: 'ITEM.AFTERLIFE-SPELL'
    },
    }  */

];

huungryGameMaps.level9.quest = {
    screens: ['The rebel menace is over and \
   your brother\'s rule is secure on this side. Time to go back to Crisal and inform Tiego of the victory.',

    'Back in Crisal, Tiego thanks for your help with the rebels, but he needs you now to command the attack to \
    the strong Nothul troops. This is another chance to impress your brother Jekkel so you accept the quest.',

    'The Nothul camp has been spotted in the White Mountains. If you attack with a strong army by surprise you \
    could defeat them. Grow a huge army as this will be an epic battle.',


     '<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Defeat the Nothul troops that rest in the White Mountains.<br/>\
<img src="assets/images/units/elitearcher.png" width="20" /> \
<img src="assets/images/units/prairiehorseman.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}],
    totalNumGoals: 2
};

huungryGameMaps.level9.nextLevel = 'level10';