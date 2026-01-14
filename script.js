// VS Code + MacBook Portfolio - Interactive Features

// File Navigation System
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all file elements and sections
    const files = document.querySelectorAll('.file');
    const sections = document.querySelectorAll('.code-section');
    const tabs = document.querySelectorAll('.tab');
    
    // File click handler
    files.forEach(file => {
        file.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active file in sidebar
            files.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Update tab name
            const fileName = this.querySelector('.file-name').textContent;
            const fileIcon = this.querySelector('.file-icon').textContent;
            const tabName = document.querySelector('.tab-name');
            const tabIcon = document.querySelector('.tab-icon');
            
            if (tabName) tabName.textContent = fileName;
            if (tabIcon) tabIcon.textContent = fileIcon;
            
            // Scroll to top of editor content
            const editorContent = document.querySelector('.editor-content');
            if (editorContent) {
                editorContent.scrollTop = 0;
            }
        });
    });
    
    // Traffic light animations
    const redLight = document.querySelector('.light.red');
    const yellowLight = document.querySelector('.light.yellow');
    const greenLight = document.querySelector('.light.green');
    
    if (redLight) {
        redLight.addEventListener('click', function() {
            if (confirm('Close window?')) {
                document.querySelector('.vscode-window').style.opacity = '0';
                setTimeout(() => {
                    document.querySelector('.vscode-window').style.display = 'none';
                }, 300);
            }
        });
    }
    
    if (yellowLight) {
        yellowLight.addEventListener('click', function() {
            const vscodeWindow = document.querySelector('.vscode-window');
            if (vscodeWindow.style.transform === 'scale(0.9)') {
                vscodeWindow.style.transform = 'scale(1)';
            } else {
                vscodeWindow.style.transform = 'scale(0.9)';
            }
        });
    }
    
    if (greenLight) {
        greenLight.addEventListener('click', function() {
            const vscodeWindow = document.querySelector('.vscode-window');
            if (vscodeWindow.style.maxWidth === '100%') {
                vscodeWindow.style.maxWidth = '1600px';
                vscodeWindow.style.margin = '50px auto 20px';
            } else {
                vscodeWindow.style.maxWidth = '100%';
                vscodeWindow.style.margin = '20px';
            }
        });
    }
    
    // Tab close button
    const tabClose = document.querySelector('.tab-close');
    if (tabClose) {
        tabClose.addEventListener('click', function(e) {
            e.stopPropagation();
            // Just show alert, don't actually close
            alert('Cannot close the only tab! 🔒');
        });
    }
    
    // Activity bar interactions
    const activityIcons = document.querySelectorAll('.activity-icon');
    
    activityIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active state
            activityIcons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Handle different tabs
            if (tab === 'search') {
                alert('🔍 Search functionality - Coming soon!');
            } else if (tab === 'git') {
                alert('🌿 Git integration - Coming soon!');
            } else if (tab === 'extensions') {
                alert('🧩 Extensions - Coming soon!');
            } else if (tab === 'settings') {
                const theme = confirm('Switch to Light Theme?');
                if (theme) {
                    alert('Light theme not available yet! 🌙 Dark mode is better anyway 😎');
                }
            }
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Typing effect for terminal
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const originalContent = terminalBody.innerHTML;
        terminalBody.innerHTML = '';
        
        let index = 0;
        const commands = [
            { text: '$ git clone https://github.com/rizzit17/awesome-project.git', delay: 50 },
            { text: '$ cd awesome-project', delay: 30 },
            { text: '$ npm install && npm start', delay: 40 },
            { text: '✓ Ready to collaborate!', delay: 20, isSuccess: true }
        ];
        
        function typeCommand(commandIndex) {
            if (commandIndex >= commands.length) return;
            
            const command = commands[commandIndex];
            const p = document.createElement('p');
            if (command.isSuccess) {
                p.className = 'terminal-success';
            } else {
                const prompt = document.createElement('span');
                prompt.className = 'terminal-prompt';
                prompt.textContent = '$';
                p.appendChild(prompt);
                p.appendChild(document.createTextNode(' '));
            }
            
            terminalBody.appendChild(p);
            
            let charIndex = 0;
            const commandText = command.isSuccess ? command.text : command.text.substring(2);
            
            const typeInterval = setInterval(() => {
                if (charIndex < commandText.length) {
                    p.textContent = (command.isSuccess ? '' : '$ ') + commandText.substring(0, charIndex + 1);
                    if (command.isSuccess) {
                        p.className = 'terminal-success';
                    }
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => typeCommand(commandIndex + 1), 500);
                }
            }, command.delay);
        }
        
        // Start typing effect after a delay
        setTimeout(() => typeCommand(0), 1000);
    }
    
    // Add hover effects to glassmorphism cards
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 122, 204, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Update status bar time
    function updateStatusBar() {
        const statusLeft = document.querySelector('.status-left');
        if (statusLeft) {
            const lineCol = statusLeft.querySelector('.status-item');
            if (lineCol) {
                // Random line/col updates for effect
                const randomLine = Math.floor(Math.random() * 100) + 1;
                const randomCol = Math.floor(Math.random() * 50) + 1;
                // Keep it static for now
                // lineCol.textContent = `⚡ Ln ${randomLine}, Col ${randomCol}`;
            }
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for Quick Open (file search)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            alert('⌨️ Quick Open - Press number keys 1-6 to navigate sections!');
        }
        
        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '6') {
            const fileIndex = parseInt(e.key) - 1;
            const fileElements = document.querySelectorAll('.file');
            if (fileElements[fileIndex]) {
                fileElements[fileIndex].click();
            }
        }
        
        // Ctrl/Cmd + B to toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
    
    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.link-btn, .project-link, .cert-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Console easter egg
    console.log('%c🚀 Welcome to Rishit\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #007acc;');
    console.log('%c💻 Built with VS Code theme + MacBook design', 'font-size: 14px; color: #4ec9b0;');
    console.log('%c⚡ Full-Stack Developer | React | Node.js | MongoDB', 'font-size: 12px; color: #dcdcaa;');
    console.log('%c📧 rishitwork28@gmail.com', 'font-size: 12px; color: #ce9178;');
    console.log('%cHint: Press Ctrl+K for keyboard shortcuts!', 'font-size: 11px; color: #858585;');
    
    // Add floating code particles effect (subtle)
    createFloatingParticles();
    
    function createFloatingParticles() {
        const particleCount = 20;
        const particles = [];
        const symbols = ['{}', '[]', '<>', '()', ';', '==', '=>', '...', '/*', '*/'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.position = 'fixed';
            particle.style.fontSize = '12px';
            particle.style.color = 'rgba(204, 204, 204, 0.1)';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            particle.style.fontFamily = 'Fira Code, monospace';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            particles.push({
                element: particle,
                x: parseFloat(particle.style.left),
                y: parseFloat(particle.style.top),
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }
        
        function animateParticles() {
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }
    
    // Smooth reveal animations for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all glass elements for animation
    document.querySelectorAll('.glass').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    console.log('%c✨ Portfolio loaded successfully!', 'font-size: 14px; font-weight: bold; color: #28c840;');
});

// Update current time in console
setInterval(() => {
    const now = new Date();
    // Silent update, don't spam console
}, 60000);