// Reset Password Page functionality
class ResetPasswordManager {
  constructor() {
    this.isLoading = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    const form = document.getElementById('resetForm');
    const emailInput = document.getElementById('email');
    const backToLoginLink = document.getElementById('backToLogin');

    // Form submission
    form.addEventListener('submit', async(e) => {
      e.preventDefault();
       let email = document.getElementById("email").value;
        fetch("../backend/forgot_password.php",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email:email})
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status==='success'){
              this.showSuccess('Password reset link sent! Check your email inbox');
                window.location.href="verify-otp.html?email="+encodeURIComponent(email);
            }
            else{
              this.showError('data.message');
            }
        });
      this.handleResetPassword();
    });

    // Real-time email validation
    emailInput.addEventListener('input', () => {
      this.clearMessages();
      this.validateEmailField();
    });

    // Email field blur validation
    emailInput.addEventListener('blur', () => {
      this.validateEmailField();
    });

    // Back to login link
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleBackToLogin();
    });

    // Enter key handling
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleResetPassword();
      }
    });
  }

  validateEmailField() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    if (email && !this.isValidEmail(email)) {
      emailInput.style.borderColor = 'var(--error)';
      return false;
    } else if (email) {
      emailInput.style.borderColor = 'var(--success)';
      return true;
    } else {
      emailInput.style.borderColor = '';
      return false;
    }
  }

  async handleResetPassword() {
    if (this.isLoading) return;

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    // Clear previous messages
    this.clearMessages();

    // Validation
    if (!email) {
      this.showError('Please enter your email address');
      emailInput.focus();
      return;
    }

    if (!this.isValidEmail(email)) {
      this.showError('Please enter a valid email address');
      emailInput.focus();
      return;
    }

    // Set loading state
    this.setLoadingState(true);

    try {
      // Simulate API call
      await this.simulateResetPasswordRequest(email);
      
      // Show success message
      this.showSuccess('Password reset link sent! Check your email inbox.');
      
      // Clear the form
      emailInput.value = '';
      emailInput.style.borderColor = '';
      
      console.log(`Password reset requested for: ${email}`);
      
    } catch (error) {
      console.error('Reset password error:', error);
      this.showError('Something went wrong. Please try again later.');
    } finally {
      this.setLoadingState(false);
    }
  }

  async simulateResetPasswordRequest(email) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different scenarios based on email
    if (email.includes('invalid')) {
      throw new Error('Invalid email address');
    }
    
    if (email.includes('notfound')) {
      throw new Error('Email not found');
    }
    
    // Success case
    return { success: true, message: 'Reset link sent' };
  }

  handleBackToLogin() {
    // In a real application, this would navigate to the login page
    alert('Navigating back to Login page...\n\nIn a real application, this would redirect to the login page.');
    console.log('Back to Login clicked');
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Hide success message if showing
    const successElement = document.getElementById('successMessage');
    successElement.classList.remove('show');
  }

  showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = message;
    successElement.classList.add('show');
    
    // Hide error message if showing
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
  }

  clearMessages() {
    const errorElement = document.getElementById('errorMessage');
    const successElement = document.getElementById('successMessage');
    
    errorElement.classList.remove('show');
    successElement.classList.remove('show');
  }

  setLoadingState(isLoading) {
    this.isLoading = isLoading;
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('email');
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      emailInput.disabled = true;
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      emailInput.disabled = false;
    }
  }
}

// Initialize the reset password manager when the DOM is loaded
let resetPasswordManager;

document.addEventListener('DOMContentLoaded', () => {
  resetPasswordManager = new ResetPasswordManager();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  console.log('Navigation state changed');
});
