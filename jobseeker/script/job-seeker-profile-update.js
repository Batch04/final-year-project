document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('profile-settings-form');
    const avatarInput = document.getElementById('profile-avatar');
    const avatarPreview = document.getElementById('avatar-preview');
    const profileAvatarDisplay = document.getElementById('profile-avatar-display');
    const fullNameInput = document.getElementById('full-name');
    const profileNameDisplay = document.querySelector('.profile-name-display');
    const saveButton = document.querySelector('.btn-save');
    const fileUploadDisplay = document.querySelector('.file-upload-display');
    const availabilitySelect = document.getElementById('availability');
    const customAvailabilityInput = document.getElementById('custom-availability');

    // Skills management
    const skillsInput = document.getElementById('skills-input');
    const skillsContainer = document.querySelector('.skills-tags');
    const skillsSuggestions = document.querySelector('.skills-suggestions');

    // Education management
    const educationContainer = document.querySelector('.education-container');
    const addEducationBtn = document.querySelector('.btn-add-education');

    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Profile updated successfully!';
    form.insertBefore(successMessage, form.firstChild);

    // Common skills suggestions
    const commonSkills = [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS', 'SQL', 'Git',
        'Angular', 'Vue.js', 'PHP', 'C++', 'C#', 'Ruby', 'Swift', 'Kotlin',
        'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
        'AWS', 'Azure', 'Google Cloud', 'Linux', 'Windows', 'MacOS',
        'Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign',
        'Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication',
        'Marketing', 'Sales', 'Customer Service', 'Data Analysis', 'Excel'
    ];

    // Image preview functionality
    avatarInput.addEventListener('change', function(e) {
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
                avatarPreview.src = e.target.result;
                profileAvatarDisplay.src = e.target.result;
                
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

    // Drag and drop functionality for avatar upload
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
            avatarInput.files = files;
            avatarInput.dispatchEvent(new Event('change'));
        }
    });

    // Real-time name update
    fullNameInput.addEventListener('input', function(e) {
        const newName = e.target.value.trim();
        profileNameDisplay.textContent = newName || 'Job Seeker';
    });

    // Availability dropdown handling
    availabilitySelect.addEventListener('change', function(e) {
        if (e.target.value === 'custom') {
            customAvailabilityInput.style.display = 'block';
            customAvailabilityInput.classList.add('show');
            customAvailabilityInput.focus();
        } else {
            customAvailabilityInput.style.display = 'none';
            customAvailabilityInput.classList.remove('show');
        }
    });

    // Skills management
    function addSkill(skillText) {
        const trimmedSkill = skillText.trim();
        if (!trimmedSkill) return;

        // Check if skill already exists
        const existingSkills = Array.from(skillsContainer.querySelectorAll('.skill-tag'))
            .map(tag => tag.textContent.replace('×', '').trim());
        
        if (existingSkills.includes(trimmedSkill)) {
            showNotification('Skill already added!', 'warning');
            return;
        }

        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `${trimmedSkill} <i class="fas fa-times"></i>`;
        
        // Add remove functionality
        skillTag.querySelector('i').addEventListener('click', function() {
            skillTag.remove();
        });

        skillsContainer.appendChild(skillTag);
        skillsInput.value = '';
        hideSuggestions();
    }

    function showSuggestions(query) {
        const filteredSkills = commonSkills.filter(skill => 
            skill.toLowerCase().includes(query.toLowerCase()) &&
            !Array.from(skillsContainer.querySelectorAll('.skill-tag'))
                .map(tag => tag.textContent.replace('×', '').trim())
                .includes(skill)
        );

        if (filteredSkills.length > 0 && query.length > 0) {
            skillsSuggestions.innerHTML = '';
            filteredSkills.slice(0, 5).forEach(skill => {
                const suggestion = document.createElement('div');
                suggestion.className = 'skill-suggestion';
                suggestion.textContent = skill;
                suggestion.addEventListener('click', () => addSkill(skill));
                skillsSuggestions.appendChild(suggestion);
            });
            skillsSuggestions.style.display = 'block';
        } else {
            hideSuggestions();
        }
    }

    function hideSuggestions() {
        skillsSuggestions.style.display = 'none';
    }

    skillsInput.addEventListener('input', function(e) {
        showSuggestions(e.target.value);
    });

    skillsInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(e.target.value);
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!skillsInput.contains(e.target) && !skillsSuggestions.contains(e.target)) {
            hideSuggestions();
        }
    });

    // Education management
    function createEducationEntry() {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="education-row">
                <input type="text" placeholder="Degree/Certification" class="form-input education-degree">
                <input type="text" placeholder="Institution" class="form-input education-institution">
            </div>
            <div class="education-row">
                <input type="text" placeholder="Year (e.g., 2020-2024)" class="form-input education-year">
                <button type="button" class="btn-remove-education">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Add remove functionality
        educationEntry.querySelector('.btn-remove-education').addEventListener('click', function() {
            educationEntry.remove();
        });

        return educationEntry;
    }

    addEducationBtn.addEventListener('click', function() {
        const newEntry = createEducationEntry();
        educationContainer.appendChild(newEntry);
        
        // Focus on the first input of the new entry
        newEntry.querySelector('.education-degree').focus();
    });

    // Add remove functionality to existing education entries
    document.querySelectorAll('.btn-remove-education').forEach(btn => {
        btn.addEventListener('click', function() {
            btn.closest('.education-entry').remove();
        });
    });

    // Add remove functionality to existing skill tags
    document.querySelectorAll('.skill-tag i').forEach(removeBtn => {
        removeBtn.addEventListener('click', function() {
            removeBtn.closest('.skill-tag').remove();
        });
    });

    // Form validation
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger-red)';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        // Validate email format
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = 'var(--danger-red)';
            isValid = false;
        }

        // Validate phone number format
        const mobileField = document.getElementById('mobile');
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (mobileField.value && !phoneRegex.test(mobileField.value.replace(/[\s\-\(\)]/g, ''))) {
            mobileField.style.borderColor = 'var(--danger-red)';
            isValid = false;
        }

        return isValid;
    }

    // Form submission
    form.addEventListener('submit',async function(e)  {
        e.preventDefault();

          

        if (!validateForm()) {
            showNotification('Please fix the errors in the form.', 'error');
            return;
        }

        // Show loading state
        saveButton.classList.add('loading');
        saveButton.disabled = true;

        const formData =new FormData(this);
        try{
       const response=await fetch("../backend/update_seeker.php",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:formData
        })
        const text=await response.text();
        console.log("Raw Response",text);
    try{
        const result=JSON.parse(text);
        console.log("Response",result);
              saveButton.classList.add('loading');
        saveButton.disabled = true;
        if(result.status==='success'){
            showNotification(result.message,'info');
        }
        else{
            showNotification(result.message,'error');
        }
    }
      catch(jsonError){
        console.error("Json response error",jsonError);
        console.log("Json error");
      }
      }
     catch(error){
              saveButton.classList.add('loading');
        saveButton.disabled = false;
        showNotification("Server error or fetching ",'error');
        console.log(error);

     }
  

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
    const inputs = form.querySelectorAll('.form-input, .form-select');
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
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', function(e) {
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
    const autoSaveInputs = form.querySelectorAll('.form-input, .form-select');
    
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
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // Add notification styles
        const bgColor = type === 'error' ? '#f8d7da' : type === 'warning' ? '#fff3cd' : '#d4edda';
        const textColor = type === 'error' ? '#721c24' : type === 'warning' ? '#856404' : '#155724';
        const borderColor = type === 'error' ? '#f5c6cb' : type === 'warning' ? '#ffeaa7' : '#c3e6cb';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid ${borderColor};
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


/* Main js */

document.querySelector(".edit-button").addEventListener("click",()=>{

    window.location.href="./job-seeker-profile-update.html";
})

