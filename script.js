let btnValue; //stores input value for the current active button
var modalOn = false; //boolean for whether the "random" button output modal is visible

function createButtons() { //create 100 buttons with corresponding input values
    for (let i = 0; i < 100; i++) {
        var btn = document.createElement("button");
        btn.innerHTML = [i];
        btn.onclick = function () { logBtnValue(this.value); }
        document.getElementById("button-wrapper").appendChild(btn).setAttribute("value", [i]);
    }
}

function createRandBtn() { //create the "random" button
    var randBtn = document.createElement("button");
    randBtn.innerHTML = "new";
    randBtn.setAttribute("class", "wideBtn")
    randBtn.onclick = function () { logBtnValue(this.value); }
    document.getElementById("button-wrapper").appendChild(randBtn).setAttribute("value", 100);
}

function logBtnValue(clicked_value) { //assign clicked button's input value to btnValue
    btnValue = int(clicked_value);
    if (modalOn == true) { //delete the existing "random" modal if it's open
        closeModal();
    }
}

function newRandModal() { //build a modal to display the output of the "random" button
    let newModal = document.createElement("div");
    let modalParent = document.getElementById("page-wrapper");

    let newWindowCell = [];

    for (let i = 0; i < randomArray.length; i++) {
        newWindowCell[i] = randomArray[i].xPosRand + " / " + randomArray[i].yPosRand;
    }

    var newWindowContent =
    `
    <table>
        <tr><td>${newWindowCell[0]}</td></tr>
        <tr><td>${newWindowCell[1]}</td></tr>
        <tr><td>${newWindowCell[2]}</td></tr>
        <tr><td>${newWindowCell[3]}</td></tr>
        <tr><td>${newWindowCell[4]}</td></tr>
        <tr><td>${newWindowCell[5]}</td></tr>
        <tr><td>${newWindowCell[6]}</td></tr>
        <tr><td>${newWindowCell[7]}</td></tr>
        <tr><td>${newWindowCell[8]}</td></tr>
        <tr><td>${newWindowCell[9]}</td></tr>            
        </tr>
    </table>
    `;

    newModal.innerHTML = newWindowContent;
    newModal.setAttribute("id", "modal");
    modalParent.appendChild(newModal);
    modalOn = true;

}

var wrapperWide;

function getWrapperWidth() { //gets the width of the canvas's wrapper element
    wrapperWide = document.getElementById("canvas-wrapper").offsetWidth;
}

function closeModal() { //dletes the modal from the DOM
    var modal = document.getElementById("modal");
    modal.remove();
    modalOn = false;
}