var HuungryUI = HuungryUI || new Object();

$(function() {
    if(typeof FastClick !== "undefined") {
        FastClick.attach(document.body);
    }
});

document.addEventListener("backbutton", function() {
    navigator.app.exitApp();
}, false);


/**
 * end of game dialog
 */
HuungryUI.showEndofGameDialog = function(gameObj) {
    HuungryUI.gameObj.saveGame(false);
    HuungryUI.showDialog('YOU HAVE WON THE GAME!',
        'Congratulations! you have defeated Jekkel\'s armies and you are now the sole ruler of the Mysical Cities.<br/><br/>It\'s been a long journey! You arrived to Tamaca as a low-grade mercenary and have become Ingeber\'s richest and most powerful privateer and an empire to rule.'
        ,[{text: 'NEXT', btnClass: 'button-home', callback: function(){
            HuungryUI.showDialog('WHAT\'S NEXT?',
            'My name is Pablo Farias Navarro and as the founder of ZENVA I\'d like to thank you so much for playing our game! Feel free to email me at <span class="strongy">pablofarias@zenva.com</span>.<br/><br/>If you want to learn how to make your own games follow our YouTube Channel ;)'
            ,[{text: 'YOUTUBE', btnClass: 'button-home', callback: function(){
                window.open('https://youtube.com/fariazz2', '_blank', 'location=yes');
            }},
            {text: 'PLAY AGAIN!', btnClass: 'button-home', callback: function(){
                window.location = '';
            }},

            ]
            )
        }}
        ]);
};

/**
 * about game dialog
 */
HuungryUI.showAboutDialog = function(gameObj) {
    HuungryUI.showDialog('ABOUT HUUNGREE',
        'Huungree is a RPG created by ZENVA. Besides making games we also teach game development through online video courses.\
        <br/><br/>If you\'d like to know about the development process of Huungree feel free to check out YouTube channel.'
        ,[
        {text: 'BACK', btnClass: 'button-home', callback: HuungryUI.hideDialog},
        {text: 'YOUTUBE', btnClass: 'button-home', callback: function(){
            window.open('https://www.youtube.com/watch?v=P4-Z4H8ZnG0', '_blank', 'location=yes');
        }}]);
};

/**
* show dialog
*/
HuungryUI.showDialog = function(headerHtml, bodyHtml, actions, help) {
    HuungryUI.gameObj.director.setPaused(true);
    //setTimeout(function() {HuungryUI.gameObj.director.setPaused(true);}, 300);
    var height = $(window).height();
    //$('.lime-director').css('top', height);
    $('.zva_dialog').css('display', 'block');
    $('.zva_dialog_header').html(headerHtml);
    $('.zva_dialog_body').html(bodyHtml);
    $('.zva_dialog_help').html(help || '');
    $('.zva_dialog_actions').empty();
    var i;
    for(i = 0; i < actions.length; i++) {
        (function(i) {
            $('.zva_dialog_actions').append('<button on="return true;" data-role="action-btn-'+i+'" class="'+actions[i].btnClass+'" ">'+actions[i].text+'</button>');
            $('button[data-role="action-btn-'+i+'"]').unbind(HuungryUI.gameObj.CLICK_EVENT);
            $('button[data-role="action-btn-'+i+'"]').bind(HuungryUI.gameObj.CLICK_EVENT, function(e) {
                e.preventDefault();
                e.stopPropagation();

                if(!actions[i].noHide) {
                    HuungryUI.hideDialog();
                }

                actions[i].callback();
            });
        })(i);
    }

}

/**
* hide dialog
*/
HuungryUI.hideDialog = function() {
    HuungryUI.gameObj.director.setPaused(false);
/*    setTimeout(function() {HuungryUI.gameObj.director.setPaused(false);}, 350);
*/
    $('.zva_dialog').css('display', 'none');
    $('.zva_dialog_header').empty();
    $('.zva_dialog_body').empty();
    $('.zva_dialog_actions').empty();
    $('.zva_dialog_help').empty();
    //$('.lime-director').css('top', 0);
}

