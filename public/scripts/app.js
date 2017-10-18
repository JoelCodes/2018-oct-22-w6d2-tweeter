/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
    $(".tweet-area").on("mouseenter", function() {
        $(".tweet-footer > span").removeClass("hidden");
    });
    $(".tweet-area").on("mouseleave", function() {
        $(".tweet-footer > span").addClass("hidden");
    });
});