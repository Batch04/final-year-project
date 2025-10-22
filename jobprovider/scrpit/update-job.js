
let url = new URL(window.location.href);
let id = url.searchParams.get("jobid");
console.log(id);

let idjobdata = [];

async function getjobdata() {

    let data = await fetch("../backend/getidjob.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "jobId": id })
    });
    let text = await data.text();
    console.log(text);
    idjobdata = JSON.parse(text);
    console.log(idjobdata);
}

function setbenfittag() {
    updateJobData(); 
    let benefitsArray = jobData.whatTheyOffer
        .replace(/•/g, "")     
        .split("\n")           
        .map(b => b.trim())    
        .filter(b => b !== "");

    
    benefitsArray.forEach((benefitText) => {
        
        document.querySelectorAll(".benefit-tag").forEach((element) => {
            let data = element.getAttribute("data-benefit"); 
            if (benefitText === data) {
                element.classList.add("selected"); 
            }
        });
    });
}



function setprofiledata() {
    let profile = idjobdata[0];
    document.getElementById("jobTitle").value = profile.job_title;
    document.getElementById("location").value = profile.job_location;
    document.getElementById("salaryAmount").value = profile.job_salary;
    document.getElementById("workload").value = profile.workload;
    document.getElementById("postedDate").value = profile.job_posted;
    document.getElementById("jobDescription").value = profile.job_description;
    document.getElementById("whatTheyOffer").value = profile.job_benifits;
    document.getElementById("jobType").value = profile.job_type;
    document.getElementById("salaryPeriod").value = profile.job_salary_time;
    document.getElementById("workPeriod").value = profile.workperiod;
    document.getElementById("experienceRequired").value = profile.job_experience;

}


// Global variables
let jobData = {
    jobTitle: '',
    jobType: '',
    location: '',
    salaryAmount: '',
    salaryPeriod: '',
    experienceRequired: '',
    postedDate: '',
    jobDescription: '',
    whatTheyOffer: '',
    workload: '',
    workperiod: '',
    jobid: id
};

let isDraft = false;