/**
* preparte dialog size to fit screen
*/
HuungryUI.prepareDialog = function(gameObj) {

    HuungryUI.gameObj = gameObj;
    var gameRatio = gameObj.screenWidth/gameObj.screenHeight;

    var factor = 1;
    if(window.device) {
        if(window.device.platform == "Android") {
            if(window.device.version) {
                if(parseInt(window.device.version.substring(0,1)) < 4) {
                    factor = window.devicePixelRatio;
                }
            }
        }
    }
    else {
        console.log('there is no window.device');
    }

    var height = $(window).height()*factor;
    var width = $(window).width()*factor;

    console.log('width:'+width);
    console.log('height:'+height);

    var temp;
    if(width < height) {
        temp = width;
        width = height;
        height = temp;
    }

    //var left = (width - gameObj.screenWidth*ratio)/2;
    $('.zva_dialog').css('margin-left', -gameObj.screenWidth/2);

    var winRatio = width/height;
    var ratio = gameRatio < winRatio ? height/HuungryUI.gameObj.screenHeight : width/HuungryUI.gameObj.screenWidth;
    console.log('winRatio: '+winRatio);
    console.log('gameRatio: '+gameRatio);
    console.log('HuungryUI.gameObj.screenHeight: '+HuungryUI.gameObj.screenHeight);
    console.log('HuungryUI.gameObj.screenWidth: '+HuungryUI.gameObj.screenWidth);
    console.log('ratio: '+ratio);
    $('.zva_dialog').css('transform', 'scale('+ ratio + ','+ ratio + ')');

    if(gameRatio < winRatio) {
        $('.zva_dialog').css('transform-origin', 'top');
    }
    else {
        var topPos = (window.innerHeight - (HuungryUI.gameObj.screenHeight*ratio))/2;
         $('.zva_dialog').css('top', topPos);
         $('.zva_dialog').css('transform-origin', 'top');
    }
}

/**
show player info window
*/
HuungryUI.showPlayerInfoWindow = function() {
    var html = '<div style="clear:both;height:62px;">';
    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="unit-cell">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /> \
                    <div class="unit-name">' + HuungryUI.gameObj.player.units[i].name+'</div>'+
                    '<img width="10" src="assets/images/items/' + (HuungryUI.gameObj.player.units[i].canShoot ? 'rangeattack-icon.png' : 'attack-icon.png') + '" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].attack+' '+
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].defense+' '+
                    '<img width="10" src="assets/images/items/movements.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].movements+'</div>';

        if(i == 3) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    HuungryUI.showDialog('MY ARMY',html
        ,[{text: 'BACK', btnClass: 'button-home', callback: HuungryUI.hideDialog},
        {text: 'MERGE', btnClass: 'button-home', callback: HuungryUI.showArrangeUnitsWindow},
        {text: 'EXPEL', btnClass: 'button-home', callback: HuungryUI.showExpelUnitsWindow}]);
}
/**
show arrange units window
*/
HuungryUI.showArrangeUnitsWindow = function() {
    var html = '<div style="clear:both;height:62px;">';
    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="unit-cell" data-index="'+i+'">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /> \
                    <div class="unit-name">' + HuungryUI.gameObj.player.units[i].name+'</div>'+
                    '<img width="10" src="assets/images/items/' + (HuungryUI.gameObj.player.units[i].canShoot ? 'rangeattack-icon.png' : 'attack-icon.png') + '" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].attack+' '+
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].defense+' '+
                    '<img width="10" src="assets/images/items/movements.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].movements+'</div>';

        if(i == 3) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    var help = 'Touch two units of the same kind to combine.';
    HuungryUI.showDialog('MERGE UNITS',html
        ,[{text: 'BACK', btnClass: 'button-home', callback: HuungryUI.showPlayerInfoWindow}], help);

    $('.unit-cell').on(HuungryUI.gameObj.CLICK_EVENT, function(e){
        e.preventDefault();
        e.stopPropagation();
        var newIndex = $(this).attr('data-index');
        if(HuungryUI.selectedUnit) {
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('background-color', 'transparent');
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('opacity', '1');
            if(HuungryUI.selectedUnit != newIndex) {
                var firstType = HuungryUI.gameObj.player.units[HuungryUI.selectedUnit].typeid;
                var secondType = HuungryUI.gameObj.player.units[newIndex].typeid;
                if(firstType == secondType) {
                    HuungryUI.gameObj.player.units[newIndex].life += HuungryUI.gameObj.player.units[HuungryUI.selectedUnit].life;
                    HuungryUI.gameObj.player.units.splice([HuungryUI.selectedUnit],1);
                    HuungryUI.showArrangeUnitsWindow();
                }

            }
            HuungryUI.selectedUnit = undefined;

        }
        else {
            HuungryUI.selectedUnit = newIndex;
            $(this).css('background-color', '#F6EBC6');
            $(this).css('opacity', '0.5');
        }



    });
}

