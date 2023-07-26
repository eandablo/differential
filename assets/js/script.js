//After loading page,  this waits for a 
document.addEventListener('DOMContentLoaded',function(){
  // gets login button and allows allows login if conditions in loginFunction are met
  document.getElementById('login-button').addEventListener('click', loginFunction);
});


//document.getElementById('user-page-name').innerText=localStorage.getItem('useremail');
/**
 *gets username and password from login page
 *finds if user name is in the list and redirects to userpage if condition is met
 * sends user details to user page
 */
function loginFunction(event){
  event.preventDefault();
  let loginField=document.getElementById('login-field');
  let userName=loginField.children[3].value;
  let userPass=loginField.children[7].value;
  let usersInfo=[
    {name:'Efren',email:'e@gmail.com',password:'efren'},
    {name:'Leela',email:'l@gmail.com',password:'leela'}
  ];
  // checking if email exists in usersInfo and password matches user email
  let validUser=false;
  for (user of usersInfo){
    if (user.email===userName && user.password===userPass){
      validUser=true;
    }
  }
  if (validUser){
    localStorage.setItem('useremail',userName); //stores userName in local storage to use in userpage
    window.location.href="userpage.html"; //opens userpage without submiting form
    
  } else{ //if user email does not exist sends alert and clears login fields
    loginField.children[3].value="";
    loginField.children[7].value="";
    alert('User name or password incorrect');
  }
}