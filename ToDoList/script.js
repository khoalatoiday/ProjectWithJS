var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");

function inputLength(){
    return input.value.length;
}

function listLength(){
    return item.length;
}

function createListElement(){
    var li = document.createElement("li"); // create an element "li"
    li.appendChild(document.createTextNode(input.value)); // makes text from input field the li text
    ul.appendChild(li);// add li to ul
    input.value = ""; // reset text input field
    //START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
    function crossOut(){
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    // end strikethrough

    // start add delete button
    var dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    li.appendChild(dBtn);
    dBtn.addEventListener("click",deleteListItem);
    // end add delete button
    
    // add class delete(display: none)
    function deleteListItem(){
        li.classList.add("delete");
    }
    // end add class delete
}

function addListAfterClick(){
    if(inputLength() >0){ //makes sure that an empty input field doesn't create a li
        createListElement();
    }
}

function addListAfterKeypress(event){
    if(inputLength() >0 && event.which === 13)//this now looks to see if you hit "enter"/"return"
    createListElement();
}

enterButton.addEventListener("click",addListAfterClick);
input.addEventListener("keypress",addListAfterKeypress);