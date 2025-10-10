
let userdata = [];

async function getuserdata() {
    let data = await fetch("../backend/get_seeker.php");
    let res = await data.text();
    console.log(res);
    let realdata = JSON.parse(res);
    userdata = realdata.user;
    console.log(userdata);
}

function genrateeducation() {
    let education = [];
    let edu = [];
    let educationhtml = "";
    education = userdata.education.split("\n");
    education.forEach((e1) => {
        if (e1 !== "") {
            edu = e1.split(",");
            educationhtml += `
                <div class="education-entry">
                    <div class="education-row">
                        <input type="text" placeholder="Degree/Certification"
                            class="form-input education-degree" value="${edu[0].trim()}">
                        <input type="text" placeholder="Institution"
                            class="form-input education-institution"
                            value="${edu[1].trim()}">
                    </div>
                    <div class="education-row">
                        <input type="text" placeholder="Year (e.g., 2024-202)"
                            class="form-input education-year" value="${edu[2].trim()}">
                        <button type="button" class="btn-remove-education">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>    
            
            `
        }


    });

    return educationhtml;
}


function genrateskils() {
    let skills = [];
    let skillshtml = "";
    skills = userdata.skills.split(",");
    skills.forEach((s) => {
        if (s !== "") {
            skillshtml += `
            
                <span class="skill-tag">${s.trim()}<i class="fas fa-times"></i></span>
            `
        }
    });
    return skillshtml;
}


function genrateprofile() {

    document.querySelector(".profile-name-display").innerHTML=(userdata.name !== "") ? `${userdata.name}` : `seeker`;
    let updateprofilehtml = "";
    updateprofilehtml = `
    
        
                    <div class="form-group">
                        <label for="profile-avatar" class="form-label">
                            <i class="fas fa-camera"></i>
                            Profile Picture
                        </label>
                        <div class="file-upload-container">
                            <input type="file" id="profile-avatar" name="profile-avatar" accept="image/*"
                                class="file-input">
                            <div class="file-upload-display">
                                <div class="upload-preview">
                                    <img id="avatar-preview" src="images/job-seeker-avatar.png" alt="Avatar Preview">
                                </div>
                                <div class="upload-text">
                                    <span class="upload-label">Click to upload or drag and drop</span>
                                    <span class="upload-hint">PNG, JPG up to 5MB</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="full-name" class="form-label">
                                <i class="fas fa-user"></i>
                                Full Name
                            </label>
                            <input type="text" id="full-name" name="full-name" value="${(userdata.name !== "") ? `${userdata.name}` : `NOT PROVIDED`}" class="form-input"
                                required>
                        </div>

                        <div class="form-group">
                            <label for="email" class="form-label">
                                <i class="fas fa-envelope"></i>
                                Email Address
                            </label>
                            <input type="email" id="email" name="email" value="${(userdata.email !== "") ? `${userdata.email}` : `NOT PROVIDED`}"
                                class="form-input" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="mobile" class="form-label">
                                <i class="fas fa-phone"></i>
                                Mobile Number
                            </label>
                            <input type="text" id="mobile" name="mobile" maxlength="10" value="${(userdata.location !== "") ? `${userdata.location}` : `NOT PROVIDED`}" class="form-input" required>
                        </div>

                        <div class="form-group">
                            <label for="location" class="form-label">
                                <i class="fas fa-map-marker-alt"></i>
                                Location
                            </label>
                            <input type="text" id="location" name="location" value="${(userdata.phone !== 0) ? `${userdata.phone}` : `NOT PROVIDED`}"
                                class="form-input" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="mobile" class="form-label">
                                <i class="fas fa-birthday-cake"></i>
                                Age
                            </label>
                            <input type="text" id="age" name="age" maxlength="3" value="${(userdata.age !== 0) ? `${userdata.age}` : `NOT PROVIDED`}" class="form-input" required>
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="about-me" class="form-label">
                            <i class="fas fa-user-tie"></i>
                            About Me
                        </label>
                        <textarea id="about-me" name="about_me" class="form-textarea" rows="5" maxlength="500"
                            placeholder="Write a compelling professional summary (max 500 characters)">${(userdata.about !== "") ? `${userdata.about}` : `NOT PROVIDED`}
                            </textarea>
                        <small class="char-count-display">0 / 500 characters</small>
                    </div>

                    <div class="form-group">
                        <label for="education" class="form-label">
                            <i class="fas fa-graduation-cap"></i>
                            Education
                        </label>
                        <div class="education-container" name="education">
                            ${genrateeducation()}
                        </div>
                        <button type="button" class="btn-add-education">
                            <i class="fas fa-plus"></i>
                            Add Education
                        </button>
                    </div>

                    <div class="form-group">
                        <label for="skills" class="form-label">
                            <i class="fas fa-tools"></i>
                            Skills
                        </label>
                        <div class="skills-container" name="skills">
                            <div class="skills-input-container">
                                <input type="text" id="skills-input" placeholder="Type a skill and press Enter"
                                    class="form-input">
                                <div class="skills-suggestions"></div>
                            </div>
                            <div class="skills-tags">
                               ${genrateskils()} 
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="availability" class="form-label">
                            <i class="fas fa-calendar-check"></i>
                            Availability
                        </label>
                        <select id="availability" name="availability" class="form-select">
                            <option value="immediate">Available Immediately</option>
                            <option value="1-week">1 Week Notice</option>
                            <option value="2-weeks">2 Weeks Notice</option>
                            <option value="1-month">1 Month Notice</option>
                            <option value="custom">Custom Notice Period</option>
                        </select>
                        <input type="text" id="custom-availability" name="custom-availability"
                            placeholder="Specify custom availability" class="form-input"
                            style="display: none; margin-top: 0.5rem;">
                    </div>

                    <div class="form-actions">
                        <button type="submit" class="btn-save">
                            <i class="fas fa-save"></i>
                            Save Changes
                        </button>
                    </div>

    `

    document.querySelector(".settings-form").innerHTML=updateprofilehtml;
}


