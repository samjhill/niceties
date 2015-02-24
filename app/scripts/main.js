$( document ).ready(function() {
   //check for cookies
    var bgColor;
    var fontColor;
    if ( document.cookie ) { //they have cookies, let's load them
        var colors = document.cookie.split(';');
        bgColor = colors[0].split('=')[1];
        fontColor = colors[1].split('=')[1];
        
        console.log('bg: ' + bgColor);
        console.log('font: ' + fontColor);
    }
    else { //they don't have any colors set; let's give them some
        document.cookie="bgColor=#333333";
        document.cookie="fontColor=#FFFFFF";
        
        console.log(document.cookie);
    }
    
    //set up styles
    $('#compliment').css('color', fontColor);
    $('#about').css('color', fontColor);
    $(document.body).css('background', bgColor);
    
    //save button click
    $('#save-changes').on('click', function(){
        var bg = $('#color-picker-bg').css('background-color');
        var font = $('#color-picker-font').css('background-color');
        
        document.cookie="bgColor=" + bg;
        document.cookie="fontColor=" + font;
        
        //update colors
        $(document.body).css('background', bg);
        $('#compliment').css('color', font);
        $('#about').css('color', font);
    
        console.log('saved colors');
        console.log('bg: ' + bg);
        console.log('font: ' + font);
        
    });
});

