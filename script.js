// Simplified script with minimal animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle with accessibility improvements
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = mainNav.classList.contains('active');
            
            // Toggle menu visibility
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Update accessibility attributes
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Change icon based on state
            const icon = this.querySelector('i');
            if (!isExpanded) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
                // Add focus trap for keyboard users
                trapFocus(mainNav);
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
                // Remove focus trap
                removeFocusTrap();
            }
        });
        
        // Close mobile nav when clicking on a link
        const mobileNavLinks = mainNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            });
        });
        
        // Close menu on escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('nav-open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                mobileNavToggle.focus(); // Return focus to toggle button
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }
    
    // Focus trap for mobile navigation
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        // Store the function to use it in the removal later
        element.focusTrapHandler = function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        };
        
        element.addEventListener('keydown', element.focusTrapHandler);
    }
    
    function removeFocusTrap() {
        if (mainNav.focusTrapHandler) {
            mainNav.removeEventListener('keydown', mainNav.focusTrapHandler);
        }
    }
    
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Check for dark mode preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    // Toggle switch functionality
    const toggleSwitch = document.querySelector('.toggle-switch');
    const toggleCircle = document.querySelector('.toggle-circle');
    const body = document.body;

    // Initialize toggle state based on dark mode
    if (body.classList.contains('dark-mode')) {
        toggleCircle.style.transform = 'translateX(18px)';
    }

    toggleSwitch.addEventListener('click', function() {
        // Toggle dark mode
        body.classList.toggle('dark-mode');
        
        // Update toggle position
        if (body.classList.contains('dark-mode')) {
            toggleCircle.style.transform = 'translateX(18px)';
        } else {
            toggleCircle.style.transform = 'translateX(0)';
        }
    });

    // Solution card selection
    const solutionCards = document.querySelectorAll('.solutions .card');
    
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            solutionCards.forEach(c => {
                c.classList.remove('selected');
                c.querySelector('.dot').classList.remove('selected');
            });
            
            // Add selection to clicked card
            this.classList.add('selected');
            this.querySelector('.dot').classList.add('selected');
        });
    });

    // Approach tabs functionality
    const approachItems = document.querySelectorAll('.approach-item');
    const approachDescription = document.querySelector('.approach-description');
    const approachImage = document.querySelector('.approach-image img');
    
    // Define content for each approach with enhanced descriptions and list format
    const approachContent = {
        'Workflow Audit': {
            description: `
                <p>We start by understanding what you do and where the friction is. Together, we'll identify your highest-leverage tasks for automation.</p>
                <p>Based on your needs, we map out a phased plan using the right mix of tools—intuitive, powerful, and tailored to your level of comfort with tech.</p>
                
                <h4 class="use-cases-title">Use Cases We've Helped With:</h4>
                <ul class="use-cases-list">
                    <li><i class="ph ph-check-circle"></i> Automated scheduling and reminders for busy entrepreneurs</li>
                    <li><i class="ph ph-check-circle"></i> Smart customer service bots for WhatsApp or social media queries</li>
                    <li><i class="ph ph-check-circle"></i> Intelligent document generation for contracts, forms, or reports</li>
                </ul>
            `,
            image: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=500&auto=format&fit=crop&q=80&crop=entropy'
        },
        'Custom AI Blueprint': {
            description: `
                <p>Based on our workflow audit findings, we design a customized AI strategy that's tailored to your specific needs:</p>
                <ul class="use-cases-list">
                    <li><i class="ph ph-check-circle"></i> Prioritized AI tools selection based on your specific workflows</li>
                    <li><i class="ph ph-check-circle"></i> Integration plan that works with your existing tools and platforms</li>
                    <li><i class="ph ph-check-circle"></i> Clear metrics to measure success and ROI of your AI implementations</li>
                    <li><i class="ph ph-check-circle"></i> AI-assisted social media systems that plan, post, and optimize content</li>
                </ul>
                <p>Our blueprint approach ensures that every AI solution we recommend fits naturally into your existing workflow and delivers immediate value.</p>
            `,
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=80&crop=entropy'
        },
        'Implementation & Training': {
            description: `
                <p>We don't just recommend tools—we help you implement them and train your team for maximum adoption and impact:</p>
                <ul class="use-cases-list">
                    <li><i class="ph ph-check-circle"></i> Hands-on setup and configuration of all recommended AI tools</li>
                    <li><i class="ph ph-check-circle"></i> Clear, practical training tailored to different learning styles</li>
                    <li><i class="ph ph-check-circle"></i> AI-enhanced sales funnels that never miss a lead</li>
                    <li><i class="ph ph-check-circle"></i> Custom prompt libraries and templates for your specific use cases</li>
                    <li><i class="ph ph-check-circle"></i> AI dashboards for tracking productivity and client activity</li>
                </ul>
                <p>Our implementation process focuses on getting you comfortable and confident with the new tools, ensuring you get maximum value from day one.</p>
            `,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=80&crop=entropy'
        }
    };
    
    approachItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selection from all items
            approachItems.forEach(i => {
                i.classList.remove('selected');
                i.querySelector('.dot').classList.remove('selected');
            });
            
            // Add selection to clicked item
            this.classList.add('selected');
            this.querySelector('.dot').classList.add('selected');
            
            // Update content based on selected approach
            const approachName = this.querySelector('h3').textContent;
            approachDescription.innerHTML = approachContent[approachName].description;
            approachImage.src = approachContent[approachName].image;
            approachImage.alt = approachName + ' Process';
        });
    });

    // Add hover effect to single testimonial
    const testimonialCard = document.querySelector('.testimonial-card');
    if (testimonialCard) {
        testimonialCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05), 0 6px 10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.1)';
        });
        
        testimonialCard.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }

    // Create AI consultation form
    function createConsultationForm() {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'tiwa-modal';
        modal.style.display = 'block'; // Show immediately
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tiwa-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tiwa-close';
        closeBtn.innerHTML = '&times;';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'tiwa-modal-header';
        modalHeader.innerHTML = '<h2>AI Adoption Consultation</h2>';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'tiwa-modal-body';
        
        // Create consultation form container
        const formContainer = document.createElement('div');
        formContainer.className = 'consultation-form-container';
        
        const formIntro = document.createElement('div');
        formIntro.className = 'consultation-form-intro';
        formIntro.innerHTML = `
            <p>Our AI Adoption Specialist is ready to help you find the right AI solutions for your needs.</p>
            <p>Please fill out the form below to get started with your free consultation.</p>
        `;
        
        const form = document.createElement('form');
        form.className = 'consultation-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="fullName">Full Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" required>
            </div>
            <div class="form-group">
                <label for="businessType">Business Type</label>
                <select id="businessType" name="businessType" required>
                    <option value="" disabled selected>Select your business type</option>
                    <option value="solo">Solo Professional/Freelancer</option>
                    <option value="small">Small Business (1-10 employees)</option>
                    <option value="medium">Medium Business (11-50 employees)</option>
                    <option value="large">Large Business (50+ employees)</option>
                    <option value="personal">Personal Use</option>
                </select>
            </div>
            <div class="form-group">
                <label for="aiChallenge">What's your biggest challenge that AI could help with?</label>
                <select id="aiChallenge" name="aiChallenge" required>
                    <option value="" disabled selected>Select your biggest challenge</option>
                    <option value="automation">Automating repetitive tasks</option>
                    <option value="customerService">Customer service/support</option>
                    <option value="contentCreation">Content creation</option>
                    <option value="dataAnalysis">Data analysis</option>
                    <option value="processOptimization">Process optimization</option>
                    <option value="other">Something else</option>
                </select>
            </div>
            <div class="form-group" id="otherChallengeGroup" style="display: none;">
                <label for="otherChallenge">Please describe your challenge</label>
                <textarea id="otherChallenge" name="otherChallenge" rows="3" placeholder="Describe how AI could help your business"></textarea>
            </div>
            <div class="form-group">
                <label for="aiExperience">How familiar are you with using AI tools?</label>
                <select id="aiExperience" name="aiExperience" required>
                    <option value="" disabled selected>Select your experience level</option>
                    <option value="beginner">Complete beginner</option>
                    <option value="some">Some experience</option>
                    <option value="regular">Regular user</option>
                    <option value="advanced">Advanced user</option>
                </select>
            </div>
            <div class="form-group">
                <label for="message">Any additional information you'd like to share?</label>
                <textarea id="message" name="message" rows="3" placeholder="Tell us more about your AI adoption goals"></textarea>
            </div>
            <button type="submit" class="cta-button">Submit Consultation Request</button>
        `;
        
        // Append elements to DOM
        formContainer.appendChild(formIntro);
        formContainer.appendChild(form);
        
        modalBody.appendChild(formContainer);
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Add event listener for "other" challenge option
        const aiChallengeSelect = document.getElementById('aiChallenge');
        const otherChallengeGroup = document.getElementById('otherChallengeGroup');
        
        aiChallengeSelect.addEventListener('change', function() {
            if (this.value === 'other') {
                otherChallengeGroup.style.display = 'block';
            } else {
                otherChallengeGroup.style.display = 'none';
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="ph ph-check-circle" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                    <h3>Thank You for Your Consultation Request!</h3>
                    <p>Your request has been received. One of our AI Adoption Specialists will reach out to you shortly to discuss how we can help implement AI solutions tailored to your specific needs.</p>
                    <p style="margin-top: 20px;">In the meantime, feel free to explore our website to learn more about our approach and success stories.</p>
                </div>
            `;
            
            // Close modal after 8 seconds
            setTimeout(() => {
                modal.style.display = 'none';
                // Remove modal after fade out
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 500);
            }, 8000);
        });
        
        // Add event listeners for modal closing
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            // Remove modal after fade out
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 500);
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                // Remove modal after fade out
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 500);
            }
        });
        
        return modal;
    }
    
    // Create human demo request form
    function createDemoRequestModal() {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'tiwa-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tiwa-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tiwa-close';
        closeBtn.innerHTML = '&times;';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'tiwa-modal-header';
        modalHeader.innerHTML = '<h2>Schedule a Human Demo</h2>';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'tiwa-modal-body';
        
        // Create form interface
        const formContainer = document.createElement('div');
        formContainer.className = 'tiwa-form-container';
        
        const formIntro = document.createElement('div');
        formIntro.className = 'tiwa-form-intro';
        formIntro.innerHTML = `
            <p>Experience a personalized demo with one of our AI adoption specialists.</p>
            <p>Fill out the form below to schedule a one-on-one session where we can discuss your specific needs and demonstrate our solutions.</p>
        `;
        
        const form = document.createElement('form');
        form.className = 'tiwa-demo-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email address" required>
            </div>
            <div class="form-group">
                <label for="company">Company Name</label>
                <input type="text" id="company" placeholder="Enter your company name" required>
            </div>
            <div class="form-group">
                <label for="industry">Industry</label>
                <select id="industry" required>
                    <option value="" disabled selected>Select your industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="message">What would you like to discuss in the demo?</label>
                <textarea id="message" rows="4" placeholder="Tell us about your specific needs or challenges"></textarea>
            </div>
            <button type="submit" class="cta-button">Request Demo</button>
        `;
        
        // Append elements to DOM
        formContainer.appendChild(formIntro);
        formContainer.appendChild(form);
        
        modalBody.appendChild(formContainer);
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Add event listeners
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            formContainer.innerHTML = `
                <div class="success-message">
                    <i class="ph ph-check-circle" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                    <h3>Thank You for Your Request!</h3>
                    <p>Your demo request has been received. A member of our team will contact you shortly to schedule your personalized demonstration.</p>
                </div>
            `;
            
            // Close modal after 5 seconds
            setTimeout(() => {
                modal.style.display = 'none';
            }, 5000);
        });
        
        return modal;
    }
    
    // Create the modal
    const demoModal = createDemoRequestModal();
    
    // Debug logging
    console.log('Script loaded and running');
    
    // Check if elements exist
    const heroCta = document.querySelector('.hero .cta-button');
    const tiwaChatCta = document.querySelector('#try-tiwa-chat');
    const tiwaDemo = document.querySelector('#try-tiwa-demo');
    
    console.log('Hero CTA button exists:', !!heroCta);
    console.log('Try Tiwa Chat button exists:', !!tiwaChatCta);
    console.log('Try Tiwa Demo button exists:', !!tiwaDemo);
    
    // Fix for the consultation form - direct implementation
    function showConsultationForm(e) {
        console.log('Showing consultation form');
        if (e) e.preventDefault();
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'tiwa-modal';
        modal.id = 'consultation-modal';
        modal.style.display = 'block'; // Show immediately
        
        const modalContent = document.createElement('div');
        modalContent.className = 'tiwa-modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'tiwa-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '20px';
        closeBtn.style.fontSize = '28px';
        
        const modalHeader = document.createElement('div');
        modalHeader.className = 'tiwa-modal-header';
        modalHeader.innerHTML = '<h2>AI Adoption Consultation</h2>';
        
        const modalBody = document.createElement('div');
        modalBody.className = 'tiwa-modal-body';
        
        // Create form content
        modalBody.innerHTML = `
            <div class="consultation-form-container">
                <div class="consultation-form-intro">
                    <p>Our AI Adoption Specialist is ready to help you find the right AI solutions for your needs.</p>
                    <p>Please fill out the form below to get started with your free consultation.</p>
                </div>
                <form id="consultation-form" class="consultation-form">
                    <div class="form-group">
                        <label for="fullName">Full Name</label>
                        <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                    </div>
                    <div class="form-group">
                        <label for="businessType">Business Type</label>
                        <select id="businessType" name="businessType" required>
                            <option value="" disabled selected>Select your business type</option>
                            <option value="solo">Solo Professional/Freelancer</option>
                            <option value="small">Small Business (1-10 employees)</option>
                            <option value="medium">Medium Business (11-50 employees)</option>
                            <option value="large">Large Business (50+ employees)</option>
                            <option value="personal">Personal Use</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="aiChallenge">What's your biggest challenge that AI could help with?</label>
                        <select id="aiChallenge" name="aiChallenge" required>
                            <option value="" disabled selected>Select your biggest challenge</option>
                            <option value="automation">Automating repetitive tasks</option>
                            <option value="customerService">Customer service/support</option>
                            <option value="contentCreation">Content creation</option>
                            <option value="dataAnalysis">Data analysis</option>
                            <option value="processOptimization">Process optimization</option>
                            <option value="other">Something else</option>
                        </select>
                    </div>
                    <div class="form-group" id="otherChallengeGroup" style="display: none;">
                        <label for="otherChallenge">Please describe your challenge</label>
                        <textarea id="otherChallenge" name="otherChallenge" rows="3" placeholder="Describe how AI could help your business"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="aiExperience">How familiar are you with using AI tools?</label>
                        <select id="aiExperience" name="aiExperience" required>
                            <option value="" disabled selected>Select your experience level</option>
                            <option value="beginner">Complete beginner</option>
                            <option value="some">Some experience</option>
                            <option value="regular">Regular user</option>
                            <option value="advanced">Advanced user</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">Any additional information you'd like to share?</label>
                        <textarea id="message" name="message" rows="3" placeholder="Tell us more about your AI adoption goals"></textarea>
                    </div>
                    <button type="submit" class="cta-button">Submit Consultation Request</button>
                </form>
            </div>
        `;
        
        // Append elements to DOM
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        closeBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            modal.style.display = 'none';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 500);
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                console.log('Clicked outside modal');
                modal.style.display = 'none';
                setTimeout(() => {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }, 500);
            }
        });
        
        // Handle "other" challenge option
        const aiChallengeSelect = document.getElementById('aiChallenge');
        const otherChallengeGroup = document.getElementById('otherChallengeGroup');
        
        if (aiChallengeSelect && otherChallengeGroup) {
            aiChallengeSelect.addEventListener('change', function() {
                console.log('Challenge selection changed:', this.value);
                if (this.value === 'other') {
                    otherChallengeGroup.style.display = 'block';
                } else {
                    otherChallengeGroup.style.display = 'none';
                }
            });
        }
        
        // Handle form submission
        const form = document.getElementById('consultation-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                console.log('Form submitted');
                e.preventDefault();
                
                const formContainer = document.querySelector('.consultation-form-container');
                if (formContainer) {
                    // Show success message
                    formContainer.innerHTML = `
                        <div class="success-message">
                            <i class="ph ph-check-circle" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                            <h3>Thank You for Your Consultation Request!</h3>
                            <p>Your request has been received. One of our AI Adoption Specialists will reach out to you shortly to discuss how we can help implement AI solutions tailored to your specific needs.</p>
                            <p style="margin-top: 20px;">In the meantime, feel free to explore our website to learn more about our approach and success stories.</p>
                        </div>
                    `;
                    
                    // Close modal after 8 seconds
                    setTimeout(() => {
                        modal.style.display = 'none';
                        setTimeout(() => {
                            if (document.body.contains(modal)) {
                                document.body.removeChild(modal);
                            }
                        }, 500);
                    }, 8000);
                }
            });
        }
        
        return modal;
    }
    
    // Main CTA button in hero section - opens consultation form with direct inline function
    if (heroCta) {
        console.log('Adding event listener to Hero CTA button');
        heroCta.addEventListener('click', function(e) {
            console.log('Hero CTA button clicked - direct handler');
            e.preventDefault();
            
            // Create and show the form directly
            const modal = document.createElement('div');
            modal.className = 'tiwa-modal';
            modal.style.display = 'block';
            console.log('Modal created and display set to block');
            modal.innerHTML = `
                <div class="tiwa-modal-content">
                    <span class="tiwa-close" style="cursor: pointer; position: absolute; top: 10px; right: 20px; font-size: 28px;">&times;</span>
                    <div class="tiwa-modal-header">
                        <h2>AI Adoption Consultation</h2>
                    </div>
                    <div class="tiwa-modal-body">
                        <div class="consultation-form-container">
                            <div class="consultation-form-intro">
                                <p>Our AI Adoption Specialist is ready to help you find the right AI solutions for your needs.</p>
                                <p>Please fill out the form below to get started with your free consultation.</p>
                            </div>
                            <form id="consultation-form" class="consultation-form">
                                <div class="form-group">
                                    <label for="fullName">Full Name</label>
                                    <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" id="email" name="email" placeholder="Enter your email address" required>
                                </div>
                                <div class="form-group">
                                    <label for="businessType">Business Type</label>
                                    <select id="businessType" name="businessType" required>
                                        <option value="" disabled selected>Select your business type</option>
                                        <option value="solo">Solo Professional/Freelancer</option>
                                        <option value="small">Small Business (1-10 employees)</option>
                                        <option value="medium">Medium Business (11-50 employees)</option>
                                        <option value="large">Large Business (50+ employees)</option>
                                        <option value="personal">Personal Use</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="aiChallenge">What's your biggest challenge that AI could help with?</label>
                                    <select id="aiChallenge" name="aiChallenge" required>
                                        <option value="" disabled selected>Select your biggest challenge</option>
                                        <option value="automation">Automating repetitive tasks</option>
                                        <option value="customerService">Customer service/support</option>
                                        <option value="contentCreation">Content creation</option>
                                        <option value="dataAnalysis">Data analysis</option>
                                        <option value="processOptimization">Process optimization</option>
                                        <option value="other">Something else</option>
                                    </select>
                                </div>
                                <div class="form-group" id="otherChallengeGroup" style="display: none;">
                                    <label for="otherChallenge">Please describe your challenge</label>
                                    <textarea id="otherChallenge" name="otherChallenge" rows="3" placeholder="Describe how AI could help your business"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="aiExperience">How familiar are you with using AI tools?</label>
                                    <select id="aiExperience" name="aiExperience" required>
                                        <option value="" disabled selected>Select your experience level</option>
                                        <option value="beginner">Complete beginner</option>
                                        <option value="some">Some experience</option>
                                        <option value="regular">Regular user</option>
                                        <option value="advanced">Advanced user</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="message">Any additional information you'd like to share?</label>
                                    <textarea id="message" name="message" rows="3" placeholder="Tell us more about your AI adoption goals"></textarea>
                                </div>
                                <button type="submit" class="cta-button">Submit Consultation Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add event listeners
            const closeBtn = modal.querySelector('.tiwa-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    console.log('Close button clicked');
                    modal.style.display = 'none';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 500);
                });
            }
            
            // Handle "other" challenge option
            const aiChallengeSelect = modal.querySelector('#aiChallenge');
            const otherChallengeGroup = modal.querySelector('#otherChallengeGroup');
            
            if (aiChallengeSelect && otherChallengeGroup) {
                aiChallengeSelect.addEventListener('change', function() {
                    console.log('Challenge selection changed:', this.value);
                    if (this.value === 'other') {
                        otherChallengeGroup.style.display = 'block';
                    } else {
                        otherChallengeGroup.style.display = 'none';
                    }
                });
            }
            
            // Handle form submission
            const form = modal.querySelector('#consultation-form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    console.log('Form submitted');
                    e.preventDefault();
                    
                    const formContainer = modal.querySelector('.consultation-form-container');
                    if (formContainer) {
                        // Show success message
                        formContainer.innerHTML = `
                            <div class="success-message">
                                <i class="ph ph-check-circle" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                                <h3>Thank You for Your Consultation Request!</h3>
                                <p>Your request has been received. One of our AI Adoption Specialists will reach out to you shortly to discuss how we can help implement AI solutions tailored to your specific needs.</p>
                                <p style="margin-top: 20px;">In the meantime, feel free to explore our website to learn more about our approach and success stories.</p>
                            </div>
                        `;
                        
                        // Close modal after 8 seconds
                        setTimeout(() => {
                            modal.style.display = 'none';
                            setTimeout(() => {
                                if (document.body.contains(modal)) {
                                    document.body.removeChild(modal);
                                }
                            }, 500);
                        }, 8000);
                    }
                });
            }
            
            // Handle clicks outside the modal
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    console.log('Clicked outside modal');
                    modal.style.display = 'none';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 500);
                }
            });
        });
    }
    
    // CTA button in CTA section - opens consultation form with direct inline function
    if (tiwaChatCta) {
        console.log('Adding event listener to Try Tiwa Chat button');
        tiwaChatCta.addEventListener('click', function(e) {
            console.log('Try Tiwa Chat button clicked - direct handler');
            e.preventDefault();
            
            // Create and show the form directly
            const modal = document.createElement('div');
            modal.className = 'tiwa-modal';
            modal.style.display = 'block';
            modal.innerHTML = `
                <div class="tiwa-modal-content">
                    <span class="tiwa-close" style="cursor: pointer; position: absolute; top: 10px; right: 20px; font-size: 28px;">&times;</span>
                    <div class="tiwa-modal-header">
                        <h2>AI Adoption Consultation</h2>
                    </div>
                    <div class="tiwa-modal-body">
                        <div class="consultation-form-container">
                            <div class="consultation-form-intro">
                                <p>Our AI Adoption Specialist is ready to help you find the right AI solutions for your needs.</p>
                                <p>Please fill out the form below to get started with your free consultation.</p>
                            </div>
                            <form id="consultation-form-2" class="consultation-form">
                                <div class="form-group">
                                    <label for="fullName2">Full Name</label>
                                    <input type="text" id="fullName2" name="fullName" placeholder="Enter your full name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email2">Email Address</label>
                                    <input type="email" id="email2" name="email" placeholder="Enter your email address" required>
                                </div>
                                <div class="form-group">
                                    <label for="businessType2">Business Type</label>
                                    <select id="businessType2" name="businessType" required>
                                        <option value="" disabled selected>Select your business type</option>
                                        <option value="solo">Solo Professional/Freelancer</option>
                                        <option value="small">Small Business (1-10 employees)</option>
                                        <option value="medium">Medium Business (11-50 employees)</option>
                                        <option value="large">Large Business (50+ employees)</option>
                                        <option value="personal">Personal Use</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="aiChallenge2">What's your biggest challenge that AI could help with?</label>
                                    <select id="aiChallenge2" name="aiChallenge" required>
                                        <option value="" disabled selected>Select your biggest challenge</option>
                                        <option value="automation">Automating repetitive tasks</option>
                                        <option value="customerService">Customer service/support</option>
                                        <option value="contentCreation">Content creation</option>
                                        <option value="dataAnalysis">Data analysis</option>
                                        <option value="processOptimization">Process optimization</option>
                                        <option value="other">Something else</option>
                                    </select>
                                </div>
                                <div class="form-group" id="otherChallengeGroup2" style="display: none;">
                                    <label for="otherChallenge2">Please describe your challenge</label>
                                    <textarea id="otherChallenge2" name="otherChallenge" rows="3" placeholder="Describe how AI could help your business"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="aiExperience2">How familiar are you with using AI tools?</label>
                                    <select id="aiExperience2" name="aiExperience" required>
                                        <option value="" disabled selected>Select your experience level</option>
                                        <option value="beginner">Complete beginner</option>
                                        <option value="some">Some experience</option>
                                        <option value="regular">Regular user</option>
                                        <option value="advanced">Advanced user</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="message2">Any additional information you'd like to share?</label>
                                    <textarea id="message2" name="message" rows="3" placeholder="Tell us more about your AI adoption goals"></textarea>
                                </div>
                                <button type="submit" class="cta-button">Submit Consultation Request</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add event listeners
            const closeBtn = modal.querySelector('.tiwa-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    console.log('Close button clicked');
                    modal.style.display = 'none';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 500);
                });
            }
            
            // Handle "other" challenge option
            const aiChallengeSelect = modal.querySelector('#aiChallenge2');
            const otherChallengeGroup = modal.querySelector('#otherChallengeGroup2');
            
            if (aiChallengeSelect && otherChallengeGroup) {
                aiChallengeSelect.addEventListener('change', function() {
                    console.log('Challenge selection changed:', this.value);
                    if (this.value === 'other') {
                        otherChallengeGroup.style.display = 'block';
                    } else {
                        otherChallengeGroup.style.display = 'none';
                    }
                });
            }
            
            // Handle form submission
            const form = modal.querySelector('#consultation-form-2');
            if (form) {
                form.addEventListener('submit', function(e) {
                    console.log('Form submitted');
                    e.preventDefault();
                    
                    const formContainer = modal.querySelector('.consultation-form-container');
                    if (formContainer) {
                        // Show success message
                        formContainer.innerHTML = `
                            <div class="success-message">
                                <i class="ph ph-check-circle" style="font-size: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                                <h3>Thank You for Your Consultation Request!</h3>
                                <p>Your request has been received. One of our AI Adoption Specialists will reach out to you shortly to discuss how we can help implement AI solutions tailored to your specific needs.</p>
                                <p style="margin-top: 20px;">In the meantime, feel free to explore our website to learn more about our approach and success stories.</p>
                            </div>
                        `;
                        
                        // Close modal after 8 seconds
                        setTimeout(() => {
                            modal.style.display = 'none';
                            setTimeout(() => {
                                if (document.body.contains(modal)) {
                                    document.body.removeChild(modal);
                                }
                            }, 500);
                        }, 8000);
                    }
                });
            }
            
            // Handle clicks outside the modal
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    console.log('Clicked outside modal');
                    modal.style.display = 'none';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 500);
                }
            });
        });
    }
    
    // Secondary button in CTA section - opens demo request modal
    if (tiwaDemo) {
        console.log('Adding event listener to Try Tiwa Demo button');
        tiwaDemo.addEventListener('click', function(e) {
            console.log('Try Tiwa Demo button clicked');
            e.preventDefault();
            console.log('Demo modal exists:', !!demoModal);
            demoModal.style.display = 'block';
        });
    }
});
