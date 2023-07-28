/**
 * Reads user information gerated in either login or suscribe pages
 * using the information to create the personalised user space
 */
function loginInfo() {
    let userName = localStorage.getItem('username');
    let userEmail = localStorage.getItem('useremail');
    let userDegree = localStorage.getItem('userdegree');
    document.getElementById('user-name').innerText = userName;
    document.getElementById('user-email').innerText = userEmail;
    document.getElementById('user-education').innerText = userDegree;
    if (userName.includes(' ')) {
        let indexFirstSpace = userName.indexOf(' ');
        let firstName = userName.slice(0, indexFirstSpace);
        document.getElementById('user-first-name').innerText = firstName.toUpperCase();
    } else {
        document.getElementById('user-first-name').innerText = userName.toUpperCase();
    }
}
// call function to load user info
loginInfo();
document.addEventListener('DOMContentLoaded', function () {
    let infoButton = document.getElementById('user-button');
    let springButton = document.getElementById('spring-button');
    let dissipatorButton = document.getElementById('dissipator-button');
    infoButton.addEventListener('click', infoDisplayButton);
    springButton.addEventListener('click', addSpring);
    dissipatorButton.addEventListener('click', addDissipator);
});
/**
 * shows or hides the information when the burger button is pressed
 */
function infoDisplayButton() {
    let infoDisplay = document.getElementById('user-info-div');
    if (window.getComputedStyle(infoDisplay).display === 'none') {
        infoDisplay.style.display = 'block';
    } else {
        infoDisplay.style.display = 'none';
    }
}
/**
 * Adds a new sring element
 */
function addSpring() {
    if (document.getElementsByClassName('spring-div')[0]) {
        let nSprings = document.getElementsByClassName('spring-div').length + 1;
        //stops producing elements if there are already 3 springs or total elements are 4
        let nDissipator = 0;
        if (document.getElementsByClassName('dissipator-div')[0]) {
            nDissipator = document.getElementsByClassName('dissipator-div').length;
        }
        let tElements = nSprings + nDissipator - 1;
        if (nSprings <= 3 && tElements < 4) {
            let newSpring = document.createElement("div");
            newSpring.setAttribute('class', 'spring-div');
            newSpring.setAttribute('id', 'spring-' + nSprings);
            newSpring.addEventListener('mousedown', prepareDiv);
            document.getElementById('game-area-left').appendChild(newSpring);
        } else if (tElements < 4) {
            alert(`Total of springs is 3 you need at least one dissipator`);
        } else {
            alert(`number of elements is ${tElements}`);
        }
    } else {
        let newSpring = document.createElement("div");
        newSpring.setAttribute('class', 'spring-div');
        newSpring.setAttribute('id', 'spring-1');
        newSpring.addEventListener('mousedown', prepareDiv);
        document.getElementById('game-area-left').appendChild(newSpring);
    }

}
/**
 * Adds a new dissipator element
 */
function addDissipator() {
    let nDissipator = 1;
    if (document.getElementsByClassName('dissipator-div')[0]) {
        let nDissipator = document.getElementsByClassName('dissipator-div').length + 1;
        //stops producing elements if there are already 3 springs or total elements are 4
        let nSprings = 0;
        if (document.getElementsByClassName('spring-div')[0]) {
            nSprings = document.getElementsByClassName('spring-div').length;
        }
        let tElements = nSprings + nDissipator - 1;
        if (nDissipator <= 3 && tElements < 4) {
            let newDissipator = document.createElement("div");
            newDissipator.setAttribute('class', 'dissipator-div');
            newDissipator.setAttribute('id', 'dissipator-' + nDissipator);
            newDissipator.addEventListener('mousedown', prepareDiv);
            document.getElementById('game-area-left').appendChild(newDissipator);
        } else if (tElements < 4) {
            alert('There are already 3 dissipator elements, you need at least 1 dissipator');
        } else {
            alert('You have exceeded the maximum number of elements');
        }
    } else {
        let newDissipator = document.createElement("div");
        newDissipator.setAttribute('class', 'dissipator-div');
        newDissipator.setAttribute('id', 'dissipator-' + nDissipator);
        newDissipator.addEventListener('mousedown', prepareDiv);
        document.getElementById('game-area-left').appendChild(newDissipator);
    }
}
/**
 * Temporal function to change color of div on mousedown
 */
function prepareDiv(event) {;
    divId = this.getAttribute('id');
    document.getElementById('holder1').innerText = event.clientX;
    document.getElementById('holder2').innerText = event.clientY;
    document.getElementById('holder3').innerText = this.getAttribute('id');
    document.getElementById('holder4').innerText = this.offsetLeft;
    document.getElementById('holder5').innerText = this.offsetTop;
    document.addEventListener('mouseup', freeElement);
    document.addEventListener('mousemove', moveDiv);
}
function moveDiv(event) {
    let xmOld = parseInt(document.getElementById('holder1').textContent);
    let ymOld = parseInt(document.getElementById('holder2').textContent);
    let xdOld=parseInt(document.getElementById('holder4').textContent);
    let ydOld = parseInt(document.getElementById('holder5').textContent);
    let divId = document.getElementById('holder3').textContent;
    let deltaX = event.clientX - xmOld+xdOld;
    let deltaY = event.clientY - ymOld+ydOld;
    let movingDiv = document.getElementById(divId);
    movingDiv.style.left = deltaX + "px";
    movingDiv.style.top = deltaY + "px";
}
function freeElement() {

    document.removeEventListener('mousemove', moveDiv);
    document.removeEventListener('mouseup', freeElement);
}