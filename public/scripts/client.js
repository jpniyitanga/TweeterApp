/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// const tweetData123 = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

const createTweetElement = (tweetData) => {
  const $tweet = $('<article>').addClass('tweet');
  const html = (`
    <header>               
      <div>${tweetData.user.avatars}<span>${tweetData.user.name}</span> </div>              
      <div class="handle">${tweetData.user.handle}</div>            
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <div>${tweetData.created_at}</div>
      <div class="icons">
        <span class="flag"> <a href="#"><i class="fa-solid fa-flag"></i></a></i></span> &nbsp;
        <span class="retweet"> <a href="#"><i class="fa-solid fa-retweet"></i></a> </span> &nbsp;
        <span class="like"> <a href="#"><i class="fa-solid fa-heart"></i></a></span>
      </div>
    </footer>
  `);
  const tweetElement = $tweet.append(html);
  return tweetElement;
}
// console.log(createTweetElement(tweetData123));

const renderTweets = (tweets) => {
  let tweetContainer = $('.tweets');
 for (const tweet of tweets) {
   let tweetElement = createTweetElement(tweet);
  tweetContainer.append(tweetElement);
 }
}


$(document).ready(function () {
  console.log("ready")
  const $form = $("form");
  $form.submit(function(e) {
    e.preventDefault();
  
    const $formData = $("textarea").serialize();
    $.post('/tweets', $formData, function(response) {
      console.log("response", response);
    })
  
  })
});