let job_seekers = document.querySelector(".job-seekers");
let employer = document.querySelector(".job-provider");

job_seekers.addEventListener("click", () =>{
    console.log("Job Seekers Section");
    document.querySelector("#job-seekers").style.display = "block";
    document.querySelector("#employers").style.display = "none";
} )

employer.addEventListener("click", () =>{
    console.log("Employers Section");
    document.querySelector("#job-seekers").style.display = "none";
    document.querySelector("#employers").style.display = "block";
} )