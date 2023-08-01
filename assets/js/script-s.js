document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('suscribe-button').addEventListener('click', suscribeFunction);
});

/**
*Reads info from suscribe form 
*if criteria are satisfied logs user in with its newly created account
 */
function suscribeFunction(event) {
  event.preventDefault();
  let usersInfo = ['e@gmail.com','l@gmail.com'];
  let userName=document.getElementById('fname').value;
  let userDegree=document.getElementById('education').value;
  let userEmail=document.getElementById('user-email').value;
  let userExist=usersInfo.includes(userEmail);
  if (userExist){
    alert('Email already in use');
    document.getElementById('fname').value="";
    document.getElementById('education').value="";
    document.getElementById('user-email').value="";
    document.getElementById('user-pass').value="";
  } else{
    localStorage.setItem('useremail', userEmail);
    localStorage.setItem('username', userName);
    localStorage.setItem('userdegree', userDegree);
    window.location.href="userpage.html";
  }
}