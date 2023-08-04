document.addEventListener('DOMContentLoaded',function(){
// gets login button and allows login if conditions in loginFunction are met
    document.getElementById('login-button').addEventListener('click', function(event) {
        event.preventDefault();
        let loginForm=document.getElementById('login-form');
        let loginField = document.getElementById('login-field');
        let userEmail = loginField.children[3].value;
        let userPass = loginField.children[7].value;
        let usersInfo = [
            { name: 'Efren Andablo', email: 'e@gmail.com', password: 'efren', degree: 'Level 5' },
            { name: 'Leela Lou', email: 'l@gmail.com', password: 'leela', degree: 'Level 7' }
        ];
        // checking if email exists in usersInfo and password matches user email
        let validUser = false;
        for (user of usersInfo) {
            if (user.email === userEmail && user.password === userPass) {
                let userDegree = user.degree;
                let userName = user.name;
                validUser = true;
                //stores user info in local storage to use in userpage
                localStorage.setItem('useremail', userEmail);
                localStorage.setItem('username', userName);
                localStorage.setItem('userdegree', userDegree);
            }
        }
        if (validUser) {
            loginForm.submit(); //opens userpage without submiting form
        } else { //if user email does not exist sends alert and clears login fields
            loginField.children[3].value = "";
            loginField.children[7].value = "";
            alert('User name or password incorrect');
        }
    });
});