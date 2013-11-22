var HuungryUI = new Object();

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
    
    $('.zva_dialog_levelsel_listcont ul li').bind('click', function(e) {
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
    
    $('.zva_dialog_btn').bind('click', function(e) {
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
HuungryUI.showDialog = function(headerHtml, bodyHtml, actions) {
    HuungryUI.gameObj.director.setPaused(true);
    var height = $(window).height();
    $('.lime-director').css('top', height);
    $('.zva_dialog').css('display', 'block');
    $('.zva_dialog_header').html(headerHtml);
    $('.zva_dialog_body').html(bodyHtml);
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