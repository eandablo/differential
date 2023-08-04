document.addEventListener('DOMContentLoaded', function(){
// starts event listener for suscribe button and opens userpage 
    document.getElementById('suscribe-button').addEventListener('click', function(event) {
        event.preventDefault();
        let usersInfo = ['e@gmail.com', 'l@gmail.com'];
        let userName = document.getElementById('fname').value;
        let userDegree = document.getElementById('education').value;
        let userEmail = document.getElementById('user-email').value;
        let userPass=document.getElementById('user-pass').value;
        let userExist = usersInfo.includes(userEmail); //checks if email entered is already included
 // let suscribeForm=document.getElementById('suscribe-form');
        if (userExist) { //if email already exist cleans all form inputs and sends alert
            alert('Email already in use');
            document.getElementById('fname').value = "";
            document.getElementById('education').value = "";
            document.getElementById('user-email').value = "";
            document.getElementById('user-pass').value = "";
        } else {
            localStorage.setItem('useremail', userEmail);
            localStorage.setItem('username', userName);
            localStorage.setItem('userdegree', userDegree);
            window.location.href = "userpage.html"; //opens userpage without submiting form
        }
    });
});