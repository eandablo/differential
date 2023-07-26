/**
 * Reads user information gerated in either login or suscribe pages
 * uses the information to create the personalised user space
 */

//function loginInfo(){
  let userName=localStorage.getItem('username');
  let userEmail=localStorage.getItem('useremail');
  let userDegree= localStorage.getItem('userdegree');
  document.getElementById('user-first-name').innerText=userName.toUpperCase();
//}