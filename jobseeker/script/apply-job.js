// Apply Job Page JavaScript Functionality

// Global variables
let jobData = {
    id: 'job_001',
    title: 'Part-Time Marketing Assistant',
    company: 'TechStart Solutions',
    salary: '₹25,000 / month',
    type: 'Part-Time',
    location: 'San Francisco, CA',
    experience: '1-2 years',
    postedDate: '2 days ago',
    applicants: 23,
    saved: false
};

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeJobActions();
    initializeScrollEffects();
    initializeAnimations();
    loadJobData();
});

// Navigation functionality (from header)
function initializeNavigation() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside
        dropdownMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Search functionality
function performSearch() {
    const jobTitle = document.getElementById('jobTitleSearch').value;
    const location = document.getElementById('locationSearch').value;
    
    if (jobTitle || location) {
        const params = new URLSearchParams();
        if (jobTitle) params.append('job', jobTitle);
        if (location) params.append('location', location);
        
        // Redirect to dashboard with search parameters
        window.location.href = `../app/job-seeker/dashboard.html?${params.toString()}`;
    } else {
        showNotification('Please enter a job title or location to search.', 'warning');
    }
}

// Handle Enter key in search fields
document.addEventListener('DOMContentLoaded', function() {
    const searchFields = document.querySelectorAll('#jobTitleSearch, #locationSearch');
    searchFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
});

// Job action functions
function initializeJobActions() {
    // Initialize save button state
    updateSaveButtonState();
    
    // Add click handlers for action buttons
    const saveBtn = document.querySelector('.save-btn');
    const shareBtn = document.querySelector('.share-btn');
    const applyBtn = document.querySelector('.apply-now-btn');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveJob);
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', shareJob);
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', applyForJob);
    }
}

// Save job functionality
function saveJob() {
    jobData.saved = !jobData.saved;
    updateSaveButtonState();
    
    const message = jobData.saved ? 'Job saved successfully!' : 'Job removed from saved jobs.';
    const type = jobData.saved ? 'success' : 'info';
    
    showNotification(message, type);
    
    // Save to localStorage
    saveJobToStorage();
}

function updateSaveButtonState() {
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        const icon = saveBtn.querySelector('i');
        const text = saveBtn.querySelector('span') || saveBtn.childNodes[1];
        
        if (jobData.saved) {
            icon.className = 'fas fa-bookmark';
            saveBtn.style.backgroundColor = 'var(--blue)';
            saveBtn.style.color = 'var(--white)';
            saveBtn.style.borderColor = 'var(--blue)';
            if (text && text.textContent) {
                text.textContent = ' Saved';
            }
        } else {
            icon.className = 'far fa-bookmark';
            saveBtn.style.backgroundColor = 'var(--white)';
            saveBtn.style.color = 'var(--gray)';
            saveBtn.style.borderColor = 'var(--border-color)';
            if (text && text.textContent) {
                text.textContent = ' Save Job';
            }
        }
    }
}

// Share job functionality
function shareJob() {
    const jobUrl = window.location.href;
    const shareText = `Check out this ${jobData.type} position: ${jobData.title} at ${jobData.company}`;
    
    if (navigator.share) {
        navigator.share({
            title: `${jobData.title} - ${jobData.company}`,
            text: shareText,
            url: jobUrl
        }).then(() => {
            showNotification('Job shared successfully!', 'success');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare(jobUrl, shareText);
        });
    } else {
        fallbackShare(jobUrl, shareText);
    }
}

function fallbackShare(url, text) {
    // Copy to clipboard as fallback
    const shareContent = `${text}\n${url}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareContent).then(() => {
            showNotification('Job link copied to clipboard!', 'success');
        }).catch(() => {
            showShareModal(url, text);
        });
    } else {
        showShareModal(url, text);
    }
}

function showShareModal(url, text) {
    // Create a simple share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Share this Job</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-modal-body">
                <p>Share this job opportunity:</p>
                <textarea readonly class="share-text">${text}\n${url}</textarea>
                <div class="share-buttons">
                    <button class="share-btn-copy" onclick="copyShareText()">Copy Link</button>
                    <button class="share-btn-email" onclick="shareViaEmail('${encodeURIComponent(text)}', '${encodeURIComponent(url)}')">Email</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.share-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function copyShareText() {
    const textarea = document.querySelector('.share-text');
    textarea.select();
    document.execCommand('copy');
    showNotification('Link copied to clipboard!', 'success');
}

function shareViaEmail(text, url) {
    const subject = encodeURIComponent(`Job Opportunity: ${jobData.title}`);
    const body = encodeURIComponent(`${text}\n\n${url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
}

// Apply for job functionality
function applyForJob() {
    // Show loading state
    const applyBtn = document.querySelector('.apply-now-btn');
    const originalText = applyBtn.innerHTML;
    
    applyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
    applyBtn.disabled = true;
    
    // Simulate application process
    setTimeout(() => {
        // Check if user is logged in (simplified check)
        const isLoggedIn = true; // In real app, check authentication status
        
        if (isLoggedIn) {
            // Redirect to application form or show success
            showApplicationSuccess();
        } else {
            // Redirect to login
            window.location.href = '../app/auth/login.html?redirect=' + encodeURIComponent(window.location.href);
        }
        
        // Reset button
        applyBtn.innerHTML = originalText;
        applyBtn.disabled = false;
    }, 2000);
}

function showApplicationSuccess() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'application-success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Application Submitted Successfully!</h3>
            <p>Your application for <strong>${jobData.title}</strong> at <strong>${jobData.company}</strong> has been submitted.</p>
            <div class="success-actions">
                <button class="btn-primary" onclick="goToDashboard()">View Applications</button>
                <button class="btn-secondary" onclick="closeSuccessModal()">Continue Browsing</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 5000);
    
    // Update application count
    updateApplicationCount();
    
    showNotification('Application submitted successfully!', 'success');
}

