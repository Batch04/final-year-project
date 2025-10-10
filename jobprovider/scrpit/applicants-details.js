let currentJobData = null;
let applicantsData = [];
let filteredApplicants = [];

// Sample job data for demonstration
const jobsData = {
    1: {
        title: "Part-Time Marketing Assistant",
        type: "Part-Time",
        salary: "₹25,000 / month",
        location: "San Francisco, CA",
        experience: "1-2 years required",
        postedDate: "2 days ago",
        applicantsCount: 15,
        views: 127,
        status: "active",
        description: `We are seeking a dynamic and creative Part-Time Marketing Assistant to join our growing team at TechStart Solutions. This role is perfect for someone looking to gain valuable experience in digital marketing while maintaining flexibility in their schedule.

Key Responsibilities:
• Assist in developing and implementing social media marketing strategies
• Create engaging content for various social media platforms
• Conduct market research and analyze competitor activities
• Support email marketing campaigns and newsletter creation
• Help organize and coordinate marketing events and webinars
• Assist with SEO optimization and content marketing efforts
• Prepare marketing reports and performance analytics

Required Qualifications:
• Bachelor's degree in Marketing, Communications, or related field
• 1-2 years of experience in digital marketing or related role
• Proficiency in social media platforms (Facebook, Instagram, LinkedIn, Twitter)
• Basic knowledge of marketing tools (Google Analytics, Mailchimp, Canva)
• Excellent written and verbal communication skills
• Strong attention to detail and organizational abilities
• Ability to work independently and meet deadlines`,
        offers: `• Competitive salary with performance-based bonuses
• Flexible working hours (20-25 hours per week)
• Remote work options available
• Professional development opportunities
• Health insurance coverage
• Paid time off and holidays
• Collaborative and innovative work environment
• Opportunity for career growth within the company`
    },
    2: {
        title: "Remote Customer Support Specialist",
        type: "Remote",
        salary: "₹20,000 / month",
        location: "Remote",
        experience: "Entry Level (0-1 years)",
        postedDate: "5 days ago",
        applicantsCount: 22,
        views: 89,
        status: "active"
    },
    3: {
        title: "Internship - Software Development",
        type: "Internship",
        salary: "₹10,000 / month",
        location: "Bengaluru, India",
        experience: "No Experience Required",
        postedDate: "1 week ago",
        applicantsCount: 30,
        views: 156,
        status: "active"
    }
};

// Sample applicants data
const sampleApplicants = [
    {
        id: 'sarah-johnson',
        name: 'Sarah Johnson',
        title: 'Digital Marketing Specialist',
        email: 'sarah.johnson@email.com',
        appliedDate: '1 day ago',
        status: 'new',
        bio: 'Experienced marketing professional with 3+ years in digital marketing. Skilled in social media management, content creation, and analytics. Looking for flexible part-time opportunities to balance work and personal commitments.',
        skills: ['Social Media Marketing', 'Content Creation', 'Google Analytics', 'SEO']
    },
    {
        id: 'michael-chen',
        name: 'Michael Chen',
        title: 'Marketing Coordinator',
        email: 'michael.chen@email.com',
        appliedDate: '2 days ago',
        status: 'reviewed',
        bio: 'Recent marketing graduate with internship experience at tech startups. Passionate about digital marketing trends and data-driven strategies. Seeking part-time role to gain more industry experience.',
        skills: ['Email Marketing', 'Canva', 'Market Research', 'Adobe Creative Suite']
    },
    {
        id: 'emily-rodriguez',
        name: 'Emily Rodriguez',
        title: 'Social Media Manager',
        email: 'emily.rodriguez@email.com',
        appliedDate: '3 days ago',
        status: 'shortlisted',
        bio: 'Creative social media expert with 2+ years managing brand accounts. Proven track record of increasing engagement and follower growth. Available for part-time remote work with flexible scheduling.',
        skills: ['Instagram Marketing', 'Facebook Ads', 'Content Strategy', 'Influencer Outreach']
    },
    {
        id: 'david-kim',
        name: 'David Kim',
        title: 'Content Marketing Specialist',
        email: 'david.kim@email.com',
        appliedDate: '1 week ago',
        status: 'reviewed',
        bio: 'Freelance content creator with expertise in blog writing, email campaigns, and SEO optimization. Strong analytical skills and experience with marketing automation tools. Seeking stable part-time position.',
        skills: ['Content Writing', 'SEO Optimization', 'Mailchimp', 'WordPress']
    },
    {
        id: 'lisa-thompson',
        name: 'Lisa Thompson',
        title: 'Marketing Assistant',
        email: 'lisa.thompson@email.com',
        appliedDate: '1 week ago',
        status: 'new',
        bio: 'Entry-level marketing professional with strong academic background and internship experience. Eager to learn and contribute to a dynamic team. Available for flexible part-time hours including evenings and weekends.',
        skills: ['Microsoft Office', 'Social Media', 'Research', 'Communication']
    },
    {
        id: 'james-wilson',
        name: 'James Wilson',
        title: 'Digital Marketing Analyst',
        email: 'james.wilson@email.com',
        appliedDate: '2 weeks ago',
        status: 'shortlisted',
        bio: 'Data-driven marketing professional with expertise in analytics and performance optimization. Experience with A/B testing, conversion tracking, and ROI analysis. Looking for part-time role to supplement consulting work.',
        skills: ['Google Analytics', 'Data Analysis', 'A/B Testing', 'Excel']
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializePage();
    setupEventListeners();
});

