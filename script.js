// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Progress tracker functionality
    const progressItems = document.querySelectorAll('.progress-item');
    const sections = document.querySelectorAll('.section');
    
    function updateProgress() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                progressItems.forEach(item => item.classList.remove('active'));
                if (progressItems[index]) {
                    progressItems[index].classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateProgress);
    
    // Progress item click functionality
    progressItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (sections[index]) {
                sections[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Copy code functionality
    function copyCode(button) {
        const codeBlock = button.closest('.code-block');
        const codeElement = codeBlock.querySelector('code');
        const textToCopy = codeElement.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(function() {
            // Show success feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        });
    }

    // Make copyCode function globally available
    window.copyCode = copyCode;

    // Modal functionality
    const modal = document.getElementById('solutionModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Exercise solutions
    const exerciseSolutions = {
        exercise1: {
            title: 'First Repository Solution',
            content: `
                <div class="solution-steps">
                    <h3>Step-by-step solution:</h3>
                    <div class="code-block">
                        <div class="code-header">
                            <span>Terminal Commands</span>
                        </div>
                        <pre><code># 1. Create a new folder
mkdir my-first-project
cd my-first-project

# 2. Initialize Git repository
git init

# 3. Create a README file
echo "# My First Project" > README.md

# 4. Add files to staging
git add .

# 5. Make your first commit
git commit -m "Initial commit: Add README file"

# 6. Check status
git status

# 7. View commit history
git log</code></pre>
                    </div>
                    <div class="explanation">
                        <h4>What happened:</h4>
                        <ul>
                            <li><strong>git init</strong>: Creates a new Git repository in the current directory</li>
                            <li><strong>git add .</strong>: Stages all files in the current directory</li>
                            <li><strong>git commit</strong>: Creates a snapshot of your staged changes</li>
                            <li><strong>git status</strong>: Shows the current state of your repository</li>
                            <li><strong>git log</strong>: Displays the commit history</li>
                        </ul>
                    </div>
                </div>
            `
        },
        exercise2: {
            title: 'Branching Exercise Solution',
            content: `
                <div class="solution-steps">
                    <h3>Step-by-step solution:</h3>
                    <div class="code-block">
                        <div class="code-header">
                            <span>Branching Commands</span>
                        </div>
                        <pre><code># 1. Create a feature branch
git branch feature-login

# 2. Switch to the feature branch
git checkout feature-login

# 3. Make changes (create a new file)
echo "function login() { return true; }" > login.js

# 4. Add and commit changes
git add login.js
git commit -m "Add login functionality"

# 5. Switch back to main branch
git checkout main

# 6. Merge the feature branch
git merge feature-login

# 7. Delete the feature branch (optional)
git branch -d feature-login</code></pre>
                    </div>
                    <div class="explanation">
                        <h4>Key concepts:</h4>
                        <ul>
                            <li><strong>git branch</strong>: Creates a new branch without switching to it</li>
                            <li><strong>git checkout</strong>: Switches between branches</li>
                            <li><strong>git merge</strong>: Combines changes from one branch into another</li>
                            <li><strong>git branch -d</strong>: Deletes a branch after merging</li>
                        </ul>
                    </div>
                </div>
            `
        },
        exercise3: {
            title: 'Collaboration Project Solution',
            content: `
                <div class="solution-steps">
                    <h3>Step-by-step solution:</h3>
                    <div class="code-block">
                        <div class="code-header">
                            <span>Collaboration Workflow</span>
                        </div>
                        <pre><code># 1. Fork a repository on GitHub
# Go to the repository page and click "Fork"

# 2. Clone your forked repository
git clone https://github.com/your-username/repository-name.git
cd repository-name

# 3. Add the original repository as upstream
git remote add upstream https://github.com/original-owner/repository-name.git

# 4. Create a new branch for your changes
git checkout -b fix-typo

# 5. Make your improvements
# Edit files, add features, fix bugs...

# 6. Commit your changes
git add .
git commit -m "Fix typo in README"

# 7. Push to your fork
git push origin fix-typo

# 8. Create a Pull Request on GitHub
# Go to your fork on GitHub and click "New Pull Request"</code></pre>
                    </div>
                    <div class="explanation">
                        <h4>Collaboration workflow:</h4>
                        <ul>
                            <li><strong>Fork</strong>: Creates your own copy of someone else's repository</li>
                            <li><strong>Clone</strong>: Downloads the repository to your local machine</li>
                            <li><strong>Upstream</strong>: Keeps track of the original repository for updates</li>
                            <li><strong>Pull Request</strong>: Proposes your changes to the original repository</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };

    // Show solution function
    window.showSolution = function(exerciseId) {
        const solution = exerciseSolutions[exerciseId];
        if (solution) {
            document.getElementById('modalTitle').textContent = solution.title;
            document.getElementById('modalBody').innerHTML = solution.content;
            modal.style.display = 'block';
        }
    };

    // Scroll to section function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.content-card, .command-card, .exercise-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add command highlighting
    const codeSnippets = document.querySelectorAll('.code-snippet code');
    codeSnippets.forEach(snippet => {
        snippet.addEventListener('click', function() {
            // Select the text
            const range = document.createRange();
            range.selectNodeContents(this);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            // Copy to clipboard
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show feedback
                this.style.background = '#d4edda';
                this.style.color = '#155724';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 1000);
            });
        });
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search (if we add a search feature)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Add search functionality here
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});

// Add some CSS for the solution modal
const style = document.createElement('style');
style.textContent = `
    .solution-steps {
        margin-bottom: 1.5rem;
    }
    
    .solution-steps h3 {
        color: #24292e;
        margin-bottom: 1rem;
    }
    
    .explanation {
        margin-top: 1.5rem;
        padding: 1rem;
        background: #f6f8fa;
        border-radius: 8px;
        border-left: 4px solid #0366d6;
    }
    
    .explanation h4 {
        color: #24292e;
        margin-bottom: 0.5rem;
    }
    
    .explanation ul {
        list-style: none;
        padding: 0;
    }
    
    .explanation li {
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        position: relative;
    }
    
    .explanation li:before {
        content: '•';
        color: #0366d6;
        font-weight: bold;
        position: absolute;
        left: 0;
    }
    
    .explanation strong {
        color: #24292e;
    }
    
    .code-snippet {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .code-snippet:hover {
        background: #e1f5fe;
        border-color: #0366d6;
    }
    
    /* Modal scrolling improvements */
    .modal-content {
        max-height: 85vh;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #0366d6 #f1f1f1;
    }
    
    .modal-content::-webkit-scrollbar {
        width: 8px;
    }
    
    .modal-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    
    .modal-content::-webkit-scrollbar-thumb {
        background: #0366d6;
        border-radius: 4px;
    }
    
    .modal-content::-webkit-scrollbar-thumb:hover {
        background: #024ea4;
    }
    
    body.loaded .hero-title {
        animation: fadeInUp 1s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
