
// Client-side JS logic
$(function() {

    // Function to attach a collection of tweet objects to the page
    function renderTweets(tweets) {
        tweets.forEach(function(tweet) {
            $(".tweet-area").prepend(createTweetElement(tweet));
        });
    }

    // Function to load the current list of tweets
    function loadTweets() {

        // AJAX allows for GET request without leaving the page
        $.ajax({
            method: "GET",
            url: "/tweets"
        }).done(function(tweets) {

            // Clear current list before populating page to prevent duplicates
            $(".tweet-area").empty();
            renderTweets(tweets);
        });
    }

    // Function to build the "X seconds/minutes/etc. ago" statement (appears at the bottom of each tweet)
    function howLongAgo(timestamp) {
        var now = Date.now();

        // Calculate seconds first
        var value = Math.floor((now - timestamp) / 1000);
        var timeUnit = " seconds";

        // Check whether the unit of time should be anything larger than seconds
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

    // Function to build an HTML string for a supplied tweet
    function createTweetElement(tweetData) {

        // Tweet icon spans (Like/Favourite, Retweet, Flag)
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

    // Load tweets initially when the page is ready
    loadTweets();

    // Toggle "Compose Tweet" area when nav-bar button ("Compose") is pressed
    $("#nav-bar button").on("click", function() {
        var newTweet = $(".new-tweet");
        newTweet.slideToggle(400, function() {

            // Put cursor in the textarea if the compose tweet area is being opened
            if(newTweet.height() > 0) {
                $(".new-tweet textarea").focus();
            }    
        });
    });

    // Submit a new tweet to be saved to the database when the "Tweet" button (found in the "Compose Tweet" area) is pressed
    $(".new-tweet form").on("submit", function(event) {

        // Stop post request from taking user away from the current page
        event.preventDefault();
        var tweetValue = $(".new-tweet textarea").val();

        // Check for invalid input before making POST request
        if(!tweetValue) {
            $.notify("Unable to save tweet: Tweets must be greater than 0 characters long");
        } else if(tweetValue.length > MAX_CHARACTERS) {
            $.notify("Unable to save tweet: Tweets cannot be more than " + MAX_CHARACTERS + " characters long");
        } else {

            // AJAX allows for POST request without leaving the page
            $.ajax({
                method: "POST",
                url: "/tweets",
                data: $(this).serialize()
            }).done(function() {

                // Clear "Compose Tweet" area and reload the list of tweets (now including the new tweet) after successful submission
                $(".new-tweet form")[0].reset();
                $(".counter").text(MAX_CHARACTERS);
                loadTweets();
            });
        }
    });
});
