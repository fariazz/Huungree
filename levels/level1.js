if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1 = new Object();
huungryGameMaps.level1.width = 480;
huungryGameMaps.level1.height = 240;
huungryGameMaps.level1.image = 'assets/images/levels/level1.png';
huungryGameMaps.level1.playerInitialX = 3;
huungryGameMaps.level1.playerInitialY = 3;

huungryGameMaps.level1.tiledData = {
 "layers":[
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 193, 0, 0, 193, 193, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 193, 193, 193, 193, 193, 0, 193, 193, 0, 0, 0, 193, 0, 200, 200, 0, 0, 0, 0, 200, 200, 0, 0, 200, 200, 200, 200, 200, 0, 193, 0, 193, 0, 193, 193, 193, 0, 200, 193, 0, 0, 0, 0, 200, 193, 0, 0, 0, 0, 193, 0, 200, 200, 0, 193, 193, 193, 193, 193, 193, 0, 200, 193, 0, 0, 0, 0, 200, 193, 193, 193, 193, 193, 0, 0, 193, 200, 200, 200, 193, 193, 193, 193, 0, 0, 200, 193, 0, 0, 0, 200, 200, 0, 0, 0, 193, 200, 193, 0, 193, 0, 0, 200, 0, 193, 193, 193, 0, 0, 200, 193, 0, 0, 0, 200, 0, 0, 0, 193, 200, 200, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 0, 200, 193, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 200, 0, 193, 193, 193, 193, 0, 200, 200, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 0, 200, 0, 200, 0, 0, 0, 0, 193, 193, 193, 0, 0, 193, 0, 193, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 193],
         "height":12,
         "name":"blocked",
         "opacity":0.720000028610229,
         "type":"tilelayer",
         "visible":false,
         "width":24,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level1.enemyArmies = [
    {
        isQuestGoal: true,
        x: 4,
        y: 8,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'wolf',
                    power: 350,
                    maxNum: 4
                }
            ]            
        ]
    },
    {
        isQuestGoal: true,
        x: 13,
        y: 5,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'snake',
                    power: 350,
                    maxNum: 5
                }
            ]            
        ]
    },
    {
        isQuestGoal: true,
        x: 17,
        y: 6,
        image: 'snake.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    typeid: 'snake',
                    power: 350,
                    maxNum: 5
                }
            ]            
        ]
    },
    
];

huungryGameMaps.level1.shops = [
/*{
        x: 4,
        y: 5,
        name: 'BROWN BIG INN',
        image: 'house-1.png',
        units: [
            {
                typeid: 'armoredaxeman',
                price: 40,
                qty: 40
            },
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
    }*/
]

huungryGameMaps.level1.items = [
    {
        x: 0,
        y: 9,
        name: 'Gold',
        gold: 50,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 6,
        name: 'Gold',
        gold: 50,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    }
    
   ,{
        x: 9,
        y: 3,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    }
    ,{
        x: 19,
        y: 2,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    }
    ,{
        x: 8,
        y: 2,
        name: 'Fire Spell',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    }
    ,{
        x: 19,
        y: 1,
        name: 'Fire Spell',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    }
    /* 
    {
        x: 4,
        y: 2,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 3,
        y: 4,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 3,
        y: 2,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 2,
        y: 4,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    
    {
        x: 2,
        y: 3,
        name: 'Fire Spell',
        attack: 50,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 2,
        y: 4,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 3,
        y: 2,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 3,
        y: 4,
        name: 'Fire Spell',
        attack: 50,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 2,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 3,
        name: 'Defense Spell',
        numHits: 5,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 4,
        y: 4,
        name: 'Fire Spell',
        attack: 50,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 5,
        y: 2,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 5,
        y: 3,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 5,
        y: 4,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 5,
        y: 5,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 6,
        y: 2,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 3,
        y: 8,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 6,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 7,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    }*/
    //end borrar
];

huungryGameMaps.level1.quest = {
    screens: ['Two rival powers dispute the new continent of Tamaca. \
The Nothul Empire occupies the north. \
The Republic of Ingeber went inland and took over the Mystical Cities.',

        'You play the role of Jakkal, aspiring privateer from Ingeber. \
You\'ve just arrived to Crab Bay to join your older brother Jekkel,\
a seasoned privateer who is in the Mystical City of Crisal.',

        'You\'ll need a few nights in Crab Bay to prepare your travel inland. \
<div class="quests-title">LEVEL QUESTS:</div><ul><li>1-Kill the wild animals so you can set your camp in peace.\
<div class="quest-icons-container">\
<img src="assets/images/units/wolf.png" width="20" /> \
<img src="assets/images/units/snake.png" width="20" /> \
</div></li><ul>'
    ],
    goals: [{type: 'QUEST-KILL'}],
    totalNumGoals: 2
};

huungryGameMaps.level1.nextLevel = 'level2';