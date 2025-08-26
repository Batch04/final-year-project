document.addEventListener('DOMContentLoaded', function() {
    // Get all buttons that open external links
    const visitButton = document.querySelector('.visit-button');
    const socialButtons = document.querySelectorAll('.social-button');
    const editButton = document.querySelector('.edit-button');
    
    // Get View Applicants buttons and modal elements
    const viewApplicantsButtons = document.querySelectorAll('.view-applicants-btn');
    const modal = document.getElementById('applicantsModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalJobTitle = document.getElementById('modalJobTitle');
    const applicantsList = document.getElementById('applicantsList');
    
    // Sample applicants data for different jobs
    const applicantsData = {
        1: [ // Senior Frontend Developer
            {
                name: 'Sarah Johnson',
                email: 'sarah.johnson@email.com',
                skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
                avatar: 'SJ'
            },
            {
                name: 'Michael Chen',
                email: 'michael.chen@email.com',
                skills: ['Vue.js', 'JavaScript', 'HTML', 'SASS'],
                avatar: 'MC'
            },
            {
                name: 'Emily Rodriguez',
                email: 'emily.rodriguez@email.com',
                skills: ['Angular', 'TypeScript', 'RxJS', 'Material UI'],
                avatar: 'ER'
            }
        ],
        2: [ // UX/UI Designer
            {
                name: 'David Kim',
                email: 'david.kim@email.com',
                skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
                avatar: 'DK'
            },
            {
                name: 'Lisa Wang',
                email: 'lisa.wang@email.com',
                skills: ['UI Design', 'User Research', 'Wireframing', 'Photoshop'],
                avatar: 'LW'
            }
        ],
        3: [ // Backend Developer
            {
                name: 'James Wilson',
                email: 'james.wilson@email.com',
                skills: ['Node.js', 'Python', 'MongoDB', 'Express'],
                avatar: 'JW'
            },
            {
                name: 'Anna Martinez',
                email: 'anna.martinez@email.com',
                skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
                avatar: 'AM'
            },
            {
                name: 'Robert Taylor',
                email: 'robert.taylor@email.com',
                skills: ['PHP', 'Laravel', 'PostgreSQL', 'Redis'],
                avatar: 'RT'
            }
        ],
        4: [ // Marketing Specialist
            {
                name: 'Jennifer Brown',
                email: 'jennifer.brown@email.com',
                skills: ['Digital Marketing', 'SEO', 'Google Analytics', 'Content Strategy'],
                avatar: 'JB'
            },
            {
                name: 'Mark Thompson',
                email: 'mark.thompson@email.com',
                skills: ['Social Media', 'PPC', 'Email Marketing', 'Copywriting'],
                avatar: 'MT'
            }
        ],
        5: [ // Data Analyst
            {
                name: 'Rachel Green',
                email: 'rachel.green@email.com',
                skills: ['Python', 'SQL', 'Tableau', 'Excel'],
                avatar: 'RG'
            },
            {
                name: 'Kevin Lee',
                email: 'kevin.lee@email.com',
                skills: ['R', 'Power BI', 'Statistics', 'Machine Learning'],
                avatar: 'KL'
            }
        ],
        6: [ // Project Manager
            {
                name: 'Amanda Davis',
                email: 'amanda.davis@email.com',
                skills: ['Agile', 'Scrum', 'Jira', 'Team Leadership'],
                avatar: 'AD'
            },
            {
                name: 'Christopher Miller',
                email: 'christopher.miller@email.com',
                skills: ['PMP', 'Risk Management', 'Stakeholder Management', 'Budgeting'],
                avatar: 'CM'
            }
        ]
    };
    
    // Function to show success message
    function showSuccessMessage(message) {
        // Remove existing success messages
        const existingMessages = document.querySelectorAll('.success-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ${message}
        `;

        document.body.appendChild(messageDiv);

        // Show message with animation
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 100);

        // Hide message after 3 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }

    // Function to add loading state to button
    function addLoadingState(button) {
        button.classList.add('loading');
        button.disabled = true;
    }

    // Function to remove loading state from button
    function removeLoadingState(button) {
        button.classList.remove('loading');
        button.disabled = false;
    }

    // Function to create applicant card HTML
    function createApplicantCard(applicant) {
        return `
            <div class="applicant-card">
                <div class="applicant-avatar">${applicant.avatar}</div>
                <div class="applicant-info">
                    <div class="applicant-name">${applicant.name}</div>
                    <div class="applicant-email">${applicant.email}</div>
                    <div class="applicant-skills">
                        ${applicant.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="applicant-actions">
                    <button class="action-btn view" onclick="viewApplicantProfile('${applicant.name}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn contact" onclick="contactApplicant('${applicant.email}')">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                </div>
            </div>
        `;
    }

    // Function to show modal with applicants
    function showApplicantsModal(jobId, jobTitle) {
        const applicants = applicantsData[jobId] || [];
        
        modalJobTitle.textContent = `Applicants for ${jobTitle}`;
        
        if (applicants.length === 0) {
            applicantsList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--gray);">
                    <i class="fas fa-users" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No applicants yet for this position.</p>
                </div>
            `;
        } else {
            applicantsList.innerHTML = applicants.map(createApplicantCard).join('');
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to hide modal
    function hideApplicantsModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Handle View Applicants buttons
    viewApplicantsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const jobId = this.getAttribute('data-job-id');
            const jobTitle = this.getAttribute('data-job-title');
            
            // Add loading state
            addLoadingState(this);
            
            // Simulate loading delay
            setTimeout(() => {
                // Remove loading state
                removeLoadingState(this);
                
                // Show modal
                showApplicantsModal(jobId, jobTitle);
                
                // Show success message
                showSuccessMessage(`Loaded applicants for ${jobTitle}`);
            }, 800);
        });

        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('loading')) {
                this.style.transform = '';
            }
        });
    });

    // Handle modal close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideApplicantsModal);
    }

    // Handle modal background click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideApplicantsModal();
            }
        });
    }

    // Handle escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideApplicantsModal();
        }
    });

    // Global functions for applicant actions
    window.viewApplicantProfile = function(name) {
        showSuccessMessage(`Viewing profile for ${name}`);
        // In a real app, this would navigate to the applicant's detailed profile
    };

    window.contactApplicant = function(email) {
        showSuccessMessage(`Opening email to contact ${email}`);
        // In a real app, this would open the email client or messaging system
        window.open(`mailto:${email}`, '_blank');
    };

    // Handle visit website button
    if (visitButton) {
        visitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.getAttribute('data-url');
            
            if (url) {
                // Add loading state
                addLoadingState(this);
                
                // Simulate loading delay
                setTimeout(() => {
                    // Remove loading state
                    removeLoadingState(this);
                    
                    // Open URL in new tab
                    window.open(url, '_blank', 'noopener,noreferrer');
                    
                    // Show success message
                    showSuccessMessage('Website opened in new tab!');
                }, 500);
            }
        });

        // Add hover effect
        visitButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        visitButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }

   
    // Handle edit button
    if (editButton) {
        editButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            addLoadingState(this);
            
            // Simulate loading delay
            setTimeout(() => {
                // Remove loading state
                removeLoadingState(this);
                
                // Show success message (in a real app, this would navigate to edit page)
                showSuccessMessage('Edit functionality would be implemented here!');
            }, 500);
        });

        // Add hover effect
        editButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        editButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }


    // Enhanced info card hover effects
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach((card, index) => {
        // Staggered animation on page load
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    Enhanced job card hover effects
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach((card, index) => {
        // Staggered animation on page load
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Company logo hover effect
    const companyLogo = document.querySelector('.company-logo-circle');
    if (companyLogo) {
        companyLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05) rotate(5deg)';
        });

        companyLogo.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }

    // Add smooth scroll behavior for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'E' to trigger edit button
        if (e.key === 'e' || e.key === 'E') {
            if (editButton && !e.ctrlKey && !e.altKey && !e.metaKey && !modal.classList.contains('show')) {
                e.preventDefault();
                editButton.click();
            }
        }
        
        // Press 'W' to trigger website visit
        if (e.key === 'w' || e.key === 'W') {
            if (visitButton && !e.ctrlKey && !e.altKey && !e.metaKey && !modal.classList.contains('show')) {
                e.preventDefault();
                visitButton.click();
            }
        }
    });

    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('.visit-button, .social-button, .edit-button, .view-applicants-btn, .close-modal, .action-btn');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(3, 132, 252, 0.5)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for scroll animations
    [...infoCards, ...jobCards].forEach(card => {
        observer.observe(card);
    });

    // Add copy to clipboard functionality for email and website
    const emailValue = document.querySelector('.info-card:nth-child(2) .info-value');
    const websiteValue = document.querySelector('.website-link');

    function addCopyFunctionality(element, type) {
        if (element) {
            element.style.cursor = 'pointer';
            element.title = `Click to copy ${type}`;
            
            element.addEventListener('click', function() {
                const text = this.textContent.trim();
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(() => {
                        showSuccessMessage(`${type} copied to clipboard!`);
                    }).catch(() => {
                        // Fallback for older browsers
                        copyToClipboardFallback(text, type);
                    });
                } else {
                    copyToClipboardFallback(text, type);
                }
            });
        }
    }

    function copyToClipboardFallback(text, type) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showSuccessMessage(`${type} copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showSuccessMessage(`Failed to copy ${type}`);
        }
        
        document.body.removeChild(textArea);
    }

    // Add copy functionality
    addCopyFunctionality(emailValue, 'Email');
    addCopyFunctionality(websiteValue, 'Website URL');

    // Add responsive behavior for mobile
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Adjust animations for mobile
            [...infoCards, ...jobCards].forEach(card => {
                card.style.animationDuration = '0.4s';
            });
        } else {
            // Reset animations for desktop
            [...infoCards, ...jobCards].forEach(card => {
                card.style.animationDuration = '0.6s';
            });
        }
    }

    // Initial call and event listener for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add loading screen effect
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });



    // Console log for debugging
    console.log('Profile Information page with Posted Jobs loaded successfully!');
    console.log('Available keyboard shortcuts:');
    console.log('- Press "E" to edit profile');
    console.log('- Press "W" to visit website');
    console.log('- Press "Escape" to close modal');
    console.log('- Click on email or website URL to copy to clipboard');
});

