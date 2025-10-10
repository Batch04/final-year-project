

// ==============================
// FETCH SEEKER DATA FROM BACKEND
// ==============================
// fetch('../backend/get_seeker.php')
//     .then(res => res.json())
//     .then(data => {
//         if (data.error) {
//             console.error("Error fetching profile:", data.error);
//             showNotification("Error loading profile", "error");
//             return;
//         }
//         // Fill profile fields dynamically
//         const userName = document.querySelector('.user-name');
//         if (userName) userName.textContent = data.user.name || "seeker";

//         const fullName = document.querySelector(".field-value-fullName");
//         if (fullName) fullName.textContent = data.user.name || "Not Provided";

//         const emailField = document.querySelector('.field-value-email');
//         if (emailField) emailField.textContent = data.user.email || "Not Provided";

//         const locationField = document.querySelector('.field-value-location');
//         if (locationField) locationField.textContent = data.user.location || "Not Provided";

//         const phoneField = document.querySelector('.field-value-phone');
//         if (phoneField) phoneField.textContent = data.user.phone || "Not Provided";

//         const educationField = document.querySelector('.field-value-education');
//         if (educationField) {
//             educationField.innerHTML = data.user.education || "Not Provided";
//         }

//         const skillsContainer = document.querySelector('.skills-container');
//         if (skillsContainer) {
//             skillsContainer.innerHTML = "";
//             if (data.user.skills) {
//                 data.user.skills.split(",").forEach(skill => {
//                     const span = document.createElement("span");
//                     span.className = "skill-tag";
//                     span.textContent = skill.trim();
//                     skillsContainer.appendChild(span);
//                 });
//             } else {
//                 skillsContainer.innerHTML = "<span>No skills added</span>";
//             }
//         }

//         const availabilityText = document.querySelector('.availability-text');
//         if (availabilityText) {
//             availabilityText.textContent = data.user.availability || "Not Mentioned";
//         }
//     })
//     .catch(err => {
//         console.error("Profile fetch failed:", err);
//         showNotification("Failed to load profile", "error");
//     });

// Enhanced profile field interactions
const profileFields = document.querySelectorAll('.profile-field');
const userAvatar = document.querySelector('.user-avatar');
const skillTags = document.querySelectorAll('.skill-tag');

// Enhanced avatar interactions
if (userAvatar) {
    userAvatar.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.boxShadow = '0 10px 20px rgba(59, 130, 246, 0.3)';
    });

    userAvatar.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });

    // Add click effect for avatar
    userAvatar.addEventListener('click', function () {
        // Create a ripple effect
        createRippleEffect(this);

        // Show a subtle notification
        showNotification('Profile picture clicked!', 'info');
    });
}

// Enhanced skill tag interactions
skillTags.forEach((tag, index) => {
    // Staggered animation
    tag.style.animationDelay = `${(index * 0.1) + 0.5}s`;

    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 6px 12px rgba(59, 130, 246, 0.4)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = '';
        this.style.boxShadow = '';
    });

    // Add click functionality to skill tags
    tag.addEventListener('click', function () {
        const skillName = this.textContent;
        showNotification(`Skill: ${skillName}`, 'success');

        // Add a temporary highlight effect
        this.style.background = 'linear-gradient(135deg, var(--success-green), #059669)';
        setTimeout(() => {
            this.style.background = '';
        }, 1000);
    });
});

// Add copy-to-clipboard functionality for contact information
const emailField = document.querySelector('.profile-field:nth-child(2) .field-value');
const phoneField = document.querySelector('.profile-field:nth-child(4) .field-value');