function getInitials(name) {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/)             // split by one or more spaces
        .map(word => word[0].toUpperCase()) // take first letter of each word
        .join('');                // join them together
}
// Initialize page functionality
document.addEventListener('DOMContentLoaded', async function () {
    await getjobdata();
    setprofiledata();
    setbenfittag();
    initializeForm();
    initializeCharacterCounters();
    initializeBenefitTags();

    console.log(setbenfittag());

    document.querySelector(".namecompany").innerHTML=idjobdata[0].company_name;
    document.querySelector(".company-logo").innerHTML=getInitials(idjobdata[0].company_name);

    let submitBtn = document.querySelector(".btn-preview");
    submitBtn.addEventListener("click", async () => {
        updateJobData();
        console.log(jobData);

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating Job...';
        submitBtn.disabled = true;

        try {
            let response = await fetch("../backend/updateidjob.php", {
                method: "POST",
                body: JSON.stringify(jobData),
                headers: { "Content-Type": "application/json" }
            });

            let rawText = await response.text();
            console.log("Raw backend response:", rawText);

            let data;
            try {
                data = JSON.parse(rawText); // Try to parse JSON
            } catch (err) {
                showNotification("Server returned invalid JSON. Check console logs.", "error");
                return;
            }

            if (data.status === "success") {
                setTimeout(() => {

                    submitBtn.innerHTML = `<i class="fas fa-save"></i> Update Job`;
                    submitBtn.disabled = false;
                    showNotification('Job posted successfully!', 'success');

                }, 3000);
            } else {
                showNotification(data.message || "Failed to post job.", "error");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            showNotification("Network or server error. Please try again later.", "error");
        }



    });

});




// Form initialization
function initializeForm() {
    const form = document.getElementById('jobPostingForm');

    // Add form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Add input event listeners for real-time validation and data saving
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(this);
            updateJobData();
        });

        input.addEventListener('blur', function () {
            validateField(this);
        });
    });

    // Add form validation on submit
    form.addEventListener('submit', function (e) {
        if (!validateForm()) {
            e.preventDefault();
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

// Character counter initialization
function initializeCharacterCounters() {
    const jobDescription = document.getElementById('jobDescription');
    const whatTheyOffer = document.getElementById('whatTheyOffer');
    const descriptionCount = document.getElementById('descriptionCount');
    const offersCount = document.getElementById('offersCount');

    if (jobDescription && descriptionCount) {
        jobDescription.addEventListener('input', function () {
            const count = this.value.length;
            descriptionCount.textContent = count;

            // Change color based on character limit
            if (count > 1800) {
                descriptionCount.style.color = 'var(--danger-color)';
            } else if (count > 1500) {
                descriptionCount.style.color = 'var(--warning-color)';
            } else {
                descriptionCount.style.color = 'var(--text-muted)';
            }
        });
    }

    if (whatTheyOffer && offersCount) {
        whatTheyOffer.addEventListener('input', function () {
            const count = this.value.length;
            offersCount.textContent = count;

            // Change color based on character limit
            if (count > 900) {
                offersCount.style.color = 'var(--danger-color)';
            } else if (count > 750) {
                offersCount.style.color = 'var(--warning-color)';
            } else {
                offersCount.style.color = 'var(--text-muted)';
            }
        });
    }
}

// Benefit tags functionality
function initializeBenefitTags() {
    const benefitTags = document.querySelectorAll('.benefit-tag');
    const whatTheyOfferTextarea = document.getElementById('whatTheyOffer');

    benefitTags.forEach(tag => {
        tag.addEventListener('click', function () {
            const benefit = this.getAttribute('data-benefit');
            const currentValue = whatTheyOfferTextarea.value;

            // Toggle selection
            this.classList.toggle('selected');

            if (this.classList.contains('selected')) {
                // Add benefit to textarea
                const newValue = currentValue ? `${currentValue}\n• ${benefit}` : `• ${benefit}`;
                whatTheyOfferTextarea.value = newValue;
            } else {
                // Remove benefit from textarea
                const lines = currentValue.split('\n');
                const filteredLines = lines.filter(line => !line.includes(benefit));
                whatTheyOfferTextarea.value = filteredLines.join('\n');
            }

            // Trigger input event to update character count
            whatTheyOfferTextarea.dispatchEvent(new Event('input'));
            updateJobData();
        });
    });
}

// Form validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;

    // Remove existing error styling
    field.classList.remove('error');

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }

    // Specific field validations
    switch (fieldName) {
        case 'salaryAmount':
            if (value && (isNaN(value) || parseFloat(value) <= 0)) {
                field.classList.add('error');
                return false;
            }
            break;
        case 'jobDescription':
            if (value && value.length > 2000) {
                field.classList.add('error');
                return false;
            }
            break;
        case 'whatTheyOffer':
            if (value && value.length > 1000) {
                field.classList.add('error');
                return false;
            }
            break;
    }

    return true;
}

function validateForm() {
    const form = document.getElementById('jobPostingForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Update job data object
function updateJobData() {
    jobData = {
        jobTitle: document.getElementById('jobTitle').value,
        jobType: document.getElementById('jobType').value,
        location: document.getElementById('location').value,
        salaryAmount: document.getElementById('salaryAmount').value,
        salaryPeriod: document.getElementById('salaryPeriod').value,
        experienceRequired: document.getElementById('experienceRequired').value,
        postedDate: document.getElementById('postedDate').value,
        jobDescription: document.getElementById('jobDescription').value,
        whatTheyOffer: document.getElementById('whatTheyOffer').value,
        workload: document.getElementById("workload").value,
        workperiod: document.getElementById("workPeriod").value,
        jobid: id
    };
}



function hasFormData() {
    return Object.values(jobData).some(value => value && value.trim() !== '');
}




// Form submission
function handleFormSubmission() {
    updateJobData();

    if (!validateForm()) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting Job...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Clear draft data
        localStorage.removeItem('jobPostDraft');

        // Show success modal
        showModal('successModal');

        // Reset form
        document.getElementById('jobPostingForm').reset();
        setDefaultDate();

        // Clear job data
        jobData = {};

        showNotification('Job posted successfully!', 'success');
    }, 2000);
}



// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function closePreview() {
    closeModal('jobPreviewModal');
}

