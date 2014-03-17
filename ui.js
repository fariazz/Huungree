var HuungryUI = HuungryUI || new Object();

$(function() {
    FastClick.attach(document.body);
});

document.addEventListener("backbutton", function() {
    navigator.app.exitApp();
}, false);


/**
 * show level selection dialog
 */
HuungryUI.showLevelselDialog = function(levels, gameObj) {    
    var html = '<ul>';
    
    var i;
    for(i in levels) {
        html += '<li zva_level="'+i+'"><img src="assets/'+levels[i].image+'" />'+levels[i].displayName+'</li>';
    }
    html += '</ul>';
    $('.zva_dialog_levelsel_listcont').html(html);
    $('.zva_dialog_levelsel').css('display', 'block');
    
    $('.zva_dialog_levelsel_listcont ul li').on('click ', function(e) {
        $('.zva_dialog_levelsel').css('display', 'none');
        var index = $('.zva_dialog_levelsel_listcont ul li').attr('zva_level'); 
        HuungryUI.showLeveldesDialog(levels[index], gameObj);        
    });
};

/**
 * show level description dialog
 */
HuungryUI.showLeveldesDialog = function(level, gameObj) {    
    $('.zva_dialog_leveldesc').css('display', 'block');
    $('.zva_dialog_leveldesc_img').css('background-image', 'url(assets/'+level.introImg+')')
    $('.zva_dialog_leveldesc_txt').html(level.introText)
    
    $('.zva_dialog_btn').bind('click ', function(e) {
        $('.zva_dialog_leveldesc').css('display', 'none');
        gameObj.runLevel(level.codeName);
    });
};

/**
 * end of game dialog
 */
HuungryUI.showEndofGameDialog = function(gameObj) {
    HuungryUI.gameObj.saveGame(false);    
    HuungryUI.showDialog('THE JOURNEY IS NOT OVER', 
        'We are working on adding more content to the game! Stay tuned for more levels all the way to the sacred city of Huungree. Contact us on Twitter @ZenvaTweets, Facebook and YouTube channel.'
        ,[{text: 'REACH US', btnClass: 'button-home', callback: function(){            
            window.open('https://docs.google.com/forms/d/1AOxTjtV_EmQHugx67t34WlZ8N6YiX-rTjOEVWdzuwI4/viewform', '_blank', 'location=yes');
        }},
        {text: 'YOUTUBE', btnClass: 'button-home', callback: function(){
                window.open('https://www.youtube.com/watch?v=P4-Z4H8ZnG0', '_blank', 'location=yes');
            }}]);
};

/**
 * about game dialog
 */
HuungryUI.showAboutDialog = function(gameObj) {        
    HuungryUI.showDialog('ABOUT HUUNGREE', 
        'Huungree is an RPG created by ZENVA (@ZenvaTweets). We have free and premium online courses to learn how to make apps and games. If you\'d like to get FREE access to more levels LET US KNOW using the link below or Twitter. <br/><br/><span tyle="font-weight:bold;">Soundtrack (CC) by Spiritualmatrix</span>.'
        ,[
        {text: 'BACK', btnClass: 'button-home', callback: HuungryUI.hideDialog}, 
        {text: 'REACH US', btnClass: 'button-home', callback: function(){            
            window.open('https://docs.google.com/forms/d/1AOxTjtV_EmQHugx67t34WlZ8N6YiX-rTjOEVWdzuwI4/viewform', '_blank', 'location=yes');
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
            $('button[data-role="action-btn-'+i+'"]').unbind('click ');
            $('button[data-role="action-btn-'+i+'"]').bind('click ', function(e) {
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
        //$('.zva_dialog').css('transform-origin-y', '0px');
        $('.zva_dialog').css('transform-origin', 'top');
    }
    else {
        //$('.zva_dialog').css('transform-origin-x', '0px');
        $('.zva_dialog').css('transform-origin', 'left');
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

    $('.unit-cell').on('click ', function(e){
        e.preventDefault();
        e.stopPropagation();
        var newIndex = $(this).attr('data-index');
        if(HuungryUI.selectedUnit) {
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('background-color', 'transparent');
            $('[data-index="'+HuungryUI.selectedUnit+'"]').css('opacity', '1');
            if(HuungryUI.selectedUnit != newIndex) {
                var firstType = HuungryUI.gameObj.player.units[HuungryUI.selectedUnit].id;
                var secondType = HuungryUI.gameObj.player.units[newIndex].id;
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
    
    $('.item-cell').on('click ', function(e){
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
    
    $('.item-cell').on('click ', function(e){
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
        unit = HuungryUI.gameObj.unitTypes[shop.data.units[i].id];
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
    $('.shop-unit-cell').on('click ', function(e){
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
                    HuungryUI.gameObj.stopSound();
                    HuungryUI.hideDialog();
                }
            }}]);
    }    
}

/**
 * go premium dialog
 */
HuungryUI.showGoPremiumDialog = function(gameObj) {
    HuungryUI.gameObj.saveGame(false);    
    HuungryUI.showDialog('END OF THE FREE VERSION', 
        'You can\'t continue exploring the exciting continent of Tamaca unless you buy the developer a rum & coke ;)<br/><br/> \
        Use the link below to get the Premium version and get access to hours of gameplay, all the way to the mysterious city of Huungree.'
        ,[{text: 'GO PREMIUM', btnClass: 'button-home', callback: function(){
            window.open('https://play.google.com/store/apps/details?id=com.zenva.huungreefull', '_blank', 'location=yes');
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

    $('.unit-cell').on('click ', function(e){
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