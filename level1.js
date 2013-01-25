if(huungryGameMaps === undefined) {
    var huungryGameMaps = new Object();
}

huungryGameMaps.level1 = new Object();
huungryGameMaps.level1.width = 300;
huungryGameMaps.level1.height = 300;
huungryGameMaps.level1.image = 'assets/level1.png';
huungryGameMaps.level1.playerInitialX = 2;
huungryGameMaps.level1.playerInitialY = 2;

huungryGameMaps.level1.tiledData = { 
 "height":15,
 "layers":[
        {
         "data":[150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 154, 241, 241, 241, 241, 150, 150, 150, 150, 182, 182, 182, 182, 150, 150, 154, 241, 241, 241, 241, 241, 150, 150, 150, 182, 182, 182, 182, 182, 150, 146, 241, 241, 241, 241, 241, 241, 150, 248, 248, 248, 248, 248, 182, 150, 146, 146, 241, 241, 241, 136, 136, 150, 150, 241, 241, 241, 241, 241, 136, 146, 146, 241, 241, 241, 241, 241, 150, 150, 241, 241, 241, 241, 241, 136, 146, 241, 241, 241, 241, 146, 146, 150, 241, 241, 241, 241, 241, 241, 136, 146, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 241, 146, 146, 129, 241, 146, 241, 241, 146, 241, 241, 241, 241, 241, 241, 146, 146, 146, 241, 241, 146, 241, 146, 146, 129, 241, 146, 146, 241, 146, 146, 146, 146, 241, 241, 146, 241, 241, 241, 146, 241, 241, 146, 146, 146, 241, 146, 146, 309, 309, 309, 309, 309, 241, 309, 309, 241, 241, 241, 241, 241, 146, 146, 241, 241, 241, 241, 241, 241, 241, 309, 290, 290, 241, 241, 241, 146, 146, 241, 241, 241, 241, 241, 241, 241, 241, 290, 146, 241, 241, 241, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146, 146],
         "height":15,
         "name":"terrain",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "data":[94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 0, 0, 0, 0, 94, 94, 94, 94, 0, 0, 0, 0, 94, 94, 94, 0, 0, 0, 0, 0, 94, 94, 94, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 0, 0, 0, 94, 94, 94, 94, 94, 94, 0, 94, 94, 94, 0, 0, 0, 94, 94, 94, 94, 0, 0, 0, 0, 0, 94, 94, 94, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 0, 94, 94, 94, 0, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 94, 94, 0, 94, 0, 0, 94, 0, 0, 0, 0, 0, 0, 94, 94, 94, 0, 0, 94, 0, 94, 94, 94, 0, 94, 94, 0, 94, 94, 94, 94, 0, 0, 94, 0, 0, 0, 94, 0, 0, 94, 94, 94, 0, 94, 94, 94, 94, 94, 94, 94, 0, 94, 94, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 0, 0, 0, 0, 94, 94, 239, 0, 0, 0, 94, 94, 0, 0, 0, 0, 0, 0, 0, 0, 94, 94, 0, 0, 0, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94],
         "height":15,
         "name":"blocked",
         "opacity":0.430000007152557,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 239, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 227, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"enemies",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 162, 162, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"items",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 143, 0, 0, 0, 0, 0, 0, 0, 143, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":15,
         "name":"shops",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":15,
         "x":0,
         "y":0
        }],
 "orientation":"orthogonal",
 "properties":
    {

    },
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "image":"set_0_32.gif",
         "imageheight":576,
         "imagewidth":576,
         "margin":0,
         "name":"set_0_32",
         "properties":
            {

            },
         "spacing":0,
         "tileheight":32,
         "tilewidth":32
        }],
 "tilewidth":32,
 "version":1,
 "width":15
};

huungryGameMaps.level1.enemyArmies = [
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
        x: 5,
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

huungryGameMaps.level1.shops = [
    {
        x: 5,
        y: 13,
        name: 'Le Mirage',
        image: 'city.png',
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
            }
        ]
    },
    {
        x: 12,
        y: 12,
        name: 'Le Mirage',
        image: 'city.png',
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

huungryGameMaps.level1.items = [
    {
        x: 5,
        y: 3,
        name: 'Gold',
        gold: 20,
        image: 'gold.png'
    },
    {
        x: 6,
        y: 5,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 1,
        y: 7,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 1,
        y: 10,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 7,
        y: 13,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 8,
        y: 13,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 11,
        y: 9,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 13,
        y: 10,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 13,
        y: 6,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 9,
        y: 4,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 11,
        y: 1,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
    {
        x: 12,
        y: 1,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
]