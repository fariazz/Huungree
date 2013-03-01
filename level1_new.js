if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1_new = new Object();
huungryGameMaps.level1_new.width = 500;
huungryGameMaps.level1_new.height = 300;
huungryGameMaps.level1_new.image = 'assets/level1_new.png';
huungryGameMaps.level1_new.playerInitialX = 2;
huungryGameMaps.level1_new.playerInitialY = 2;

huungryGameMaps.level1_new.tiledData = { "height":15,
 "layers":[
        {
         "data":[16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 28, 16, 16, 32, 32, 32, 6, 6, 16, 9, 20, 9, 9, 9, 9, 9, 9, 27, 28, 9, 9, 40, 40, 6, 6, 27, 34, 32, 32, 33, 6, 6, 6, 16, 9, 9, 9, 28, 28, 28, 28, 9, 9, 28, 9, 9, 9, 40, 40, 6, 28, 34, 33, 32, 6, 6, 6, 16, 16, 16, 9, 9, 9, 9, 9, 28, 9, 9, 27, 9, 9, 9, 9, 9, 6, 28, 34, 32, 32, 6, 6, 6, 9, 9, 16, 9, 9, 42, 42, 42, 42, 42, 9, 9, 9, 20, 9, 9, 20, 9, 27, 34, 6, 6, 6, 6, 16, 16, 16, 16, 9, 42, 42, 42, 42, 42, 42, 42, 42, 42, 9, 9, 9, 9, 9, 27, 28, 6, 6, 6, 9, 9, 9, 9, 9, 9, 42, 42, 31, 31, 31, 31, 31, 31, 42, 42, 42, 42, 42, 42, 42, 27, 9, 9, 17, 16, 16, 16, 16, 9, 9, 42, 42, 42, 42, 42, 42, 31, 31, 31, 31, 31, 31, 31, 31, 22, 28, 9, 9, 9, 17, 17, 9, 9, 9, 9, 9, 9, 9, 9, 9, 42, 42, 42, 21, 42, 42, 31, 42, 42, 42, 28, 9, 7, 7, 17, 17, 9, 9, 9, 9, 40, 40, 40, 40, 9, 9, 9, 42, 42, 42, 31, 31, 22, 21, 22, 27, 9, 9, 9, 17, 9, 9, 9, 9, 40, 40, 15, 15, 40, 40, 40, 9, 40, 9, 9, 9, 9, 22, 31, 22, 28, 9, 9, 9, 28, 28, 27, 9, 40, 40, 3, 15, 15, 40, 9, 9, 14, 8, 8, 8, 14, 14, 22, 9, 8, 28, 7, 35, 9, 28, 27, 28, 28, 40, 15, 3, 3, 3, 40, 40, 40, 14, 14, 14, 14, 14, 9, 14, 14, 8, 28, 9, 9, 9, 9, 9, 9, 9, 9, 9, 15, 15, 15, 40, 14, 14, 14, 14, 14, 14, 14, 14, 14, 9, 8, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 8],
         "height":15,
         "name":"map",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":25,
         "x":0,
         "y":0
        }, 
        {
         "data":[62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 0, 0, 0, 0, 0, 62, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 62, 62, 0, 0, 62, 62, 0, 0, 62, 0, 0, 0, 62, 0, 0, 0, 62, 62, 62, 62, 0, 0, 62, 0, 0, 0, 62, 62, 0, 62, 62, 62, 0, 0, 0, 0, 62, 62, 62, 0, 0, 0, 0, 0, 62, 0, 0, 62, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 0, 0, 0, 0, 62, 0, 0, 62, 62, 62, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 0, 62, 62, 62, 62, 0, 62, 62, 62, 62, 62, 62, 62, 62, 62, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 0, 0, 0, 62, 62, 62, 62, 62, 62, 62, 62, 0, 0, 62, 62, 62, 62, 62, 0, 0, 62, 62, 62, 62, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 62, 62, 62, 62, 0, 62, 62, 62, 62, 0, 62, 62, 62, 62, 0, 0, 0, 0, 62, 62, 62, 62, 0, 0, 0, 62, 62, 62, 0, 0, 62, 62, 62, 62, 0, 0, 0, 62, 0, 0, 0, 0, 62, 62, 0, 0, 62, 62, 62, 0, 62, 0, 0, 0, 0, 62, 0, 62, 62, 0, 0, 0, 62, 62, 62, 0, 62, 62, 0, 0, 0, 62, 0, 0, 0, 62, 62, 62, 0, 0, 62, 0, 62, 62, 62, 62, 0, 62, 62, 62, 62, 62, 0, 0, 0, 0, 62, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62, 62],
         "height":15,
         "name":"blocked",
         "opacity":0.759999990463257,
         "type":"tilelayer",
         "visible":false,
         "width":25,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"enemies",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":25,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 64, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 64, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"items",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":25,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"shops",
         "opacity":1,
         "type":"tilelayer",
         "visible":false,
         "width":25,
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
         "image":"assets\/new pics\/terrain\/items_grid.png",
         "imageheight":106,
         "imagewidth":274,
         "margin":1,
         "name":"items_grid",
         "properties":
            {

            },
         "spacing":1,
         "tileheight":20,
         "tilewidth":20
        }],
 "tilewidth":20,
 "version":1,
 "width":25
};

