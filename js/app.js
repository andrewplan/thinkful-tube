var myQuery;
var nextPageToken;
var prevPageToken;

//grab URLs of high-quality thumbnails from each video returned
function showResults(results) {
    var html = "";
    $.each(results, function(index, value){
        var theVideoID = value.id.videoId;
        var thumbnailURL = value.snippet.thumbnails.high.url;
        console.log(thumbnailURL);
        console.log(theVideoID);
        //Display thumbnail image of returned videos + Make the images clickable, leading the user to the YouTube video, on YouTube
        html += "<a href=\'https://www.youtube.com/watch?v=" + theVideoID +"\'>" + "<img src=\'" + thumbnailURL + "\'></a>";
    });
    $("#search-results").html(html);
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
    });
    //Show buttons to get more results (using the previous and next page links from the JSON)
    $("#more-songs").submit(function(event) {
        event.preventDefault();
        getRequest(myQuery, nextPageToken);
        $("#previous-songs").show();
    });
    $("#previous-songs").submit(function(event) {
        event.preventDefault();
        getRequest(myQuery, prevPageToken);
        if (prevPageToken === "") {
            
        }
    });
})

//Optional advanced:
//Make the images clickable, playing them in a lightbox
//Show a link for more from the channel that each video came from


