
let companydata = {};

async function getcompanydata() {
    let data = await fetch("../backend/get_provider.php");
    let text = await data.text();
    let realdata = JSON.parse(text);
    companydata = realdata.user;
    console.log(companydata);
}


async function providerjobs() {
    let data = await fetch("../backend/getprovider-jobs.php");
    let response = await data.text();
    providerjobsdata = JSON.parse(response);
    console.log(providerjobsdata);
}

function genratecompnayprofile() {

    let companyhtml = ``;

    companyhtml += `
    
        <div class="profile-grid">
                    <!-- Name -->
                    <div class="info-card">
                        <div class="info-label">Name:</div>
                        <div class="info-value-name">${companydata.company_name !== ""?`${companydata.company_name}`:`NOT PROVIDED`}</div>
                    </div>

                    <!-- Email -->
                    <div class="info-card">
                        <div class="info-label">Email:</div>
                        <div class="info-value-email">${companydata.email !== ""?`${companydata.email}`:`NOT PROVIDED`}</div>
                    </div>

                    <!-- Location -->
                    <div class="info-card">
                        <div class="info-label">Contact:</div>
                        <div class="info-value-location">${companydata.contact_number !== "0"?`${companydata.contact_number}`:`NOT PROVIDED`}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Location:</div>
                        <div class="info-value-location">${companydata.location !== ""?`${companydata.location}`:`NOT PROVIDED`}</div>
                    </div>

                    <!-- Company Description -->
                    <div class="info-card full-width">
                        <div class="info-label">Company Description:</div>
                        <div class="info-value-description">${companydata.company_description !== ""?`${companydata.company_description}`:`NOT PROVIDED`}
                        </div>
                    </div>
                   
                </div>

    `;

    document.querySelector(".profile-content").innerHTML=companyhtml;

}



function genratejobs() {
    let jobhtml = "";
    providerjobsdata.forEach((job) => {
        jobhtml += `
        
            <div class="job-card">
                    <div class="job-header">
                        <h3 class="job-title">${job.job_title}</h3>
                        <span class="job-type full-time">${job.job_type}</span>
                    </div>
                    <div class="job-details">
                        <div class="job-info">
                            <i class="fas fa-dollar-sign"></i>
                            <span class="job-salary">${job.job_salary} / ${job.job_salary_time} </span>
                        </div>
                        <div class="job-info">
                            <i class="fas fa-map-marker-alt"></i>
                            <span class="job-location">${job.job_location} </span>
                        </div>
                        <div class="job-info">
                            <i class="fas fa-calendar-alt"></i>
                            <span class="job-date">Posted on ${job.job_posted}</span>
                        </div>
                    </div>
                    <button class="view-applicants-btn" data-jobid="${job.jobs_id}">
                        <i class="fas fa-users"></i>
                        View Applicants
                    </button>
                </div>
        
        `
    });

    document.querySelector(".jobs-grid").innerHTML = jobhtml;
}


async function main() {

    await getcompanydata();
    await providerjobs();
    genratecompnayprofile();
    genratejobs();

    document.querySelector(".company-name").innerHTML=companydata.company_name;
    document.querySelector(".company-loaction").innerHTML=companydata.location;

    // Get all buttons that open external links
    const visitButton = document.querySelector('.visit-button');
    const socialButtons = document.querySelectorAll('.social-button');
    const editButton = document.querySelector('.edit-button');

    // Get View Applicants buttons and modal elements
    const viewApplicantsButtons = document.querySelectorAll('.view-applicants-btn');
    const modal = document.getElementById('applicantsModal');



    // Function to show success message
    function showSuccessMessage(message) {
        // Remove existing success messages
        const existingMessages = document.querySelectorAll('.success-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;

        document.body.appendChild(messageDiv);

        // Show message with animation
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);

        // Hide message after 3 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }

    // Function to add loading state to button
    function addLoadingState(button) {
        button.classList.add('loading');
        button.disabled = true;
    }

    // Function to remove loading state from button
    function removeLoadingState(button) {
        button.classList.remove('loading');
        button.disabled = false;
    }



    // Handle View Applicants buttons
    viewApplicantsButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const jobId = button.dataset.jobid;

            // Add loading state
            addLoadingState(this);

            // Simulate loading delay
            setTimeout(() => {
                // Remove loading state
                removeLoadingState(this);
                window.location.href=`./job-details-applicants.html?jobId=${jobId}`;
            }, 800);
        });

        // Add hover effect
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function () {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
    });






    // Handle edit button
    if (editButton) {
        editButton.addEventListener('click', function (e) {
            e.preventDefault();

            // Add loading state
            addLoadingState(this);

            // Simulate loading delay
            setTimeout(() => {
                // Remove loading state
                removeLoadingState(this);

                // Show success message (in a real app, this would navigate to edit page)
                showSuccessMessage('Edit functionality would be implemented here!');
            }, 500);
        });

        // Add hover effect
        editButton.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        editButton.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    }


    // Enhanced info card hover effects
    const infoCards = document.querySelectorAll('.info-card');

    infoCards.forEach((card, index) => {
        // Staggered animation on page load
        card.style.animationDelay = `${index * 0.1}s`;

        // Enhanced hover effect
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    //Enhanced job card hover effects


    // Company logo hover effect
    const companyLogo = document.querySelector('.company-logo-circle');
    if (companyLogo) {
        companyLogo.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.05) rotate(5deg)';
        });

        companyLogo.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
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
        // Press 'E' to trigger edit button
        if (e.key === 'e' || e.key === 'E') {
            if (editButton && !e.ctrlKey && !e.altKey && !e.metaKey && !modal.classList.contains('show')) {
                e.preventDefault();
                editButton.click();
            }
        }

        // Press 'W' to trigger website visit
        if (e.key === 'w' || e.key === 'W') {
            if (visitButton && !e.ctrlKey && !e.altKey && !e.metaKey && !modal.classList.contains('show')) {
                e.preventDefault();
                visitButton.click();
            }
        }
    });

    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('.visit-button, .social-button, .edit-button, .view-applicants-btn, .close-modal, .action-btn');

    focusableElements.forEach(element => {
        element.addEventListener('focus', function () {
            this.style.outline = '3px solid rgba(3, 132, 252, 0.5)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function () {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
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


    // Add copy to clipboard functionality for email and website
    const emailValue = document.querySelector('.info-card:nth-child(2) .info-value');
    const websiteValue = document.querySelector('.website-link');

    function addCopyFunctionality(element, type) {
        if (element) {
            element.style.cursor = 'pointer';
            element.title = `Click to copy ${type}`;

            element.addEventListener('click', function () {
                const text = this.textContent.trim();

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showSuccessMessage(`${type} copied to clipboard!`);
                    }).catch(() => {
                        // Fallback for older browsers
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
            showSuccessMessage(`${type} copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showSuccessMessage(`Failed to copy ${type}`);
        }

        document.body.removeChild(textArea);
    }

    // Add copy functionality
    addCopyFunctionality(emailValue, 'Email');
    addCopyFunctionality(websiteValue, 'Website URL');




    // Add loading screen effect
    window.addEventListener('load', function () {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
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

}

main();
