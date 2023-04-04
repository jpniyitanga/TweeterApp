/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#error").hide(); //Hides error message when page loads
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Set structure of the tweet element
  const createTweetElement = (tweetData) => {
    const html = `
      <article>
      <div class="tweets">
        <header>               
          <div><img src="${tweetData.user.avatars}" alt=""> <span>${
      tweetData.user.name
    }</span> </div>              
          <div class="handle">${tweetData.user.handle}</div>            
        </header>
        <p class="text">${escape(tweetData.content.text)}</p>
        <footer>
        <div>${timeago.format(tweetData.created_at)}</div>
        <div class="icons">
          <span class="flag"> <a href="#"><i class="fa-solid fa-flag"></i></a></i></span> &nbsp;
          <span class="retweet"> <a href="#"><i class="fa-solid fa-retweet"></i></a> </span> &nbsp;
          <span class="like"> <a href="#"><i class="fa-solid fa-heart"></i></a></span>
        </div>
        </footer>
      </div>    
    </article>
    `;

    return html;
  };

  //
  const renderTweets = (tweets) => {
    const tweetContainer = $(".tweets-container").empty(); //  Make tweet form empty by default
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement);
    }
  };
  //Show tweet on page
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      dataType: "json",
    })
      .then((data) => {
        renderTweets(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Listen for submit event
  $("form").submit(function (e) {
    $("#error").hide();
    e.preventDefault(); // prevent page from making another http request upon submit event

    // Handle errors in case of empty tweet or long tweet
    const errorElement = $("#error");
    const contentLength = $("#tweet-text").val().length;
    if (contentLength <= 0) {
      $("#error").slideDown().text("⚠️ Empty tweet not allowed! ⚠️");
      return;
    }
    if (contentLength > 140) {
      $("#error").slideDown().text("⚠️ Your tweet is too long. ⚠️");
      return;
    }

    const $formData = $("textarea").serialize(); // serialize form data

    // submit tweet to the server and handle both success and failure cases
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $formData,
    })
      .then((result) => {
        console.log("Success");
        loadTweets();
        $("textarea").val(""); // resets the form back to an empty form
        $("#char-counter").val(140); // resets the counter
      })
      .catch((error) => {
        console.log(error);
      });
  });

  loadTweets();
});
