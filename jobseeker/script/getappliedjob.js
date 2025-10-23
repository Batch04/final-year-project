
let applieddata = [];
async function genrateapplieddata() {
    let respose = await fetch("../backend/getappliedjob.php");
    let rawdata = await respose.text();
    console.log(rawdata);
    applieddata = JSON.parse(rawdata);
    console.log(applieddata);

}

function getInitials(name) {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/)             // split by one or more spaces
        .map(word => word[0].toUpperCase()) // take first letter of each word
        .join('');                // join them together
}

function genrateapplyjob() {
    let appliedjob = '';
    applieddata.forEach((job) => {
        appliedjob += `
        
        <div class="job-card">
                <div class="company-basic-details">
                    <div class="logo-container">
                        <h3>${getInitials(job.company_name)}</h3>
                    </div>
                    <div class="saved-container">
                        ${issave(job.jobs_id) ? `<button class="saved-button" data-heart="save" data-jobid="${job.jobs_id} " data-jobtitle="${job.job_title}"><i class="fa-solid fa-heart"></i></button>` : `<button class="saved-button" data-heart="unsave"  data-jobid="${job.jobs_id} " data-jobtitle="${job.job_title}"> <i class="fa-regular fa-heart"></i></button>`}
                    </div>
                </div>
                <div class="job-basic-deatils">
                    <h2 class="job-title">${job.job_title} </h2>
                    <p class="company-name">${job.company_name} </p>
                </div>
                <div class="job-location-detalis">
                    <div class="job-location">
                        <i class="fa-solid fa-location-dot"></i>
                        <p>${job.job_location}</p>
                    </div>
                    <div class="job-type">
                        <span>${job.job_type} </span>
                    </div>
                </div>
                <div class="job-pay">
                    <div class="job-slary">
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        <p>${job.job_salary} /${job.job_salary_time} </p>
                    </div>
                    <div class="job-time">
                        <i class="fa-solid fa-clock"></i>
                        <p>${job.workload}hrs/${job.workperiod} </p>
                    </div>
                </div>
                <div class="job-status-details">
                    <div class="job-status">
                        <i class="fa-solid fa-circle-check"></i>
                        <p>Applied Succesfully</p>
                    </div>
                    <div class="applied-date">
                        <p>Applied on ${job.applied_date} </p>
                    </div>
                </div>
                <div class="view-more">
                    <button class="view-more-btn"  data-jobid="${job.jobs_id}">View More</button>
                </div>
            </div>
        `
    });

    document.querySelector(".apply-grid-container").innerHTML = appliedjob;
}



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

    await genrateapplieddata();
    await issaveddata();
    genrateapplyjob();

    let savebuttons = document.querySelectorAll(".saved-button");
    let jobid;
    let jobtitle;
    savebuttons.forEach((btn) => {

        btn.addEventListener("click", async () => {
            let status = btn.dataset.heart;
            jobid = btn.dataset.jobid;
            jobtitle = btn.dataset.jobtitle;

            if (status === "unsave") {
                btn.innerHTML = '<i class="fa-solid fa-heart "></i>';
                btn.dataset.heart = "save"
                await postsavejob(jobid, jobtitle, "save");
            }
            else if (status === "save") {
                btn.innerHTML = '<i class="far fa-heart" >';
                btn.dataset.heart = "unsave"
                await postsavejob(jobid, jobtitle, "unsave");
            }
        });

    });

    let apllyjob = document.querySelectorAll(".view-more-btn");
    apllyjob.forEach((btn) => {
        btn.addEventListener("click", () => {
            let jobid = btn.dataset.jobid;
            console.log(jobid);
            window.location.href = `./applied-job-details.html?jobid=${jobid}`;
        })
    });
}

main();