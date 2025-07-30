let job_seekers = document.querySelector(".job-seekers");
let employer = document.querySelector(".job-provider");

job_seekers.style.backgroundColor = "#0384fc";
job_seekers.style.color = "#f5f6f7"

job_seekers.addEventListener("click", () => {
    console.log("Job Seekers Section");
    document.querySelector("#job-seekers").style.display = "block";
    document.querySelector("#employers").style.display = "none";
    job_seekers.style.backgroundColor = "#0384fc";
    job_seekers.style.color = "#f5f6f7"
    employer.style.backgroundColor = "#f5f6f7";
    employer.style.color = "#0384fc";
})

employer.addEventListener("click", () => {
    console.log("Employers Section");
    document.querySelector("#job-seekers").style.display = "none";
    document.querySelector("#employers").style.display = "block";
    employer.style.backgroundColor = "#0384fc";
    employer.style.color = "#f5f6f7";
    job_seekers.style.backgroundColor = "#f5f6f7";
    job_seekers.style.color = "#0384fc";
})