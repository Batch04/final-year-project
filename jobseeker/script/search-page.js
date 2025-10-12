let data = [];
let savedstatus = [];
async function genratedata() {
    try {
        let resposive = await fetch("../backend/get-jobs.php");
        let rawdata = await resposive.text();
        try {
            data = JSON.parse(rawdata);
        } catch (err) {
            console.log("something error", err);
        }
    } catch (er) {
        console.log('eror ', er);
    }

}


function genratejob() {
    let postjob = "";
    data.forEach((job) => {
        if (job.job_status === "open") {
            postjob += `
             <div class="job-card">
                <div class="job-header">
                    <div class="logo-container">
                        <div class="company-logo">
                            <img src="images/logo.png" alt="TechCorp">
                        </div>
                        <div class="save-container">
                            ${issave(job.jobs_id) ? `<button class="save-job-btn" data-heart="save" data-jobid="${job.jobs_id}" data-jobtitle="${job.job_title}"><i class="fa-solid fa-heart "></i></button>` : `<button class="save-job-btn" data-heart="unsave" data-jobid="${job.jobs_id}" data-jobtitle="${job.job_title}"> <i class="far fa-heart" ></i></button>`}
                        </div>
                    </div>
                    <div class="job-basic-info">
                        <h3 class="job-title">${job.job_title}</h3>
                        <p class="company-name">${job.company_name}</p>
                        <div class="job-meta">
                            <span class="job-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <p>${job.job_location}</p>
                            </span>
                            <span class="job-type">${job.job_type}</span>
                        </div>
                    </div>

                </div>

                <div class="job-details">
                    <div class="job-container">

                        <div class="job-salary">
                            <i class="fa-solid fa-indian-rupee-sign"></i>
                            <p>${job.job_salary}/${job.job_salary_time}</p>
                        </div>
                        <div class="job-time">
                            <i class="fas fa-clock"></i>
                            <p>${job.workload} hours/${job.workperiod}</p>
                        </div>
                    </div>
                </div>

                <div class="job-description">
                    <p>${job.job_description}</p>
                </div>

                <div class="job-footer">
                    <div class="footer-container">
                        <div class="job-posted">
                            Posted on ${job.job_posted}
                        </div>

                        <div class="apply-container">
                            <button class="btn btn-primary apply-btn" data-jobid="${job.jobs_id}">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    });
    document.querySelector(".searchgrid-container").innerHTML = postjob;
}


async function issaveddata() {

    try {
        let resposive = await fetch("../backend/getsaveddata.php");
        let rawdata = await resposive.text();

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
    await genratedata();
    await issaveddata();
    genratejob();

    let savebuttons = document.querySelectorAll(".save-job-btn");
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

    let apllyjob = document.querySelectorAll(".btn-primary");
    apllyjob.forEach((btn) => {
        btn.addEventListener("click", () => {
            let jobid = btn.dataset.jobid;
            window.location.href = `./apply-job.html?jobid=${jobid}`;
        })
    });

}

main();






