let providerjobsdata = [];


async function providerjobs() {
    let data = await fetch("../backend/getprovider-jobs.php");
    let response = await data.text();
    providerjobsdata = JSON.parse(response);
    console.log(providerjobsdata);
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
                    <button class="view-applicants-btn viewapplicants " data-jobid="${job.jobs_id}">
                        <i class="fas fa-users"></i>
                        View Applicants
                    </button>
                </div>
        
        `
    });

    document.querySelector(".jobs-grid").innerHTML = jobhtml;
}


async function main() {
    await providerjobs();
    genratejobs();
    document.querySelectorAll(".viewapplicants").forEach((button) => {
        button.addEventListener("click", () => {
            let id = button.dataset.jobid;
            window.location.href = `job-details-applicants.html?jobId=${id}`;
        })
    })

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