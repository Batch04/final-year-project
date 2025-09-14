let loginbutton = document.querySelector(".login-button");

loginbutton.addEventListener("click", async (e) => {

  e.preventDefault();
  let email = document.querySelector(".email-input").value;
  let password = document.querySelector(".password-input").value;

  console.log(email, password);

  if (!email) {
    document.querySelector(".error").innerHTML = "Email is required";
  }
  else if (!password) {
    document.querySelector(".error").innerHTML = " Password is required";
  }
  else {

    let response = await fetch("../backend/provider_log.php", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': email, 'pass': password })
    });

    let rawdata = await response.text();
    console.log(rawdata);

    let data = JSON.parse(rawdata);
    console.log(data);

    if (data.status === "success") {
      setLoadingState(true);
      setTimeout(() => {
        window.location.href = "../jobprovider/dashboard.html"
      }, 2000)

    }
    else if (data.status === "error") {
      document.querySelector(".error").innerHTML = "Invalid Email or Password";
    }
    else {
      document.querySelector(".error").innerHTML = "ACCOUNT NOT FOUND";
    }
  }


  document.querySelector(".email-input").addEventListener("focus", () => {
    document.querySelector(".error").innerHTML = "";
  });
  document.querySelector(".password-input").addEventListener("focus", () => {
    document.querySelector(".error").innerHTML = "";
  });

});

function setLoadingState(isLoading) {
  const loginButton = document.getElementById('loginButton');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (isLoading) {
    loginButton.disabled = true;
    loginButton.classList.add('loading');
    loginButton.textContent = 'Login In...';
    emailInput.disabled = true;
    passwordInput.disabled = true;
  } else {
    loginButton.disabled = false;
    loginButton.classList.remove('loading');
    loginButton.textContent = 'Sign In';
    emailInput.disabled = false;
    passwordInput.disabled = false;
  }
}