/**
show items info window
*/
HuungryUI.showItemsWindow = function() {
    var info, len = HuungryUI.gameObj.player.items.length;
    var html = '<div class="items-area" style="'+(len > 12 ? 'overflow-y:scroll;' : '')+'">';
    for(var i=0; i< len; i++) {
        switch(HuungryUI.gameObj.player.items[i].type) {
            case 'ITEM.ATTACK-SPELL':
                info = "Use in battle to damage your enemies Damage: "+HuungryUI.gameObj.player.items[i].attack;
            break;
            case 'ITEM.DEFENSE-SPELL':
                info = "Use in battle to protect a unit against "+HuungryUI.gameObj.player.items[i].numHits+" enemy hits";
            break;
            case 'ITEM.PARALYZE-SPELL':
                info = "Use in battle to freeze an enemy unit for "+HuungryUI.gameObj.player.items[i].numHits+" turns";
            break;
            case 'ITEM.POSSESSION-SPELL':
                info = "Use in battle to turn control an enemy for "+HuungryUI.gameObj.player.items[i].numHits+" turns";
            break;
            case 'ITEM.KEY':
                info = "You can open a "+HuungryUI.gameObj.player.items[i].attribute+" door with this key";
            break;
            case 'ITEM.RESURRECTION-SPELL':
                info = "Use in battle to raise "+HuungryUI.gameObj.player.items[i].numHits+" skeletons from a pile of bones";
            break;
        }

        html += '<div class="item-cell" data-info="'+info+'" data-index="'+i+'">\
                <img src="assets/images/items/' + HuungryUI.gameObj.player.items[i].image+'" /> \
                <div class="unit-name">' + HuungryUI.gameObj.player.items[i].name+'</div>'+
                '</div>';

    }
    html += '</div>';
    var help = 'Touch items for info.';
    var selectedItem;

    HuungryUI.showDialog('ITEMS',html
        ,[
        {text: 'BACK', btnClass: 'button-home', callback: HuungryUI.hideDialog},
        {text: 'DROP', btnClass: 'button-home', noHide: true, callback: function(){
            if(selectedItem) {
                var item = HuungryUI.gameObj.player.items[selectedItem];

                if(!_.contains(['ITEM.KEY'], item.type)) {
                    HuungryUI.gameObj.player.items.splice(selectedItem,1);
                    HuungryUI.showItemsWindow();
                }
                else if(item.type == 'ITEM.KEY') {
                    $('.zva_dialog_help').html('You can\'t drop keys or may get stuck in the level!');
                }

            }
            else {
                $('.zva_dialog_help').html('You haven\'t selected an item to drop');
            }
        }}
    ], help);

    $('.item-cell').on(HuungryUI.gameObj.CLICK_EVENT, function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.item-cell').css('background-color', 'inherit');
        $('.item-cell').css('opacity', 1);
        $(this).css('background-color', '#F6EBC6');
        $(this).css('opacity', '0.5');

        //select item
        selectedItem = $(this).attr('data-index');

        //show item help
        $('.zva_dialog_help').html($(this).attr('data-info'));
    });
}
/**
show items info window
*/
HuungryUI.showBattleItemsWindow = function() {
    var info, len = HuungryUI.gameObj.player.items.length;
    var html = '<div class="items-area" style="'+(len > 12 ? 'overflow-y:scroll;' : '')+'">';
    for(var i=0; i< HuungryUI.gameObj.player.items.length; i++) {
        switch(HuungryUI.gameObj.player.items[i].type) {
            case 'ITEM.ATTACK-SPELL':
                info = "Use in battle to damage your enemies. Damage: "+HuungryUI.gameObj.player.items[i].attack;
            break;
            case 'ITEM.DEFENSE-SPELL':
                info = "Use in battle to protect a unit against "+HuungryUI.gameObj.player.items[i].numHits+" enemy hits";
            break;
            case 'ITEM.PARALYZE-SPELL':
                info = "Use in battle to freeze an enemy unit for "+HuungryUI.gameObj.player.items[i].numHits+" turns";
            break;
            case 'ITEM.POSSESSION-SPELL':
                info = "Use in battle to turn control an enemy for "+HuungryUI.gameObj.player.items[i].numHits+" turns";
            break;
            case 'ITEM.RESURRECTION-SPELL':
                info = "Use in battle to raise "+HuungryUI.gameObj.player.items[i].numHits+" skeletons from a pile of bones";
            break;
        }

        if(!_.contains(['ITEM.KEY'], HuungryUI.gameObj.player.items[i].type)) {
            html += '<div class="item-cell" data-info="'+info+'" data-index="'+i+'">\
                <img src="assets/images/items/' + HuungryUI.gameObj.player.items[i].image+'" /> \
                <div class="unit-name">' + HuungryUI.gameObj.player.items[i].name+'</div>'+
                '</div>';
        }
    }
    html += '</div>';
    var help = 'Touch items for info and usage.';
    HuungryUI.showDialog('ITEMS',html
        ,[{text: 'BACK', btnClass: 'button-home', callback: function() {
            HuungryUI.selectedItem = undefined;
            HuungryUI.hideDialog();
        }},
        {text: 'USE ITEM', btnClass: 'button-hidden', callback: function() {
            if(HuungryUI.selectedItem) {
                HuungryUI.hideDialog();
                HuungryUI.gameObj.fightEngine.showItemTargets();
            }
        }}], help);

    $('.item-cell').on(HuungryUI.gameObj.CLICK_EVENT, function(e){
        e.preventDefault();
        e.stopPropagation();
        var newIndex = $(this).attr('data-index');

        if(HuungryUI.selectedItem) {
            $('[data-index="'+HuungryUI.selectedItem+'"]').css('background-color', 'transparent');
            $('[data-index="'+HuungryUI.selectedItem+'"]').css('opacity', '1');
            HuungryUI.selectedItem = undefined;
        }

        //select item
        HuungryUI.selectedItem = newIndex;
        $(this).css('background-color', '#F6EBC6');
        $(this).css('opacity', '0.5');

        //show use button
        $($('button')[1]).removeClass('button-hidden');
        $($('button')[1]).addClass('button-home');

        //show help
        $('.zva_dialog_help').html($(this).attr('data-info'));
    });
}

