// Login page functionality
class LoginManager {
  constructor() {
    this.setupEventListeners();
    this.setupFormValidation();
  }

  setupEventListeners() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const signupLink = document.getElementById('signupLink');
    const backHomeLink = document.getElementById('backHome');

    // Form submission
    form.addEventListener('submit', (e) => this.handleLogin(e));

    // Real-time validation
    emailInput.addEventListener('blur', () => this.validateEmail());
    passwordInput.addEventListener('blur', () => this.validatePassword());
    
    // Clear message on input focus
    emailInput.addEventListener('focus', () => this.clearMessage());
    passwordInput.addEventListener('focus', () => this.clearMessage());

    // Navigation links
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showMessage('Password reset functionality would be implemented here', 'success');
    });

    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showMessage('Redirecting to sign up page...', 'success');
      // In a real app, this would navigate to the signup page
      setTimeout(() => {
        this.showMessage('Sign up page would load here', 'success');
      }, 1000);
    });

    backHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showMessage('Returning to home page...', 'success');
      // In a real app, this would navigate to the home page
      setTimeout(() => {
        this.showMessage('Home page would load here', 'success');
      }, 1000);
    });

    // Enter key handling for better UX
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !loginButton.disabled) {
        form.requestSubmit();
      }
    });
  }

  setupFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Email validation pattern
    this.emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Password requirements (at least 6 characters for demo)
    this.minPasswordLength = 6;
  }

  validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    if (!email) {
      this.showMessage('Email address is required', 'error');
      return false;
    }
    
    if (!this.emailPattern.test(email)) {
      this.showMessage('Please enter a valid email address', 'error');
      return false;
    }
    
    return true;
  }

  validatePassword() {
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;
    
    if (!password) {
      this.showMessage('Password is required', 'error');
      return false;
    }
    
    if (password.length < this.minPasswordLength) {
      this.showMessage(`Password must be at least ${this.minPasswordLength} characters long`, 'error');
      return false;
    }
    
    return true;
  }

  async handleLogin(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Clear previous messages
    this.clearMessage();

    // Validate inputs
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Simulate API call
      await this.simulateLogin(email, password);
      
      // Success
      this.showMessage('Login successful! Redirecting...', 'success');
      
      // In a real app, you would redirect to the dashboard
      setTimeout(() => {
        this.showMessage('Welcome to your dashboard!', 'success');
      }, 1500);
      
    } catch (error) {
      // Handle different error scenarios
      if (error.message === 'INVALID_CREDENTIALS') {
        this.showMessage('Invalid email or password. Please try again.', 'error');
      } else if (error.message === 'ACCOUNT_NOT_FOUND') {
        this.showMessage('Account not found. Please check your email address.', 'error');
      } else if (error.message === 'ACCOUNT_LOCKED') {
        this.showMessage('Account temporarily locked. Please try again later.', 'error');
      } else {
        this.showMessage('Login failed. Please try again.', 'error');
      }
    } finally {
      this.setLoadingState(false);
    }
  }

  async simulateLogin(email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo logic - in a real app, this would be an API call
    const validAccounts = [
      { email: 'demo@example.com', password: 'demo123' },
      { email: 'user@test.com', password: 'password' },
      { email: 'admin@site.com', password: 'admin123' }
    ];
    
    const account = validAccounts.find(acc => 
      acc.email.toLowerCase() === email.toLowerCase()
    );
    
    if (!account) {
      throw new Error('ACCOUNT_NOT_FOUND');
    }
    
    if (account.password !== password) {
      throw new Error('INVALID_CREDENTIALS');
    }
    
    // Success case
    return { success: true, user: { email: account.email } };
  }

  showMessage(text, type = 'error') {
    const messageElement = document.getElementById('messageDisplay');
    messageElement.textContent = text;
    messageElement.className = `message ${type} show`;
  }

  clearMessage() {
    const messageElement = document.getElementById('messageDisplay');
    messageElement.className = 'message';
    messageElement.textContent = '';
  }

  setLoadingState(isLoading) {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (isLoading) {
      loginButton.disabled = true;
      loginButton.classList.add('loading');
      loginButton.textContent = 'Signing In...';
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
}

// Initialize the login manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoginManager();
});


// Add some demo functionality for testing
window.addEventListener('load', () => {
  console.log('Login page loaded successfully!');
});