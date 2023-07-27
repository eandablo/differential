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
loginInfo();
document.addEventListener('DOMContentLoaded',function(){
    let infoButton = document.getElementById('user-button');
    infoButton.addEventListener('click',infoDisplayButton);
});
function infoDisplayButton(event){
    let infoDisplay = document.getElementById('user-info-div');
    if (window.getComputedStyle(infoDisplay).display==='none') {
    console.log(window.getComputedStyle(infoDisplay).display);
      infoDisplay.style.display='block';
    } else{
      infoDisplay.style.display = 'none';
    }
}