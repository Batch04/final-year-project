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

        <div class="nav-actions">
            <a href="../jobprovider/post-job.html"> <button class=" header-post-button">
                    <i class="fas fa-plus"></i>
                    Post New Job
                </button></a>
        </div>

        <div class="nav-profile">
            <div class="profile-dropdown">
                <div class="avater-image-container">
                    <img src="images/job-provider-avatar.png" alt="Profile" class="profile-avatar">
                </div>
                <div class="profile-details">
                    <span class="profile-name">TechCorp Solutions</span>
                    <i class="fas fa-chevron-down"></i>
                </div>

                <div class="dropdown-menu">
                    <a href="dashboard.html" class="dropdown-item">
                        <div>
                            <i class="fa-solid fa-house"></i>
                            <p>Home</p>
                        </div>
                    </a>
                    <a href="profile-information.html" class="dropdown-item">
                        <div>
                            <i class="fas fa-building"></i>
                            <p>Company Profile</p>
                        </div>
                    </a>
                    <a href="postings.html" class="dropdown-item">
                        <div>
                            <i class="fas fa-briefcase"></i>
                            <p>My Job Postings</p>
                        </div>
                    </a>
                    <a href="posted-jobs-overview.html" class="dropdown-item">
                        <div>
                            <i class="fas fa-users"></i>
                            <p>Applicants</p>
                        </div>
                    </a>
                    <a href="settings.html" class="dropdown-item">
                        <div>
                            <i class="fas fa-cog"></i>
                            <p>Settings</p>
                        </div>
                    </a>
                    <a href="../backend/provider_logout.php" class="dropdown-item">
                        <div>
                            <i class="fas fa-sign-out-alt"></i>
                            <p>Logout</p>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </div>

    <script>
        
    <?php
        session_start();
    ?>

    const name = '<?php echo $_SESSION['provider_id'] ?>'

    console.log(name);
    document.querySelector(".profile-name").innerHTML = name;

    </script>
</body>

</html>


