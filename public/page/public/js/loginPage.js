// import axios form link https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js
const axios = require('https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.2/axios.min.js');
// when click login button get username and password
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;
    if (username === '' || password === '') {
        alert('Please fill in all fields');;
    }else{
        const data = await login(username, password);
        console.log(data);
    }
});


// when click register button get username, email and password
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const jsonData = {
        username: username,
        email: email,
        password: password
    }
    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields');;
    }else{
        const data = await register(jsonData);
        console.log(data);
    }
});

const login = (jsonData) => {
    return axios.post('http://localhost:3000/login', jsonData)
    .then(response => {
        console.log(response);
        return response.data;
    })
    .catch(error => {
        console.log(error);
    });
}

const register = (jsonData) => {
    return axios.post('http://localhost:3000/register', jsonData)
    .then(response => {
        console.log(response);
        return response.data;
    })
    .catch(error => {
        console.log(error);
    });
}



