# Project Structure

This document outlines the structure of the project, providing an overview of its directories and their contents.

## Root Directory

The root directory contains the following subdirectories and the main `index.html` file:

-   **auth/**: Handles authentication-related functionalities, including login and signup for both job providers and seekers.
-   **authentication/**: Contains HTML files and associated scripts and styles for user authentication.
-   **backend/**: Includes all PHP scripts for backend logic, such as database connections, user registration, and job management.
-   **desgin/**: Contains design files for different parts of the application.
-   **images/**: Stores all image assets used throughout the project.
-   **jobprovider/**: Contains all files related to the job provider's dashboard and functionalities.
-   **jobseeker/**: Contains all files related to the job seeker's dashboard and functionalities.
-   **scrpit/**: Contains JavaScript files used across the project.
-   **styles/**: Contains CSS files for styling the application.
-   **index.html**: The main landing page of the application.

## Subdirectories

### `auth/`

-   **forgotpass/**: Contains files related to the password recovery process.
-   **style/**: Contains stylesheets for the authentication pages.
-   **provider_login.html**: Login page for job providers.
-   **provider_signup.html**: Signup page for job providers.
-   **seeker_login.html**: Login page for job seekers.
-   **seeker_signup.html**: Signup page for job seekers.

### `authentication/`

-   **script/**: JavaScript files for authentication functionalities.
-   **styles/**: CSS files for authentication pages.
-   **jobprovider-login.html**: Job provider login page.
-   **jobprovidersignup.html**: Job provider signup page.
-   **jobseeker-login.html**: Job seeker login page.
-   **jobseekersignup.html**: Job seeker signup page.
-   **loginpage.html**: A general login page.
-   **signuppage.html**: A general signup page.

### `backend/`

This directory contains numerous PHP files that handle the backend logic of the application, including:

-   `connect.php` & `connection.php`: Database connection scripts.
-   `register_provider.php` & `register_seeker.php`: User registration scripts.
-   `provider_log.php` & `seeker_log.php`: User login scripts.
-   `add_jobs.php`: Script to add new jobs.
-   `applyjob.php`: Script to handle job applications.
-   And many more for various functionalities.

### `desgin/`

-   **Job-desgin/**: Design files related to job postings.
-   **landing_page-desgin/**: Design files for the landing page.

### `images/`

-   **background.jpg**: Background image.
-   **cta-background.jpg**: Call-to-action background image.
-   **dual-user-feature.png**: Image for the dual user feature.
-   **location-feature.png**: Image for the location feature.
-   **quick-application.png**: Image for the quick application feature.

### `jobprovider/`

-   **images/**: Images specific to the job provider section.
-   **scrpit/**: JavaScript files for the job provider dashboard.
-   **styles/**: CSS files for the job provider dashboard.
-   **dashboard.html**: Job provider's main dashboard.
-   **post-job.html**: Page for posting a new job.
-   **posted-jobs-overview.html**: Overview of all posted jobs.
-   And other HTML files for managing the job provider's profile and settings.

### `jobseeker/`

-   **images/**: Images specific to the job seeker section.
-   **script/**: JavaScript files for the job seeker dashboard.
-   **styles/**: CSS files for the job seeker dashboard.
-   **dashboard.html**: Job seeker's main dashboard.
-   **search-page.html**: Page for searching jobs.
-   **savedjobs.html**: Page to view saved jobs.
-   And other HTML files for managing the job seeker's profile and applications.

### `scrpit/`

-   **jquery.js**: The jQuery library.
-   **landing.js**: JavaScript for the landing page.

### `styles/`

-   **landing.css**: CSS for the landing page.