huungryGameMaps.level1_new.enemyArmies = [
    {
        x: 2,
        y: 5,
        image: 'lion.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 4
            },
        ]
    },
    {
        x: 4,
        y: 5,
        image: 'lion.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'bluemonster',
                number: 2
            },
        ]
    },
    {
        x: 2,
        y: 8,
        image: 'knight2.png',
        unitsSummary: [
            {
                id: 'knight',
                number: 3
            },
            {
                id: 'cross_soldier',
                number: 3
            },
        ]
    },
    {
        x: 4,
        y: 9,
        image: 'bluemonster.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'bluemonster',
                number: 3
            },
            {
                id: 'pinkmonster',
                number: 1
            },
        ]
    },
    {
        x: 6,
        y: 7,
        image: 'solder1.png',
        unitsSummary: [
            {
                id: 'cross_soldier',
                number: 3
            },
        ]
    },
    {
        x: 6,
        y: 11,
        image: 'pinkmonster.png',
        unitsSummary: [            
            {
                id: 'bluemonster',
                number: 2
            },
            {
                id: 'pinkmonster',
                number: 3
            },
        ]
    },
    {
        x: 2,
        y: 13,
        image: 'pinkmonster.png',
        unitsSummary: [            
            {
                id: 'bluemonster',
                number: 1
            },
            {
                id: 'pinkmonster',
                number: 5
            },
        ]
    },
    {
        x: 8,
        y: 9,
        image: 'zombie.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'zombie',
                number: 3
            },
            {
                id: 'pinkmonster',
                number: 1
            },
        ]
    },
    {
        x: 10,
        y: 11,
        image: 'bluemonster.png',
        unitsSummary: [
            {
                id: 'zombie',
                number: 2
            },
            {
                id: 'bluemonster',
                number: 3
            },
            {
                id: 'pinkmonster',
                number: 3
            },
        ]
    },
    {
        x: 10,
        y: 6,
        image: 'zombie.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 2
            },
            {
                id: 'bluemonster',
                number: 3
            },
            {
                id: 'zombie',
                number: 5
            },
        ]
    },
    {
        x: 13,
        y: 3,
        image: 'ninja.png',
        unitsSummary: [
            {
                id: 'ninja',
                number: 5
            }
        ]
    },
    
]

huungryGameMaps.level1_new.shops = [
    {
        x: 1,
        y: 2,
        name: 'Le Mirage',
        image: 'house-1.png',
        units: [
            {
                id: 'knight',
                price: 30,
                qty: 5
            },
            {                
                id: 'lion',
                price: 40,
                qty: 5
            },
            {
                id: 'peasant',
                price: 30,
                qty: 5
            }
        ]
    },
    {
        x: 12,
        y: 12,
        name: 'Red Eyes Shop',
        image: 'house-2.png',
        units: [
            {
                id: 'peasant',
                price: 30,
                qty: 5
            },
            {                
                id: 'priest',
                price: 40,
                qty: 5
            }
        ]
    },
];

huungryGameMaps.level1_new.items = [
    {
        x: 5,
        y: 3,
        name: 'Gold',
        gold: 20,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 3,
        y: 3,
        name: 'Fire Scroll',
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL',
        attack: 10
    },
    {
        x: 4,
        y: 4,
        name: 'Fire Scroll',
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL',
        attack: 10
    },
    {
        x: 7,
        y: 4,
        name: 'Fire Scroll',
        image: 'scroll-fire.png',
        type: 'ITEM.ATTACK-SPELL',
        attack: 10
    },
    {
        x: 6,
        y: 5,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 1,
        y: 7,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 1,
        y: 10,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 7,
        y: 13,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 8,
        y: 13,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 9,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 10,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 13,
        y: 6,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 9,
        y: 4,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 11,
        y: 1,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
    {
        x: 12,
        y: 1,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png',
        type: 'ITEM.GOLD'
    },
]

