var BlockedCells = {};

 BlockedCells.mainMap = { "height":15,
 "layers":[
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
    ],
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
}

var UnitTypes = [
    {
        id: 'bluemonster',
        name: 'blue monster',
        image: 'bluemonster.png',
        attack: 10,
        defense: 8,
        canShoot: true,
        life: 10,
        gold: 10
    },
    {
        id: 'pinkmonster',
        name: 'pink monster',
        image: 'pinkmonster.png',
        attack: 13,
        defense: 10,
        canShoot: false,
        life: 14,
        gold: 15
    },
    {
        id: 'lion',
        name: 'lion',
        image: 'lion.png',
        attack: 8,
        defense: 6,
        canShoot: false,
        life: 6,
        gold: 5
    },
    {
        id: 'zombie',
        name: 'zombie',
        image: 'zombie.png',
        attack: 16,
        defense: 5,
        canShoot: false,
        life: 12,
        gold: 13
    },
    {
        id: 'peasant',
        name: 'peasant',
        image: 'peasant.png',
        attack: 10,
        defense: 7,
        canShoot: false,
        life: 20,
        gold: 17
    },
    {
        id: 'dwarf',
        name: 'dwarf',
        image: 'dwarf.png',
        attack: 20,
        defense: 13,
        canShoot: false,
        life: 25,
        gold: 40
    },
    {
        id: 'axeman',
        name: 'axe warrior',
        image: 'axeman.png',
        attack: 16,
        defense: 13,
        canShoot: false,
        life: 22,
        gold: 32
    },
    {
        id: 'soldier',
        name: 'soldier',
        image: 'soldier.png',
        attack: 18,
        defense: 10,
        canShoot: false,
        life: 18,
        gold: 24
    },
    {
        id: 'archer',
        name: 'archer',
        image: 'archer.png',
        attack: 10,
        defense: 5,
        canShoot: true,
        life: 1300,
        gold: 23
    },
]

var MapEnemyArmies = [
    {
        x: 5,
        y: 1,
        image: 'lion.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 4
            },
        ]
    },
    {
        x: 6,
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
        x: 11,
        y: 3,
        image: 'bluemonster.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 3
            },
            {
                id: 'bluemonster',
                number: 3
            },
        ]
    },
    {
        x: 9,
        y: 10,
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
        y: 12,
        image: 'lion.png',
        unitsSummary: [
            {
                id: 'lion',
                number: 9
            },
        ]
    },
    {
        x: 3,
        y: 12,
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
        x: 6,
        y: 16,
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
        x: 7,
        y: 20,
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
        y: 14,
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
        x: 13,
        y: 17,
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
        x: 16,
        y: 18,
        image: 'bluemonster.png',
        unitsSummary: [
            {
                id: 'bluemonster',
                number: 10
            }
        ]
    },
    {
        x: 12,
        y: 8,
        image: 'zombie.png',
        unitsSummary: [            
            {
                id: 'zombie',
                number: 10
            },
        ]
    },
    {
        x: 15,
        y: 9,
        image: 'zombie.png',
        unitsSummary: [
            {
                id: 'zombie',
                number: 8
            },
            {
                id: 'bluemonster',
                number: 2
            },
            {
                id: 'pinkmonster',
                number: 1
            },
        ]
    },
    {
        x: 16,
        y: 12,
        image: 'pinkmonster.png',
        unitsSummary: [            
            {
                id: 'bluemonster',
                number: 1
            },
            {
                id: 'pinkmonster',
                number: 8
            },
        ]
    },
]

MapShops = [
    {
        x: 8,
        y: 4,
        name: 'Le Mirage',
        image: 'city.png',
        units: [
            {
                id: 'peasant',
                price: 30,
                qty: 5
            },
            {                
                id: 'axeman',
                price: 40,
                qty: 5
            }
        ]
    },
];

MapItems = [
    {
        x: 8,
        y: 2,
        name: 'Gold',
        gold: 20,
        image: 'gold.png'
    },
    {
        x: 7,
        y: 3,
        name: 'Ancient chest',
        gold: 210,
        image: 'gold.png'
    },
]