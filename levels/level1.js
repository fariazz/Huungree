if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1 = new Object();
huungryGameMaps.level1.width = 380;
huungryGameMaps.level1.height = 180;
huungryGameMaps.level1.image = 'assets/images/levels/level1.png';
huungryGameMaps.level1.playerInitialX = 3;
huungryGameMaps.level1.playerInitialY = 3;

huungryGameMaps.level1.tiledData = {
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 0, 0, 0, 0, 0, 0, 0, 0, 200, 200, 0, 0, 0, 0, 200, 200, 0, 0, 200, 200, 200, 200, 200, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 200, 200, 0, 0, 0, 200, 0, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 200, 200, 200, 0, 200, 0, 0, 0, 0, 200, 200, 0, 0, 0, 0, 200, 0, 0, 0, 0, 0, 200, 0, 200, 0, 0, 0, 0, 200, 0, 0, 0, 0, 200, 200, 0, 0, 0, 0, 0, 200, 0, 200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 0],
         "height":9,
         "name":"blocked",
         "opacity":0.720000028610229,
         "type":"tilelayer",
         "visible":false,
         "width":19,
         "x":0,
         "y":0
        }]
};

huungryGameMaps.level1.enemyArmies = [
    {
        isQuestGoal: true,
        x: 5,
        y: 7,
        image: 'wolf.png',
        background: 'grass_background.png',
        unitsSummary: [
            [
                {
                    id: 'wolf',
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
                    id: 'snake',
                    power: 350,
                    maxNum: 5
                }
            ]            
        ]
    }
];

huungryGameMaps.level1.shops = []

huungryGameMaps.level1.items = [
    {
        x: 9,
        y: 3,
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
];

huungryGameMaps.level1.quest = {
    screens: ['Three maritime super powers dispute the new continent of Tamaca. \
The Nothul Empire and their heavy troops occupy the north. \
The Ghornia Queendom took over the coastal trade. \
The Republic of Ingeber and their privateers went inland and took over the Mystical Cities.',

        'You play the role of Jakkal, aspiring privateer from Ingeber. \
You\'ve just arrived to Crab Bay to join your older brother Jekkel,\
a seasoned privateer who is in the Mystical City of Crisal, far inland in Tamaca.',

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