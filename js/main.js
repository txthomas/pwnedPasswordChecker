var hash;
var requestHashDigits;
var restHashDigits;

var requestPending = false;
var doRequest = false;

$(document).ready(function() {

    $('#request-spinner').hide();

    $('#message').keyup(function() {
        updateHashValue($('#message').val());
    });

    function updateHashValue(message) {
        hash = sha1(message).toUpperCase();
        requestHashDigits = hash.substr(0, 5);
        restHashDigits = hash.substr(5);

        $('#result').val(hash);

        console.log("updateHashValue() - requestPending:" + requestPending);
        if (requestPending == true) {
            doRequest = true;
        } else {
            performeRequest();
        }
    }

    function performeRequest() {
        requestPending = true;
        $('#request-spinner').show();

        var url = 'https://api.pwnedpasswords.com/range/' + requestHashDigits;

        console.log("performeRequest() - " + url);

        $.ajax({
            url: url,
            error: function() {
                requestPending = false;
            },
            success: function(data) {
                processPwnedResponse(data);
            },
            type: 'GET'
        });
    }

    function processPwnedResponse(data) {

        var responseLines = data.split('\n');

        $('#pwnedResult').val('');
        for(var i = 0; i < responseLines.length; i++){

            var testResult = responseLines[i].split(':', 2);

            if (testResult[0] == restHashDigits) {
                $('#pwnedResult').val("found " + hash + " with " + testResult[1].trim() + " matches");
            }
        }

        requestPending = false;
        $('#request-spinner').hide();

        if (doRequest) {
            doRequest = false;
            performeRequest();
        }
    }
});