/**
show show window
*/
HuungryUI.showShopWindow = function(shop, result) {
    var html = '<div class="shop-products"><div>';
    var length = shop.data.units.length;
    var unit;
    for(var i=0; i < length; i++) {
        unit = HuungryUI.gameObj.unitTypes[shop.data.units[i].typeid];
        html += '<div class="shop-unit-cell" data-index="'+i+'">\
                    <div class="unit-num"><img width="10" src="assets/images/backgrounds/gold.png" style="display:inline;" />'+ shop.data.units[i].price +'</div>'+
                    '<img src="assets/images/units/' + unit.image+'" /> \
                    <div class="unit-name">' + unit.name+'</div>'+
                    '<img width="10" src="assets/images/items/' + (unit.canShoot ? 'rangeattack-icon.png' : 'attack-icon.png') + '" style="display:inline;" />' + unit.attack+' '+
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + unit.defense+' '+
                    '<img width="10" src="assets/images/items/movements.png" style="display:inline;" />' + unit.movements+
                    '<div class="unit-left">'+shop.data.units[i].qty+' left</div></div>';
    }

    html += '</div></div><div class="shop-player-units"><div class="shop-player-title">Your Army</div>';

    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="shop-player-unit">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /></div>';
    }
    html += '</div><div class="shop-player-gold-coin"><img width="40" src="assets/images/backgrounds/gold.png" style="display:inline;" /></div>\
        <div class="shop-player-gold-number">'+HuungryUI.gameObj.player.gold+'</div></div>';
    var help = result === undefined ? 'Touch units to purchase' : result.msg;
    HuungryUI.showDialog(shop.data.name,html
        ,[{text: 'BACK', btnClass: 'button-home', callback: HuungryUI.hideDialog}], help);
    $('.shop-unit-cell').on(HuungryUI.gameObj.CLICK_EVENT, function(e){
        e.preventDefault();
        e.stopPropagation();
        var index = $(this).attr('data-index');
        var result = shop.purchase(shop.data.units[index]);
        HuungryUI.showShopWindow(shop, result);
    });
}

