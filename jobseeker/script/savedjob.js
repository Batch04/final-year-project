let savedata = [];
async function genratesaveddata() {
    try {
        let resposive = await fetch("../backend/getsavedjob.php");
        let rawdata = await resposive.text();

        try {
            savedata = JSON.parse(rawdata);
        } catch (err) {
            console.log("something error", err);
        }
    } catch (er) {
        console.log('eror ', er);
    }

}

function genratesavejob() {
    let savedjob = "";
    console.log(savedata);
    if (savedata.length === 0) {
        let errormessage = document.querySelector(".savedgrid-container")
        errormessage.innerHTML = "<h4 style='color:var(--blue);'>There are no Saved jobs 😢😢</h4>";
    }
    else {

        savedata.forEach((job) => {
            if (job.job_status === "open") {
                savedjob += `
                <div class="job-card">
                            <div class="job-header">
                                <div class="logo-container">
                                    <div class="company-logo">
                                        <img src="images/logo.png" alt="TechCorp">
                                    </div>
                                    <div class="save-container">
                                        <button class="save-job-btn" data-heart="save" data-jobid="${job.jobs_id}" data-jobtitle="${job.job_title}">
                                            <i class="fa-solid fa-heart "></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="job-basic-info">
                                    <h3 class="job-title">${job.job_title}</h3>
                                    <p class="company-name">${job.company_name}</p>
                                    <div class="job-meta">
                                        <span class="job-location">
                                            <i class="fas fa-map-marker-alt"></i>
                                            <p>${job.job_location} </p>
                                        </span>
                                        <span class="job-type">${job.job_type} </span>
                                    </div>
                                </div>
    
                            </div>
    
                            <div class="job-details">
                                <div class="job-container">
    
                                    <div class="job-salary">
                                        <i class="fa-solid fa-indian-rupee-sign"></i>
                                        <p>${job.job_salary} /${job.job_salary_time} </p>
                                    </div>
                                    <div class="job-time">
                                        <i class="fas fa-clock"></i>
                                        <p>${job.workload} hours/${job.workperiod} </p>
                                    </div>
                                </div>
                            </div>
    
                            <div class="job-description">
                                <p>${job.job_description} </p>
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
        document.querySelector(".savedgrid-container").innerHTML = savedjob;
    }

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

    let realdata = JSON.parse(data);
    console.log(realdata);
}



async function main() {
    await genratesaveddata();
    genratesavejob();

    let savedbutton = document.querySelectorAll(".save-job-btn");
    let jobid;
    let jobtitle;
    let refrese = false;
    savedbutton.forEach((btn) => {
        btn.addEventListener("click", async () => {
            let status = btn.dataset.heart;
            jobid = btn.dataset.jobid;
            btn.innerHTML = '<i class="far fa-heart" >';
            jobtitle = btn.dataset.jobtitle;
            if (status === "save") {
                await postsavejob(jobid, jobtitle, "unsave");
                refrese = true;
            }

            if (refrese) {
                await genratesaveddata();
                genratesavejob();
            }
        });
    });

    let apllyjob = document.querySelectorAll(".btn-primary");
    apllyjob.forEach((btn) => {
        btn.addEventListener("click", () => {
            let jobid = btn.dataset.jobid;
            window.location.href = `./apply-job.html?jobid=${jobid}`;
        })
    })

}

main();