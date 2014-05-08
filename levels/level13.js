if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level13 = new Object();
huungryGameMaps.level13.width = 400;
huungryGameMaps.level13.height = 400;
huungryGameMaps.level13.image = 'assets/images/levels/level13.png';
huungryGameMaps.level13.playerInitialX = 10;
huungryGameMaps.level13.playerInitialY = 18;
huungryGameMaps.level13.tiledData = {  "layers":[       
        {
         "data":[0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 200, 200, 0, 0, 0, 0, 0, 0, 193, 193, 193, 0, 0, 200, 200, 200, 200, 200, 200, 200, 193, 200, 200, 200, 200, 193, 0, 0, 193, 193, 193, 0, 193, 200, 0, 0, 200, 0, 0, 0, 193, 0, 0, 0, 0, 193, 0, 0, 193, 193, 193, 0, 0, 200, 0, 0, 200, 0, 0, 0, 200, 0, 0, 0, 0, 193, 0, 193, 193, 0, 0, 0, 0, 200, 0, 200, 200, 200, 0, 200, 200, 200, 200, 0, 200, 193, 0, 193, 193, 193, 0, 0, 193, 200, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 200, 0, 200, 0, 0, 200, 200, 0, 200, 0, 0, 0, 193, 0, 0, 193, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 200, 0, 200, 200, 200, 0, 193, 0, 0, 193, 193, 0, 0, 0, 200, 200, 200, 200, 200, 0, 200, 0, 0, 0, 200, 0, 193, 0, 0, 193, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 200, 0, 0, 0, 200, 0, 193, 0, 193, 193, 0, 0, 0, 0, 200, 0, 0, 0, 200, 0, 200, 0, 0, 0, 200, 0, 193, 0, 0, 193, 0, 0, 0, 200, 200, 200, 200, 200, 200, 0, 200, 200, 200, 200, 200, 0, 193, 0, 0, 193, 193, 0, 0, 200, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 0, 193, 0, 0, 200, 200, 0, 200, 200, 200, 0, 0, 0, 0, 0, 0, 0, 193, 0, 193, 193, 193, 0, 0, 0, 200, 0, 200, 200, 200, 200, 200, 200, 200, 200, 200, 0, 193, 0, 193, 193, 193, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 193, 193, 193, 0, 193, 193, 193, 0, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 0, 0, 0, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 0, 0, 0],
         "height":20,
         "name":"blocked",
         "opacity":0.75,
         "type":"tilelayer",
         "visible":true,
         "width":20,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level13.enemyArmies = [
    {
        isQuestGoal: false,
        x: 17,
        y: 18,
        image: 'armoredaxeman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'armoredaxeman',
                    power: 1200,
                    maxNum: 5
                },
                {
                    typeid: 'prairiehorseman',
                    power: 1400,
                    maxNum: 3
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 19,
        y: 14,
        image: 'snowman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'snowman',
                    power: 1400,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 19,
        y: 5,
        image: 'snowman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'snowman',
                    power: 1700,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 1,
        y: 11,
        image: 'snowman.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'snowman',
                    power: 1700,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 19,
        y: 18,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 1800,
                    maxNum: 8
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 0,
        y: 16,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 2200,
                    maxNum: 8
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 0,
        y: 5,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 1200,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 0,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 900,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 16,
        y: 1,
        image: 'wolf.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'wolf',
                    power: 1400,
                    maxNum: 5
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 16,
        y: 7,
        image: 'elitearcher.png',
        background: 'snow_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'elitearcher',
                    power: 2200,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 12,
        y: 16,
        image: 'swordskeleton.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'swordskeleton',
                    power: 2500,
                    maxNum: 4
                },
                {
                    typeid: 'skeletonunarmed',
                    power: 1200,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 14,
        image: 'swordskeleton.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'swordskeleton',
                    power: 2600,
                    maxNum: 4
                },
                {
                    typeid: 'skeletonunarmed',
                    power: 1400,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 12,
        y: 5,
        image: 'swordskeleton.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'swordskeleton',
                    power: 2000,
                    maxNum: 4
                },
                {
                    typeid: 'skeletonunarmed',
                    power: 1600,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 6,
        y: 7,
        image: 'orc.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'orc',
                    power: 2500,
                    maxNum: 6
                },
                {
                    typeid: 'snake',
                    power: 1200,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 3,
        y: 7,
        image: 'troll.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'troll',
                    power: 2400,
                    maxNum: 6
                },
                {
                    typeid: 'skeletonunarmed',
                    power: 2600,
                    maxNum: 6
                },       
            ]
        ]
    },
    {
        isQuestGoal: false,
        x: 9,
        y: 8,
        image: 'redwizard.png',
        background: 'stone_background.png',
        unitsSummary: [
            [              
                {
                    typeid: 'redwizard',
                    power: 5500,
                    maxNum: 6
                }, 
                {
                    typeid: 'demon',
                    power: 2500,
                    maxNum: 6
                },    
                {
                    typeid: 'swordskeleton',
                    power: 4500,
                    maxNum: 6
                },   
            ]
        ]
    },
];

