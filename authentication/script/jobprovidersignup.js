let signupbutton = document.querySelector(".signup-button");

signupbutton.addEventListener("click", async (e) => {

  e.preventDefault();
  let errormsg = '';
  let email = document.querySelector("#email").value;
  let companyName = document.querySelector("#companyName").value;
  let password = document.querySelector("#password").value;
  let phone = document.querySelector("#phone").value;
  let companyLocation = document.querySelector("#companyLocation").value;
  let companyAddress = document.querySelector("#companyAddress").value;
  let companyDescription = document.querySelector("#companyDescription").value;

  if (!email) {
    errormsg = "Email is required";
  }
  else if (!companyName) {
    errormsg = "CompanyName is required";
  }
  else if (!password) {
    errormsg = "Password is required";
  }
  else if (!phone || phone.length !== 10) {
    errormsg = "Phone number is not Valid";
  }
  else if (!companyLocation) {
    errormsg = "CompanyLocation is required";
  }
  else if (!companyAddress) {
    errormsg = "CompanyAddress is required";
  }
  else if (!companyDescription) {
    errormsg = "CompanyDescription is required";
  }
  else {
    let respose = await fetch("../backend/register_provider.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'email': email, 'company_name': companyName, 'pass': password, 'address': companyAddress, 'location': companyLocation, 'description': companyDescription, 'contact_number': parseInt(phone) })
    });

    let rawdata = await respose.text();
    console.log(rawdata);
    let data = JSON.parse(rawdata);
    console.log(data);

    if (data.success === true) {~
      setLoadingState(true);
      setTimeout(() => {
        window.location.href = "../jobprovider/dashboard.html";
      }, 1000)
    }
    else if (data.success === "duplicate") {
      errormsg = " Account Email is already register ";
    }
  }

  document.querySelector(".error").innerHTML = errormsg;

  document.querySelectorAll("input,textarea").forEach((place)=>{
    place.addEventListener("focus", () => {
    document.querySelector(".error").innerHTML = "";
  });
  })

});

function setLoadingState(isLoading) {
  const signupButton = document.getElementById('signupButton');
  const inputs = document.querySelectorAll('input, textarea');

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