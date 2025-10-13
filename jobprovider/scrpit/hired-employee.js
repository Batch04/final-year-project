
let hireddata = [];
async function gethireddata() {

    let data = await fetch("../backend/gethiredemployess.php");
    let respose = await data.text();
    console.log(respose);
    hireddata = JSON.parse(respose);
    console.log(hireddata);
}

function getInitials(name) {
    if (!name) return "";

    return name
        .trim()
        .split(/\s+/)             // split by one or more spaces
        .map(word => word[0].toUpperCase()) // take first letter of each word
        .join('');                // join them together
}

function genratehireddata() {
    let hiredhtml = ``;
    if (hireddata.length !== 0) {

        hireddata.forEach((user) => {

            hiredhtml += `
        
            <div class="employee-card">
                <div class="card-header">
                    <div class="avatar bg-blue-light">${getInitials(user.name)}</div>
                    <div class="name-role">
                        <h2 class="name">${user.name}</h2>
                        <p class="role blue-accent">${user.job_title}</p>
                    </div>
                </div>
                <div class="card-details">
                    <p class="detail-item"><i class="ri-briefcase-line"></i>${user.job_type}</p>
                    <p class="detail-item"><i class="ri-time-line"></i>${user.work_load} hours ${user.work_period}</p>
                    <p class="detail-item"><i class="ri-money-rupee-circle-line"></i>₹ ${user.job_salary} ${user.job_salary_time}</p>
                    <p class="detail-item"><i class="ri-calendar-line"></i>${user.hired_at}</p>
                </div>
                <div class="card-actions">
                    <button class="btn btn-contact" data-phone="${user.phone}">Contact</button>
                    <button class="btn btn-view-profile" data-seekerid="${user.seeker_id}">View Profile</button>
                    <button class="btn btn-fire bg-red" title="Terminate Employment" data-seekerid="${user.seeker_id}" data-jobid="${user.job_id}" >Fire</button>
                </div>
            </div>

        `;

        });

        document.querySelector(".employee-grid").innerHTML = hiredhtml;
    }
    else {
        document.querySelector(".employee-grid").innerHTML = `<h3 style="color:red">NO EMPLOYEES HIRED</h3>`;

    }

}



document.addEventListener('DOMContentLoaded', async () => {
    // Select all buttons

    await gethireddata();
    genratehireddata();

    document.querySelectorAll(".btn-view-profile").forEach((profile) => {
        profile.addEventListener("click", () => {
            let id = profile.dataset.seekerid;
            console.log(id);
            window.location.href = `./seeker-profile.html?seekerid=${id}`
        })
    })
    document.querySelectorAll(".btn-contact").forEach((contact) => {
        contact.addEventListener("click", () => {
            let id = contact.dataset.phone;
            window.location.href = `tel:+91${id}`;
        })
    })
    document.querySelectorAll(".btn-fire").forEach((fire) => {
        fire.addEventListener("click", async () => {
            let id = fire.dataset.seekerid;
            let jobid = fire.dataset.jobid;
            console.log(id);
            console.log(jobid);
            let res = await fetch("../backend/fireemploye.php", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'seekerid': id, 'jobid': jobid })
            })

            let rawdata = await res.text();
            console.log(rawdata);
            let result = JSON.parse(rawdata);
            console.log(result);

            await gethireddata();
            genratehireddata();

        })
    })

});