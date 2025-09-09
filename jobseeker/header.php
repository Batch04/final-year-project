<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

</head>

<body>


    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="dashboard.html">
                    <h1>PartTimeConnect</h1>
                </a>
            </div>
            <div class="nav-search">
                <div class="search-container">
                    <div class="search-field">
                        <i class="fas fa-map-marker-alt loction"></i>
                        <input type="text" id="locationSearch" placeholder="Find Jobs in Your Location">
                    </div>
                    <button class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div class="nav-profile">
                <div class="profile-dropdown">
                    <div class="profile-section-header">
                        <div class="avatar-image">
                            <img src="images/job-seeker-avatar.png" alt="Profile" class="profile-avatar">
                        </div>
                        <span id="profile-name" class="profile-name">Jaswant</span>
                        <i class="fas fa-chevron-down"></i>
                        <div class="dropdown-menu">
                            <div class="webpage-options">
                                <a href="dashboard.html" class="dropdown-item">
                                    <div>
                                        <i class="fa-solid fa-house"></i>
                                        <p>Home</p>
                                    </div>
                                </a>
                                <a href="user-profile.html" class="dropdown-item">
                                    <div>
                                        <i class="fas fa-user"></i>
                                        <p>My Profile</p>
                                    </div>
                                </a>
                                <a href="applications.html" class="dropdown-item">
                                    <div>
                                        <i class="fas fa-briefcase"></i>
                                        <p>Applied Jobs</p>
                                    </div>
                                </a>
                                <a href="savedjobs.html" class="dropdown-item">
                                    <div>
                                        <i class="fas fa-heart"></i>
                                        <p>Saved Jobs</p>
                                    </div>
                                </a>
                                <a href="settings.html" class="dropdown-item">
                                    <div>
                                        <i class="fas fa-cog"></i>
                                        <p>Settings</p>
                                    </div>
                                </a>
                                <a href="../backend/seeker_logout.php" class="dropdown-item">
                                    <div>
                                        <i class="fas fa-sign-out-alt"></i>
                                        <p>Logout</p>
                                    </div>

                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </nav>

    <script>
        const id = '<?php echo $_SESSION['seeker_id'] ?>';
        console.log(id);
        const name = '<?php echo $_SESSION['seeker_name'] ?>';
        console.log(name);
        document.querySelector(".profile-name").innerHTML = name;
    </script>

</body>

</html>