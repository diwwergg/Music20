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
        alert("Username or password is incorrect");
        throw new Error(response.statusText);
        
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function login(jsonData) {
    const data = await handleFetch("http://localhost:3000/login", jsonData);
    console.log(data);
    localStorage.setItem("token", data.token);

    if (data.token) {
        window.location.href = "http://localhost:3000/music";
        }
  }
  
  async function register(jsonData) {
    const data = await handleFetch("http://localhost:3000/register", jsonData);
    console.log(data);
    alert("You have successfully registered");
    
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
    
    await login(jsonData);
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
    
    await register(jsonData);
  });
   // this function if click sing up Auto open Login Function By kla 007
   document.getElementById("registerButton").addEventListener("click", function(){
   document.getElementById("chk").click();
});