// Success modal actions
function postAnotherJob() {
    closeModal('successModal');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function viewDashboard() {
    window.location.href = 'dashboard.html';
}

// Notification system
function showNotification(message, type = 'info', duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles if not already present
    if (!document.querySelector('#notificationStyles')) {
        const styles = document.createElement('style');
        styles.id = 'notificationStyles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1002;
                max-width: 400px;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                animation: slideInRight 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }
            
            .notification-success {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }
            
            .notification-warning {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
            }
            
            .notification-info {
                background: #d1ecf1;
                border: 1px solid #bee5eb;
                color: #0c5460;
            }
            
            .notification-error {
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                gap: 12px;
            }
            
            .notification-icon {
                flex-shrink: 0;
            }
            
            .notification-message {
                flex: 1;
                font-size: 14px;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                opacity: 0.7;
                transition: opacity 0.2s ease;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                opacity: 1;
                background: rgba(0,0,0,0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .form-input.error,
            .form-select.error,
            .form-textarea.error {
                border-color: var(--danger-color);
                box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
            }
            
            .preview-header {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 25px;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .preview-company {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .preview-logo {
                width: 60px;
                height: 60px;
                border-radius: 8px;
                object-fit: cover;
            }
            
            .preview-company h2 {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--blue);
                margin-bottom: 5px;
            }
            
            .preview-company p {
                color: var(--gray);
                font-size: 14px;
            }
            
            .preview-details {
                margin-bottom: 25px;
            }
            
            .detail-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .detail-item {
                padding: 12px;
                background: var(--light-gray);
                border-radius: 6px;
                font-size: 14px;
            }
            
            .detail-item strong {
                color: var(--black);
            }
            
            .preview-section {
                margin-bottom: 25px;
            }
            
            .preview-section h3 {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--black);
                margin-bottom: 15px;
                padding-bottom: 8px;
                border-bottom: 2px solid var(--blue);
            }
            
            .preview-content {
                line-height: 1.6;
                color: var(--gray);
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after specified duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        default: return 'fa-info-circle';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + S to save draft
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
    }

    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (validateForm()) {
            handleFormSubmission();
        }
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// Close modals when clicking outside
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form data persistence on page unload
window.addEventListener('beforeunload', function (e) {
    updateJobData();
    if (hasFormData() && !isDraft) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
    }
});


// Error handling
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Page visibility handling
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        // Check for updates when page becomes visible
        const draftData = localStorage.getItem('jobPostDraft');
        if (draftData && !hasFormData()) {
            // Offer to restore draft if form is empty
            loadDraftData();
        }
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function () {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Initialize tooltips for better UX
document.addEventListener('DOMContentLoaded', function () {
    const elementsWithTooltips = document.querySelectorAll('[title]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function () {
            // Could implement custom tooltip here
        });
    });
});

// Smooth scrolling for form sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form progress tracking
function updateFormProgress() {
    const requiredFields = document.querySelectorAll('[required]');
    let filledFields = 0;

    requiredFields.forEach(field => {
        if (field.value.trim() !== '') {
            filledFields++;
        }
    });

    const progress = (filledFields / requiredFields.length) * 100;

    // Could add a progress bar here
    console.log(`Form completion: ${Math.round(progress)}%`);
}

// Add progress tracking to form inputs
document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    formInputs.forEach(input => {
        input.addEventListener('input', updateFormProgress);
    });
});

console.log('Post Job page JavaScript loaded successfully!');




