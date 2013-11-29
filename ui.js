var HuungryUI = HuungryUI || new Object();

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
    
    $('.zva_dialog_levelsel_listcont ul li').on('click touchstart', function(e) {
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
    
    $('.zva_dialog_btn').bind('click', function(e) {
        $('.zva_dialog_leveldesc').css('display', 'none');
        gameObj.runLevel(level.codeName);
    });
};

/**
 * end of game dialog
 */
HuungryUI.showEndofGameDialog = function(gameObj) {    
    $('.zva_dialog_leveldesc').css('display', 'block');
    $('.zva_dialog_leveldesc_txt').html('The Journey is not Complete<br/>We are working on adding more levels and content to the game. If you like the game and want more LET ME KNOW!! @ZenvaTweets')
    
    $('.zva_dialog_btn').on('click touchstart', function(e) {
        location.reload();
    });
};

/**
 * about game dialog
 */
HuungryUI.showAboutDialog = function(gameObj) {        
    HuungryUI.showDialog('ABOUT HUUNGREE', 
        'Huungree is an RPG created by ZENVA. We have free and premium online courses to learn how to make apps and games.</br></br>More levels and content are being cooked. If you like this game LET US KNOW!'
        ,[{text: 'BACK', class: 'button-home', callback: HuungryUI.hideDialog}, {text: 'REACH US', class: 'button-home', callback: function(){console.log('visit www.zenva.com');}}]);
};

/**
* show dialog
*/
HuungryUI.showDialog = function(headerHtml, bodyHtml, actions, help) {
    HuungryUI.gameObj.director.setPaused(true);
    var height = $(window).height();
    $('.lime-director').css('top', height);
    $('.zva_dialog').css('display', 'block');
    $('.zva_dialog_header').html(headerHtml);
    $('.zva_dialog_body').html(bodyHtml);
    $('.zva_dialog_help').html(help || '')
    var i;
    for(i = 0; i < actions.length; i++) {
        (function(i) {
            $('.zva_dialog_actions').append('<button data-role="action-btn-'+i+'" class="'+actions[i].class+'" ">'+actions[i].text+'</button>');
            $('button[data-role="action-btn-'+i+'"]').unbind('touchstart click');
            $('button[data-role="action-btn-'+i+'"]').bind('touchstart click', function(e) {
                e.preventDefault();
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
    $('.lime-director').css('top', 0);
    $('.zva_dialog').css('display', 'none');  
    $('.zva_dialog_header').empty(); 
    $('.zva_dialog_body').empty(); 
    $('.zva_dialog_actions').empty(); 
}

/**
* preparte dialog size to fit screen
*/
HuungryUI.prepareDialog = function(gameObj) {
    HuungryUI.gameObj = gameObj;    
    var gameRatio = gameObj.screenWidth/gameObj.screenHeight;
    var height = $(window).height();
    var width = $(window).width();
    var winRatio = width/height;        
    var ratio = gameRatio < winRatio ? height/HuungryUI.gameObj.screenHeight : width/HuungryUI.gameObj.screenWidth;
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
    HuungryUI.hideDialog();
    var html = '<div style="clear:both;height:62px;">';
    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="unit-cell">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /> \
                    <div class="unit-name">' + HuungryUI.gameObj.player.units[i].name+'</div>'+ 
                    '<img width="10" src="assets/images/items/' + (HuungryUI.gameObj.player.units[i].canShoot ? 'rangeattack-icon.png' : 'attack-icon.png') + '" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].attack+' '+ 
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].defense+'</div>';  
        
        if(i == 4) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    HuungryUI.showDialog('MY ARMY',html
        ,[{text: 'BACK', class: 'button-home', callback: HuungryUI.hideDialog},
        {text: 'MERGE UNITS', class: 'button-home', callback: HuungryUI.showArrangeUnitsWindow}]);
}
/**
show arrange units window
*/
HuungryUI.showArrangeUnitsWindow = function() {
    HuungryUI.hideDialog();
    var html = '<div style="clear:both;height:62px;">';
    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="unit-cell" data-index="'+i+'">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /> \
                    <div class="unit-name">' + HuungryUI.gameObj.player.units[i].name+'</div>'+ 
                    '<img width="10" src="assets/images/items/attack-icon.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].attack+' '+ 
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + HuungryUI.gameObj.player.units[i].defense+'</div>';  
        
        if(i == 4) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    var help = 'Touch two units of the same kind to combine.';
    HuungryUI.showDialog('MERGE UNITS',html
        ,[{text: 'BACK', class: 'button-home', callback: HuungryUI.showPlayerInfoWindow}], help);

    $('.unit-cell').on('click touchstart', function(e){
        e.preventDefault();
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
    HuungryUI.hideDialog();
    var html = '<div style="clear:both;height:62px;">';   
    var info; 
    for(var i=0; i< HuungryUI.gameObj.player.items.length; i++) {
        switch(HuungryUI.gameObj.player.items[i].type) {
            case 'ITEM.ATTACK-SPELL':
                info = "Use in battle to damage your enemies Damage: "+HuungryUI.gameObj.player.items[i].attack;
            break;            
        }

        html += '<div class="unit-cell" data-info="'+info+'">\
                <img src="assets/images/items/' + HuungryUI.gameObj.player.items[i].image+'" /> \
                <div class="unit-name">' + HuungryUI.gameObj.player.items[i].name+'</div>'+                 
                '</div>';  
        
        if(i == 4) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    var help = 'Touch items for info.';
    HuungryUI.showDialog('ITEMS',html
        ,[{text: 'BACK', class: 'button-home', callback: HuungryUI.hideDialog}], help);
    $('.unit-cell').on('click touchstart', function(e){
        e.preventDefault();
        $('.zva_dialog_help').html($(this).attr('data-info'));
    });
}
/**
show items info window
*/
HuungryUI.showBattleItemsWindow = function() {
    HuungryUI.hideDialog();
    var html = '<div style="clear:both;height:62px;">';   
    var info; 
    for(var i=0; i< HuungryUI.gameObj.player.items.length; i++) {
        switch(HuungryUI.gameObj.player.items[i].type) {
            case 'ITEM.ATTACK-SPELL':
                info = "Use in battle to damage your enemies. Damage: "+HuungryUI.gameObj.player.items[i].attack;
            break;            
        }

        html += '<div class="unit-cell" data-info="'+info+'" data-index="'+i+'">\
                <img src="assets/images/items/' + HuungryUI.gameObj.player.items[i].image+'" /> \
                <div class="unit-name">' + HuungryUI.gameObj.player.items[i].name+'</div>'+                 
                '</div>';  
        
        if(i == 4) {
            html += '</div><div style="clear:both; margin-top:10px;height:62px;">';
        }
    }
    html += '</div>';
    var help = 'Touch items for info and usage.';
    HuungryUI.showDialog('ITEMS',html
        ,[{text: 'BACK', class: 'button-home', callback: function() {
            HuungryUI.selectedItem = undefined;
            HuungryUI.hideDialog();
        }},
        {text: 'USE ITEM', class: 'button-hidden', callback: function() {
            if(HuungryUI.selectedItem) {
                HuungryUI.hideDialog();
                HuungryUI.gameObj.fightEngine.showItemTargets();
            }
        }}], help);
    
    $('.unit-cell').on('click touchstart', function(e){
        e.preventDefault();
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
    HuungryUI.hideDialog();
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
                    '<img width="10" src="assets/images/items/shield.png" style="display:inline;" />' + unit.defense+
                    '<div class="unit-left">'+shop.data.units[i].qty+' left</div></div>';                 
    }
    html += '</div></div>\
        <div class="shop-player-gold-coin"><img width="40" src="assets/images/backgrounds/gold.png" style="display:inline;" /></div>\
        <div class="shop-player-gold-number">'+HuungryUI.gameObj.player.gold+'</div>\
        <div class="shop-player-units"><div class="shop-player-title">Your Army</div>';

    for(var i=0; i< HuungryUI.gameObj.player.units.length; i++) {
        html += '<div class="shop-player-unit">\
                    <div class="unit-num">'+ Math.ceil(HuungryUI.gameObj.player.units[i].life)+'</div>'+
                    '<img src="assets/images/units/' + HuungryUI.gameObj.player.units[i].image+'" /></div>';
    }
    html += '</div>';
    var help = result === undefined ? 'Touch units to purchase' : result.msg;
    HuungryUI.showDialog(shop.data.name,html
        ,[{text: 'BACK', class: 'button-home', callback: HuungryUI.hideDialog}], help);
    $('.shop-unit-cell').on('click touchstart', function(e){
        e.preventDefault();        
        var index = $(this).attr('data-index');
        var result = shop.purchase(shop.data.units[index]);
        HuungryUI.showShopWindow(shop, result);
    });
}