function closeSuccessModal() {
    const modal = document.querySelector('.application-success-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function goToDashboard() {
    window.location.href = '../app/job-seeker/applied-jobs.html';
}

function updateApplicationCount() {
    jobData.applicants += 1;
    const applicantElement = document.querySelector('.detail-item:nth-child(6) .detail-value');
    if (applicantElement) {
        applicantElement.textContent = `${jobData.applicants} applied`;
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Animation effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.job-header, .job-details-card, .job-description, .application-section, .similar-jobs');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Data management
function loadJobData() {
    // Load saved job state from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    jobData.saved = savedJobs.includes(jobData.id);
    updateSaveButtonState();
}

function saveJobToStorage() {
    let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    
    if (jobData.saved) {
        if (!savedJobs.includes(jobData.id)) {
            savedJobs.push(jobData.id);
        }
    } else {
        savedJobs = savedJobs.filter(id => id !== jobData.id);
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

// Notification system
function showNotification(message, type = 'info') {
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
                z-index: 1001;
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
            
            .share-modal,
            .application-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1002;
                font-family: 'Poppins', sans-serif;
            }
            
            .share-modal-content,
            .success-modal-content {
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .share-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 24px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .share-modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--gray);
                padding: 4px;
                border-radius: 4px;
                transition: var(--transition);
            }
            
            .share-modal-close:hover {
                background: var(--light-gray);
                color: var(--black);
            }
            
            .share-modal-body {
                padding: 24px;
            }
            
            .share-text {
                width: 100%;
                height: 100px;
                padding: 12px;
                border: 1px solid var(--border-color);
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                resize: vertical;
                margin: 15px 0;
            }
            
            .share-buttons {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
            }
            
            .share-btn-copy,
            .share-btn-email {
                padding: 10px 20px;
                border: 1px solid var(--blue);
                border-radius: 6px;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 500;
                transition: var(--transition);
            }
            
            .share-btn-copy {
                background: var(--blue);
                color: white;
            }
            
            .share-btn-copy:hover {
                background: var(--dark-blue);
            }
            
            .share-btn-email {
                background: white;
                color: var(--blue);
            }
            
            .share-btn-email:hover {
                background: var(--light-blue);
            }
            
            .success-modal-content {
                text-align: center;
                padding: 40px 30px;
            }
            
            .success-icon {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 20px;
            }
            
            .success-modal-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--black);
                margin-bottom: 15px;
            }
            
            .success-modal-content p {
                color: var(--gray);
                margin-bottom: 30px;
                line-height: 1.6;
            }
            
            .success-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .btn-primary,
            .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .btn-primary {
                background: var(--blue);
                color: white;
            }
            
            .btn-primary:hover {
                background: var(--dark-blue);
                transform: translateY(-2px);
            }
            
            .btn-secondary {
                background: var(--light-gray);
                color: var(--black);
                border: 1px solid var(--border-color);
            }
            
            .btn-secondary:hover {
                background: var(--border-color);
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'error': return 'fa-times-circle';
        default: return 'fa-info-circle';
    }
}

// Utility functions
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
}

function formatSalary(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Page visibility handling
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Refresh job data when page becomes visible
        loadJobData();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save job
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveJob();
    }
    
    // Ctrl/Cmd + Enter to apply
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        applyForJob();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.share-modal, .application-success-modal');
        modals.forEach(modal => {
            if (modal.parentElement) {
                modal.parentElement.removeChild(modal);
            }
        });
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Initialize tooltips for better UX
document.addEventListener('DOMContentLoaded', function() {
    const elementsWithTooltips = document.querySelectorAll('[title]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Could implement custom tooltip here
        });
    });
});

console.log('Apply Job page JavaScript loaded successfully!');

