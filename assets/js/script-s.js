document.addEventListener('DOMContentLoaded', function(){
// starts event listener for suscribe button and opens userpage 
  document.getElementById('suscribe-button').addEventListener('click', function(event) {
    event.preventDefault();
    let inputObjects={};
    let emptyInput=0;
    let usersInfo = ['e@gmail.com', 'l@gmail.com'];
    inputObjects.userName = document.getElementById('fname');
    inputObjects.userDegree = document.getElementById('education');
    inputObjects.userEmail = document.getElementById('user-email');
    inputObjects.userPass=document.getElementById('user-pass');
    for (let item in inputObjects){ //Return the number of empty inputs if any
      if (inputObjects[item].value===""){
        emptyInput++;
      }
    }
    if (emptyInput>0){
      alert('Please complete all fields before submiting'); //Rejects submission if any field is empty
    } else if (usersInfo.includes(inputObjects.userEmail.value)) { //if email already exist cleans all form inputs and sends alert
      alert('Email already in use');
      for (let item in inputObjects){
        inputObjects[item].value="";
      }
    } else {
      localStorage.setItem('useremail', inputObjects.userEmail.value);
      localStorage.setItem('username', inputObjects.userName.value);
      localStorage.setItem('userdegree', inputObjects.userDegree.value);
      window.location.href = "userpage.html"; //opens userpage without submiting form
    }
  });
});