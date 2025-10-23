// ==========================================================================
// Navigation Toggle for Mobile
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});

// ==========================================================================
// Smooth Scroll for Navigation Links
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// Load Experience Data
// ==========================================================================
async function loadExperience() {
    try {
        const response = await fetch('data/experience.json');
        const experiences = await response.json();
        const timeline = document.getElementById('experienceTimeline');

        experiences.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            const responsibilities = exp.responsibilities
                ? `<ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>`
                : '';

            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-header">
                        <div>
                            <h3 class="timeline-title">${exp.title}</h3>
                            <p class="timeline-company">${exp.company}</p>
                        </div>
                        <span class="timeline-period">${exp.period}</span>
                    </div>
                    <div class="timeline-description">
                        <p>${exp.description}</p>
                        ${responsibilities}
                    </div>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    } catch (error) {
        console.error('Error loading experience data:', error);
    }
}

// ==========================================================================
// Load Skills Data
// ==========================================================================
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skillsData = await response.json();
        const skillsGrid = document.getElementById('skillsGrid');

        skillsData.forEach(category => {
            const skillCategory = document.createElement('div');
            skillCategory.className = 'skill-category';

            const skillTags = category.skills
                .map(skill => `<span class="skill-tag">${skill}</span>`)
                .join('');

            skillCategory.innerHTML = `
                <h3><i class="${category.icon}"></i> ${category.category}</h3>
                <div class="skill-list">
                    ${skillTags}
                </div>
            `;
            skillsGrid.appendChild(skillCategory);
        });
    } catch (error) {
        console.error('Error loading skills data:', error);
    }
}

// ==========================================================================
// Load Projects Data
// ==========================================================================
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const projectsGrid = document.getElementById('projectsGrid');

        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';

            const techBadges = project.technologies
                .map(tech => `<span class="tech-badge">${tech}</span>`)
                .join('');

            const links = [];
            if (project.github) {
                links.push(`<a href="${project.github}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> View Code
                </a>`);
            }
            if (project.demo) {
                links.push(`<a href="${project.demo}" target="_blank" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>`);
            }

            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="${project.icon || 'fas fa-code'}"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${techBadges}
                    </div>
                    <div class="project-links">
                        ${links.join('')}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects data:', error);
    }
}

// ==========================================================================
// Load Education Data
// ==========================================================================
async function loadEducation() {
    try {
        const response = await fetch('data/education.json');
        const data = await response.json();
        const educationGrid = document.getElementById('educationGrid');
        const certGrid = document.getElementById('certGrid');

        // Load education items
        data.education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';

            eduItem.innerHTML = `
                <div class="education-header">
                    <div>
                        <h3 class="education-degree">${edu.degree}</h3>
                        <p class="education-school">${edu.school}</p>
                    </div>
                    <span class="education-period">${edu.period}</span>
                </div>
                ${edu.details ? `<p class="timeline-description">${edu.details}</p>` : ''}
            `;
            educationGrid.appendChild(eduItem);
        });

        // Load certifications
        data.certifications.forEach(cert => {
            const certItem = document.createElement('div');
            certItem.className = 'cert-item';
            certItem.innerHTML = `
                <strong>${cert.name}</strong>
                ${cert.issuer ? `<p style="font-size: 0.875rem; margin-top: 0.25rem; opacity: 0.8;">${cert.issuer}</p>` : ''}
            `;
            certGrid.appendChild(certItem);
        });
    } catch (error) {
        console.error('Error loading education data:', error);
    }
}

// ==========================================================================
// Contact Form Handler
// ==========================================================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a backend service
        // For now, we'll just show an alert
        alert('Thank you for your message! This is a demo form. In production, this would send your message.');

        // Reset form
        contactForm.reset();
    });
}

// ==========================================================================
// Scroll Reveal Animation
// ==========================================================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .education-item, .stat-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for scroll animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .education-item, .stat-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

window.addEventListener('scroll', revealOnScroll);

// ==========================================================================
// Initialize Everything When DOM is Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadExperience();
    loadSkills();
    loadProjects();
    loadEducation();

    // Small delay to ensure elements are rendered before animation
    setTimeout(() => {
        initScrollAnimation();
        revealOnScroll();
    }, 100);
});

// ==========================================================================
// Active Navigation Link Highlight
// ==========================================================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = 'var(--primary-color)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});
