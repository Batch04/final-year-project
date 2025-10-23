let signupbutton = document.querySelector(".signup-button");

signupbutton.addEventListener("click", async (e) => {

  e.preventDefault();

  let errormsg = '';
  let email = document.querySelector("#email").value;
  let fullName = document.querySelector("#fullName").value;
  let password = document.querySelector("#password").value;
  let phone = document.querySelector("#phone").value;
  let location = document.querySelector("#location").value;
  let age = document.querySelector("#age").value;

  console.log(email);

  if (!email) {
    errormsg = "Email is required";
  }
  else if (!fullName) {
    errormsg = "FullName is required";
  }
  else if (!password) {
    errormsg = "Password is required";
  }
  else if (!phone || phone.length !== 10) {
    errormsg = "Phone number is not Valid";
  }
  else if (!location) {
    errormsg = "Location is required";
  }
  else if (!age) {
    errormsg = "age is required";
  }
  else {
    let respose = await fetch("../backend/register_seeker.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'email': email, 'name': fullName, 'pass': password, 'age': age, 'location': location, 'phone': parseInt(phone) })
    });

    let rawdata = await respose.text();
    console.log(rawdata);
    let data = JSON.parse(rawdata);
    console.log(data);

    if (data.status === "success") {
      setLoadingState(true);
      setTimeout(() => {
        window.location.href = "../jobseeker/dashboard.html";
      }, 1000)
    }
    else if (data.status === 'duplicate') {
      errormsg = " Account Email is already register ";
    }
  }

  document.querySelector(".error").innerHTML = errormsg;

  document.querySelectorAll("input,textarea").forEach((place) => {
    place.addEventListener("focus", () => {
      document.querySelector(".error").innerHTML = "";
    });
  })


});

function setLoadingState(isLoading) {
  const signupButton = document.getElementById('signupButton');
  const inputs = document.querySelectorAll('input, select');

  if (isLoading) {
    signupButton.disabled = true;
    signupButton.classList.add('loading');
    signupButton.textContent = 'Creating Account...';
    inputs.forEach(input => input.disabled = true);
  } else {
    signupButton.disabled = false;
    signupButton.classList.remove('loading');
    signupButton.textContent = 'Sign Up';
    inputs.forEach(input => input.disabled = false);
  }
}