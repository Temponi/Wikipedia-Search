$(document).ready(function() {
    document.getElementById('barra').value = '';
});

$('#formS').on('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        api();
    }
});

$("#but").click(function() {
    api();
});

function api() {
    var x = document.getElementById("formS");
    var text = x[0].value;
    text = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + text + "&callback=JSON_CALLBACK";

    $.ajax({
        url: text,
        dataType: 'jsonp',
        type: 'GET',
        headers: {
            'Api-User-Agent': 'Example/1.0'
        },
        success: function(data) {
            if (data.hasOwnProperty("continue")) {
                var ids = Object.getOwnPropertyNames(data["query"]["pages"]);
                var a = "";
                for (var i = 0; i < ids.length; i++) {
                    var id = data["query"]["pages"][ids[i]]["pageid"];
                    var title = data["query"]["pages"][ids[i]]["title"];
                    var descrip = data["query"]["pages"][ids[i]]["extract"];
                    if (descrip.length > 200) {
                        descrip = descrip.slice(0, 250);
                        descrip += "[...]";
                    }

                    a += "<a href=\"https://en.wikipedia.org/w/index.php?title=Searching&curid=" + id + "\" target=\"_blank\"><div class=\"block\"><h3 class=\"af\"><strong>" + title + "</strong><br></h3><p class=\"if\">" + descrip + "</p></div></a>";

                }
                $("#insert").html(a);
            } else {
                $("#insert").html("<br><h1 class=\"text-center\"><strong>Nothing found</strong></h1>");

            }
        }
    });
}