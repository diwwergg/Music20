const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', handleLogin);

async function handleLogin() {
    const username = document.getElementById('username1').value;
    const password = document.getElementById('password1').value;
    const jsonData = {
        username,
        password,
    };

    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const data = await login(jsonData);
    console.log(data);
}

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegister);

async function handleRegister() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const jsonData = {
        username,
        email,
        password,
    };

    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    const response = await register(jsonData);
    const data = response.data;
    console.log(data);
}

async function handleFetchPost(url, jsonData) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

const login = (jsonData) => {
    handleFetchPost('http://localhost:3000/login', jsonData);
    window.location.href = 'http://localhost:3000/music';
};

const register = (jsonData) => {
    handleFetchPost('http://localhost:3000/register', jsonData);
};
