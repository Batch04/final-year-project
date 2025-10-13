let data = {
    companyname: "",
    email: "",
    phone: 0,
    location: "",
    description: ""
}

let companydata = {};

async function getdata(){
    let res = await fetch("../backend/get_provider.php");
    let text = await res.text();
    console.log(text);
    let real = JSON.parse(text);
    companydata = real.user;
    console.log(companydata);
}


function genrateprofile(){
    let profilehtml = ``;

    profilehtml +=`
    
         <div class="form-group">
                        <label for="company-logo" class="form-label">
                            <i class="fas fa-image"></i>
                            Change Company Logo
                        </label>
                        <div class="file-upload-container">
                            <input type="file" id="company-logo" name="company-logo" accept="image/*" class="file-input">
                            <div class="file-upload-display">
                                <div class="upload-preview">
                                    <img id="logo-preview" src="images/logo.png" alt="Logo Preview">
                                </div>
                                <div class="upload-text">
                                    <span class="upload-label">Click to upload or drag and drop</span>
                                    <span class="upload-hint">PNG, JPG up to 5MB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Company Name and Description Row -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="company-name" class="form-label">
                                <i class="fas fa-building"></i>
                                Company Name
                            </label>
                            <input type="text" id="company-name" name="company_name" value="${companydata.company_name !== ""?`${companydata.company_name}`:`NOT PROVIDED`}" class="form-input" required>
                        </div>

                        <div class="form-group">
                            <label for="contact-email" class="form-label">
                                <i class="fas fa-envelope"></i>
                                Contact Email
                            </label>
                            <input type="email" id="contact-email" name="contact-email" value="${companydata.email !== ""?`${companydata.email}`:`NOT PROVIDED`}" class="form-input" required>
                        </div>
                    </div>

                    <!-- Company Description -->
                    <div class="form-group">
                        <label for="company-description" class="form-label">
                            <i class="fas fa-align-left"></i>
                            Company Description
                        </label>
                        <textarea id="company-description" name="company-description" rows="4" class="form-textarea" placeholder="Tell us about your company...">${companydata.company_description !== ""?`${companydata.company_description}`:`NOT PROVIDED`}</textarea>
                    </div>

                    <!-- Contact Phone and Location Row -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contact-phone" class="form-label">
                                <i class="fas fa-phone"></i>
                                Contact Phone
                            </label>
                            <input type="tel" id="contact-phone" value="${companydata.contact_number !== "0"?`${companydata.contact_number}`:`NOT PROVIDED`}" name="contact-phone" maxlength="10" class="form-input">
                        </div>

                        <div class="form-group">
                            <label for="location" class="form-label">
                                <i class="fas fa-map-marker-alt"></i>
                                Location
                            </label>
                            <input type="text" id="location" name="location" value="${companydata.location !== ""?`${companydata.location}`:`NOT PROVIDED`}" class="form-input">
                        </div>
                    </div>

                    <!-- Save Changes Button -->
                    <div class="form-actions">
                        <button type="submit"  name="submit"  class="btn-save">
                            <i class="fas fa-save"></i>
                            Save Changes
                        </button>
                    </div>

    `;

    document.querySelector(".settings-form").innerHTML=profilehtml;

}

async function main() {

    await getdata();
    genrateprofile();

    document.querySelector(".company-name").innerHTML=companydata.company_name;
    document.querySelector(".company-loaction").innerHTML=companydata.location;
    // Get form elements
    const form = document.getElementById('company-settings-form');
    const logoInput = document.getElementById('company-logo');
    const logoPreview = document.getElementById('logo-preview');
    const companyLogoDisplay = document.getElementById('company-logo-display');
    const companyNameInput = document.getElementById('company-name');
    const companyNameDisplay = document.querySelector('.company-name');
    const saveButton = document.querySelector('.btn-save');
    const fileUploadDisplay = document.querySelector('.file-upload-display');




    // Image preview functionality
    logoInput.addEventListener('change', function (e) {
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
            reader.onload = function (e) {
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
    fileUploadDisplay.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.style.borderColor = 'var(--blue)';
        this.style.backgroundColor = 'rgba(3, 132, 252, 0.05)';
    });

    fileUploadDisplay.addEventListener('dragleave', function (e) {
        e.preventDefault();
        this.style.borderColor = '';
        this.style.backgroundColor = '';
    });

    fileUploadDisplay.addEventListener('drop', function (e) {
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
    companyNameInput.addEventListener('input', function (e) {
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

        return isValid;
    }




    // Input focus animations
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = '';
            // Clear error styling on blur if field is now valid
            if (this.value.trim()) {
                this.style.borderColor = '';
            }
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('contact-phone');
    phoneInput.addEventListener('input', function (e) {
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
        input.addEventListener('input', function () {
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



    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!validateForm()) {
            showNotification('Please fix the errors in the form.', 'error');
            return;
        }
        data.companyname = companyNameInput.value;
        data.email = document.getElementById("contact-email").value;
        data.phone = document.getElementById("contact-phone").value;
        data.location = document.getElementById("location").value;
        data.description = document.getElementById("company-description").value;

        // Show loading state
        saveButton.classList.add('loading');
        saveButton.disabled = true;
        saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        let result = [];
        try {

            let res = await fetch("../backend/update-provider-profile.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            let text = await res.text();
            console.log(text);
             result = JSON.parse(text);
            console.log(result);
        } catch (e) {
            showNotification("Server error or fetching ", 'error');
            console.log(e);

        } finally {

            saveButton.classList.remove('loading');
            saveButton.disabled = false;

            setTimeout(() => {
                saveButton.innerHTML = '  <i class="fas fa-save"></i> Save Changes';
                if (result.status === 'success') {
                    showNotification(result.message, 'info');
                    location.reload();
                }
                else {
                    showNotification(result.message, 'error');
                }

            }, 3000);

        }

    });

     window.addEventListener("pageshow", async function (event) {
        if (event.persisted) {
            main();
        }
    });

    document.addEventListener("visibilitychange", async function () {
        if (document.visibilityState === "visible") {
            main();
        }
    });
};

main();