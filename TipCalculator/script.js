/*
    These id and their function
    billamt: to get the first input
    serviceQual: to get the second input
    peopleamt: to get the third input
    each: to show tip amount for people >= 2
    tip: to calculate
    totalTip(of div)
*/

function calculatorTip() {
    var billamt = document.getElementById("billamt").value;
    var serviceQual = document.getElementById("serviceQual").value;
    var peopleamt = document.getElementById("peopleamt").value;
    // check the input to make sure it's not empty
    if (billamt === "" || serviceQual == 0) {
        alert("Please enter values!");
        return;
    }

    if (peopleamt === "" || peopleamt <= 1) {
        // if num of people <=1, it doesn't need to show tip of "each"
        peopleamt = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    // calculate tip
    var total = (billamt * serviceQual) / peopleamt;
    total = Math.round(total * 100) / 100; // round to two decimal places
    total = total.toFixed(2); // always have two digits after decimal point
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total; // set and print for id=tip

}

// We always hide the totalTip and each in the beginning cuz we cant define the
// when condition is right,we will "show" them

document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

document.getElementById("calculate").onclick = function() {
    calculatorTip();
};