// Initialize navigation functionality
function initializeNavigation() {
    // Profile dropdown functionality
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (profileBtn && dropdownMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        document.addEventListener('click', function () {
            dropdownMenu.classList.remove('active');
        });

        dropdownMenu.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Enter key search
    const searchInputs = document.querySelectorAll('.search-field input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = getCurrentPage();

    if (currentPage === 'posted-jobs-overview') {
        initializeJobsOverview();
    } else if (currentPage === 'job-details-applicants') {
        initializeJobDetails();
    }
}

// Get current page identifier
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('posted-jobs-overview')) {
        return 'posted-jobs-overview';
    } else if (path.includes('job-details-applicants')) {
        return 'job-details-applicants';
    }
    return 'unknown';
}

// Initialize Jobs Overview page
function initializeJobsOverview() {
    // Add fade-in animation to job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in-up');
        }, index * 100);
    });

    // Add click tracking for job cards
    jobCards.forEach(card => {
        card.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href) {
                // Add loading state
                this.classList.add('loading');

                // Simulate loading delay
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// Initialize Job Details page
function initializeJobDetails() {
    loadJobDetails();
    loadApplicants();
    setupApplicantsFilter();

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.job-details-card, .applicant-card');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, index * 100);
    });
}

// Load job details based on URL parameter
function loadJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId') || '1';

    currentJobData = jobsData[jobId];

    if (currentJobData) {
        updateJobDetailsUI(currentJobData);
    }
}

// Update job details UI
function updateJobDetailsUI(jobData) {
    const elements = {
        jobTitle: document.getElementById('jobTitle'),
        jobType: document.getElementById('jobType'),
        jobSalary: document.getElementById('jobSalary'),
        jobLocation: document.getElementById('jobLocation'),
        jobTypeDetail: document.getElementById('jobTypeDetail'),
        jobExperience: document.getElementById('jobExperience'),
        applicantsCount: document.getElementById('applicantsCount'),
        jobViews: document.getElementById('jobViews'),
        jobDescription: document.getElementById('jobDescription'),
        jobOffers: document.getElementById('jobOffers')
    };

    // Update elements if they exist
    if (elements.jobTitle) elements.jobTitle.textContent = jobData.title;
    if (elements.jobType) elements.jobType.textContent = jobData.type;
    if (elements.jobSalary) elements.jobSalary.textContent = jobData.salary;
    if (elements.jobLocation) elements.jobLocation.textContent = jobData.location;
    if (elements.jobTypeDetail) elements.jobTypeDetail.textContent = `${jobData.type} (20-25 hours/week)`;
    if (elements.jobExperience) elements.jobExperience.textContent = jobData.experience;
    if (elements.applicantsCount) elements.applicantsCount.textContent = `${jobData.applicantsCount} Applied`;
    if (elements.jobViews) elements.jobViews.textContent = `${jobData.views} Views`;

    // Update description and offers if available
    if (elements.jobDescription && jobData.description) {
        elements.jobDescription.innerHTML = formatJobDescription(jobData.description);
    }

    if (elements.jobOffers && jobData.offers) {
        elements.jobOffers.innerHTML = formatJobOffers(jobData.offers);
    }
}

// Format job description with proper HTML
function formatJobDescription(description) {
    return description
        .replace(/Key Responsibilities:/g, '<h5>Key Responsibilities:</h5>')
        .replace(/Required Qualifications:/g, '<h5>Required Qualifications:</h5>')
        .replace(/• /g, '<li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '</li>')
        .replace(/<p><li>/g, '<ul><li>')
        .replace(/<\/li><\/p>/g, '</li></ul>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');
}

// Format job offers with proper HTML
function formatJobOffers(offers) {
    return '<ul>' + offers
        .replace(/• /g, '<li>')
        .replace(/\n/g, '</li>')
        .replace(/<li>$/, '') + '</li></ul>';
}

// Load applicants data
function loadApplicants() {
    applicantsData = [...sampleApplicants];
    filteredApplicants = [...applicantsData];
}

// Setup applicants filter functionality
function setupApplicantsFilter() {
    const filterSelect = document.getElementById('applicantsFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            filterApplicants(this.value);
        });
    }
}

