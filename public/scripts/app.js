var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
];

function renderTweets(tweets) {
    for(var tweet of tweets) {
        $(".tweet-area").append(createTweetElement(tweet));
    }
}

function createTweetElement(tweetData) {
    var $tweet = $("<article>").addClass("tweet-container");
    var $header = $("<header>");
    $header.append($("<img/>").attr("src", tweetData.user.avatars.large));
    $header.append($("<h2>").text(tweetData.user.name));
    $header.append($("<p>").text(tweetData.user.handle));
    $tweet.append($header);
    var $content = $("<content>");
    $content.append($("<p>").text(tweetData.content.text));
    $tweet.append($content);
    var $footer = $("<footer>");
    $footer.append($("<span>").addClass("hidden").text(1));
    $footer.append($("<span>").addClass("hidden").text(2));
    $footer.append($("<span>").addClass("hidden").text(3));
    $footer.append($("<p>").text(tweetData.created_at));
    $tweet.append($footer);
    return $tweet;
}

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
    renderTweets(data);
    $(".container").on("mouseenter", ".tweet-container", function() {
        $(this).find("span").removeClass("hidden");
    });
    $(".container").on("mouseleave", ".tweet-container", function() {
        $(this).find("span").addClass("hidden");
    });
    $(".tweet-area").on("click", function() {
        var $tweet = createTweetElement(tweetData);
        
        // Test / driver code (temporary)
        console.log($tweet); // to see what it looks like
        $('.tweet-area').append($tweet); // to put it on the page
    });
});
