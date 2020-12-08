var input = document.getElementById('input');
var numbers = document.querySelectorAll('.number div'); // select all number button
var operators = document.querySelectorAll('.operator div'); // select all operator button
var result = document.getElementById('result');
var clear = document.getElementById('clear');

var resultDisplayed =false; // flag an eye on what output is displayed

// solve the input when we press the number
for(var i = 0; i<numbers.length;i++){
    numbers[i].addEventListener("click",function(e){
        // storing current input string and last character of input
        var currentInput = input.innerHTML;
        var lastChar = currentInput[currentInput.length-1];

        if(resultDisplayed === false){ // if before that result isn't displayed -> keep adding numbers
            input.innerHTML += e.target.innerHTML
        }else if(resultDisplayed === true && lastChar ==="+" || lastChar === "-"
        || lastChar === "x" || lastChar === "/"){
            resultDisplayed = false; // make result isn't displayed
            input.innerHTML += e.target.innerHTML; // add numbers
        }else{ // if result is displayed and we press a number then
            // have to clear input and make a new input
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// solve the input when we press operator
for(var i = 0; i<operators.length;i++){
    operators[i].addEventListener("click",function(e){
        var currentInput = input.innerHTML;
        var lastChar = currentInput[currentInput.length-1];
        // if last charatec is an operator, replace it with the current press one
        if(lastChar ==="+" || lastChar === "-"
        || lastChar === "x" || lastChar === "/"){
            var newString = currentInput.substring(0,currentInput.length-1) +e.target.innerHTML;
            input.innerHTML = newString;
        }else if(currentInput.length==0){ // if the first character is an operator then do noting
            
        }else{
            input.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener("click",function(){
    var inputString = input.innerHTML;
    // split input into numbers
    var numbers = inputString.split(/\+|\-|\x|\//g);
    // split input into operators
    var operators = inputString.replace(/[0-9]|\./g, "").split("");
    // divide first then mul then sub then add
    // we are looping through numbers and operators once a time and after each move we will alter the original number and operator
    // away and the final element remain will be the output
    var divide = operators.indexOf("/");
    while(divide != -1){
        numbers.splice(divide, 2, numbers[divide]/numbers[divide+1]); // remove two numbers and insert result
        operators.splice(divide,1); // remove divide operator
        divide= operators.indexOf("/");// next divide operator
    }

    var mul = operators.indexOf("x");
    while(mul != -1){
        numbers.splice(mul, 2, numbers[mul]*numbers[mul+1]); // remove two numbers and insert result
        operators.splice(mul,1); // remove mul operator
        mul=  operators.indexOf("x");// next mul operator
    }

    var sub = operators.indexOf("-");
    while(sub != -1){
        numbers.splice(sub, 2, numbers[sub]-numbers[sub+1]); // remove two numbers and insert result
        operators.splice(sub,1); // remove sub operator
        sub=  operators.indexOf("-");// next sub operator
    }

    var add = operators.indexOf("+");
    while(add != -1){
        numbers.splice(add, 2,parseFloat(numbers[add])+ parseFloat(numbers[add+1])); // remove two numbers and insert result
        operators.splice(add,1); // remove add operator
        add= operators.indexOf("+");// next add operator
    }

    input.innerHTML = numbers[0]; // the last element in numbers is output
    resultDisplayed =true;
});

clear.addEventListener("click",function(){
    input.innerHTML="";
})