// Filter applicants based on status
function filterApplicants(filterValue) {
    if (filterValue === 'all') {
        filteredApplicants = [...applicantsData];
    } else {
        filteredApplicants = applicantsData.filter(applicant => applicant.status === filterValue);
    }

    // Update applicants display (in a real app, this would re-render the applicants grid)
    showNotification(`Filtered to show ${filteredApplicants.length} applicants`, 'info');
}

// Setup event listeners
function setupEventListeners() {
    // Notification close buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('notification-close')) {
            e.target.closest('.notification').remove();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + H for home
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'posted-jobs-overview.html';
        }

        // Escape to close modals/dropdowns
        if (e.key === 'Escape') {
            const activeDropdown = document.querySelector('.dropdown-menu.active');
            if (activeDropdown) {
                activeDropdown.classList.remove('active');
            }
        }
    });
}

// Search functionality
function performSearch() {
    const jobTitleSearch = document.getElementById('jobTitleSearch');
    const locationSearch = document.getElementById('locationSearch');

    const jobTitle = jobTitleSearch ? jobTitleSearch.value : '';
    const location = locationSearch ? locationSearch.value : '';

    if (jobTitle || location) {
        const params = new URLSearchParams();
        if (jobTitle) params.append('job', jobTitle);
        if (location) params.append('location', location);

        // In a real application, this would navigate to search results
        showNotification(`Searching for: ${jobTitle} in ${location}`, 'info');
    }
}

// Job action functions
function editJob() {
    showNotification('Edit job functionality would open here', 'info');
    // In a real app, this would open an edit form or navigate to edit page
}

function closeJob() {
    if (confirm('Are you sure you want to close this job posting? This action cannot be undone.')) {
        showNotification('Job posting has been closed successfully', 'success');
        // In a real app, this would make an API call to close the job

        // Update UI to reflect closed status
        const statusElements = document.querySelectorAll('.job-status');
        statusElements.forEach(element => {
            element.className = 'job-status inactive';
            element.innerHTML = '<i class="fas fa-circle"></i> Closed';
        });
    }
}

// Applicant action functions
function contactApplicant(email) {
    // Create mailto link
    const subject = encodeURIComponent(`Regarding your application for ${currentJobData ? currentJobData.title : 'our job posting'}`);
    const body = encodeURIComponent(`Dear Applicant,\n\nThank you for your interest in the ${currentJobData ? currentJobData.title : 'position'} at TechStart Solutions.\n\nBest regards,\nTechStart Solutions Hiring Team`);

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    showNotification(`Opening email client to contact applicant`, 'info');
}

function viewProfile(applicantId) {
    showNotification(`Viewing profile for ${applicantId}`, 'info');
    // In a real app, this would navigate to the applicant's detailed profile
}

function shortlistApplicant(applicantId) {
    showNotification(`${applicantId} has been added to shortlist`, 'success');

    // Update the applicant's status in the UI
    const applicantCard = document.querySelector(`[data-applicant-id="${applicantId}"]`);
    if (applicantCard) {
        const statusElement = applicantCard.querySelector('.applicant-status');
        if (statusElement) {
            statusElement.className = 'applicant-status shortlisted';
            statusElement.innerHTML = '<i class="fas fa-circle"></i> Shortlisted';
        }

        // Update the action button
        const shortlistBtn = applicantCard.querySelector('button[onclick*="shortlistApplicant"]');
        if (shortlistBtn) {
            shortlistBtn.className = 'btn-warning';
            shortlistBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Schedule Interview';
            shortlistBtn.setAttribute('onclick', `scheduleInterview('${applicantId}')`);
        }
    }
}

function scheduleInterview(applicantId) {
    showNotification(`Interview scheduling for ${applicantId} would open here`, 'info');
    // In a real app, this would open a calendar/scheduling interface
}

function loadMoreApplicants() {
    showNotification('Loading more applicants...', 'info');

    // Simulate loading delay
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.textContent = 'Loading...';

        setTimeout(() => {
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.textContent = 'All applicants loaded';
            loadMoreBtn.disabled = true;
            showNotification('All applicants have been loaded', 'success');
        }, 2000);
    }
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Get appropriate icon for notification type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Export functions for global access
window.performSearch = performSearch;
window.editJob = editJob;
window.closeJob = closeJob;
window.contactApplicant = contactApplicant;
window.viewProfile = viewProfile;
window.shortlistApplicant = shortlistApplicant;
window.scheduleInterview = scheduleInterview;
window.loadMoreApplicants = loadMoreApplicants;

