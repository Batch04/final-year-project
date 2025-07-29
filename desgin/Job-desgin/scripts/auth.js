// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const roleSelection = document.getElementById('roleSelection');
    const loginForm = document.getElementById('loginForm');
    const jobSeekerForm = document.getElementById('jobSeekerForm');
    const jobProviderForm = document.getElementById('jobProviderForm');
    const roleCards = document.querySelectorAll('.role-card');
    const backButtons = document.querySelectorAll('.back-btn');
    const passwordToggles = document.querySelectorAll('.password-toggle');
    const formTitle = document.getElementById('formTitle');

    // Current page detection
    const isLoginPage = window.location.pathname.includes('login.html');
    const isSignupPage = window.location.pathname.includes('signup.html');

    // Role selection handling
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            
            // Remove selected class from all cards
            roleCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Show appropriate form after a short delay
            setTimeout(() => {
                roleSelection.style.display = 'none';
                
                if (isLoginPage) {
                    // Update form title based on role
                    if (role === 'job-seeker') {
                        formTitle.textContent = 'Login as Job Seeker';
                    } else {
                        formTitle.textContent = 'Login as Job Provider';
                    }
                    loginForm.style.display = 'block';
                } else if (isSignupPage) {
                    if (role === 'job-seeker') {
                        jobSeekerForm.style.display = 'block';
                    } else {
                        jobProviderForm.style.display = 'block';
                    }
                }
            }, 300);
        });
    });

    // Back button handling
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide all forms
            if (loginForm) loginForm.style.display = 'none';
            if (jobSeekerForm) jobSeekerForm.style.display = 'none';
            if (jobProviderForm) jobProviderForm.style.display = 'none';
            
            // Show role selection
            roleSelection.style.display = 'block';
            
            // Remove selected class from all cards
            roleCards.forEach(card => card.classList.remove('selected'));
        });
    });

    // Password toggle functionality
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password strength checker
    const passwordInputs = document.querySelectorAll('input[name="password"]');
    passwordInputs.forEach(input => {
        const strengthBar = input.parentElement.parentElement.querySelector('.strength-bar');
        const strengthText = input.parentElement.parentElement.querySelector('.strength-text');
        
        if (strengthBar && strengthText) {
            input.addEventListener('input', function() {
                const password = this.value;
                const strength = checkPasswordStrength(password);
                
                // Remove existing classes
                strengthBar.classList.remove('weak', 'medium', 'strong');
                
                if (password.length === 0) {
                    strengthText.textContent = 'Password strength';
                    return;
                }
                
                if (strength.score < 3) {
                    strengthBar.classList.add('weak');
                    strengthText.textContent = 'Weak password';
                } else if (strength.score < 5) {
                    strengthBar.classList.add('medium');
                    strengthText.textContent = 'Medium password';
                } else {
                    strengthBar.classList.add('strong');
                    strengthText.textContent = 'Strong password';
                }
            });
        }
    });

    // Password confirmation validation
    const confirmPasswordInputs = document.querySelectorAll('input[name="confirmPassword"]');
    confirmPasswordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const password = this.form.querySelector('input[name="password"]').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Hide loading state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitButton.disabled = false;
                
                // Redirect based on form type
                if (this.id === 'loginFormElement') {
                    // Determine redirect based on selected role
                    const selectedRole = document.querySelector('.role-card.selected')?.dataset.role;
                    if (selectedRole === 'job-seeker') {
                        window.location.href = '../job-seeker/dashboard.html';
                    } else {
                        window.location.href = '../job-provider/dashboard.html';
                    }
                } else if (this.id === 'jobSeekerFormElement') {
                    window.location.href = '../job-seeker/dashboard.html';
                } else if (this.id === 'jobProviderFormElement') {
                    window.location.href = '../job-provider/dashboard.html';
                }
            }, 2000);
        });
    });

    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const label = this.nextElementSibling;
            const fileName = this.files[0]?.name;
            
            if (fileName) {
                label.innerHTML = `<i class="fas fa-check"></i> ${fileName}`;
                label.style.color = '#10b981';
            }
        });
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.textContent.trim();
            alert(`${provider} login would be implemented here`);
        });
    });
});

// Password strength checker function
function checkPasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return { score };
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#0077B5';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

