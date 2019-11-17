// variables


// event listener
eventListener();
function eventListener(){
    document.getElementById('form').addEventListener('submit',newTweet);
    document.addEventListener('DOMContentLoaded', displayTweet);
    document.addEventListener('click',deleteTweet);
}

// functions
function newTweet(){
    var tweet = document.getElementById('tweet').value;

    if(tweet){
        var li = document.createElement('li');
        li.textContent = tweet;
        var del = document.createElement('a');
        del.textContent = 'X';
        del.classList.add('remove-tweet');
        li.appendChild(del);
        document.getElementById('tweet-list').appendChild(li);

        setLocalTweet(tweet);
    }else{
        alert('Please write a tweet !!!');
    }
}
function setLocalTweet(tweet){
    var tweets;
    tweets = getLocalTweet();
    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getLocalTweet(){
    var tweets;
    tweets = JSON.parse(localStorage.getItem('tweets'));
    if(tweets === null){
        tweets = [];
    }
    return tweets;
}

function displayTweet(){
    tweets = getLocalTweet();
    tweets.forEach(function(tweet){
        var li = document.createElement('li');
        li.textContent = tweet;
        var del = document.createElement('a');
        del.textContent = 'X';
        del.classList.add('remove-tweet');
        li.appendChild(del);
        document.getElementById('tweet-list').appendChild(li);
    });
}

function deleteTweet(e){
    if(e.target.classList.contains('remove-tweet')){
        var item = e.target.parentElement.textContent.slice(0,-1);
        e.target.parentElement.remove();

        var tweets = getLocalTweet();

        tweets.forEach(function(tweet, index){
            if(item === tweet){
                console.log(item);
                tweets.splice(index,1);
            }
        });
        localStorage.setItem('tweets',JSON.stringify(tweets));
    }
}