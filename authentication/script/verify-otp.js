// Verify OTP Page functionality
class VerifyOTPManager {
  constructor() {
    this.isLoading = false;
    this.resendTimer = 0;
    this.resendInterval = null;
    this.setupEventListeners();
    this.startResendTimer();
  }



  setupEventListeners() {
    const form = document.getElementById('verifyForm');
    const otpInput = document.getElementById('otp');
    const resendLink = document.getElementById('resendLink');

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleVerifyOTP();
    });

    // OTP input validation and formatting
    otpInput.addEventListener('input', (e) => {
      this.clearMessages();
      this.formatOTPInput(e);
      this.validateOTPField();
    });

    // OTP field blur validation
    otpInput.addEventListener('blur', () => {
      this.validateOTPField();
    });

    // Resend OTP link
    resendLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleResendOTP();
    });

    // Enter key handling
    otpInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleVerifyOTP();
      }
    });

    // Paste handling for OTP
    otpInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      const cleanPaste = paste.replace(/\D/g, '').slice(0, 6);
      otpInput.value = cleanPaste;
      this.validateOTPField();
    });
  }

  formatOTPInput(e) {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
  }

  validateOTPField() {
    const otpInput = document.getElementById('otp');
    const otp = otpInput.value.trim();

    if (otp && otp.length === 6 && /^\d{6}$/.test(otp)) {
      otpInput.style.borderColor = 'var(--success)';
      return true;
    } else if (otp && (otp.length !== 6 || !/^\d{6}$/.test(otp))) {
      otpInput.style.borderColor = 'var(--error)';
      return false;
    } else {
      otpInput.style.borderColor = '';
      return false;
    }
  }

  async handleVerifyOTP() {
    if (this.isLoading) return;

    const otpInput = document.getElementById('otp');
    const otp = otpInput.value.trim();

    // Clear previous messages
    this.clearMessages();

    // Validation
    if (!otp) {
      this.showError('Please enter the OTP');
      otpInput.focus();
      return;
    }

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      this.showError('Please enter a valid 6-digit OTP');
      otpInput.focus();
      return;
    }

    // Set loading state
    this.setLoadingState(true);

    try {
      // Simulate API call
      await this.simulateOTPVerification(otp);
      
      // Show success message
      this.showSuccess('OTP verified successfully! Redirecting...');
      
      // Clear the form
      otpInput.value = '';
      otpInput.style.borderColor = '';
      
      console.log(`OTP verified: ${otp}`);
      
      // Simulate redirect after success
      setTimeout(() => {
        alert('OTP verification successful!\n\nIn a real application, you would be redirected to the next page.');
      }, 2000);
      
    } catch (error) {
      console.error('OTP verification error:', error);
      this.showError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      this.setLoadingState(false);
    }
  }

  async simulateOTPVerification(otp) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate different scenarios based on OTP
    if (otp === '000000') {
      throw new Error('Invalid OTP format');
    }
    
    if (otp === '111111') {
      throw new Error('OTP has expired');
    }
    
    if (otp === '999999') {
      throw new Error('Too many attempts. Please request a new OTP.');
    }
    
    // For demo purposes, accept 123456 as valid OTP
    if (otp !== '123456') {
      throw new Error('Invalid OTP. Please check and try again.');
    }
    
    // Success case
    return { success: true, message: 'OTP verified successfully' };
  }

  async handleResendOTP() {
    const resendLink = document.getElementById('resendLink');
    
    if (resendLink.classList.contains('disabled') || this.resendTimer > 0) {
      return;
    }

    try {
      // Clear messages
      this.clearMessages();
      
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.showSuccess('New OTP sent to your email!');
      
      // Start resend timer
      this.startResendTimer();
      
      console.log('OTP resent successfully');
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      this.showError('Failed to resend OTP. Please try again.');
    }
  }

  startResendTimer() {
    this.resendTimer = 60; // 60 seconds
    const resendLink = document.getElementById('resendLink');
    const timerDisplay = document.getElementById('timerDisplay');
    
    resendLink.classList.add('disabled');
    
    this.resendInterval = setInterval(() => {
      if (this.resendTimer > 0) {
        timerDisplay.textContent = `Resend available in ${this.resendTimer}s`;
        this.resendTimer--;
      } else {
        timerDisplay.textContent = '';
        resendLink.classList.remove('disabled');
        clearInterval(this.resendInterval);
      }
    }, 1000);
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
    const otpInput = document.getElementById('otp');
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      otpInput.disabled = true;
    } else {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      otpInput.disabled = false;
    }
  }
}

// Initialize the verify OTP manager when the DOM is loaded
let verifyOTPManager;

document.addEventListener('DOMContentLoaded', () => {
  verifyOTPManager = new VerifyOTPManager();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', (event) => {
  console.log('Navigation state changed');
});



const params=new URLSearchParams(window.location.search);
document.getElementById("email").value=params.get("email");

        document.getElementById("verifyForm").addEventListener("submit",function(e){
            e.preventDefault();
            let email=document.getElementById("email").value;
            let otp=document.getElementById("otp").value;
            fetch("../backend/verify_otp.php",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:email,otp:otp})
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.status==="success"){
                    window.location.href="set-password.html?email="+encodeURIComponent(email)+"&token="+data.token;
                }
            });

        });