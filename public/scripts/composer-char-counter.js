$(function() {

    // Update the character counter (displayed under each tweet) when input is detected on the textarea in the "Compose Tweet" area
    $(".new-tweet textarea").on("input", function(event) {
        var charsRemaining = MAX_CHARACTERS - $(this).val().length;
        var span = $(this).parent().find(".counter");
        span.text(charsRemaining);
        
        // Add "error" class to the character counter if the limit is exceeded
        if(charsRemaining < 0) {
            span.addClass('error');
        } else {
            span.removeClass('error');
        }
    });
});