HuungryUI.showSequence = function(title, screens) {
    if(screens.length > 0) {
        HuungryUI.showDialog(title, screens[0],
            [{text: 'OK', btnClass: 'button-home', callback: function() {
                if(screens[1] !== undefined) {
                    HuungryUI.showSequence(title, screens.slice(1, screens.length));
                }
                else {
                    HuungryUI.hideDialog();
                }
            }}]);
    }
}

/**
 * go premium dialog
 */
HuungryUI.showGoPremiumDialog = function(gameObj) {

    var buttons = [{text: 'LETS DO IT!', btnClass: 'button-home', callback: function(){
                        window.location = HuungryUI.gameObj.upgradeURL;
                    }}];

    HuungryUI.gameObj.saveGame(false);
    HuungryUI.showDialog('EPIC ADVENTURES AWAIT!',
        'This is the end of the LITE version but you can continue exploring the exciting continent of Tamaca if you support the developer of this game.<br/><br/> \
        The full game includes hours of gameplay, no ads, and epic battles.'
        ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
            HuungryUI.showDialog('CONTINUE YOUR JOURNEY',
            'Explore echanted forests infested with elfs and evil mystical warriors.\
            <div class="screenshot"><img src="assets/images/screenshots/screenshot-forest1.png" height="100" /> <img src="assets/images/screenshots/screenshot-forest2.png" height="100" /></div>'
            ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
                HuungryUI.showDialog('RAISE AN ARMY',
                'Raise an army and defeat the powerful Nothul troops in epic battles.\
                <div class="screenshot"><img src="assets/images/screenshots/screenshot-snow.png" height="100" /> <img src="assets/images/screenshots/screenshot-snow2.png" height="100" /></div>'
                ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
                    HuungryUI.showDialog('TAKE OVER THE EMPIRE',
                    'The sacred city of Huungree holds the secret to victory, but it\'s guarded by demons and wizards.\
                    <div class="screenshot"><img src="assets/images/screenshots/screenshot-huungree.png" height="80" /></div>'
                    ,buttons);
                }}]);
            }}]);
        }}]);
};


