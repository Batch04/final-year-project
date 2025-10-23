
// Initialize page functionality
document.addEventListener('DOMContentLoaded', function () {
    initializeScrollEffects();
    initializeAnimations();
});






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
        link.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
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






// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
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




/* actual js  */

let jobiddata = [];
let url = new URL(window.location.href);

let jobId = url.searchParams.get("jobid");

async function getjobiddata() {

    let response = await fetch("../backend/getidjob.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "jobId": jobId })
    });

    let rawText = await response.text();
    console.log(rawText);

    jobiddata = JSON.parse(rawText);
    console.log(jobiddata);
}


function genrateidjob() {
    let idjob = ' ';
    jobiddata.forEach((job) => {
        idjob += `
        
         <div class="container">
            <section class="job-header">
                <div class="job-title-section">
                    <div class="company-logo">
                        <img src="images/logo.png" alt="TechStart Solutions Logo" class="logo-image">
                    </div>
                    <div class="job-title-info">
                        <h1 class="job-title">${job.job_title} </h1>
                        <div class="company-info">
                            <h2 class="company-name">${job.company_name} </h2>
                            <div class="company-details">
                                <span class="company-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span class="rating-text">4.5 (127 reviews)</span>
                                </span>
                                <span class="company-size">
                                    <i class="fas fa-users"></i>
                                    50-100 employees
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quick Actions -->
                <div class="job-actions">
                    
                    ${issave(job.jobs_id) ? `<button class="action-btn save-btn"  data-jobid="${job.jobs_id}" data-jobtitle="${job.job_title}" data-heart="save"><i class="fas fa-bookmark"></i>Saved</button>` : `<button class="action-btn save-btn"  data-jobid="${job.jobs_id}" data-jobtitle="${job.job_title}" data-heart="unsave"> <i class="fas fa-bookmark"></i>Save Job</button>`}

                    <button class="action-btn share-btn" onclick="shareJob()">
                        <i class="fas fa-share-alt"></i>
                        Share
                    </button>
                </div>
            </section>

            <!-- Job Details Card -->
            <section class="job-details-card">
                <div class="card-header">
                    <h3>
                        <i class="fas fa-info-circle"></i>
                        Job Details
                    </h3>
                    <div class="job-status">
                        <span class="status-badge active">
                           ${job.job_status === "open" ? ` <i class="fas fa-circle"></i> Actively Hiring` : `<i class="fa-solid fa-circle" style="color: #f51505;"></i> Closed`}
                        </span>
                    </div>
                </div>
                <div class="job-details-grid">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-rupee-sign"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Salary</span>
                            <span class="detail-value">₹ ${job.job_salary} / ${job.job_salary_time}</span>
                            <span class="detail-extra">Plus performance bonus</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Job Type</span>
                            <span class="detail-value">${job.job_type} </span>
                            <span class="detail-extra">${job.workload} hours/ ${job.workperiod}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Location</span>
                            <span class="detail-value">${job.job_location} </span>
                            <span class="detail-extra">Remote</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Experience Required</span>
                            <span class="detail-value">${job.job_experience}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="detail-content">
                            <span class="detail-label">Posted Date</span>
                            <span class="detail-value">${job.job_posted} </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Job Description Section -->
            <section class="job-description">
                <div class="section-header">
                    <h3>
                        <i class="fas fa-file-alt"></i>
                        Job Description
                    </h3>
                    <div class="reading-time">
                        <i class="fas fa-clock"></i>
                        3 min read
                    </div>
                </div>
                
                <div class="description-content">
                    <div class="description-section">
                        <h4>About the Role</h4>
                        <p>${job.job_description} </p>

                    </div>
                    <div class="description-section">
                        <h4>What We Offer</h4>
                        <div class="benefits-grid">
                            <div class="benefit-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span>Competitive hourly rate</span>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-clock"></i>
                                <span>Flexible working hours</span>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-home"></i>
                                <span>Hybrid work environment</span>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-graduation-cap"></i>
                                <span>Learning & development opportunities</span>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-users"></i>
                                <span>Collaborative team environment</span>
                            </div>
                            <div class="benefit-item">
                                <i class="fas fa-chart-line"></i>
                                <span>Growth potential</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
        `
    });

    document.querySelector(".main-content").innerHTML = idjob;

}


let savedstatus = [];

async function issaveddata() {

    try {
        let resposive = await fetch("../backend/getsaveddata.php");
        let rawdata = await resposive.text();
        console.log(rawdata);

        try {
            savedstatus = JSON.parse(rawdata);
        } catch (err) {
            console.log("something error", err);
        }
    } catch (er) {
        console.log('eror ', er);
    }
}



function issave(jobid) {
    let isstatus = false;
    savedstatus.forEach((val) => {
        if (val.job_id === jobid) {
            isstatus = true;
        }
    })

    return isstatus;
}


async function postsavejob(jobid, jobtitile, jobstatus) {
    let response = await fetch("../backend/add_savedjob.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: jobid,
            title: jobtitile,
            state: jobstatus
        })
    });

    let data = await response.text();
    console.log(data);

    let realdata = await data.json();
    console.log(realdata);
}



async function main() {
    await getjobiddata();
    await issaveddata();
    genrateidjob();

    let savebutton = document.querySelector(".save-btn");
    let jobid;
    let jobtitle;

    if (savebutton.dataset.heart === "save") {
        savebutton.style.background = "var(--blue)";
        savebutton.style.color = "var(--white)";

    }

    savebutton.addEventListener("click", async () => {
        let status = savebutton.dataset.heart;
        jobid = savebutton.dataset.jobid;
        jobtitle = savebutton.dataset.jobtitle;

        if (status === "unsave") {
            savebutton.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
            savebutton.dataset.heart = "save"
            savebutton.style.background = "var(--blue)";
            savebutton.style.color = "var(--white)";
            const message = 'Job saved successfully!';
            const type = 'success';
            showNotification(message, type);
            if (!issave(jobid)) {
                await postsavejob(jobid, jobtitle, "save");
            }
        }
        else if (status === "save") {
            savebutton.innerHTML = '<i class="fas fa-bookmark"></i> Save Job';
            savebutton.dataset.heart = "unsave"
            const message = 'Job removed from saved jobs.';
            const type = 'info';
            showNotification(message, type);
            await postsavejob(jobid, jobtitle, "unsave");
        }
    });

}

main();

