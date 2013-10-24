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
    $('.zva_dialog_leveldesc_txt').html('<h2>The Journey is not Complete</h2><br/><p>We are working on adding more levels and content to the game. If you like the game and want more LET ME KNOW!! @ZenvaTweets</p>')
    
    $('.zva_dialog_btn').bind('click', function(e) {
        location.reload();
    });
};