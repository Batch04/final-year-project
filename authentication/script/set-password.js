// DOM Elements
const passwordForm = document.getElementById('passwordForm');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');

// Eye toggle functionality
document.querySelectorAll('.eye-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        const eyeIcon = this.querySelector('.eye-icon');
        
        if (targetInput.type === 'password') {
            targetInput.type = 'text';
            eyeIcon.textContent = '🙈';
        } else {
            targetInput.type = 'password';
            eyeIcon.textContent = '👁️';
        }
    });
});

// Show message function
function showMessage(element, message, isError = true) {
    // Hide other message
    const otherMessage = isError ? successMessage : errorMessage;
    otherMessage.classList.remove('show');
    otherMessage.textContent = '';
    
    // Show current message
    element.textContent = message;
    element.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        element.classList.remove('show');
    }, 5000);
}

// Clear messages function
function clearMessages() {
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
    errorMessage.textContent = '';
    successMessage.textContent = '';
}

// Validation function
function validatePasswords() {
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // Clear previous messages
    clearMessages();
    
    // Check if fields are empty
    if (!newPassword || !confirmPassword) {
        showMessage(errorMessage, 'Please fill out both fields.', true);
        return false;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        showMessage(errorMessage, 'Passwords do not match.', true);
        return false;
    }
    
    // Check minimum length
    if (newPassword.length < 6) {
        showMessage(errorMessage, 'Password must be at least 6 characters long.', true);
        return false;
    }
    
    return true;
}

// Form submission
passwordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate passwords
    if (!validatePasswords()) {
        // Add shake animation to form
        passwordForm.classList.add('shake');
        setTimeout(() => {
            passwordForm.classList.remove('shake');
        }, 500);
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate different scenarios based on password
        const password = newPasswordInput.value.trim();
        
        if (password === 'error') {
            throw new Error('Server error occurred. Please try again.');
        }
        
        // Success
        showMessage(successMessage, 'Password successfully changed!', false);
        
        // Reset form after success
        setTimeout(() => {
            passwordForm.reset();
            clearMessages();
        }, 3000);
        
    } catch (error) {
        showMessage(errorMessage, error.message, true);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Real-time validation feedback
newPasswordInput.addEventListener('input', function() {
    if (this.value.length > 0 && confirmPasswordInput.value.length > 0) {
        if (this.value === confirmPasswordInput.value) {
            this.style.borderColor = '#28a745';
            confirmPasswordInput.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#dc3545';
            confirmPasswordInput.style.borderColor = '#dc3545';
        }
    } else {
        this.style.borderColor = '#e1e5e9';
        confirmPasswordInput.style.borderColor = '#e1e5e9';
    }
});

confirmPasswordInput.addEventListener('input', function() {
    if (this.value.length > 0 && newPasswordInput.value.length > 0) {
        if (this.value === newPasswordInput.value) {
            this.style.borderColor = '#28a745';
            newPasswordInput.style.borderColor = '#28a745';
        } else {
            this.style.borderColor = '#dc3545';
            newPasswordInput.style.borderColor = '#dc3545';
        }
    } else {
        this.style.borderColor = '#e1e5e9';
        newPasswordInput.style.borderColor = '#e1e5e9';
    }
});

// Clear validation colors on focus
newPasswordInput.addEventListener('focus', function() {
    clearMessages();
});

confirmPasswordInput.addEventListener('focus', function() {
    clearMessages();
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.classList.contains('input-field')) {
        passwordForm.dispatchEvent(new Event('submit'));
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    newPasswordInput.focus();
});


const params = new URLSearchParams(window.location.search);
    document.getElementById("token").value = params.get("token")||"";
  document.getElementById("email").value = params.get("email")||"";


  document.getElementById("passwordForm").addEventListener("submit", function(e){
      e.preventDefault();
      let email = document.getElementById("email").value;
      let token = document.getElementById("token").value;
      let password = document.getElementById("newPassword").value;
      let confirm_password = document.getElementById("confirmPassword").value;

      if(password !== confirm_password){
          document.getElementById("errorMessage").innerText = "Passwords do not match";
          return;
      }

      fetch("../backend/reset_password.php", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ email:email, token:token, password:password })
      })
      .then(res => res.json())
      .then(data => {
          document.getElementById("errorMessage").innerText = data.message;
          if(data.status === "success"){
            document.getElementById("successMessage").innerText=data.message;
              setTimeout(()=>{ window.location.href = "loginpage.html"; }, 2000);
          }
      });
  });