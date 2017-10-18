var MAX_CHARACTERS = 140;

$(document).ready(function() {
    $(".new-tweet textarea").on("keyup", function(event) {
        var contentLength = $(this).val().length;
        var charsRemaining = MAX_CHARACTERS - contentLength;

        var span = $(this).parent().find(".counter");

        span.text(charsRemaining);
        
        if(charsRemaining < 0) {
            span.addClass('error');
        } else {
            span.removeClass('error');
        }
    });
});