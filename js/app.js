//grab URLs of high-quality thumbnails from each video returned
function showResults(results) {
    var html = "";
    $.each(results, function(index, value){
        var theVideoIdenti = value.id.videoID;
        var thumbnailURL = value.snippet.thumbnails.high.url;
        console.log(thumbnailURL);
        console.log(theVideoIdenti);
        alert(theVideoIdenti);
        html += "<img src=\'" + thumbnailURL + "\'>";
    });
    $("#search-results").html(html);
}

//get JSON from the YouTube API based on user search term
function getRequest(searchTerm) {
    var params = {
        part: 'snippet',
        key: "AIzaSyAekQLJN8I67yPvq_8hFZ68nfGlUE2lPSM",
        q: searchTerm,
        order: 'viewCount'
    };
    url = 'https://www.googleapis.com/youtube/v3/search';
    
    $.getJSON(url, params, function(data){
      var userResults = data.items;
      showResults(userResults);
      console.log(userResults);
    });
}

$(function(){
    //asks for user search term(s)
    $("#search-term").submit(function(event) {
        event.preventDefault();
        var myQuery = $("#query").val();
        getRequest(myQuery);
    });
})



//Display thumbnail image of returned videos

//Optional advanced:
//Make the images clickable, leading the user to the YouTube video, on YouTube
//Make the images clickable, playing them in a lightbox
//Show a link for more from the channel that each video came from
//Show buttons to get more results (using the previous and next page links from the JSON)

