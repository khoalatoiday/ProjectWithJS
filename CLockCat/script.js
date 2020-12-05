/* before we start, let consider all var and funcion
    in HTML tag, we have these id and their purpose:
    clock: to show current clock time( in AM and PM )
    lolcatImage: to show the first image
    timeEvent: to show the message of lolcatImage
    wakeUpTimeSelector,LunchTimeSelector,NapTimeSelector
    partyTimeButton: to listen and change

*/

var wakeUpTime = 7;
var lunchTime = 12;
var noon = 12;
var naptime = lunchTime + 2;
var partyTime; // check party over or not
var evening = 18;

var showCurrentTime = function() {
    var clock = document.getElementById('clock');
    var currentTime = new Date();

    var hours = currentTime.getHours();
    var mins = currentTime.getMinutes();
    var secs = currentTime.getSeconds();
    var meridian = "AM"; // to convert into the right form of time

    //Set hours
    if (hours >= noon) {
        meridian = "PM";
    }
    if (hours > noon) {
        hours = hours - 12;
    }

    //Set Minute
    if (mins < 10) {
        mins = "0" + mins;
    }
    //Set seconds
    if (secs < 10) {
        secs = "0" + secs;
    }

    var clockTime = hours + ':' + mins + ':' + secs + " " + meridian + "!";
    clock.innerText = clockTime; // set Text and print for id = clock
};

// Update Clock to change image and message

var updateClock = function() {
    var time = new Date().getHours();
    var messageText;
    var image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";

    var timeEventJS = document.getElementById("timeEvent");
    var lolcatImageJS = document.getElementById('lolcatImage');

    if (time == partyTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/partyTime.jpg";
        messageText = "Let Party!";
    } else if (time == wakeUpTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat1.jpg";
        messageText = "Wake Up!";
    } else if (time == lunchTime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat2.jpg";
        messageText = "Lunch Time!";
    } else if (time == naptime) {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/09/cat3.jpg";
        messageText = "Sleep tight!";
    } else if (time < noon) {
        image = "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg";
        messageText = "Good Morning!"
    } else if (time >= evening) {
        image = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cat_sleep.jpg";
        messageText = "Good Evening!";
    } else {
        image = "https://s3.amazonaws.com/media.skillcrush.com/skillcrush/wp-content/uploads/2016/08/normalTime.jpg";
        messageText = "Good afternoon!";
    }
    console.log(messageText);
    timeEventJS.innerText = messageText; // set and print messageText
    lolcatImage.src = image; // set and update image for lolcatImage id
    showCurrentTime();
};

updateClock(); // call function()
var partyButton = document.getElementById("partyTimeButton");
var partyEvent = function() {
    if (partyTime < 0) {
        partyTime = new Date().getHours();
        partyTimeButton.innerText = "Party Over!"; // set and print
        partyTimeButton.style.backgroundColor = "#0A8DAB";
    } else {
        partyTime = -1;
        partyTimeButton.innerText = "Party Time!";
        partyTimeButton.style.backgroundColor = "#222";
    }
};

partyButton.addEventListener("click", partyEvent); // listen
partyEvent(); // call function

// Activates Wake-Up selector
var wakeUpTimeSelector = document.getElementById("wakeUpTimeSelector");

var wakeUpEvent = function() {
    wakeUpTime = wakeUpTimeSelector.value;
};

wakeUpTimeSelector.addEventListener("change", wakeUpEvent);


// Activates Lunch selector
var lunchTimeSelector = document.getElementById("lunchTimeSelector");

var lunchEvent = function() {
    lunchTime = lunchTimeSelector.value;
};

lunchTimeSelector.addEventListener("change", lunchEvent);


// Activates Nap-Time selector
var napTimeSelector = document.getElementById("napTimeSelector");

var napEvent = function() {
    naptime = napTimeSelector.value;
};

napTimeSelector.addEventListener("change", napEvent);

var oneSeconds = 1000;
setInterval(updateClock, oneSeconds); // after 1000s then updateClock once time