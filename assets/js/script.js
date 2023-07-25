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
  loginField=document.getElementById('login-field');
  userName=loginField.children[3].value;
  userPass=loginField.children[7].value;
  usersInfo=[
    {name:'Efren',email:'e@gmail.com',password:'efren'},
    {name:'Leela',email:'l@gmail.com',password:'leela'}
  ];
  for (user of usersInfo){
    if (user.email===userName && user.password===userPass){
      alert('valid user');
    }
  }
}