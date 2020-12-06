window.onload = function showTime() {
    var date = new Date();
    var hours = date.getHours();
    var mins = date.getMinutes();
    var secs = date.getSeconds();

    var session = "AM"

    if(hours == 0){
        hours = 12;
    }
    if(hours>12){
        hours = hours-12;
        session = "PM";
    }

    hours = (hours<10) ? "0" + hours: hours;
    mins = (mins<10) ? "0" + mins : mins;
    secs = (secs<10) ? "0" + secs : secs;

    var time = hours + ":" + mins + ":" + secs + " " + session;

    document.getElementById("clockDigital").innerText = time;
    document.getElementById("clockDigital").textContent = time;
    setInterval(showTime,1000); // SetTimeOut(showTime,1000);
}