function geteducation() {
    // Get all education entries
    const educationEntries = document.querySelectorAll('.education-entry');


    educationEntries.forEach((entry, index) => {
        const degree = entry.querySelector('.education-degree').value.trim();
        const institution = entry.querySelector('.education-institution').value.trim();
        const year = entry.querySelector('.education-year').value.trim();

        // Build string version
        educationString += `${degree} , ${institution} , ${year}\n`;
    });

    console.log(educationString);

}



async function main() {

    await getuserdata();
    genrateprofile();

    let data = {
        name: "",
        email: "",
        mobile: 0,
        location: "",
        age: 0,
        about: "",
        education: "",
        skills: "",
        availability: ""
    };

    let educationString = "";

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

    // 🆕 NEW ABOUT ME ELEMENTS
    const aboutMeInput = document.getElementById('about-me');
    const charCountDisplay = document.querySelector('.char-count-display');
    const MAX_CHARS = 500; // Define max characters for validation/display

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

    // Initialize the character count display
    updateCharCount();


    // 🆕 ABOUT ME CHARACTER COUNT LOGIC
    aboutMeInput.addEventListener('input', updateCharCount);

    function updateCharCount() {
        const currentLength = aboutMeInput.value.length;
        charCountDisplay.textContent = `${currentLength} / ${MAX_CHARS} characters`;

        if (currentLength > MAX_CHARS) {
            // Apply danger color if limit is exceeded
            charCountDisplay.style.color = 'var(--danger-red, #dc3545)';
            // Prevent further input by truncating (optional, or rely on maxlength in HTML)
            // aboutMeInput.value = aboutMeInput.value.substring(0, MAX_CHARS);
        } else {
            // Reset to default gray
            charCountDisplay.style.color = 'var(--gray, #797272)';
        }
    }


    // Image preview functionality
    avatarInput.addEventListener('change', function (e) {
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
            avatarInput.files = files;
            avatarInput.dispatchEvent(new Event('change'));
        }
    });

    // Real-time name update
    fullNameInput.addEventListener('input', function (e) {
        const newName = e.target.value.trim();
        profileNameDisplay.textContent = newName || 'Job Seeker';
    });

    // Availability dropdown handling
    availabilitySelect.addEventListener('change', function (e) {
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
        skillTag.querySelector('i').addEventListener('click', function () {
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

    skillsInput.addEventListener('input', function (e) {
        showSuggestions(e.target.value);
    });

    skillsInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(e.target.value);
        } else if (e.key === 'Escape') {
            hideSuggestions();
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (e) {
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
        educationEntry.querySelector('.btn-remove-education').addEventListener('click', function () {
            educationEntry.remove();
        });

        return educationEntry;
    }

    addEducationBtn.addEventListener('click', function () {
        const newEntry = createEducationEntry();
        educationContainer.appendChild(newEntry);

        // Focus on the first input of the new entry
        newEntry.querySelector('.education-degree').focus();
    });

    // Add remove functionality to existing education entries
    document.querySelectorAll('.btn-remove-education').forEach(btn => {
        btn.addEventListener('click', function () {
            btn.closest('.education-entry').remove();
        });
    });

    // Add remove functionality to existing skill tags
    document.querySelectorAll('.skill-tag i').forEach(removeBtn => {
        removeBtn.addEventListener('click', function () {
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

        // 🆕 Validate About Me length
        if (aboutMeInput.value.length > MAX_CHARS) {
            aboutMeInput.style.borderColor = 'var(--danger-red)';
            showNotification(`About Me exceeds the ${MAX_CHARS} character limit.`, 'error');
            isValid = false;
        } else {
            aboutMeInput.style.borderColor = '';
        }

        return isValid;
    }



    // Input focus animations
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea'); // 🆕 Added .form-textarea
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
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', function (e) {
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
    const autoSaveInputs = form.querySelectorAll('.form-input, .form-select, .form-textarea'); // 🆕 Added .form-textarea

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


    /* Main js */


    form.addEventListener('submit', async function (e) {
        e.preventDefault();


        if (!validateForm()) {
            showNotification('Please fix the errors in the form.', 'error');
            return;
        }

        // Show loading state
        saveButton.classList.add('loading');
        saveButton.disabled = true;
        saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        geteducation();

        data.name = fullNameInput.value;
        data.email = document.getElementById('email').value;
        data.mobile = document.getElementById('mobile').value;
        data.location = document.getElementById('location').value;
        data.age = document.getElementById('age').value;
        data.about = aboutMeInput.value,
            data.education = educationString,
            data.skills = Array.from(skillsContainer.querySelectorAll('.skill-tag'))
                .map(tag => tag.textContent.replace('×', '').trim()).join(', ');
        data.availability = availabilitySelect.value === 'custom' ? customAvailabilityInput.value : availabilitySelect.value;



        console.log(data);

        let result = [];

        try {
            const response = await fetch("../backend/update-seeker-profile.php", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            let text = await response.text();
            console.log(text);
            result = JSON.parse(text);
            console.log(result);
        }
        catch (error) {
            showNotification("Server error or fetching ", 'error');
            console.log(error);

        }
        finally {

            saveButton.classList.remove('loading');
            saveButton.disabled = false;

            setTimeout(() => {
                saveButton.innerHTML = '  <i class="fas fa-save"></i> Save Changes';
                if (result.status === 'success') {
                    showNotification(result.message, 'info');
                }
                else {
                    showNotification(result.message, 'error');
                }
                successMessage.classList.add('show');
            }, 3000);


            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);



        }
    });
}

main();