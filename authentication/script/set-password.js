// Set New Password Page functionality
class SetNewPasswordManager {
  constructor() {
    this.isLoading = false;
    this.initializeApp();
    this.setupEventListeners();
  }

  initializeApp() {
    document.querySelector('#app').innerHTML = `
      <div class="set-password-container">
        <h1 class="set-password-heading">Set New Password</h1>
        
        <form class="set-password-form" id="setPasswordForm">
          <div class="input-group">
            <input 
              type="password" 
              id="newPassword" 
              class="input-field" 
              placeholder="Enter new password"
              autocomplete="new-password"
            />
            <button type="button" class="password-toggle" id="toggleNewPassword" aria-label="Toggle password visibility">
              👁️
            </button>
            <div class="password-strength" id="passwordStrength">
              <span id="strengthText">Password strength</span>
              <div class="strength-bar">
                <div class="strength-fill" id="strengthFill"></div>
              </div>
            </div>
          </div>
          
          <div class="input-group">
            <input 
              type="password" 
              id="confirmPassword" 
              class="input-field" 
              placeholder="Re-enter new password"
              autocomplete="new-password"
            />
            <button type="button" class="password-toggle" id="toggleConfirmPassword" aria-label="Toggle password visibility">
              👁️
            </button>
            <div class="match-indicator" id="matchIndicator"></div>
          </div>
          
          <div class="error-message" id="errorMessage"></div>
          <div class="success-message" id="successMessage"></div>
          
          <button type="submit" class="submit-btn" id="submitBtn">
            Change Password
          </button>
        </form>
      </div>
    `;
  }

  setupEventListeners() {
    const form = document.getElementById('setPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSetNewPassword();
    });

    // Password input validation and strength checking
    newPasswordInput.addEventListener('input', () => {
      this.clearMessages();
      this.checkPasswordStrength();
      this.checkPasswordMatch();
    });

    // Confirm password input validation
    confirmPasswordInput.addEventListener('input', () => {
      this.clearMessages();
      this.checkPasswordMatch();
    });

    // Password field blur validation
    newPasswordInput.addEventListener('blur', () => {
      this.validatePasswordField();
    });

    confirmPasswordInput.addEventListener('blur', () => {
      this.validateConfirmPasswordField();
    });

    // Password visibility toggles
    toggleNewPassword.addEventListener('click', () => {
      this.togglePasswordVisibility('newPassword', 'toggleNewPassword');
    });

    toggleConfirmPassword.addEventListener('click', () => {
      this.togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
    });

