var UnitTypes = [
        {
            typeid: 'archer',
            name: 'archer',
            image: 'archer.png',
            attack: 9,
            defense: 1,
            canShoot: true,
            gold: 5,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'axeman',
            name: 'axeman',
            image: 'axeman.png',
            attack: 14,
            defense: 3,
            canShoot: false,
            gold: 6,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'tribalwarrior',
            name: 'tribal warrior',
            image: 'tribalwarrior.png',
            attack: 13,
            defense: 2,
            canShoot: false,
            gold: 8,
            movements: 1,
            spells: [
                {name: 'paralyze',numPerBattle: 1, value: 2},
                {name: 'possession',numPerBattle: 1, value: 2}
            ],
            spellUseProbability: 0.2,
            skelleton: true
        },
        {
            typeid: 'snake',
            name: 'snake',
            image: 'snake.png',
            attack: 14,
            defense: 1,
            canShoot: false,
            gold: 2,
            movements: 1,
            effect: [
                {name: 'paralyze',numPerBattle: 5, value: 2}
            ],
            effectProbability: 0.3,
        },
        {
            typeid: 'wolf',
            name: 'wolf',
            image: 'wolf.png',
            attack: 12,
            defense: 2,
            canShoot: false,
            gold: 3,
            movements: 2,
        },
        {
            typeid: 'peasant',
            name: 'peasant',
            image: 'peasant.png',
            attack: 10,
            defense: 1,
            canShoot: false,
            gold: 9,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'halfling',
            name: 'halfling',
            image: 'halfling.png',
            attack: 12,
            defense: 2,
            canShoot: false,
            gold: 12,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'dwarfaxe',
            name: 'dwarf',
            image: 'dwarfaxe.png',
            attack: 15,
            defense: 5,
            canShoot: false,
            gold: 15,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'lion',
            name: 'lion',
            image: 'lion.png',
            attack: 15,
            defense: 4,
            canShoot: false,
            gold: 4,
            movements: 2,
        },
        {
            typeid: 'insectman',
            name: 'insect man',
            image: 'insectman.png',
            attack: 12,
            defense: 3,
            canShoot: true,
            gold: 13,
            movements: 1,
        },
        {
            typeid: 'troll',
            name: 'troll',
            image: 'troll.png',
            attack: 20,
            defense: 10,
            canShoot: false,
            gold: 22,
            movements: 2,
            effect: [
                {name: 'paralyze',numPerBattle: 5, value: 2}
            ],
            effectProbability: 0.2,
            skelleton: true
        },
        {
            typeid: 'orc',
            name: 'orc',
            image: 'orc.png',
            attack: 18,
            defense: 8,
            canShoot: false,
            gold: 17,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'centaur',
            name: 'centaur',
            image: 'centaur.png',
            attack: 15,
            defense: 10,
            canShoot: true,
            gold: 10,
            movements: 3,
        },
        {
            typeid: 'ritualwarrior',
            name: 'ritual warrior',
            image: 'ritualwarrior.png',
            attack: 16,
            defense: 6,
            canShoot: false,
            gold: 15,
            movements: 1,
            spells: [
                {name: 'possession',numPerBattle: 2, value: 3},
                {name: 'resurrection',numPerBattle: 2, value: 5}
            ],
            spellUseProbability: 0.3, //probability of the unit using a spell
            skelleton: true
        },
        {
            typeid: 'armoredaxeman',
            name: 'armored axeman',
            image: 'armoredaxeman.png',
            attack: 16,
            defense: 6,
            canShoot: false,
            gold: 15,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'elfswordman',
            name: 'elf swordman',
            image: 'elfswordman.png',
            attack: 19,
            defense: 9,
            canShoot: false,
            gold: 35,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'elitearcher',
            name: 'elite archer',
            image: 'elitearcher.png',
            attack: 17,
            defense: 6,
            canShoot: true,
            gold: 30,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'prairiehorseman',
            name: 'prairie horseman',
            image: 'prairiehorseman.png',
            attack: 20,
            defense: 10,
            canShoot: false,
            gold: 33,
            movements: 3,
            skelleton: true
        },
        {
            typeid: 'elfarcher',
            name: 'elf archer',
            image: 'elfarcher.png',
            attack: 24,
            defense: 14,
            canShoot: true,
            gold: 35,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'valkyrie',
            name: 'valkyrie',
            image: 'valkyrie.png',
            attack: 17,
            defense: 7,
            canShoot: false,
            gold: 28,
            movements: 1,
            skelleton: true
        },
        {
            typeid: 'satyr',
            name: 'satyr',
            image: 'satyr.png',
            attack: 15,
            defense: 9,
            canShoot: false,
            gold: 18,
            movements: 2,
            spells: [{name: 'paralyze',numPerBattle: 2, value: 1}],
            spellUseProbability: 0.1,
            skelleton: true
        },
        {
            typeid: 'skelletonunarmed',
            name: 'skelleton',
            image: 'skelleton-unarmed.png',
            attack: 16,
            defense: 8,
            canShoot: false,
            gold: 0,
            movements: 1,
            skelleton: true
        },
        
        
    ];