huungryGameMaps.level13.shops = [
    {
        x: 16,
        y: 3,
        name: 'HOT PINT PUB',
        image: 'house-2.png',
        units: [
            {
                typeid: 'prairiehorseman',
                price: 900,
                qty: 150
            },
            {
                typeid: 'elitearcher',
                price: 750,
                qty: 120
            },
            {
                typeid: 'armoredaxeman',
                price: 650,
                qty: 100
            }              
        ]
    }
];

huungryGameMaps.level13.items = [
    {
        x: 19,
        y: 11,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 18,
        y: 11,
        name: 'Gold',
        gold: 300,
        image: 'gold-pile.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 18,
        y: 10,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 19,
        y: 0,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 18,
        y: 0,
        name: 'Gold',
        gold: 300,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 4,
        name: 'Gold',
        gold: 300,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 3,
        name: 'Gold',
        gold: 200,
        image: 'chest-jewels.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 1,
        name: 'Gold',
        gold: 200,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 3,
        name: 'Gold',
        gold: 300,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 0,
        y: 0,
        name: 'Gold',
        gold: 400,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 2,
        y: 19,
        name: 'Gold',
        gold: 300,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 19,
        y: 4,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 18,
        y: 4,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 4,
        y: 11,
        name: 'Paralyze Spell',
        numHits: 3,
        image: 'scroll-paralyze.png',
        type: 'ITEM.PARALYZE-SPELL'
    },
    {
        x: 18,
        y: 6,
        name: 'Resurrection Spell',
        numHits: 10,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 13,
        y: 15,
        name: 'Resurrection Spell',
        numHits: 8,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 10,
        y: 9,
        name: 'Resurrection Spell',
        numHits: 9,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 10,
        y: 11,
        name: 'Resurrection Spell',
        numHits: 14,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 12,
        y: 3,
        name: 'Resurrection Spell',
        numHits: 12,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 7,
        y: 3,
        name: 'Resurrection Spell',
        numHits: 6,
        image: 'scroll-skull.png',
        type: 'ITEM.RESURRECTION-SPELL'
    },
    {
        x: 17,
        y: 13,
        name: 'Fire Spell',
        attack: 80,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 3,
        name: 'Fire Spell',
        attack: 90,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 3,
        y: 3,
        name: 'Fire Spell',
        attack: 100,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 4,
        name: 'Defense Spell',
        numHits: 3,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        x: 3,
        y: 4,
        name: 'Defense Spell',
        numHits: 4,
        image: 'shield.png',
        type: 'ITEM.DEFENSE-SPELL'
    },
    {
        isQuestGoal: true,
        x: 10,
        y: 10,
        name: 'Huungree Shrine',
        image: 'shrine.png',
        type: 'ITEM.LANDMARK',
        text: 'Surrounded by the blood of the battle, you make your question to the shrine. The scared priests show you in a map a secret road to the Mystical Cities.'
    },
    {
        x: 3,
        y: 10,
        name: 'Green Key',
        attribute: 'green',
        image: 'key-green.png',
        type: 'ITEM.KEY',
    },
    {
        x: 7,
        y: 5,
        name: 'Green Door',
        attribute: 'green',
        image: 'door-green.png',
        type: 'ITEM.DOOR',
    },
    {
        x: 18,
        y: 7,
        name: 'Red Key',
        attribute: 'red',
        image: 'key-red.png',
        type: 'ITEM.KEY',
    },
    {
        x: 8,
        y: 17,
        name: 'Red Door',
        attribute: 'red',
        image: 'door-red.png',
        type: 'ITEM.DOOR',
    },
    {
        x: 0,
        y: 11,
        name: 'Purple Key',
        attribute: 'purple',
        image: 'key-purple.png',
        type: 'ITEM.KEY',
    },
    {
        x: 6,
        y: 10,
        name: 'Purple Door',
        attribute: 'purple',
        image: 'door-purple.png',
        type: 'ITEM.DOOR',
    },
    {
        x: 9,
        y: 10,
        name: 'Possession Spell',
        numHits: 3,
        image: 'scroll-possession.png',
        type: 'ITEM.POSSESSION-SPELL'
    },
    {
        x: 11,
        y: 10,
        name: 'Possession Spell',
        numHits: 4,
        image: 'scroll-possession.png',
        type: 'ITEM.POSSESSION-SPELL'
    },
];

huungryGameMaps.level13.quest = {
    screens: ['The Crow Mountains hide the sacred city of Huungree. Whoever finds the heart of the temple can ask anything to the gods',
    'If you could find that shrine you could ask the gods for the best strategy to attack Jekkel and take over Crysal for yourself',
    'Legends say it is protected by power wizards and demons, but your first challenge will be to find an entrance to the city.',

'<div class="quests-title">LEVEL QUESTS:</div><ul>\
<li>1-Find the heart of the sacred city of Huungree. <img src="assets/images/places/shrine.png" width="20" /> \
    </li>\
<ul>'
    ],
    goals: [{type: 'QUEST-LANDMARK'}],
    totalNumGoals: 1
};

huungryGameMaps.level13.nextLevel = 'level14';