// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initializeSearch();
    initializeFilters();
    initializeJobCards();
    initializeApplications();
    initializeNotifications();
    initializeProfileDropdown();
    initializeJobPostings();
});

// Search functionality
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const jobTitleInput = document.getElementById('jobTitleSearch');
    const locationInput = document.getElementById('locationSearch');

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const jobTitle = jobTitleInput?.value || '';
            const location = locationInput?.value || '';
            
            // Simulate search
            showNotification(`Searching for "${jobTitle}" in ${location}`, 'info');
            
            // In a real app, this would trigger an API call
            setTimeout(() => {
                showNotification('Search completed! Found 23 new jobs.', 'success');
            }, 1500);
        });
    }

    // Enter key support
    [jobTitleInput, locationInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn?.click();
                }
            });
        }
    });
}

// Filter functionality
function initializeFilters() {
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter applications based on status
            const status = this.dataset.status;
            filterApplications(status);
        });
    });

    // Filter selects
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // In a real app, this would filter the results
            showNotification('Filters applied', 'info');
        });
    });

    // Filter button
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Show advanced filters modal (placeholder)
            showNotification('Advanced filters would open here', 'info');
        });
    }
}

// Filter applications by status
function filterApplications(status) {
    const applicationItems = document.querySelectorAll('.application-item');
    
    applicationItems.forEach(item => {
        if (status === 'all' || item.dataset.status === status) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Job card functionality
function initializeJobCards() {
    // Save job buttons
    const saveJobBtns = document.querySelectorAll('.save-job-btn');
    saveJobBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            const isSaved = this.classList.contains('saved');
            
            if (isSaved) {
                this.classList.remove('saved');
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Job removed from saved jobs', 'info');
            } else {
                this.classList.add('saved');
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Job saved successfully!', 'success');
            }
        });
    });

    // Apply buttons
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard.querySelector('.job-title').textContent;
            const companyName = jobCard.querySelector('.company-name').textContent;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            this.disabled = true;
            
            // Simulate application process
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Applied';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                showNotification(`Successfully applied to ${jobTitle} at ${companyName}!`, 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                    this.disabled = false;
                }, 3000);
            }, 2000);
        });
    });

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading more jobs
            setTimeout(() => {
                this.innerHTML = 'Load More Jobs';
                this.disabled = false;
                showNotification('Loaded 10 more jobs', 'success');
            }, 1500);
        });
    }
}

// Application functionality
function initializeApplications() {
    // Action buttons in applications
    const actionBtns = document.querySelectorAll('.application-actions .action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.getAttribute('title');
            showNotification(`${title} functionality would be implemented here`, 'info');
        });
    });

    // Application footer buttons
    const applicationBtns = document.querySelectorAll('.application-footer .btn');
    applicationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action.includes('Interview')) {
                showNotification('Joining interview...', 'info');
                // Simulate joining interview
                setTimeout(() => {
                    showNotification('Interview link opened in new tab', 'success');
                }, 1000);
            } else if (action.includes('Withdraw')) {
                if (confirm('Are you sure you want to withdraw this application?')) {
                    showNotification('Application withdrawn', 'warning');
                    // Hide the application item
                    const applicationItem = this.closest('.application-item');
                    applicationItem.style.opacity = '0.5';
                    applicationItem.style.pointerEvents = 'none';
                }
            } else {
                showNotification(`${action} functionality would be implemented here`, 'info');
            }
        });
    });
}

// Notification functionality
function initializeNotifications() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Toggle notification dropdown (placeholder)
            showNotification('Notification panel would open here', 'info');
            
            // Clear notification badge
            const badge = this.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }
}

