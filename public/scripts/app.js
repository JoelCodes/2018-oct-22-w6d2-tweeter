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

    function renderTweets(tweets) {
        console.log(tweets);
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

    function howLongAgo(timestamp) {
        var now = Date.now();
        var value = Math.floor((now - timestamp) / 1000);
        var timeUnit = " seconds";
        switch(true) {
            case value > 3.154e+7:
            value = Math.floor(value / 60 / 60 / 24 / 365);
            timeUnit = value > 1 ? " years" : " year";
            break;
            case value > 86400:
            value = Math.floor(value / 60 / 60 / 24);
            timeUnit = " days";
            break;
            case value > 3600:
            value = Math.floor(value / 60 / 60);
            timeUnit = " hours";
            break;
            case value > 60:
            value = Math.floor(value / 60);
            timeUnit = " minutes";
            break;
        }
        return value + timeUnit + " ago";
    }

    function createTweetElement(tweetData) {

        var $icons = [HEART, RETWEET, FLAG].map(function(icon) {
            return $("<span>", {
                class: 'icon',
                html: icon
            });
        });

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
                    html: $icons.concat(
                        $("<span>", {
                            text: howLongAgo(tweetData.created_at)
                        })
                    )
                })
            ]
        });
    }

    loadTweets();
    $("#nav-bar button").on("click", function() {
        var newTweet = $(".new-tweet");
        newTweet.slideToggle(400, function() {
            if(newTweet.height() > 0) {
                $(".new-tweet textarea").focus();
            }    
        });
    });
    $(".new-tweet form").on("submit", function(event) {
        event.preventDefault();
        var tweetValue = $(".new-tweet textarea").val();
        if(!tweetValue) {
            $.notify("Unable to save tweet: Tweets must be greater than 0 characters long");
        } else if(tweetValue.length > MAX_CHARACTERS) {
            $.notify("Unable to save tweet: Tweets cannot be more than " + MAX_CHARACTERS + " characters long");
        } else {
            $.ajax({
                method: "POST",
                url: "/tweets",
                data: $(this).serialize()
            }).done(function() {
                $(".new-tweet form")[0].reset();
                $(".counter").text(MAX_CHARACTERS);
                loadTweets();
            });
        }
    });
});
