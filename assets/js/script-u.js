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
//starting all button listerners
document.addEventListener('DOMContentLoaded', function () {
    let infoButton = document.getElementById('user-button');
    let springButton = document.getElementById('spring-button');
    let dissipatorButton = document.getElementById('dissipator-button');
    let resetButton = document.getElementById('reset-button');
    infoButton.addEventListener('click', infoDisplayButton);
    springButton.addEventListener('click', addSpring);
    dissipatorButton.addEventListener('click', addDissipator);
    resetButton.addEventListener('click',resetGame);
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
            alert(`There are already 3 spring elements, you need at least 1 disspator`);
        } else {
            alert(`You have exceeded the maximum number of elements`);
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
            alert('There are already 3 dissipator elements, you need at least 1 spring');
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
 * starts function moveDiv to prepare moving the div on mouse down
 * on mouse up call the function to free the element from dragging
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
/**
Updates position of the selected div with the mouse coordinates
 */
function moveDiv(event) {
    // Getting past coordinates of mouse
    let xmOld = parseInt(document.getElementById('holder1').textContent);
    let ymOld = parseInt(document.getElementById('holder2').textContent);
    // Getting past coordinates of the div
    let xdOld=parseInt(document.getElementById('holder4').textContent);
    let ydOld = parseInt(document.getElementById('holder5').textContent);
    // Reading id of the moving div
    let divId = document.getElementById('holder3').textContent;
    let deltaX = event.clientX - xmOld+xdOld;
    let deltaY = event.clientY - ymOld+ydOld;
    let movingDiv = document.getElementById(divId);
//    document.getElementById('dummy-p').innerText=`x ${deltaX} y ${deltaY}`
    movingDiv.style.left = deltaX + "px";
    movingDiv.style.top = deltaY + "px";
    distanceElement(deltaX,deltaY,movingDiv);
}
/**
 * On mouse up frees element from dragging by removing event listeners of movingDiv
 */
function freeElement() {
    document.removeEventListener('mousemove', moveDiv);
    document.removeEventListener('mouseup', freeElement);
}
/**
 * Calculates the distance between element and holder
 * locks the element if minimum distance is achived
 */
function distanceElement(deltaX,deltaY,movingDiv){
  let fixPoints=[[95,100,0],[95,200,3],[167,100,1],[167,200,4]];
  let closestCoor;
  let distance=0;
  let minDist=1000;
  //Calculates distance to all clamping points in game area and chosses the closest point
  for (let point of fixPoints){
    distance=Math.sqrt((deltaX-point[0])**2+(deltaY-point[1])**2);
    if (distance<minDist){
      minDist=distance;
      closestCoor=point;
    }
  }
  let tableCells=document.getElementsByTagName('td');
 //Labels the element when about to be anchored
  if (minDist<4 && tableCells[closestCoor[2]].innerText===''){
//    if (movingDiv.getAttribute('class')==='spring-div'){
//      movingDiv.innerText = 'S'
//    } else{
//      movingDiv.innerText = 'D'
//    }
    freeElement();
    //anchoring element to the closest clamping point
    movingDiv.style.left = closestCoor[0] + "px";
    movingDiv.style.top = closestCoor[1] + "px"
    let elementId=movingDiv.getAttribute('id');
    tableUpdate(elementId,closestCoor[2]);
  }
}
/**
 * Uptades the game area table when an element is anchored
 */
function tableUpdate(elementId, closestCoor){
  let tableCells=document.getElementsByTagName('td');
//  document.getElementById('dummy-p').innerText = `x ${tableCells.length} y ${closestCoor}`;
  tableCells[closestCoor].innerText=elementId;
}
/**
 * Erases all divs in order to restart the game
 */
function resetGame(){
//Remove spring elements from game area
  if (document.getElementsByClassName('spring-div')[0]){
    let springElements=document.getElementsByClassName('spring-div');
    let nSprings=springElements.length;
    for (let i=0;i<nSprings;i++){
      springElements[0].remove();
    }
  }
//Remove disspator elements from game area
  if (document.getElementsByClassName('dissipator-div')[0]) {
    let springElements = document.getElementsByClassName('dissipator-div');
    let nSprings = springElements.length;
    for (let i = 0; i < nSprings; i++) {
      springElements[0].remove();
    }
  }
//clear all table cells in the table area
  let tableCells=document.getElementsByTagName('td')
  for (cell of tableCells){
    cell.innerText="";
  } 
}
