/**
 * Reads user information gerated in either login or suscribe pages
 * using the information to create the personalised user space
 */
function loginInfo(){
  let userName=localStorage.getItem('username');
  let userEmail=localStorage.getItem('useremail');
  let userDegree= localStorage.getItem('userdegree');
  document.getElementById('user-name').innerText=userName;
  document.getElementById('user-email').innerText=userEmail;
  document.getElementById('user-education').innerText=userDegree;
  if (userName.includes(' ')){
    let indexFirstSpace=userName.indexOf(' ');
    let firstName=userName.slice(0,indexFirstSpace);
    document.getElementById('user-first-name').innerText=firstName.toUpperCase();
  }else{
    document.getElementById('user-first-name').innerText=userName.toUpperCase();
  }
}
// call function to load user info
loginInfo();
// clear user info from the local storage
document.addEventListener('DOMContentLoaded',function(){
  let infoButton = document.getElementById('user-button');
  let springButton=document.getElementById('spring-button');
//  let dissipatorButton=document.getElementById('dissipator-button');
  infoButton.addEventListener('click',infoDisplayButton);
  springButton.addEventListener('click',addSpring);
 // dissipatorButton.addEventListener('click',function);
});
/**
 * shows or hides the information when the burger button is pressed
 */
function infoDisplayButton(){
  let infoDisplay = document.getElementById('user-info-div');
  if (window.getComputedStyle(infoDisplay).display==='none') {
    infoDisplay.style.display='block';
  } else{
    infoDisplay.style.display = 'none';
  }
}
/**
 * Adds a new sring element
 */
function addSpring(){
  let nsprings=0;
  if (document.getElementsByClassName('spring-div')[0]){
    nsprings= document.getElementsByClassName('spring-div').length;
    let newSpring = document.createElement("div");
    newSpring.setAttribute('class', 'spring-div');
    newSpring.setAttribute('id', 'spring-' + nsprings);
    document.getElementById('game-area-left').appendChild(newSpring);
  } else {
    let newSpring = document.createElement("div");
    newSpring.setAttribute('class', 'spring-div');
    newSpring.setAttribute('id','spring-'+nsprings);
    document.getElementById('game-area-left').appendChild(newSpring);
  }

}