/**
show expel units window
*/
HuungryUI.showExpelUnitsWindow = function() {
    var html = '<div style="clear:both;height:62px;">';
    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="unit-cell" data-index="'+i+'">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /> \
                    <div class="unit-name">' + HuungryUI.gameObj.player.units[i].name+'</div>'+
                    '<img width="10" src="assets/images/items/' + (HuungryUI.gameObj.player.units[i].canShoot ? 'rangeattack-icon.png' : 'attack-icon.png') + '" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].attack+' '+
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].defense+' '+
                    '<img width="10" src="assets/images/items/movements.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].movements+'</div>';

        if(i == 3) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    var help = 'Touch the units you want to expel from your army.';
    HuungryUI.showDialog('EXPEL UNITS',html
        ,[
            {text: 'BACK', btnClass: 'button-home', callback: HuungryUI.showPlayerInfoWindow},
            {text: 'EXPEL UNIT', noHide: true, btnClass: 'button-hidden', callback: function() {
                if(HuungryUI.selectedUnit) {
                    if(HuungryUI.gameObj.player.units.length > 1) {
                        HuungryUI.gameObj.player.units.splice(HuungryUI.selectedUnit,1);
                        HuungryUI.showExpelUnitsWindow();
                    }
                    else {
                        $('.zva_dialog_help').html('You can\'t fire all of your army!');
                    }
                }
            }}
        ], help);

    $('.unit-cell').on(HuungryUI.gameObj.CLICK_EVENT, function(e){
        e.preventDefault();
        e.stopPropagation();
        var newIndex = $(this).attr('data-index');
        if(HuungryUI.selectedUnit) {
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('background-color', 'transparent');
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('opacity', '1');
        }

        HuungryUI.selectedUnit = newIndex;
        $(this).css('background-color', '#F6EBC6');
        $(this).css('opacity', '0.5');

        //show use button
        $($('button')[1]).removeClass('button-hidden');
        $($('button')[1]).addClass('button-home');

        //show help
        $('.zva_dialog_help').html('Are you sure you want to expel this unit?');


    });
}

/**
show game menu window
*/
HuungryUI.showGameMenuWindow = function() {
    HuungryUI.showDialog('GAME MENU','What would you like to do?'
        ,[
        {text: 'SAVE', btnClass: 'button-home', callback: function(){
            HuungryUI.gameObj.saveGame(true);
        }},
        {text: 'HOME', btnClass: 'button-home', callback: function(){
            window.location = '';
        }},
        {text: 'CANCEL', btnClass: 'button-home', callback: HuungryUI.hideDialog}
        ]);
};

/**
 * go premium dialog ad
 */
HuungryUI.showPremiumAdDialog = function(gameObj) {

    var buttons = [
        {
            text: 'LETS DO IT!',
            btnClass: 'button-home',
            callback: function(){
                window.location = HuungryUI.gameObj.upgradeURL;
            }
        },
        {
            text: 'MAYBE LATER',
            btnClass: 'button-home',
            callback: HuungryUI.hideDialog
        }
    ];

    HuungryUI.showDialog('EPIC ADVENTURES AWAIT!',
        'Enjoy an extended, ad-free experience by getting the Full Version. The continent of Tamaca needs you and so does the developer of this game.<br/><br/> \
        The full game includes hours of gameplay, no ads, more spells and epic battles.'
        ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
            HuungryUI.showDialog('UNVEIL THE MYSTERY',
            'Explore echanted forests infested with elfs and evil mystical warriors.\
            <div class="screenshot"><img src="assets/images/screenshots/screenshot-forest1.png" height="100" /> <img src="assets/images/screenshots/screenshot-forest2.png" height="100" /></div>'
            ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
                HuungryUI.showDialog('RAISE AN ARMY',
                'Raise an army and defeat the powerful Nothul troops in epic battles.\
                <div class="screenshot"><img src="assets/images/screenshots/screenshot-snow.png" height="100" /> <img src="assets/images/screenshots/screenshot-snow2.png" height="100" /></div>'
                ,[{text: 'LEARN MORE', btnClass: 'button-home', callback: function(){
                    HuungryUI.showDialog('TAKE OVER THE EMPIRE',
                    'The sacred city of Huungree holds the secret to victory, but it\'s guarded by demons and wizards.\
                    <div class="screenshot"><img src="assets/images/screenshots/screenshot-huungree.png" height="80" /></div>'
                    ,buttons);
                }}]);
            }}]);
        }}]);
};
/*
HuungryUI.showUpgradeLink = function() {

    if(this.showingLink)
        return;

    $('body').append('<div id="upgrade-link" class="upgrade-link"><a id="upgrade-link-top">Remove ads</a></div>');

    $('#upgrade-link-top').bind(HuungryUI.gameObj.CLICK_EVENT, function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location = HuungryUI.gameObj.upgradeURL;
    });

    this.showingLink = true;
};*/