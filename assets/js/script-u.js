/**
 * Reads user information gerated in either login or suscribe pages
 * using the information to create the personalised user space
 */
function loginInfo() {
  let userName = localStorage.getItem('username'); //getting info from local storage
  let userEmail = localStorage.getItem('useremail');
  let userDegree = localStorage.getItem('userdegree');
  document.getElementById('user-name').innerText = userName; //write info to user-info-div
  document.getElementById('user-email').innerText = userEmail;
  document.getElementById('user-education').innerText = userDegree;
  if (userName.includes(' ')) { //if user has a last name it obtains only the first name
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
 * Shows or hides the information when the burger button is pressed
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
  let divId='';
  if (document.getElementsByClassName('spring-div')[0]) { //checks if there are already springs created
    let reject = addRejection('s');
    let nSprings = document.getElementsByClassName('spring-div').length + 1;
    let nDissipator = 0;
    if (document.getElementsByClassName('dissipator-div')[0]) {
      nDissipator = document.getElementsByClassName('dissipator-div').length;
    }
    let tElements = nSprings + nDissipator - 1;
    if (reject===0){
        //stops producing elements if there are already 2 springs or total elements are 4
      if (nSprings <= 2 && tElements < 4) { //makes sure no more elements than needed are created
        divId = 'spring-' + nSprings;
        let newSpring = document.createElement("div");
        newSpring.setAttribute('class', 'spring-div');
        newSpring.setAttribute('id', divId);
        newSpring.addEventListener('mousedown', prepareDiv);
        document.getElementById('game-area-left').appendChild(newSpring);
        document.getElementById('holder3').innerText = divId;
        activateSockets();
      } else if (tElements < 4) {
        alert(`There are already 2 spring elements, you need at least 1 disspator`);
      } else {
        alert(`You have exceeded the maximum number of elements`);
      }
    }
  } else { // if no springs already exist, creates the first
    divId = 'spring-1';
    let newSpring = document.createElement("div");
    newSpring.setAttribute('class', 'spring-div');
    newSpring.setAttribute('id', divId);
    newSpring.addEventListener('mousedown', prepareDiv);
    document.getElementById('game-area-left').appendChild(newSpring);
    document.getElementById('holder3').innerText = divId;
    activateSockets(); //starting socket buttons
  }
}
/**
 * Adds a new dissipator element
 */
function addDissipator() {
  let divId='';
  if (document.getElementsByClassName('dissipator-div')[0]) {
    let reject = addRejection('d');
    let nDissipator = document.getElementsByClassName('dissipator-div').length + 1;    
    let nSprings = 0;
    if (document.getElementsByClassName('spring-div')[0]) {
      nSprings = document.getElementsByClassName('spring-div').length;
    }
    let tElements = nSprings + nDissipator - 1;
    if(reject===0){
//stops producing dissipator elements if there are already 2 dissipator or total elements are 4
      if (nDissipator <= 2 && tElements < 4) {
        divId = 'dissipator-' + nDissipator;
        let newDissipator = document.createElement("div");
        newDissipator.setAttribute('class', 'dissipator-div');
        newDissipator.setAttribute('id', divId);
        newDissipator.addEventListener('mousedown', prepareDiv);
        document.getElementById('game-area-left').appendChild(newDissipator);
        document.getElementById('holder3').innerText = divId;
        activateSockets();
      } else if (tElements < 4) {
        alert('There are already 2 dissipator elements, you need at least 1 spring');
      } else {
        alert('You have exceeded the maximum number of elements');
      }
    }
  } else {
    divId = 'dissipator-1';
    let newDissipator = document.createElement("div");
    newDissipator.setAttribute('class', 'dissipator-div');
    newDissipator.setAttribute('id', divId);
    newDissipator.addEventListener('mousedown', prepareDiv);
    document.getElementById('game-area-left').appendChild(newDissipator);
    document.getElementById('holder3').innerText = divId;
    activateSockets();
  }
}
/**
 * Function receives the type of new element and checks if there are lose elements
 * as well as if there is only one element, checks if it is the same type
 * if none of this condition are met function returns 0 otherwise 1
 * @param {} newElement 
 */
function addRejection(newElement){
  let tableCells=document.getElementsByTagName('td');
  let nSprings=document.getElementsByClassName('spring-div').length; //number of springs
  let nDissipators = document.getElementsByClassName('dissipator-div').length; //number of dissipator
  let dockSprings=0;
  let dockDissipators=0;
  let nBusy=0;
  let flag=0;
  for (let cell of tableCells){
    if (cell.children[0].innerText!==''){
      nBusy++; //Calculate number of docked elements
    }
    if (cell.children[0].innerText=== 'SPRING'){
      dockSprings++; // Calculate number of docked springs
    }
    if(cell.children[0].innerText=== 'DISSIPATOR') {
      dockDissipators++; //Calculate number of docked dissipators
    }
  }
  if (nBusy<nSprings+nDissipators){
    flag++;
    alert('First try attaching the new element');
  }
  if (dockSprings===1 && newElement==='s' && dockDissipators===0){
    flag++;
    alert('First try adding a new dissipator');
  }
  if (dockDissipators===1 && newElement==='d' && dockSprings===0){
    flag++;
    alert('First try adding a new spring');
  }
  return flag;
}

/**
 * starts function moveDiv to prepare moving the div on mouse down
 * on mouse up call the function to free the element from dragging
 */
function prepareDiv(event) {
  document.getElementById('holder1').innerText = event.clientX;
  document.getElementById('holder2').innerText = event.clientY;
  document.getElementById('holder4').innerText = this.offsetLeft;
  document.getElementById('holder5').innerText = this.offsetTop;
  document.addEventListener('mouseup', freeElement);
  document.addEventListener('mousemove', moveDiv);
}
/**
 * Activates socket buttons
 * @param {} divId 
 */
function activateSockets() {
  let socketButtons = document.getElementsByClassName('round-button');
  for (let socket of socketButtons){
      socket.addEventListener('click', socketInit);
  }
}
/**
 * socket buttons funcitonality: anchors the element to the corresponding socket
 */
function socketInit() {
  const fixPoints = {
    'socket-1':[95, 100, 0], 
    'socket-2':[167, 100, 1], 
    'socket-3':[95, 200, 2], 
    'socket-4':[167, 200, 3]
  }; //anchoring positions
  let buttonId = this.getAttribute('id');
  let minDist = 5;
  let closestCoor = fixPoints[buttonId];
  let divId = document.getElementById('holder3').innerText;
  let movingDiv = document.getElementById(divId);
  anchorElement(closestCoor, movingDiv, minDist);
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
  movingDiv.style.left = deltaX + "px"; //updates the position of the draging element
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
  let tableCells = document.getElementsByTagName('td');
/*Anchoring the element by removing event listener for mousedown locking the element
and sets top and left of element to the anchoring positions
Updates the table with element by calling tableUpdate*/
  if (minDist < 10 && tableCells[closestCoor[2]].innerText === '') {
    let neighbourInfo = clampingCriteria(closestCoor, tableCells, movingDiv);
    if (neighbourInfo[1] >0 || neighbourInfo[0]===4){
      let socketButtons = document.getElementsByClassName('round-button');
      for (let socket of socketButtons) {
        socket.removeEventListener('click', socketInit);
      }
      freeElement(); //stop element from moving after reaching the closest anchoring point
      movingDiv.removeEventListener('mousedown', prepareDiv);
      movingDiv.style.left = closestCoor[0] + "px"; //anchoring element to the closest clamping point
      movingDiv.style.top = closestCoor[1] + "px";
      let elementClass = movingDiv.getAttribute('class');
      tableUpdate(elementClass, closestCoor[2]); //Updating table on game area right about
      createDiffEquation(); //Updating game area center about
    }
  }
}
/**
 * Identifies the type of neighbouring cells by using table content
 * @param {*} closestCoor 
 * @param {*} tableCells 
 * @param {*} movingDiv 
 * @returns [nEmptyCell, nNeighbours]
 */
function clampingCriteria(closestCoor,tableCells,movingDiv){
  let nEmptyCell = 0;
  let nNeighbours = 0;
  const neighbourCells = [[1, 2, 3], [0, 3, 2], [3, 0, 1], [2, 1, 0]];
  for (let cell of tableCells) {
    if (cell.children[0].innerText === '') {
      nEmptyCell++;
    }
  }
//identify type of neighbour element if any
  let elementType = movingDiv.getAttribute('class');
  if (elementType === 'spring-div') {
    for (let cell of neighbourCells[closestCoor[2]]) {
      if (tableCells[cell].children[0].innerText.toLowerCase() === 'dissipator') {
        nNeighbours++;
      }
    }
    if (tableCells[neighbourCells[closestCoor[2]][0]].children[0].innerText.toLowerCase() === 'spring') {
      nNeighbours--;
    }
  } else {
    for (let cell of neighbourCells[closestCoor[2]]) {
      if (tableCells[cell].children[0].innerText.toLowerCase() === 'spring') {
        nNeighbours++;
      }
    }
    if (tableCells[neighbourCells[closestCoor[2]][0]].children[0].innerText.toLowerCase() === 'dissipator') {
      nNeighbours--;
    }
  }
  return [nEmptyCell, nNeighbours];
}
/**
 * Uptades the game area table when an element is anchored
 * @param {*} elementClass 
 * @param {*} closestCoor 
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
  document.getElementById('game-area-center').innerHTML = '';
}

/**
* Creates text for the central about of game area updating the differential equation
that represents the current progra
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
    12:3, //voigt model
    21:3,
    1200:3,
    2100:3,
    201:4, //maxwell model
    102:4,
    120:4,
    210:4,
    1020:4,
    2010:4,
    1002:4,
    2001:4,
    112:5, //voigt element in series to spring
    121:5,
    1021:5,
    1012:5,
    1201:5,
    1210:5,
    2101:5,
    2110:5,
    212: 6, //voigt element in series to dissipator
    221: 6,
    2021: 6,
    2012: 6,
    1202: 6,
    1220: 6,
    2102: 6,
    2120: 6,
    2121: 7, //Voigt Elements in series
    2112:7,
    1212:7,
    1221:7
  };
  let tableCells=document.getElementsByTagName('td')
  let cellValue=0;
  for (let i=0;i<4;i++){
    if (tableCells[i].children[0].innerText.toLowerCase()==="spring"){
      cellValue+=10**i;
    } else if (tableCells[i].children[0].innerText.toLowerCase() === "dissipator"){
      cellValue += 2*10 ** i;
    }
  }
  writeEquation(elementSelector[cellValue]);
//  document.getElementById('dummy-p').innerText = elementSelector[cellValue];
}
/**
 * Writes resulting mechanical name and equations in central about of game area
 */
function writeEquation(selection){
  switch (selection){
    case 3:
      document.getElementById('game-area-center').innerHTML =`<h3>Voigt Element</h3>
      <h4>Force(&sigma;) = Spring + Dissipator</h4>
      <h4>Strain(&gamma;) = Spring = Dissipator</h4>
      <h4>The Equation is then:</h4>
      <h4>&sigma; = k &gamma; +  &eta; d&gamma;/dt</h4>`;
      break;
    case 4:
      document.getElementById('game-area-center').innerHTML = `<h3>Maxwell Element</h3>
      <h4>Force(&sigma;) = Spring = Dissipator</h4>
      <h4>Strain(&gamma;) = Spring + Dissipator</h4>
      <h4>The Equation is then:</h4>
      <h4>d&gamma;/dt = (1/k) d&sigma;/dt +  (1/&eta;) d&sigma;/dt</h4>`;
      break;
    case 5:
      document.getElementById('game-area-center').innerHTML = `<h3>Voigt Element and Spring In Series</h3>
      <h4>Voigt Force(&sigma;1) = Spring = Dissipator</h4>
      <h4>Voigt Strain(&gamma;1) = Spring + Dissipator</h4>
      <h4>The equation for Voigt is:</h4>
      <h4>&sigma;1 = k &gamma;1 +  &eta; d&gamma;1/dt</h4>
      <h4>The additional spring</h4>
      <h4>Stress(&sigma;) = Voigt(&sigma;1) = Spring(&sigma;2)</h4>
      <h4>Strain(&gamma;) = Voigt(&gamma;1) + Spring(&gamma;2)</h4>
      <h4>Then the addtional equation is:</h4>
      <h4>&gamma; = &gamma;1 +  (1/k) &sigma;1
      <h4>Equations must be solved simultaneously</h4>`;
      break;
    case 6:
      document.getElementById('game-area-center').innerHTML = `<h3>Voigt Element and Dissipator in Series</h3>
      <h4>Voigt Force(&sigma;1) = Spring + Dissipator</h4>
      <h4>Voigt Strain(&gamma;1) = Spring = Dissipator</h4>
      <h4>The equation for Voigt is:</h4>
      <h4>&sigma;1 = k &gamma;1 +  &eta; d&gamma;1/dt</h4>
      <h4>The additional dissipator</h4>
      <h4>Force(&sigma;) = Voigt(&gamma;1) = Dissipator(&sigma;2)</h4>
      <h4>Strain(&gamma;) = Voigt(&gamma;1) = Dissipator(&gamma;2)</h4>
      <h4>Then the addtional equation is:</h4>
      <h4>d&gamma;/dt = d&gamma;1/dt + (1/&eta;) d&sigma;/dt</h4>
      <h4>Equations must be solved simultaneously</h4>`;
      break;
    case 7:
      document.getElementById('game-area-center').innerHTML = `<h3>Voigt Elements in Series</h3>
      <h4>Voigt Force(&sigma;1) = Spring + Dissipator</h4>
      <h4>Voigt Strain(&gamma;1) = Spring = Dissipator</h4>
      <h4>The equation for the Voigt elemets:</h4>
      <h4>&sigma;1 = k &gamma;1 +  &eta; d&gamma;1/dt</h4>
      <h4>&sigma;2 = k &gamma;2 +  &eta; d&gamma;2/dt</h4>
      <h4>The additional dissipator</h4>
      <h4>Then the addtional equation is:</h4>
      <h4>&gamma; = &gamma;1 +  &gamma;2</h4>
      <h4>Equations must be solved simultaneously</h4>`;
      break;
    default:
      document.getElementById('game-area-center').innerHTML = `<h3>Please add another element</h3>`;
  }
}