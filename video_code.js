$(document).ready(function() {
    $.ajax({
        url: "http://api.brightcove.com/services/library?command=search_videos&all=display_name:"+(YOUR PRODUCT SEARCH NAME EX. NIKE SHOES).match(/^([\w\-]+)/)[0]+"&video_fields=name,shortDescription,FLVURL,videoStillURL&media_delivery=http&page_size=3&get_item_count=true&sort_by=MODIFIED_DATE:DESC&token=(YOUR BRIGHTCOVE API READ/WRITE TOKEN)&any=product:"+(YOUR PRODUCT CODE NUMBER),
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data) { 
            if (data.items.length > 0) {
                console.log(data);             
                $(YOUR VIDEO CONTAINER).append("<video controls id='video_player'><source type='video/mp4' id='player_src' src='"+data.items[0]["FLVURL"]+"'></video>");
                $.each(data.items, function(index, value){
                    $(WHERE YOU WANT YOUR THUMBNAIL TO APPEAR).append("<div><image class='video_thumbnail' data-url='"+ data.items[index]["FLVURL"] +"' src='"+value["videoStillURL"]+"'></div>");
                });
            }else {
                console.log("No Video");
            }
        },
        error: function() {
           console.log("Error");
        }
    });

    $(WHERE YOU WANT YOUR THUMBNAIL TO APPEAR).on( "click", '.video_thumbnail', function() {
        var playerContainer = $('#video_player_container')
        var currentVideo = $(this).attr('data-url');
        playerContainer.html("<video autoplay='autoplay' controls id='video_player'><source type='video/mp4' id='player_src' src='"+currentVideo+"'></video>");
        playerContainer.get(0).play();       
    });
});