// real js

let jobiddata = [];
let jobbenfits = [];
let benfits = '';
let appliedapplicants = [];
let providerdata = [];

let url = new URL(window.location.href);
let jobId = url.searchParams.get("jobId");
console.log(jobId);

async function providername() {
    let data = await fetch("../backend/get_provider.php");
    providerdata = await data.json();
    console.log(providerdata);
}



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
    benfits = jobiddata[0].job_benifits;
}


function jobsbenfits() {

    jobbenfits = benfits.split("\n")
    let benfitsgrid = ``;
    jobbenfits.forEach((val) => {
        benfitsgrid += `
        <div class="benefit-item">
            <i class="fa-solid fa-medal"></i>
            <span>${val}</span>
        </div>`
    });
    return benfitsgrid;
}


async function getappliedapplicants() {
    let data = await fetch("../backend/getappliedapplicants.php", {
        method: "POST",
        body: JSON.stringify({ jobid: jobId }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let realdata = await data.text();
    console.log(realdata);
    appliedapplicants = JSON.parse(realdata);
    console.log(appliedapplicants);
}


function genratedidjobs() {
    let jobinfo = ``;

    jobiddata.forEach((job) => {

        jobinfo += `
            <div class="section-header">
                        <h2>
                            <i class="fas fa-briefcase"></i>
                            Job Details
                        </h2>
                        <div class="job-actions">
                            <button class="btn-secondary" onclick="editJob()" data-jobid="${job.jobs_id}">
                                <i class="fas fa-edit"></i> Edit Job
                            </button>
                            <button class="btn-danger" onclick="closeJob()" data-jobid="${job.jobs_id}">
                                <i class="fas fa-times-circle"></i> Close Job
                            </button>
                        </div>
                    </div>

                    <div class="job-details-card">
                        <div class="job-header">
                            <div class="job-title-section">
                                <h3 class="job-title" id="jobTitle">${job.job_title} </h3>
                                <span class="job-type" id="jobType">${job.job_type}</span>
                            </div>
                            <div class="job-meta">
                                ${(job.job_status === "open") ? `<span class="job-status active"><i class="fas fa-circle"></i> Active</span>` : `<span class="job-status inactive"><i class="fas fa-circle"></i> Closed</span>`}
                                <span class="job-posted-date"><i class="fas fa-calendar-alt"></i> Posted on ${job.job_posted}</span>
                            </div>
                        </div>

                        <div class="job-info-grid">
                            <div class="job-info-item">
                                <i class="fas fa-dollar-sign"></i>
                                <div>
                                    <span class="info-label">Salary</span>
                                    <span class="info-value" id="jobSalary">₹ ${job.job_salary} / ${job.job_salary_time}</span>
                                </div>
                            </div>
                            <div class="job-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <span class="info-label">Location</span>
                                    <span class="info-value" id="jobLocation">${job.job_location} </span>
                                </div>
                            </div>
                            <div class="job-info-item">
                                <i class="fas fa-clock"></i>
                                <div>
                                    <span class="info-label">Job Type</span>
                                    <span class="info-value" id="jobTypeDetail">${job.job_type} (${job.workload} Hrs/${job.workperiod})</span>
                                </div>
                            </div>
                            <div class="job-info-item">
                                <i class="fas fa-graduation-cap"></i>
                                <div>
                                    <span class="info-label">Experience</span>
                                    <span class="info-value" id="jobExperience">${(job.job_experience === "entry-level") ? `entry-level` : `${job.job_experience} year required`}</span>
                                </div>
                            </div>
                        </div>

                        <div class="job-description">
                            <h4><i class="fas fa-file-alt"></i> Job Description</h4>
                            <div class="description-content" id="jobDescription">
                                <p>${job.job_description} </p>
                            </div>
                        </div>

                        <div class="job-offers">
                            <h4><i class="fas fa-gift"></i> What We Offer</h4>
                            <div class="offers-content" id="jobOffers">
                                <ul>
                                    ${jobsbenfits()}
                                </ul>
                            </div>
                        </div>
                    </div>

        `
    });
    document.querySelector(".job-details-section").innerHTML = jobinfo;
}

async function main() {
    await getjobiddata();
    await getappliedapplicants();
    await providername();
    genratedidjobs();
    document.querySelector(".company-name").innerHTML = providerdata.user.company_name;

}

main();