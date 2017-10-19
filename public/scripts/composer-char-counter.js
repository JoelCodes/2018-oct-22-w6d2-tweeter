$(function() {
    $(".new-tweet textarea").on("input", function(event) {
        var charsRemaining = MAX_CHARACTERS - $(this).val().length;

        var span = $(this).parent().find(".counter");

        span.text(charsRemaining);
        
        if(charsRemaining < 0) {
            span.addClass('error');
        } else {
            span.removeClass('error');
        }
    });
});