document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('company-settings-form');
    const logoInput = document.getElementById('company-logo');
    const logoPreview = document.getElementById('logo-preview');
    const companyLogoDisplay = document.getElementById('company-logo-display');
    const companyNameInput = document.getElementById('company-name');
    const companyNameDisplay = document.querySelector('.company-name-display');
    const saveButton = document.querySelector('.btn-save');
    const fileUploadDisplay = document.querySelector('.file-upload-display');

    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Settings saved successfully!';
    form.insertBefore(successMessage, form.firstChild);

    // Image preview functionality
    logoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                logoPreview.src = e.target.result;
                companyLogoDisplay.src = e.target.result;
                
                // Add upload success animation
                fileUploadDisplay.style.borderColor = 'var(--blue)';
                fileUploadDisplay.style.backgroundColor = 'rgba(3, 132, 252, 0.05)';
                
                setTimeout(() => {
                    fileUploadDisplay.style.borderColor = '';
                    fileUploadDisplay.style.backgroundColor = '';
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop functionality for logo upload
    fileUploadDisplay.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = 'var(--blue)';
        this.style.backgroundColor = 'rgba(3, 132, 252, 0.05)';
    });

    fileUploadDisplay.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        this.style.backgroundColor = '';
    });

    fileUploadDisplay.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '';
        this.style.backgroundColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            logoInput.files = files;
            logoInput.dispatchEvent(new Event('change'));
        }
    });

    // Real-time company name update
    companyNameInput.addEventListener('input', function(e) {
        const newName = e.target.value.trim();
        companyNameDisplay.textContent = newName || 'Company Name';
    });

    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        // Validate email format
        const emailField = document.getElementById('contact-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#dc3545';
            isValid = false;
        }

        // Validate URL formats
        const urlFields = ['website', 'linkedin', 'twitter', 'facebook'];
        urlFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field.value && !isValidUrl(field.value)) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            }
        });

        return isValid;
    }

    // URL validation helper
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showNotification('Please fix the errors in the form.', 'error');
            return;
        }

        // Show loading state
        saveButton.classList.add('loading');
        saveButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Hide loading state
            saveButton.classList.remove('loading');
            saveButton.disabled = false;

            // Show success message
            successMessage.classList.add('show');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);

            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }, 2000);
    });

    // Input focus animations
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = '';
            // Clear error styling on blur if field is now valid
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('contact-phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{1})(\d{3})/, '+$1 ($2)');
        } else if (value.length >= 1) {
            value = '+' + value;
        }
        e.target.value = value;
    });

    // Auto-save functionality (optional)
    let autoSaveTimeout;
    const autoSaveInputs = form.querySelectorAll('.form-input, .form-textarea');
    
    autoSaveInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                // Auto-save logic could go here
                console.log('Auto-saving...');
            }, 3000);
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            color: ${type === 'error' ? '#721c24' : '#155724'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Add animation keyframes to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize form with animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
    });
});

