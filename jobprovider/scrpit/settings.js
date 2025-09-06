document.addEventListener("DOMContentLoaded", function() {
    initializeDropdowns();
    initializeModals();
    initializeNavbarFunctionality();
    initializeSearchFunctionality();
});

// Dropdown functionality
function initializeDropdowns() {
    const sectionHeaders = document.querySelectorAll(".section-header");

    sectionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const dropdownContent = this.nextElementSibling;
            const dropdownIcon = this.querySelector(".dropdown-icon");

            this.classList.toggle("expanded");
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    });
}

// Modal functionality
function initializeModals() {
    const manageButtons = document.querySelectorAll(".manage-btn");
    const closeButtons = document.querySelectorAll(".modal-overlay .close-button");
    const modalOverlays = document.querySelectorAll(".modal-overlay");

    manageButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modalId = this.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add("show");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const modal = this.closest(".modal-overlay");
            if (modal) {
                modal.classList.remove("show");
            }
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", function(e) {
            if (e.target === this) {
                this.classList.remove("show");
            }
        });
    });

    // Handle modal form submissions (simulated)
    const changePasswordForm = document.querySelector("#changePasswordModal form");
    if (changePasswordForm) {
        changePasswordForm.addEventListener("submit",async function(e) {
            e.preventDefault();

            const formData=new FormData(this);
            console.log(formData);
            try{
            const response=await fetch("../backend/change_pass_provider.php",{
                method:"POST",
                body:formData
            });
            const text = await response.text();
            console.log("Raw Response",text);
            try{
               let   result=JSON.parse(text);
                alert(result.message);
            if(result.status==='success'){

            this.closest(".modal-overlay").classList.remove("show");
            }
        } 
        catch(parseError){
            console.error("Invalid JSON response form server",text);
            alert("Unexpected server response");
        }
     } catch(error){
                alert("Error connecting to server");
                console.error(error);       
                 }
        });
    }

    const deleteButton = document.querySelector("#deleteAccountModal .modal-delete-btn");
    if (deleteButton) {
        deleteButton.addEventListener("click", async function() {
            if(!confirm("Are you sure you want to delete your account?This cannot be undone.")){
                return;
            }
            try{
                const response=await fetch("../backend/delete_account_provider.php",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"}
                });
        
        const text= await response.text();
        console.log("Raw Response",text);
            let result;
            try{
             result = JSON.parse(text);
            }catch(jsonError){
                console.error("Invald JSON",jsonError);
                alert("Server returned invalid JSON");
                return;
            }
            alert(result.message);
            if(result.status==='success'){
                    this.closest(".modal-overlay").classList.remove("show");
                window.location.href="../index.html";
            }
        }catch(error){
            alert("Error connecting to server");
            console.error(error);
        }
        
        });
    }
}

// Navbar functionality (from header.html)
function initializeNavbarFunctionality() {
    const profileSection = document.querySelector(".profile-section");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (profileSection && dropdownMenu) {
        profileSection.addEventListener("click", function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle("active");
        });

        document.addEventListener("click", function() {
            dropdownMenu.classList.remove("active");
        });

        dropdownMenu.addEventListener("click", function(e) {
            e.stopPropagation();
        });
    }
}

// Search functionality (from header.html)
function initializeSearchFunctionality() {
    const searchBtn = document.querySelector(".search-btn");
    const locationSearchInput = document.getElementById("locationSearch");

    if (searchBtn) {
        searchBtn.addEventListener("click", performSearch);
    }

    if (locationSearchInput) {
        locationSearchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const location = document.getElementById("locationSearch").value;
    if (location) {
        // Simulate search or redirect
        alert(`Searching for jobs in: ${location}`);
        // window.location.href = `/search-results.html?location=${encodeURIComponent(location)}`;
    }
}

// Update profile name and avatar (simulated)
document.addEventListener("DOMContentLoaded", function() {
    const profileNameDisplay = document.querySelector(".profile-name-display");
    const profileNameNavbar = document.querySelector(".profile-name");
    const profileAvatarPreview = document.getElementById("profileAvatarPreview");

    // Simulate loading user data
    const userName = "Jaswant";
    const userAvatar = "images/job-seeker-avatar.png"; // Or a path to a default image

    if (profileNameDisplay) {
        profileNameDisplay.textContent = userName;
    }
    if (profileNameNavbar) {
        profileNameNavbar.textContent = userName;
    }
    if (profileAvatarPreview) {
        profileAvatarPreview.src = userAvatar;
    }
});


