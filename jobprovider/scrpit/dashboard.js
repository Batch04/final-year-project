let recentapplicantsdata = [];
let providerdata = [];
let providerjobsdata = [];
let requireddata = [];

async function getrecentapplications() {
    let data = await fetch("../backend/getrecent-applicants.php");
    let response = await data.text();
    recentapplicantsdata = JSON.parse(response);
    console.log(recentapplicantsdata);
}

async function getproviderdata() {
    let data = await fetch("../backend/get-jobs.php");
    let respose = await data.text();
    providerdata = JSON.parse(respose);
    console.log(providerdata);
}

function getjobname(jobid) {
    let jobname = "";
    providerdata.forEach((job) => {
        if (job.jobs_id === jobid) {
            jobname = job.job_title;
        }
    });
    return jobname;
}

async function providerjobs() {
    let data = await fetch("../backend/getprovider-jobs.php");
    let response = await data.text();
    providerjobsdata = JSON.parse(response);
    console.log(providerjobsdata);
}


function jobstatus(status) {
    if (status === "open") {
        return `<span class="status-badge active" style="background-color:green;color:white;">Active</span>`;
    } else if (status === "close") {
        return `<span class="status-badge closed" style="background-color:red;color:white;">Closed</span>`;
    } else if (status === "paused") {
        return `<span class="status-badge paused" style="background-color:gold;color:black;">Paused</span>`;
    } else {
        return `<span class="status-badge unknown" style="background-color:gray;color:white;">Unknown</span>`;
    }
}

async function getrequireddata() {
    let res = await fetch("../backend/get-required-data.php");
    let response = await res.text();
    console.log(response);
    requireddata = JSON.parse(response);
    console.log(requireddata);
}

async function getapplicantsnum(jobid) {
    let data = await fetch("../backend/getjobapplicants-num.php", {
        method: "POST",
        body: JSON.stringify({ jobid: jobid }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let response = await data.text();
    console.log(response);
    let applicantsnum = JSON.parse(response);
    console.log(applicantsnum);
    return applicantsnum.count;
}

function genraterecentjob() {
    let recentjobhtml = ``;
    recentapplicantsdata.forEach((applicant) => {
        recentjobhtml += `
        
        <div class="application-card">
                    <div class="applicant-info">
                        <div class="applicant-avatar">
                            <img src="images/person-image.png" alt="${applicant.name}">
                        </div>
                        <div class="applicant-details">
                            <h2>${applicant.name} </h2>
                            <p class="applied-for">Applied for: ${getjobname(applicant.job_id)} </p>

                        </div>
                    </div>

                    <div class="application-status">
                        <span class="status-badge new">New</span>
                        <div class="application-time">${applicant.applied_date}</div>
                    </div>

                    <div class="application-actions">
                        <button class="btn btn-outline btn-sm" data-seekerid="${applicant.seeker_id}">View Profile</button>
                    </div>
                </div>
        
        `
    })

    document.querySelector(".applications-list").innerHTML = recentjobhtml;
}


async function genrateproviderjob() {
    let providerjobhtml = ``;
    for (const job of providerjobsdata) {
        const applicantsCount = await getapplicantsnum(job.jobs_id);
        providerjobhtml += `
            <div class="job-posting-card">
                <div class="job-header">
                    <div class="job-title-section">
                        <h3>${job.job_title}</h3>
                    </div>
                    <div class="job-status">
                        <div class="job-meta">
                            <span class="job-type">${job.job_type}</span>
                            <span class="job-salary">$ ${job.job_salary}/${job.job_salary_time}</span>
                        </div>
                        ${jobstatus(job.job_status)}
                    </div>
                </div>

                <div class="job-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${applicantsCount} applicants</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-calendar"></i>
                        <span>Posted on ${job.job_posted}</span>
                    </div>
                </div>

                <div class="job-description">
                    <p>${job.job_description}</p>
                </div>

                <div class="job-actions">
                    <button class="btn btn-outline btn-sm" data-jobid="${job.jobs_id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-primary btn-sm viewapplicants" data-jobid="${job.jobs_id}">
                        <i class="fas fa-users"></i> View Applicants
                    </button>
                </div>
            </div>`;
    }

    document.querySelector(".job-postings-grid").innerHTML = providerjobhtml;
}


async function main() {
    await getrecentapplications();
    await getproviderdata();
    await providerjobs();
    await getrequireddata();
    genraterecentjob();
    await genrateproviderjob();

    document.querySelectorAll(".btn-outline").forEach((button) => {
        button.addEventListener("click", () => {

            let seeker_id = button.dataset.jobid;
        })
    })

    document.querySelectorAll(".viewapplicants").forEach((applicants) => {
        applicants.addEventListener("click", () => {
            let job_id = applicants.dataset.jobid;
            window.location.href = `./job-details-applicants.html?jobid=${job_id}`;
        });
    });


    document.querySelector(".active-jobs").innerHTML = requireddata.active;
    document.querySelector(".applicants-num").innerHTML = requireddata.count;
    document.querySelector(".hired-num").innerHTML = "0"

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