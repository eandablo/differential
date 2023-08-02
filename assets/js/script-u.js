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
        if (nSprings <= 2 && tElements < 4) {
            let newSpring = document.createElement("div");
            newSpring.setAttribute('class', 'spring-div');
            newSpring.setAttribute('id', 'spring-' + nSprings);
            newSpring.addEventListener('mousedown', prepareDiv);
            document.getElementById('game-area-left').appendChild(newSpring);
        } else if (tElements < 4) {
            alert(`There are already 2 spring elements, you need at least 1 disspator`);
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
        if (nDissipator <= 2 && tElements < 4) {
            let newDissipator = document.createElement("div");
            newDissipator.setAttribute('class', 'dissipator-div');
            newDissipator.setAttribute('id', 'dissipator-' + nDissipator);
            newDissipator.addEventListener('mousedown', prepareDiv);
            document.getElementById('game-area-left').appendChild(newDissipator);
        } else if (tElements < 4) {
            alert('There are already 2 dissipator elements, you need at least 1 spring');
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
    let divId = this.getAttribute('id');
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
    let movingDiv =document.getElementById(divId);
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
  const fixPoints=[[95,100,0],[95,200,2],[167,100,1],[167,200,3]]; //anchoring positions
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
  anchorElement(closestCoor, movingDiv,minDist);
}
/**
 * Anchors the element if ditance and other conditions are met
 * Takes 3 arguments (closestCoor, movingDiv,minDist)
 */
function anchorElement(closestCoor, movingDiv,minDist){
    const neighbourCells=[[1,2,3],[0,3,2],[3,0,1],[2,1,0]];
    let tableCells = document.getElementsByTagName('td');
/*Anchoring the element by removing event listener for mousedown locking the element
and sets top and left of element to the anchoring positions
Updates the table with element by calling tableUpdate*/
    if (minDist < 10 && tableCells[closestCoor[2]].innerText === '') {
 //       alert('got here');
        let elementType=movingDiv.getAttribute('class');
        if (elementType==='spring-div'){
            let count=0;
            for (let cell of neighbourCells[closestCoor[2]]){
                if (tableCells[cell].children[0].innerText === 'DISSIPATOR'){
                    count++;
                }
            }
            document.getElementById('dummy-p').innerText = count;
        } else{
            let count=0;
            for (let cell of neighbourCells[closestCoor[2]]) {
                if (tableCells[cell].children[0].innerText === 'SPRING') {
                    count++;
                }
            }
            document.getElementById('dummy-p').innerText = count;
        }

        freeElement();
        movingDiv.removeEventListener('mousedown', prepareDiv);
        //anchoring element to the closest clamping point
        movingDiv.style.left = closestCoor[0] + "px";
        movingDiv.style.top = closestCoor[1] + "px";
        let elementClass = movingDiv.getAttribute('class');
        //Updating table on game area right about
        tableUpdate(elementClass, closestCoor[2]);
        //Updating game area center about
        createDiffEquation();
    }
}

/**
 * Uptades the game area table when an element is anchored
 */
function tableUpdate(elementClass, closestCoor){
  let tableCells=document.getElementsByTagName('td');
// set background image to show stress euqation using a class attribute
  if (elementClass==="spring-div"){
    tableCells[closestCoor].children[0].innerHTML = "SPRING";
    tableCells[closestCoor].children[1].innerHTML = "&sigma; = k &gamma;";
  }else{
    tableCells[closestCoor].children[0].innerHTML = "DISSIPATOR";
    tableCells[closestCoor].children[1].innerHTML = "&sigma; = &eta; d&gamma;/dt";
  }
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
  for (let cell of tableCells){
    cell.children[0].innerHTML="";
    cell.children[1].innerHTML = "";
  } 
}

/**
 * Creates text for the central about of game area updating the differential equation
that represents the current program
*/
function createDiffEquation(){
  let elementSelector={
    1:1, //single spring
    10:1,
    100:1,
    1000:1,
    2:2, //single dissipator
    20:2,
    200:2,
    2000:2,
    11:3, //parallel springs
    1100:3,
    101:4, //springs in series
    1001:4,
    110:4,
    1010:4,
    202: 5, //dissipators in series
    2002: 5,
    220: 5,
    2020: 5,
    0022:6, //parallel dissipators
    2200:6,
    12:7, //voigt model
    21:7,
    1200:7,
    2100:7,
    201:8, //maxwell model
    102:8,
    1020:8,
    2010:8,
    1002:8,
    2001:8,
    210:8,
    120:8,
    111:9, //three springs
    1011:9,
    1110:9,
    1101:9,
    222: 10, //three dissipators
    2022: 10,
    2220: 10,
    2202: 10,
    112:11, //maxwell with one voight element
    121:11,
    1201:11,

  };
  let tableCells=document.getElementsByTagName('td')
  let cellValue=0;
  for (let i=0;i<4;i++){
    if (tableCells[i].children[0].innerText==="SPRING"){
      cellValue+=10**i;
    } else if (tableCells[i].children[0].innerText === "DISSIPATOR"){
      cellValue += 2*10 ** i;
    }
  }
//  document.getElementById('dummy-p').innerText = elementSelector[cellValue];
}

