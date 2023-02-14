// www.kla007.com/music origin is www.kla007.com
const URL_ORIGIN = window.location.origin
console.log(URL_ORIGIN)

async function handleFetch(url, jsonData, method = "POST") {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
      console.error(response);
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function login(jsonData) {
  const urlApi = URL_ORIGIN + '/login'
  const urlMusic = URL_ORIGIN + '/music'
  const data = await handleFetch(urlApi, jsonData);
  console.log(data);
  localStorage.setItem("token", data.token);
  if (data.token) {
    window.location.href = urlMusic;
    return true;
  } 
  return false;

}

async function register(jsonData) {
  const urlRegister = URL_ORIGIN + '/register'
  const data = await handleFetch(urlRegister, jsonData);
  if (!data) {
    alert("Username or email already exists");
    return false;
  }else{
    console.log(data);
    alert("You have successfully registered");
    return true;
  }

}

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", async event => {
  event.preventDefault();
  const username = document.getElementById("username1").value;
  const password = document.getElementById("password1").value;
  const jsonData = {
    username,
    password
  };

  if (!username || !password) {
    alert("Please fill in all fields");
    return;
  }

  const check = await login(jsonData);
  if (!check) {
    alert("Username or password is incorrect");
  }
});

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", async event => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const jsonData = {
    username,
    email,
    password
  };

  if (!username || !email || !password) {
    alert("Please fill in all fields");
    {
      document.getElementById("chk").click();
    }
    return;
  }

  const check = await register(jsonData); // return true or false
  if (check) {
    const username1 = document.getElementById('username1')
    username1.value = username
  }
});
// this function if click sing up Auto open Login Function By kla 007
document.getElementById("registerButton").addEventListener("click", function () {
  document.getElementById("chk").click();
});