function addCopyFunctionality(element, type) {
    if (element) {
        element.style.cursor = 'pointer';
        element.title = `Click to copy ${type}`;

        element.addEventListener('click', function () {
            const text = this.textContent.trim();

            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${type} copied to clipboard!`, 'success');
                    addCopyEffect(this);
                }).catch(() => {
                    copyToClipboardFallback(text, type);
                });
            } else {
                copyToClipboardFallback(text, type);
            }
        });
    }
}

function copyToClipboardFallback(text, type) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification(`${type} copied to clipboard!`, 'success');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showNotification(`Failed to copy ${type}`, 'error');
    }

    document.body.removeChild(textArea);
}

function addCopyEffect(element) {
    element.style.background = 'linear-gradient(135deg, var(--success-green), #059669)';
    element.style.color = 'white';
    element.style.transform = 'scale(1.05)';

    setTimeout(() => {
        element.style.background = '';
        element.style.color = '';
        element.style.transform = '';
    }, 800);
}

// Add copy functionality
addCopyFunctionality(emailField, 'Email');
addCopyFunctionality(phoneField, 'Phone number');

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// Ripple effect function
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add smooth scroll behavior for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Press 'C' to copy email
    if (e.key === 'c' || e.key === 'C') {
        if (emailField && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            emailField.click();
        }
    }

    // Press 'P' to copy phone
    if (e.key === 'p' || e.key === 'P') {
        if (phoneField && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            phoneField.click();
        }
    }
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all profile fields for scroll animations
profileFields.forEach(field => {
    observer.observe(field);
});

// Add responsive behavior for mobile
function handleResize() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Adjust animations for mobile
        profileFields.forEach(field => {
            field.style.animationDuration = '0.4s';
        });

        skillTags.forEach(tag => {
            tag.style.animationDuration = '0.3s';
        });
    } else {
        // Reset animations for desktop
        profileFields.forEach(field => {
            field.style.animationDuration = '0.6s';
        });

        skillTags.forEach(tag => {
            tag.style.animationDuration = '0.5s';
        });
    }
}

// Initial call and event listener for resize
handleResize();
window.addEventListener('resize', handleResize);

// Add loading screen effect
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add focus styles for accessibility
const focusableElements = document.querySelectorAll('.profile-field, .skill-tag, .user-avatar');

focusableElements.forEach(element => {
    element.addEventListener('focus', function () {
        this.style.outline = '3px solid rgba(59, 130, 246, 0.5)';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function () {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});

// Console log for debugging
console.log('User Profile page loaded successfully!');
console.log('Available keyboard shortcuts:');
console.log('- Press "C" to copy email');
console.log('- Press "P" to copy phone number');
console.log('- Click on email or phone to copy to clipboard');
console.log('- Click on skill tags for interaction');
console.log('- Click on avatar for ripple effect');

// Add CSS for notifications and ripple effect
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-radius: 8px;
        box-shadow: var(--shadow-hover);
        padding: 1rem 1.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid var(--blue);
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--success-green);
    }
    
    .notification-error {
        border-left-color: var(--error-red);
    }
    
    .notification-warning {
        border-left-color: var(--warning-yellow);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--black);
        font-weight: 500;
    }
    
    .notification-content i {
        font-size: 1.1rem;
    }
    
    .notification-success .notification-content i {
        color: var(--success-green);
    }
    
    .notification-error .notification-content i {
        color: var(--error-red);
    }
    
    .notification-warning .notification-content i {
        color: var(--warning-yellow);
    }
    
    .notification-info .notification-content i {
        color: var(--blue);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100%);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);




/* html genration using js */

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
            
             <div class="education-item">
                <strong>${edu[0].trim()}</strong><br>
                 ${edu[1].trim()}<br>
                <span class="education-year">${edu[2].trim()}</span>
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
            
                <span class="skill-tag" tabindex="0">${s.trim()}</span>
            `
        }
    });
    return skillshtml;
}

function generateUserProfile() {

    let userprofile = ``;

    document.querySelector(".user-name").innerHTML = (userdata.name !== "") ? `${userdata.name}` : `seeker`;
    userprofile += `
        
            <div class="profile-grid">
                    <div class="profile-field" tabindex="0">
                        <div class="field-label">Full Name:</div>
                        <div class="field-value-fullName field-value">${(userdata.name !== "") ? `${userdata.name}` : `NOT PROVIDED`} </div>
                    </div>

                    <div class="profile-field" tabindex="0">
                        <div class="field-label">Email:</div>
                        <div class="field-value-email field-value">${(userdata.email !== "") ? `${userdata.email}` : `NOT PROVIDED`}</div>
                    </div>

                    <div class="profile-field" tabindex="0">
                        <div class="field-label">Location:</div>
                        <div class="field-value-location field-value">${(userdata.location !== "") ? `${userdata.location}` : `NOT PROVIDED`}</div>
                    </div>

                    <div class="profile-field" tabindex="0">
                        <div class="field-label">Mobile Number:</div>
                        <div class="field-value-phone field-value">${(userdata.phone !== 0) ? `${userdata.phone}` : `NOT PROVIDED`}</div>
                    </div>

                    <div class="profile-field" tabindex="0">
                        <div class="field-label">Age:</div>
                        <div class="field-value-phone field-value">${(userdata.age !== 0) ? `${userdata.age}` : `NOT PROVIDED`}</div>
                    </div>
                    
                    <div class="profile-field full-width" tabindex="0">
                        <div class="field-label">About Me:</div>
                        <div class="field-value-about field-value">
                            <p>${(userdata.about !== "") ? `${userdata.about}` : `NOT PROVIDED`} </p>
                        </div>
                    </div>

                    <div class="profile-field full-width" tabindex="0">
                        <div class="field-label">Education:</div>
                        <div class="field-value-education">
                          ${(userdata.education !== "") ? `${genrateeducation()}` : `NOT PROVIDED`}
                        </div>
                    </div>

                    <div class="profile-field full-width" tabindex="0">
                        <div class="field-label">Skills:</div>
                        <div class="field-value">
                            <div class="skills-container">
                             ${(userdata.skills !== "") ? `${genrateskils()}` : `NOT PROVIDED`}
                            </div>
                        </div>
                    </div>

                    <div class="profile-field full-width" tabindex="0">
                        <div class="field-label">Availability:</div>
                        <div class="field-value">
                            <div class="availability-status">
                                <i class="fas fa-check-circle availability-icon"></i>
                                <span class="availability-text">${(userdata.availability !== "") ? `${userdata.availability}` : `NOT PROVIDERED`}</span>
                            </div>
                        </div>
                    </div>
                </div>

        `;

    document.querySelector('.profile-content').innerHTML = userprofile;

}

async function main() {
    await getuserdata();
    generateUserProfile();

    document.querySelector(".edit-button").addEventListener('click', function () {
        window.location.href = "./job-seeker-profile-update.html";
    });

}

main();



