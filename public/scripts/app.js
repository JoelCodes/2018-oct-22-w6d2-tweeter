/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
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
    
    var allTweets = $(data);

    function renderTweets(tweets) {
        tweets.forEach(function(tweet) {
            $(".tweet-area").prepend(createTweetElement(tweet));
        });
    }

    function loadTweets() {
        $.ajax({
            method: "GET",
            url: "/tweets"
        }).done(function(tweets) {
            $(".tweet-area").empty();
            renderTweets(tweets);
        });
    }
    
    function createTweetElement(tweetData) {
        return $tweet = $("<article>", {
            'class': "tweet-container",
            html: [
                $("<header>", {
                    html: [
                        $("<img/>", {
                            src: tweetData.user.avatars.large
                        }),
                        $("<h2>", {
                            text: tweetData.user.name
                        }),
                        $("<p>", {
                            text: tweetData.user.handle
                        })
                    ]
                }),
                $("<content>", {
                    html: [
                        $("<p>", {
                            text: tweetData.content.text
                        })
                    ]
                }),
                $("<footer>", {
                    html: [
                        $("<span>", {
                            'class': "hidden",
                            text: 1
                        }),
                        $("<span>", {
                            'class': "hidden",
                            text: 2
                        }),
                        $("<span>", {
                            'class': "hidden",
                            text: 3
                        }),
                        $("<footer>", {
                            text: tweetData.created_at
                        })
                    ]
                })
            ]
        });
    }

    loadTweets();
    $(".container").on("mouseenter", ".tweet-container", function() {
        $(this).find("span").removeClass("hidden");
    });
    $(".container").on("mouseleave", ".tweet-container", function() {
        $(this).find("span").addClass("hidden");
    });
    $(".new-tweet form").on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "/tweets",
            data: $(this).serialize()
        }).done(function() {
            $(".new-tweet form")[0].reset();
            $(".counter").text(140);
            loadTweets();
        });
    });
});
