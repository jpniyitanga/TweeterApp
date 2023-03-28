/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

  const createTweetElement = (tweetData) => {
    const html = `
      <article>
      <div class="tweets">
        <header>               
          <div><img src="${tweetData.user.avatars}" alt=""> <span>${tweetData.user.name}</span> </div>              
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

  const renderTweets = (tweets) => {
    const tweetContainer = $(".tweets-container");
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement);
    }
  };

  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      },
    });
  };

  $("form").submit(function (e) {
    e.preventDefault();    
    const contentLength = $("#tweet-text").val().length;    
    if (contentLength <= 0 ) {
      alert("Empty tweet not allowed!");      
    }
    if (contentLength > 140) {
      alert("Your tweet is too long.")
      return;
    }

    

    const $formData = $("textarea").serialize();
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $formData,
      success: function () {
        console.log("Success");
        loadTweets();
      },
    });
  });

  loadTweets()
});

