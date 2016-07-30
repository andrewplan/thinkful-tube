var myQuery;
var nextPageToken;
var prevPageToken;

//grab URLs of high-quality thumbnails from each video returned
function showResults(results) {
    var html = "";
    var html2 = "";
    $.each(results, function(index, value){
        var theVideoIDcurrent = value.id.videoId;
        var thumbnailURLcurrent = value.snippet.thumbnails.high.url;
        console.log(thumbnailURLcurrent);
        console.log(theVideoIDcurrent);
        
        //Display thumbnail image of returned videos + Make the images clickable, leading the user to the YouTube video, on YouTube
        html += /* "<a href=\'https://www.youtube.com/watch?v=" + theVideoIDcurrent +"\'>" + */ "<img src=\'" + thumbnailURLcurrent + "\' value=\'" + theVideoIDcurrent + "\' onclick=\'javascript:startLightBox()\'\>";
    });
    $("#search-results").html(html);
    
}

//code to add lightbox that will display YouTube player
function startLightBox() {
    $('img').click(function(event){
        
        //grab videoID of video
        var theVideoIDcurrent = $(this).attr('value');
        console.log(theVideoIDcurrent);
        
        //cue up lightbox container and background
        var lbBg = document.getElementById("lightBoxBg");
        var lb = document.getElementById("lightBox");
        lbBg.style.display = "block";
        lb.style.display = "block";
        
        //add YouTube player code to lightbox so it will display
        var html2 = "";
        html2 += "<iframe width=\'640\' height=\'360\' src=\'https://www.youtube.com/embed/" + theVideoIDcurrent + "?rel=0\'" + " frameborder=\'0\' allowfullscreen></iframe>"
        $("#lightBox").html(html2);
    });
}

function dismiss() {
    var lbBg = document.getElementById("lightBoxBg");
    var lb = document.getElementById("lightBox");
    
    //hide lightbox and lightbox background
    lbBg.style.display = "none";
    lb.style.display = "none";
    
    //upon clicking outside of lightbox, remove YouTube player code to stop video playback
    $("#lightBox").html("");
}

//get JSON from the YouTube API based on user search term
function getRequest(searchTerm, userPageToken) {
    var params = {
        part: 'snippet, id', 
        key: "AIzaSyAekQLJN8I67yPvq_8hFZ68nfGlUE2lPSM",
        q: searchTerm,
        order: 'viewCount',
        maxResults: 6,
        pageToken: userPageToken
    };
    url = 'https://www.googleapis.com/youtube/v3/search';
    
    //grabs array of search results and passes it to variable userResults
    $.getJSON(url, params, function(data){
      var data = data;
      var userResults = data.items;
      nextPageToken = data.nextPageToken;
        
      if ("prevPageToken" in data) {
          prevPageToken = data.prevPageToken;
      }
      else {
          prevPageToken = "";
          $("#previous-songs").hide();
      }
      
      $("#more-songs").show();    
      showResults(userResults);
      console.log(data);
    });
}

$(function(){
    //asks for user search input
    $("#search-term").submit(function(event) {
        event.preventDefault();
        myQuery = '\"' + $("#query").val() + '\"';
        getRequest(myQuery);
        console.log(myQuery);
        //$("#query").val("");
        
    });
    //Show button to get more results (using the next page links from the JSON)
    $("#more-songs").submit(function(event) {
        event.preventDefault();
        getRequest(myQuery, nextPageToken);
        $("#previous-songs").show();
    });
    
    //Show button to show previous results (using the previous page links from the JSON)
    $("#previous-songs").submit(function(event) {
        event.preventDefault();
        getRequest(myQuery, prevPageToken);
        if (prevPageToken === "") {
            $("#previous-songs").hide();
        }
    });
})

//Optional advanced:
//Show a link for more from the channel that each video came from


