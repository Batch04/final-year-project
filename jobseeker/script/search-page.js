document.addEventListener('DOMContentLoaded', () => {
    const jobs = [
        {
            title: "Senior Product Designer",
            company: "Tech Solutions Inc.",
            logo: "https://via.placeholder.com/100/F0F0F0?text=TS",
            location: "New York, NY",
            type: "Full-Time",
            experience: "Senior Level",
            description: "We are seeking a talented Senior Product Designer to lead the design of our next-generation software platform. You will work closely with cross-functional teams to define and create elegant user experiences. This is a hands-on role where you will be responsible for everything from initial concept to final implementation.",
            posted: "2 days ago"
        },
        {
            title: "Frontend Developer",
            company: "Creative Studio",
            logo: "https://via.placeholder.com/100/F0F0F0?text=CS",
            location: "Remote",
            type: "Full-Time",
            experience: "Mid-Level",
            description: "Join our team to build stunning and interactive user interfaces. We are looking for a skilled Frontend Developer with expertise in modern frameworks like React or Vue. You will play a key role in bringing our designs to life and ensuring a seamless user experience.",
            posted: "1 day ago"
        },
        {
            title: "Data Scientist",
            company: "Innovate AI Labs",
            logo: "https://via.placeholder.com/100/F0F0F0?text=IAI",
            location: "San Francisco, CA",
            type: "Full-Time",
            experience: "Senior Level",
            description: "Lead our data science initiatives by analyzing complex datasets to extract valuable insights. The ideal candidate has a strong background in machine learning, statistics, and programming. You will be responsible for developing predictive models and data-driven solutions.",
            posted: "4 hours ago"
        },
        {
            title: "UX/UI Designer",
            company: "Design Collective",
            logo: "https://via.placeholder.com/100/F0F0F0?text=DC",
            location: "Los Angeles, CA",
            type: "Full-Time",
            experience: "Junior Level",
            description: "We're looking for a passionate and creative UX/UI Designer to join our team. This role is perfect for someone with a foundational understanding of user-centered design principles who is eager to learn and contribute to a wide range of projects. Portfolio review is a key part of our hiring process.",
            posted: "3 days ago"
        },
        {
            title: "Backend Engineer",
            company: "Cloud Solutions Co.",
            logo: "https://via.placeholder.com/100/F0F0F0?text=CS",
            location: "Seattle, WA",
            type: "Full-Time",
            experience: "Mid-Level",
            description: "Build and maintain the server-side logic and core infrastructure of our applications. We're seeking a Backend Engineer proficient in Node.js, Python, or Go. You'll work on everything from API development to database management, ensuring our systems are robust and scalable.",
            posted: "5 days ago"
        },
        {
            title: "Marketing Manager",
            company: "Brand Masters",
            logo: "https://via.placeholder.com/100/F0F0F0?text=BM",
            location: "London, UK",
            type: "Full-Time",
            experience: "Senior Level",
            description: "Develop and execute innovative marketing strategies to increase brand awareness and drive customer acquisition. The ideal candidate has experience in digital marketing, content creation, and team leadership. You will be responsible for managing campaigns across multiple channels.",
            posted: "6 hours ago"
        }
    ];

    const gridContainer = document.querySelector('.grid-container');

    const createJobCard = (job) => {
        const card = document.createElement('div');
        card.className = 'job-card';

        const cardHTML = `
            <div class="job-header">
                <img src="${job.logo}" alt="${job.company} logo" class="company-logo">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                </div>
            </div>
            <div class="job-meta">
                <span class="meta-tag"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span class="meta-tag"><i class="fas fa-clock"></i> ${job.type}</span>
                <span class="meta-tag"><i class="fas fa-user-tie"></i> ${job.experience}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="job-footer">
                <span class="posted-date">Posted ${job.posted}</span>
                <a href="#" class="apply-button">Apply Now</a>
            </div>
        `;

        card.innerHTML = cardHTML;
        return card;
    };

    const renderJobs = (jobList) => {
        gridContainer.innerHTML = '';
        jobList.forEach(job => {
            gridContainer.appendChild(createJobCard(job));
        });
    };

    // Initial render
    renderJobs(jobs);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const handleSearch = () => {
        const query = searchInput.value.toLowerCase();
        const filteredJobs = jobs.filter(job =>
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query)
        );
        renderJobs(filteredJobs);
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});