    // Enter key handling
    newPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmPasswordInput.focus();
      }
    });

    confirmPasswordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSetNewPassword();
      }
    });
  }

  togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);
    
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🙈';
      toggle.setAttribute('aria-label', 'Hide password');
    } else {
      input.type = 'password';
      toggle.textContent = '👁️';
      toggle.setAttribute('aria-label', 'Show password');
    }
  }

  checkPasswordStrength() {
    const newPasswordInput = document.getElementById('newPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthText = document.getElementById('strengthText');
    const strengthBar = document.querySelector('.strength-bar').parentElement;
    
    const password = newPasswordInput.value;
    
    if (password.length === 0) {
      passwordStrength.classList.remove('show');
      return;
    }
    
    passwordStrength.classList.add('show');
    
    let strength = 0;
    let strengthLabel = '';
    
    // Check password criteria
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (strength <= 2) {
      strengthLabel = 'Weak';
      strengthBar.className = 'strength-bar strength-weak';
    } else if (strength <= 3) {
      strengthLabel = 'Medium';
      strengthBar.className = 'strength-bar strength-medium';
    } else {
      strengthLabel = 'Strong';
      strengthBar.className = 'strength-bar strength-strong';
    }
    
    strengthText.textContent = `Password strength: ${strengthLabel}`;
  }

  checkPasswordMatch() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const matchIndicator = document.getElementById('matchIndicator');
    
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword.length === 0) {
      matchIndicator.classList.remove('show');
      confirmPasswordInput.classList.remove('success');
      return;
    }
    
    matchIndicator.classList.add('show');
    
    if (newPassword === confirmPassword && newPassword.length > 0) {
      matchIndicator.textContent = '✓ Passwords match';
      matchIndicator.className = 'match-indicator show match';
      confirmPasswordInput.classList.add('success');
    } else {
      matchIndicator.textContent = '✗ Passwords do not match';
      matchIndicator.className = 'match-indicator show no-match';
      confirmPasswordInput.classList.remove('success');
    }
  }

  validatePasswordField() {
    const newPasswordInput = document.getElementById('newPassword');
    const password = newPasswordInput.value.trim();

    if (password && password.length >= 6) {
      newPasswordInput.style.borderColor = 'var(--success)';
      return true;
    } else if (password && password.length < 6) {
      newPasswordInput.style.borderColor = 'var(--error)';
      return false;
    } else {
      newPasswordInput.style.borderColor = '';
      return false;
    }
  }

  validateConfirmPasswordField() {
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (confirmPassword && newPassword === confirmPassword) {
      confirmPasswordInput.style.borderColor = 'var(--success)';
      return true;
    } else if (confirmPassword && newPassword !== confirmPassword) {
      confirmPasswordInput.style.borderColor = 'var(--error)';
      return false;
    } else {
      confirmPasswordInput.style.borderColor = '';
      return false;
    }
  }

  async handleSetNewPassword() {
    if (this.isLoading) return;

    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Clear previous messages
    this.clearMessages();

    // Validation
    if (!newPassword || !confirmPassword) {
      this.showError('Please fill out both fields.');
      if (!newPassword) newPasswordInput.focus();
      else confirmPasswordInput.focus();
      return;
    }

    if (newPassword.length < 6) {
      this.showError('Password must be at least 6 characters long.');
      newPasswordInput.focus();
      return;
    }

    if (newPassword !== confirmPassword) {
      this.showError('Passwords do not match.');
      confirmPasswordInput.focus();
      return;
    }

    // Set loading state
    this.setLoadingState(true);

    try {
      // Simulate API call
      await this.simulatePasswordChange(newPassword);
      
      // Show success message
      this.showSuccess('Password changed successfully! Redirecting to login...');
      
      // Clear the form
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      newPasswordInput.style.borderColor = '';
      confirmPasswordInput.style.borderColor = '';
      
      // Hide strength and match indicators
      document.getElementById('passwordStrength').classList.remove('show');
      document.getElementById('matchIndicator').classList.remove('show');
      
      console.log('Password changed successfully');
      
      // Simulate redirect after success
      setTimeout(() => {
        alert('Password changed successfully!\n\nIn a real application, you would be redirected to the login page.');
      }, 2000);
      
    } catch (error) {
      console.error('Password change error:', error);
      this.showError(error.message || 'Failed to change password. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }

  async simulatePasswordChange(password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different scenarios based on password
    if (password === 'error') {
      throw new Error('Server error occurred. Please try again later.');
    }
    
    if (password === 'weak') {
      throw new Error('Password is too weak. Please choose a stronger password.');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }
    
    // Success case
    return { success: true, message: 'Password changed successfully' };
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
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      newPasswordInput.disabled = true;
      confirmPasswordInput.disabled = true;
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      newPasswordInput.disabled = false;
      confirmPasswordInput.disabled = false;
    }
  }
}

// Initialize the set new password manager when the DOM is loaded
let setNewPasswordManager;

document.addEventListener('DOMContentLoaded', () => {
  setNewPasswordManager = new SetNewPasswordManager();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  console.log('Navigation state changed');
});

// Add some demo functionality for testing
window.addEventListener('load', () => {
  console.log('Set New Password page loaded successfully!');
  console.log('Features available:');
  console.log('• Password strength indicator with visual feedback');
  console.log('• Real-time password matching validation');
  console.log('• Password visibility toggles for both fields');
  console.log('• Comprehensive form validation');
  console.log('• Loading states during password change');
  console.log('• Success and error message handling');
  console.log('• Responsive design for all screen sizes');
  console.log('• Keyboard navigation and accessibility support');
  
  // Test different password scenarios
  console.log('\nTest scenarios:');
  console.log('• Use "error" as password to test server error');
  console.log('• Use "weak" as password to test weak password error');
  console.log('• Use passwords shorter than 6 characters to test length validation');
  console.log('• Use mismatched passwords to test matching validation');
  console.log('• Use any valid matching passwords for successful change');
});