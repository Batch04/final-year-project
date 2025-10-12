
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



function timeAgo(inputDate) {
    const now = new Date();
    const date = new Date(inputDate);
    const diffInSeconds = Math.floor((now - date) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 24 * 60 * 60;
    const secondsInWeek = 7 * secondsInDay;
    const secondsInMonth = 30 * secondsInDay;
    const secondsInYear = 365 * secondsInDay;

    if (diffInSeconds < secondsInMinute) {
        return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInMonth) {
        const weeks = Math.floor(diffInSeconds / secondsInWeek);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < secondsInYear) {
        const months = Math.floor(diffInSeconds / secondsInMonth);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffInSeconds / secondsInYear);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
}

// Example usage:
console.log(timeAgo('2025-10-09')); // Output: "2 days ago" (depending on current date)
console.log(timeAgo('2025-09-30')); // Output: "1 week ago"


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
    appliedapplicants = JSON.parse(realdata);
    console.log(appliedapplicants);
}


function genrateskils(skill) {
    let skills = [];
    let skillshtml = "";
    skills = skill.split(",");
    skills.forEach((s) => {
        if (s !== "") {
            skillshtml += `
            
                <span class="skill-tag" tabindex="0">${s.trim()}</span>
            `
        }
    });
    return skillshtml;
}

let shortlistdata = [];
async function isshorlisted(jobid, providerid, seekerid) {

    let istrue = false;
    let res = await fetch("../backend/isshortlist.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'jobid': jobid, 'providerid': providerid })
    });
    let text = await res.text();
    shortlistdata = JSON.parse(text);

    shortlistdata.forEach((user) => {
        if (parseInt(user.seekerid) === parseInt(seekerid)) {
            istrue = true;
        }
    });
    return istrue;
}


async function genrateapplicants() {
    let applicantshtml = ``;
    if (appliedapplicants.length !== 0) {

        for (const applicant of appliedapplicants) {
            applicantshtml += `
        
            <div class="applicant-card">
                        <div class="applicant-header">
                            <img src="../app/profile/assets/images/default-user-avatar.png" alt="Sarah Johnson" class="applicant-avatar">
                            <div class="applicant-info">
                                <h4 class="applicant-name">${applicant.name}</h4>
                                <div class="applicant-meta">
                                    <span class="application-date"><i class="fas fa-calendar-alt"></i> Applied ${timeAgo(applicant.applied_date)}</span>
                                    ${await isshorlisted(applicant.job_id, applicant.provider_name, applicant.seeker_id)? `<span class="applicant-status shortlisted "><i class="fas fa-circle"></i>Shortlisted</span>` : `<span class="applicant-status new"><i class="fas fa-circle"></i>New</span>`}
                                </div>
                            </div>
                        </div>
                        <div class="applicant-bio">
                            <p>${applicant.about}</p>
                        </div>
                        <div class="applicant-skills">
                            ${genrateskils(applicant.skills)}
                        </div>
                        <div class="applicant-actions">
                            <button class="btn-primary  call " data-phone="${applicant.phone}">
                                <i class="fas fa-phone"></i> Contact
                            </button>
                            <button class="btn-secondary view-profile " data-seekerid="${applicant.seeker_id}">
                                <i class="fas fa-user"></i> View Profile
                            </button>
                            ${await isshorlisted(applicant.job_id, applicant.provider_name, applicant.seeker_id) ? `` : `<button class="btn-success shortlist-btn " data-seekerid="${applicant.seeker_id}" data-jobid="${applicant.job_id}" data-providerid="${applicant.provider_name}"><i class="fas fa-star"></i> Shortlist</button>`}
                        </div>
                    </div>
        
        `

        }

        document.querySelector(".applicants-grid").innerHTML = applicantshtml;
    }
    else {

        document.querySelector(".applicants-grid").innerHTML = `<h2 style="color:var(--danger-color)">NO APPLICANTS APPLIED</h2>`;
    }

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
                            <button class="btn-secondary editjob "  data-jobid="${job.jobs_id}">
                                <i class="fas fa-edit"></i> Edit Job
                            </button>
                            ${job.job_status === "open" ? `<button class="btn-danger closejob " data-jobid="${job.jobs_id}" data-status="close"> <i class="fas fa-times-circle"></i> Close Job</button>` : `<button class="btn-safe openjob "  data-jobid="${job.jobs_id}" data-status="open"> <i class="fas fa-door-open"></i> Open Job </button>`}
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
    await genrateapplicants();
    document.querySelector(".company-name").innerHTML = providerdata.user.company_name;
    let close = document.querySelector(".closejob");
    if (close) {
        close.addEventListener("click", async () => {
            let jobstatus = close.dataset.status;
            let jobid = close.dataset.jobid;
            console.log(jobstatus);
            console.log(jobid);
            let res = await fetch("../backend/required-updates.php", {
                method: "POST",
                body: JSON.stringify({ "status": jobstatus, "jobid": jobid }),
                headers: { 'Content-Type': 'application/json' }
            });
            let text = await res.text();
            console.log(text);
            let realdata = JSON.parse(text);
            console.log(realdata);
            main();
        });
    }
    let open = document.querySelector(".openjob");
    if (open) {

        open.addEventListener("click", async () => {
            let jobstatus = open.dataset.status;
            let jobid = open.dataset.jobid;
            console.log(jobstatus);
            console.log(jobid);
            let res = await fetch("../backend/required-updates.php", {
                method: "POST",
                body: JSON.stringify({ "status": jobstatus, "jobid": jobid }),
                headers: { 'Content-Type': 'application/json' }
            });
            let text = await res.text();
            console.log(text);
            let realdata = JSON.parse(text);
            console.log(realdata);
            main();
        });
    }

    document.querySelectorAll(".view-profile").forEach((profile) => {
        profile.addEventListener("click", () => {
            let id = profile.dataset.seekerid;
            window.location.href = `./seeker-profile.html?seekerid=${id}`;
        })
    });

    let editjob = document.querySelector(".editjob");
    editjob.addEventListener("click", () => {

        let jobid = editjob.dataset.jobid;
        window.location.href = `./update-job.html?jobid=${jobid}`;
    });

    document.querySelectorAll(".call").forEach((callbtn) => {
        callbtn.addEventListener("click", () => {
            let number = callbtn.dataset.phone;
            window.location.href = `tel:+91${number}`
        })
    });


    document.querySelectorAll(".shortlist-btn").forEach((shortlist) => {
        shortlist.addEventListener("click", async () => {
            let id = shortlist.dataset.seekerid;
            let jobid = shortlist.dataset.jobid;
            let providerid = shortlist.dataset.providerid;
            if (!await isshorlisted(jobid, providerid, id)) {

                let res = await fetch("../backend/shortlist.php", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'seekerid': id, 'jobid': jobid, 'providerid': providerid })
                });
                let text = await res.text();
                console.log(text);
                let realdata = JSON.parse(text);
                console.log(realdata);
            }

        })
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