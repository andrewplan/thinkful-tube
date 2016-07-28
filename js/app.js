function showResults(results) {
    var html = "";
    $.each(results, function(index, value){
        html += "<p>" + value.Title + "</p>";
        console.log(value.Title);
    });
    $("#search-results").html(html);
}

//get JSON from the YouTube API based on user search term
function getRequest(searchTerm) {
    var params = {
        s: searchTerm,
        r: 'json'
    };
    url = 'http://www.omdbapi.com';
    
    $.getJSON(url, params, function(data){
      showResults(data.Search);
    });
    /* $.getJSON("http://www.omdbapi.com/?s=" + searchTerm + "&r=json", function (data) {
      showResults(data.Search);
    }); */
}

$(function(){
    //asks for user search term
    $("#search-term").submit(function(event) {
        event.preventDefault();
        var myquery = $("#query").val();
        getRequest(myquery);
    });
})



//Display thumbnail image of returned videos

//Optional advanced:
//Make the images clickable, leading the user to the YouTube video, on YouTube
//Make the images clickable, playing them in a lightbox
//Show a link for more from the channel that each video came from
//Show buttons to get more results (using the previous and next page links from the JSON)

