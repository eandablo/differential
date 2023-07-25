document.addEventListener('DOMContentLoaded',activateButtons);
/**
 * Reads the id and decides action depending on the event id
 */
function activateButtons(){
  document.getElementById('login-button').addEventListener('click',loginFunction);
}
/**
 *gets username and password from login page
 *finds if user name is in the list
 */
function loginFunction(event){
  event.preventDefault();
  let loginForm=document.getElementById('login-form');
  let loginField=document.getElementById('login-field');
  let userName=loginField.children[3].value;
  let userPass=loginField.children[7].value;
  let usersInfo=[
    {name:'Efren',email:'e@gmail.com',password:'efren'},
    {name:'Leela',email:'l@gmail.com',password:'leela'}
  ];
  let validUser=false;
  for (user of usersInfo){
    if (user.email===userName && user.password===userPass){
      validUser=true;
    }
  }
  if (validUser){
    loginForm.submit();
  } else{
    loginField.children[3].value="";
    loginField.children[7].value="";
  }
}