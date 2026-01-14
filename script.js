// VS Code + MacBook Portfolio - Interactive Features
// SIMPLE VERSION - No complex animations

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // THEME TOGGLE FUNCTIONALITY
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    // Debug: Check if elements exist
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    if (!themeIcon) {
        console.error('Theme icon not found!');
        return;
    }

    console.log('✅ Theme toggle initialized');

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.textContent = '🌙';
        console.log('Loaded saved light theme');
    } else {
        console.log('Starting in dark theme');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked!');
        body.classList.toggle('light-theme');
        
        // Update icon and save preference
        if (body.classList.contains('light-theme')) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
            console.log('%c🌙 Switched to Light Mode', 'font-size: 14px; color: #0066cc;');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
            console.log('%c☀️ Switched to Dark Mode', 'font-size: 14px; color: #007acc;');
        }
    });

    // ============================================
    // FILE NAVIGATION SYSTEM - SIMPLE VERSION
    // ============================================
    const files = document.querySelectorAll('.file');
    const sections = document.querySelectorAll('.code-section');
    
    // Simple file click handler
    files.forEach(file => {
        file.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            const currentActive = document.querySelector('.code-section.active');
            
            // Prevent clicking the same section
            if (currentActive && currentActive.id === targetSection) {
                return;
            }
            
            // Update active file in sidebar
            files.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Simple section switching
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Update tab
            const fileName = this.querySelector('.file-name').textContent;
            const fileIcon = this.querySelector('.file-icon').textContent;
            const tabName = document.querySelector('.tab-name');
            const tabIcon = document.querySelector('.tab-icon');
            
            if (tabName) tabName.textContent = fileName;
            if (tabIcon) tabIcon.textContent = fileIcon;
            
            // Smooth scroll to top
            const editorContent = document.querySelector('.editor-content');
            if (editorContent) {
                editorContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // TRAFFIC LIGHTS
    // ============================================
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

    // ============================================
    // TAB CLOSE BUTTON
    // ============================================
    const tabClose = document.querySelector('.tab-close');
    if (tabClose) {
        tabClose.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('Cannot close the only tab! 🔒');
        });
    }

    // ============================================
    // ACTIVITY BAR INTERACTIONS
    // ============================================
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
                // Toggle theme when settings is clicked
                themeToggle.click();
            }
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ============================================
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

    // ============================================
    // TERMINAL TYPING EFFECT
    // ============================================
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const originalContent = terminalBody.innerHTML;
        terminalBody.innerHTML = '';
        
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

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for Quick Open
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            alert('⌨️ Quick Open - Press number keys 1-6 to navigate sections!');
        }
        
        // Ctrl/Cmd + Shift + T for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
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

    // ============================================
    // HOVER EFFECTS
    // ============================================
    
    // Skill tags hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Glass cards hover
    const glassCards = document.querySelectorAll('.glass');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 122, 204, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c🚀 Welcome to Rishit\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #007acc;');
    console.log('%c💻 Built with VS Code theme + MacBook design', 'font-size: 14px; color: #4ec9b0;');
    console.log('%c⚡ Full-Stack Developer | React | Node.js | MongoDB', 'font-size: 12px; color: #dcdcaa;');
    console.log('%c📧 rishitwork28@gmail.com', 'font-size: 12px; color: #ce9178;');
    console.log('%c🎨 Theme: ' + currentTheme.toUpperCase() + ' | Toggle: Ctrl+Shift+T', 'font-size: 11px; color: #c586c0;');
    console.log('%cHint: Press Ctrl+K for keyboard shortcuts!', 'font-size: 11px; color: #858585;');
    console.log('%c✨ Portfolio loaded successfully!', 'font-size: 14px; font-weight: bold; color: #28c840;');
});
