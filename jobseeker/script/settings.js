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
        changePasswordForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Password change simulated!");
            this.closest(".modal-overlay").classList.remove("show");
        });
    }

    const deactivateButton = document.querySelector("#deactivateAccountModal .modal-deactivate-btn");
    if (deactivateButton) {
        deactivateButton.addEventListener("click", function() {
            alert("Account deactivation simulated!");
            this.closest(".modal-overlay").classList.remove("show");
        });
    }

    const deleteButton = document.querySelector("#deleteAccountModal .modal-delete-btn");
    if (deleteButton) {
        deleteButton.addEventListener("click", function() {
            alert("Account deletion simulated! This action is irreversible.");
            this.closest(".modal-overlay").classList.remove("show");
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


