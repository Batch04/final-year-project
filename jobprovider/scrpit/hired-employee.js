// --- UTILITY FUNCTIONS (For Notifications) ---

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function showNotification(message, type = 'info') {
    // Remove existing notifications to avoid stacking
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification with transition
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


// --- CORE APPLICATION LOGIC ---

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
                    <button class="btn btn-fire bg-red" title="Terminate Employment" data-seekerid="${user.seeker_id}" data-jobid="${user.job_id}" data-jobname="${user.job_title}" >Fire</button>
                </div>
            </div>

        `;

        });

        document.querySelector(".employee-grid").innerHTML = hiredhtml;
    }
    else {
        document.querySelector(".employee-grid").innerHTML = `<h3 style="color:var(--red)">NO EMPLOYEES HIRED</h3>`;

    }

}



async function main() {
    
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
        fire.addEventListener("click", async function() {
            const fireButton = this;
            let id = fireButton.dataset.seekerid;
            let jobid = fireButton.dataset.jobid;
            let jobname = fireButton.dataset.jobname;

            // 1. Disable button and show sending mail transition
            fireButton.disabled = true;
            // Use Font Awesome spin class for visual transition
            fireButton.innerHTML = `<i class="fas fa-paper-plane fa-spin"></i>...`;
            
            try {
                // 2. Fire employee (database update)
                let res = await fetch("../backend/fireemploye.php", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'seekerid': id, 'jobid': jobid })
                });
                let rawdata = await res.text();
                let result = JSON.parse(rawdata);
                
                // 3. Send email notification
                let response = await fetch("../backend/send-fire-mail.php", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'seekerid': id, 'jobid': jobid, 'jobname': jobname })
                });
                let maildata = await response.text();
                let mailresult = JSON.parse(maildata);
                console.log(mailresult);

                // 4. Handle Notification and final button state
                if (mailresult.status === "success") {
                    // Update button to success state (Mail Sent)
                    fireButton.innerHTML = `<i class="fas fa-envelope-open-text"></i> Mail Sent`;
                    fireButton.classList.remove('bg-red');
                    fireButton.classList.add('bg-safe'); 
                    
                    // Show notification
                    showNotification(mailresult.message, 'success');
                    
                } else if (mailresult.message) {
                    // Re-enable button on email failure and show error
                    fireButton.disabled = false;
                    fireButton.innerHTML = `Fire`; // Revert to original text
                    showNotification(`Email failed: ${mailresult.message}`, 'error');
                } else {
                    // Default email failure handling
                    fireButton.disabled = false;
                    fireButton.innerHTML = `Fire`; // Revert to original text
                    showNotification("Fired employee, but failed to send email notification.", 'warning');
                }
                
            } catch (error) {
                // Handle critical network or parsing errors
                showNotification("An unexpected error occurred during the process.", 'error');
                fireButton.disabled = false;
                fireButton.innerHTML = `Fire`; // Revert to original text
            }
            
            // 5. Call main() to reload the list (removes the card)
            main();
        })
    })

}

main(); 