// Profile dropdown functionality
function initializeProfileDropdown() {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (profileDropdown && dropdownMenu) {
        // Show dropdown on hover (already handled by CSS)
        
        // Handle dropdown item clicks
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const text = this.textContent.trim();
                
                if (text === 'Logout') {
                    if (confirm('Are you sure you want to logout?')) {
                        showNotification('Logging out...', 'info');
                        setTimeout(() => {
                            window.location.href = '../auth/login.html';
                        }, 1000);
                    }
                    e.preventDefault();
                } else if (!this.href || this.href.includes('#')) {
                    e.preventDefault();
                    showNotification(`${text} page would be implemented here`, 'info');
                }
            });
        });
    }
}

// Job posting functionality (for job providers)
function initializeJobPostings() {
    // Post new job buttons
    const postJobBtns = document.querySelectorAll('.post-job-btn, .btn:contains("Post New Job")');
    postJobBtns.forEach(btn => {
        if (btn.textContent.includes('Post')) {
            btn.addEventListener('click', function() {
                showNotification('Job posting form would open here', 'info');
            });
        }
    });

    // Job posting action buttons
    const jobActionBtns = document.querySelectorAll('.job-actions .btn');
    jobActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action.includes('Edit')) {
                showNotification('Job editing form would open here', 'info');
            } else if (action.includes('View Applicants')) {
                showNotification('Applicants list would open here', 'info');
            } else if (action.includes('Resume')) {
                showNotification('Job posting resumed', 'success');
                // Update status badge
                const statusBadge = this.closest('.job-posting-card').querySelector('.status-badge');
                if (statusBadge) {
                    statusBadge.textContent = 'Active';
                    statusBadge.className = 'status-badge active';
                }
            }
        });
    });

    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card .btn');
    actionCards.forEach(btn => {
        btn.addEventListener('click', function() {
            const cardTitle = this.closest('.action-card').querySelector('h3').textContent;
            showNotification(`${cardTitle} functionality would be implemented here`, 'info');
        });
    });

    // Application review buttons
    const reviewBtns = document.querySelectorAll('.application-card .btn');
    reviewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action.includes('Review')) {
                showNotification('Application review panel would open here', 'info');
            } else if (action.includes('Schedule Interview')) {
                showNotification('Interview scheduling form would open here', 'info');
            } else if (action.includes('Join Interview')) {
                showNotification('Joining interview...', 'info');
            } else if (action.includes('View Profile')) {
                showNotification('Candidate profile would open here', 'info');
            }
        });
    });
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#0077B5';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
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

// Auto-refresh functionality (simulate real-time updates)
function startAutoRefresh() {
    setInterval(() => {
        // Simulate receiving new notifications
        const notificationBadge = document.querySelector('.notification-badge');
        if (notificationBadge && Math.random() > 0.8) {
            const currentCount = parseInt(notificationBadge.textContent) || 0;
            notificationBadge.textContent = currentCount + 1;
            notificationBadge.style.display = 'inline-block';
        }
    }, 30000); // Check every 30 seconds
}

// Start auto-refresh when page loads
startAutoRefresh();

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust layout if needed
    const navbar = document.querySelector('.navbar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 768) {
        // Mobile adjustments
        navbar?.classList.add('mobile');
    } else {
        navbar?.classList.remove('mobile');
    }
});

// Initialize tooltips (if needed)
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[title]');
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Custom tooltip implementation would go here
        });
    });
}

// Call tooltip initialization
initializeTooltips();

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search focus
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('jobTitleSearch');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }
    
    // Escape to close dropdowns/modals
    if (e.key === 'Escape') {
        // Close any open dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }
});

// Performance monitoring
function trackUserInteraction(action, element) {
    // In a real app, this would send analytics data
    console.log(`User action: ${action} on ${element}`);
}

// Add interaction tracking to buttons
document.querySelectorAll('button, .btn').forEach(button => {
    button.addEventListener('click', function() {
        trackUserInteraction('click', this.textContent.trim() || this.className);
    });
});

// Page visibility API for pausing/resuming updates
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause updates
        console.log('Page hidden - pausing updates');
    } else {
        // Page is visible, resume updates
        console.log('Page visible - resuming updates');
    }
});

