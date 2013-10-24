if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1 = new Object();
huungryGameMaps.level1.width = 240;
huungryGameMaps.level1.height = 240;
huungryGameMaps.level1.image = 'assets/levels/level1.png';
huungryGameMaps.level1.playerInitialX = 1;
huungryGameMaps.level1.playerInitialY = 2;

huungryGameMaps.level1.tiledData = { 
 "height":12,
 "layers":[
        {
         "data":[11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 11, 11, 11, 5, 11, 5, 6, 6, 5, 5, 5, 5, 11, 11, 5, 5, 11, 5, 5, 11, 5, 5, 5, 5, 11, 11, 5, 5, 11, 5, 5, 5, 5, 5, 5, 5, 11, 11, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
         "height":12,
         "name":"map1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":12,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 51, 6, 0, 0, 0, 0, 0, 50, 0, 50, 0, 0, 0, 0, 6, 0, 0, 0, 0, 51, 0, 0, 50, 0, 50, 0, 6, 0, 0, 0, 0, 50, 0, 0, 50, 6, 50, 0, 6, 0, 0, 0, 0, 0, 6, 0, 51, 0, 51, 0, 0, 0, 0, 0, 6, 6, 0, 51, 0, 0, 51, 51, 145, 0, 0, 0, 6, 0, 6, 6, 6, 66, 50, 0, 0, 0, 0, 0, 0, 0, 51, 6, 66, 66, 6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 66, 66, 6, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 66, 6, 11, 0, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66, 66],
         "height":12,
         "name":"map2",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":12,
         "x":0,
         "y":0
        }, 
        {
         "data":[193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 0, 0, 193, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 0, 193, 0, 193, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 0, 0, 193, 0, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 193, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 0, 193, 0, 193, 0, 0, 193, 193, 0, 0, 0, 0, 193, 0, 0, 193, 193, 0, 193, 193, 0, 0, 0, 0, 0, 0, 193, 193, 0, 0, 193, 193, 193, 0, 193, 193, 0, 193, 193, 0, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 193, 193, 0, 0, 193, 193, 0, 0, 193, 0, 0, 0, 0, 193, 0, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193, 193],
         "height":12,
         "name":"blocked",
         "opacity":0.680000007152557,
         "type":"tilelayer",
         "visible":true,
         "width":12,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 243, 0, 0, 144, 0, 0, 0, 143, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 149, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 142, 0, 0, 146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":12,
         "name":"enemies",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":12,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 0, 0, 0, 0, 107, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":12,
         "name":"items",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":12,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":20,
 "tilesets":[
        {
         "firstgid":1,
         "image":"..\/huungree_tileset.png",
         "imageheight":541,
         "imagewidth":432,
         "margin":1,
         "name":"huungree_tileset",
         "properties":
            {

            },
         "spacing":1,
         "tileheight":20,
         "tilewidth":20
        }],
 "tilewidth":20,
 "version":1,
 "width":12
};

huungryGameMaps.level1.enemyArmies = [
    {
        x: 2,
        y: 4,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'snake',
                number: 2
            },
						{
                id: 'snake',
                number: 3
            },
						{
                id: 'snake',
                number: 3
            },
        ]
    },
    {
        x: 4,
        y: 2,
        image: 'snake.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'snake',
                number: 4
            },
            {
                id: 'snake',
                number: 1
            },
            {
                id: 'snake',
                number: 1
            },
            {
                id: 'wolf',
                number: 3
            },
        ]
    },
    {
        x: 2,
        y: 8,
        image: 'axeman.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'axeman',
                number: 3
            },
            {
                id: 'archer',
                number: 2
            },
        ]
    },
    {
        x: 5,
        y: 8,
        image: 'peasant.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'peasant',
                number: 3,
            },
            {
                id: 'peasant',
                number: 2,
            },
            {
                id: 'wolf',
                number: 2,
            },
        ]
    },
    {
        x: 7,
        y: 4,
        image: 'lion.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'lion',
                number: 3
            },
            {
                id: 'lion',
                number: 1
            },
        ]
    },
    {
        x: 8,
        y: 2,
        image: 'tribalwarrior.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'tribalwarrior',
                number: 1
            },
            {
                id: 'tribalwarrior',
                number: 2
            },
            {
                id: 'tribalwarrior',
                number: 2
            },
            {
                id: 'lion',
                number: 1
            },
            {
                id: 'lion',
                number: 2
            },
        ]
    },
    {
        x: 10,
        y: 6,
        image: 'wolf.png',
        background: 'dirt_background.png',
        unitsSummary: [
            {
                id: 'wolf',
                number: 3
            },
            {
                id: 'wolf',
                number: 4
            },
            {
                id: 'wolf',
                number: 2
            },
        ]
    },
];

huungryGameMaps.level1.shops = [];

huungryGameMaps.level1.items = [
    {
        x: 1,
        y: 10,
        name: 'Gold',
        gold: 20,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 10,
        name: 'Gold',
        gold: 30,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 9,
        y: 8,
        name: 'Gold',
        gold: 100,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 10,
        y: 3,
        name: 'Gold',
        gold: 42,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 6,
        y: 1,
        name: 'Gold',
        gold: 55,
        image: 'chest-gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 3,
        y: 6,
        name: 'Fire Scroll',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
    {
        x: 4,
        y: 10,
        name: 'Fire Scroll',
        attack: 20,
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL'
    },
];

