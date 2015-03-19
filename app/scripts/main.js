$( document ).ready(function() {
   //check for cookies
    var bgColor;
    var fontColor;
    var showImages;
    
    if ( document.cookie ) { //they have preferences, let's load them
        var preferences = document.cookie.split(';');
        bgColor = preferences[0].split('=')[1];
        fontColor = preferences[1].split('=')[1];
        showImages = preferences[2].split('=')[1];
        
        console.log('bg: ' + bgColor);
        console.log('font: ' + fontColor);
        console.log('images: ' + showImages);
    }
    else { //they don't have any preferences set; let's give them some defaults
        document.cookie="bgColor=#333333";
        document.cookie="fontColor=#FFFFFF";
        document.cookie="showImages=true";
        
        console.log(document.cookie);
    }
    
    //set up styles
    $('#compliment').css('color', fontColor);
    $('#about').css('color', fontColor);
    $(document.body).css('background', bgColor);
    
    // Background image
    if (showImages == 'true') { //set in user preferences
        var albumData = getAlbum('jx90V');
        //make sure the preferences checkbox is checked
        $('#bg-image').prop('checked', true);
        
    }
    else { // just show a normal colored background
        $("body").fadeIn();
        //make sure the preferences checkbox is checked
        $('#bg-image').prop('checked', false);
        //show the bg color picker section
        $('#bg-color-section').css('display', 'block');
    }
    
    //share button click
    $('#share-button').on('click', function(){
        $('#social').slideToggle();
    });
    
    //save button click
    $('#save-changes').on('click', function(){
        var bg = $('#color-picker-bg').css('background-color');
        var font = $('#color-picker-font').css('background-color');
        
        document.cookie="bgColor=" + bg;
        document.cookie="fontColor=" + font;
        document.cookie="showImages=" + $('#bg-image').is(':checked');
        
        //update colors
        $(document.body).css('background', bg);
        $('#compliment').css('color', font);
        $('#about').css('color', font);
    
        console.log('saved preferences');
        console.log('bg: ' + bg);
        console.log('font: ' + font);
        console.log('showImages: ' + $('#bg-image').is(':checked'));
        
        //reload the page
        location.reload();
    });
    
    //background image checkbox click
    $('#bg-image').on('click', function() {
        $('#bg-color-section').slideToggle();
    });
    
    //external link click
    //$('.ext_link').on('click', function() {
    //    window.open($(this)[0].href);
    //});
    
    /*
     * Get images from Imgur
     */
    function getAlbum( albumID ) {
    var albumAPI = "https://api.imgur.com/3/album/" + albumID + "/images";
    
      $.ajax({
          url: albumAPI,
          headers:{
              'Authorization':'Client-ID fd11711635fd4e2'
          },
          type: 'GET',
          dataType: 'json',
          success: function(data) { 
    
              //return(data);
              var image = data.data[Math.floor(Math.random()*data.data.length)];
              
              var bgimage = new Image();  
              bgimage.src=image.link;
              
              $(bgimage).load(function(){
                    $("body").css("background","url('"+ $(bgimage).attr('src') +"') no-repeat center center fixed");
                    $(document.body).css('background-size', '100%');
                    $("body").fadeIn();
              });
                
              //$(document.body).css('background', "url('" + image.link + "')  no-repeat center center fixed");
    
          },
          error: function() { console.log("ERROR"); }
      });
    }
});

