// VS Code + MacBook Portfolio - Interactive Features
// Updated with functional activity bar buttons

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
    // FILE NAVIGATION SYSTEM
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
    // ACTIVITY BAR INTERACTIONS - UPDATED
    // ============================================
    const activityIcons = document.querySelectorAll('.activity-icon');
    const sidebar = document.querySelector('.sidebar');
    const sidebarHeader = document.querySelector('.sidebar-header span');
    
    activityIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            // Update active state
            activityIcons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Handle different tabs
            if (tab === 'explorer') {
                // Show file explorer (default view)
                showExplorer();
            } else if (tab === 'search') {
                // Show search interface
                showSearch();
            } else if (tab === 'git') {
                // Show source control (GitHub links)
                showSourceControl();
            } else if (tab === 'extensions') {
                // Show extensions (skills/certifications)
                showExtensions();
            } else if (tab === 'settings') {
                // Toggle theme when settings is clicked
                themeToggle.click();
            }
        });
    });

    // ============================================
    // SIDEBAR VIEWS
    // ============================================
    
    function showExplorer() {
        sidebarHeader.textContent = 'EXPLORER';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <span>EXPLORER</span>
            </div>
            <div class="file-tree">
                <div class="folder open">
                    <div class="folder-header">
                        <span class="folder-icon">📁</span>
                        <span class="folder-name">portfolio</span>
                    </div>
                    <div class="folder-content">
                        <div class="file ${document.getElementById('about').classList.contains('active') ? 'active' : ''}" data-section="about">
                            <span class="file-icon">📄</span>
                            <span class="file-name">about.jsx</span>
                        </div>
                        <div class="file ${document.getElementById('projects').classList.contains('active') ? 'active' : ''}" data-section="projects">
                            <span class="file-icon">🚀</span>
                            <span class="file-name">projects.tsx</span>
                        </div>
                        <div class="file ${document.getElementById('skills').classList.contains('active') ? 'active' : ''}" data-section="skills">
                            <span class="file-icon">⚡</span>
                            <span class="file-name">skills.json</span>
                        </div>
                        <div class="file ${document.getElementById('experience').classList.contains('active') ? 'active' : ''}" data-section="experience">
                            <span class="file-icon">💼</span>
                            <span class="file-name">positions.ts</span>
                        </div>
                        <div class="file ${document.getElementById('internships').classList.contains('active') ? 'active' : ''}" data-section="internships">
                            <span class="file-icon">🎯</span>
                            <span class="file-name">internships.tsx</span>
                        </div>
                        <div class="file ${document.getElementById('certifications').classList.contains('active') ? 'active' : ''}" data-section="certifications">
                            <span class="file-icon">🏆</span>
                            <span class="file-name">certifications.md</span>
                        </div>
                        <div class="file ${document.getElementById('contact').classList.contains('active') ? 'active' : ''}" data-section="contact">
                            <span class="file-icon">📧</span>
                            <span class="file-name">contact.css</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Re-attach file click handlers
        const newFiles = sidebar.querySelectorAll('.file');
        newFiles.forEach(file => {
            file.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');
                const currentActive = document.querySelector('.code-section.active');
                
                if (currentActive && currentActive.id === targetSection) return;
                
                newFiles.forEach(f => f.classList.remove('active'));
                this.classList.add('active');
                
                sections.forEach(section => section.classList.remove('active'));
                
                const targetElement = document.getElementById(targetSection);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
                
                const fileName = this.querySelector('.file-name').textContent;
                const fileIcon = this.querySelector('.file-icon').textContent;
                const tabName = document.querySelector('.tab-name');
                const tabIcon = document.querySelector('.tab-icon');
                
                if (tabName) tabName.textContent = fileName;
                if (tabIcon) tabIcon.textContent = fileIcon;
                
                const editorContent = document.querySelector('.editor-content');
                if (editorContent) {
                    editorContent.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    function showSearch() {
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <span>SEARCH</span>
            </div>
            <div style="padding: 15px;">
                <input type="text" id="searchInput" placeholder="Search portfolio..." 
                    style="width: 100%; padding: 8px 12px; background: var(--vscode-editor); 
                    color: var(--vscode-text); border: 1px solid var(--vscode-border); 
                    border-radius: 4px; font-family: 'Inter', sans-serif; font-size: 13px;">
                
                <div id="searchResults" style="margin-top: 15px; color: var(--vscode-text-muted); font-size: 13px;">
                    <p style="margin: 10px 0;">🔍 Quick Search:</p>
                    <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 10px;">
                        <button class="search-quick-btn" data-section="about" style="text-align: left; padding: 8px 12px; background: rgba(0, 122, 204, 0.15); border: 1px solid rgba(0, 122, 204, 0.3); border-radius: 4px; color: var(--vscode-blue); cursor: pointer; font-size: 12px;">
                            📄 About
                        </button>
                        <button class="search-quick-btn" data-section="projects" style="text-align: left; padding: 8px 12px; background: rgba(0, 122, 204, 0.15); border: 1px solid rgba(0, 122, 204, 0.3); border-radius: 4px; color: var(--vscode-blue); cursor: pointer; font-size: 12px;">
                            🚀 Projects
                        </button>
                        <button class="search-quick-btn" data-section="skills" style="text-align: left; padding: 8px 12px; background: rgba(78, 201, 176, 0.15); border: 1px solid rgba(78, 201, 176, 0.3); border-radius: 4px; color: var(--vscode-green); cursor: pointer; font-size: 12px;">
                            ⚡ Skills
                        </button>
                        <button class="search-quick-btn" data-section="experience" style="text-align: left; padding: 8px 12px; background: rgba(0, 122, 204, 0.15); border: 1px solid rgba(0, 122, 204, 0.3); border-radius: 4px; color: var(--vscode-blue); cursor: pointer; font-size: 12px;">
                            💼 Experience
                        </button>
                        <button class="search-quick-btn" data-section="internships" style="text-align: left; padding: 8px 12px; background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 4px; color: var(--vscode-purple); cursor: pointer; font-size: 12px;">
                            🎯 Internships
                        </button>
                        <button class="search-quick-btn" data-section="certifications" style="text-align: left; padding: 8px 12px; background: rgba(0, 122, 204, 0.15); border: 1px solid rgba(0, 122, 204, 0.3); border-radius: 4px; color: var(--vscode-blue); cursor: pointer; font-size: 12px;">
                            🏆 Certifications
                        </button>
                        <button class="search-quick-btn" data-section="contact" style="text-align: left; padding: 8px 12px; background: rgba(0, 122, 204, 0.15); border: 1px solid rgba(0, 122, 204, 0.3); border-radius: 4px; color: var(--vscode-blue); cursor: pointer; font-size: 12px;">
                            📧 Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add search functionality
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '<p style="margin: 10px 0;">Type to search...</p>';
                return;
            }
            
            // Search through all sections
            const results = [];
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(query)) {
                    results.push({
                        id: section.id,
                        name: section.id.charAt(0).toUpperCase() + section.id.slice(1)
                    });
                }
            });
            
            if (results.length > 0) {
                searchResults.innerHTML = `
                    <p style="margin: 10px 0; color: var(--vscode-green);">✓ Found ${results.length} result(s):</p>
                    ${results.map(r => `
                        <div class="search-result" data-section="${r.id}" 
                            style="padding: 8px 12px; margin: 5px 0; background: rgba(0, 122, 204, 0.1); 
                            border-radius: 4px; cursor: pointer; font-size: 12px; color: var(--vscode-text);">
                            → ${r.name}
                        </div>
                    `).join('')}
                `;
                
                // Add click handlers to results
                document.querySelectorAll('.search-result').forEach(result => {
                    result.addEventListener('click', function() {
                        const sectionId = this.getAttribute('data-section');
                        navigateToSection(sectionId);
                    });
                });
            } else {
                searchResults.innerHTML = '<p style="margin: 10px 0; color: var(--vscode-text-muted);">No results found</p>';
            }
        });
        
        // Quick buttons
        document.querySelectorAll('.search-quick-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                navigateToSection(sectionId);
            });
        });
    }

    function showSourceControl() {
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <span>SOURCE CONTROL</span>
            </div>
            <div style="padding: 15px; color: var(--vscode-text);">
                <p style="font-size: 13px; margin-bottom: 15px; color: var(--vscode-text-muted);">
                    📦 Repository Links
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="https://github.com/rizzit17" target="_blank" 
                        style="padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 8px; text-decoration: none; color: var(--vscode-text); 
                        transition: all 0.2s; display: block;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">💻</span>
                            <div>
                                <div style="font-weight: 600; font-size: 13px;">GitHub Profile</div>
                                <div style="font-size: 11px; color: var(--vscode-text-muted);">@rizzit17</div>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://github.com/rizzit17/smartmeeting" target="_blank" 
                        style="padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 8px; text-decoration: none; color: var(--vscode-text); 
                        transition: all 0.2s; display: block;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">🎙️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 13px;">Meetzy</div>
                                <div style="font-size: 11px; color: var(--vscode-text-muted);">AI Meeting Platform</div>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://github.com/rizzit17/vakeelapp" target="_blank" 
                        style="padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 8px; text-decoration: none; color: var(--vscode-text); 
                        transition: all 0.2s; display: block;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">⚖️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 13px;">LegalGPT</div>
                                <div style="font-size: 11px; color: var(--vscode-text-muted);">AI Legal Assistant</div>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://github.com/rizzit17/amber-essence" target="_blank" 
                        style="padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 8px; text-decoration: none; color: var(--vscode-text); 
                        transition: all 0.2s; display: block;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">🍽️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 13px;">Amber Essence</div>
                                <div style="font-size: 11px; color: var(--vscode-text-muted);">Restaurant Platform</div>
                            </div>
                        </div>
                    </a>
                    
                    <a href="https://github.com/rizzit17/shikshaplay" target="_blank" 
                        style="padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 8px; text-decoration: none; color: var(--vscode-text); 
                        transition: all 0.2s; display: block;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 20px;">📚</span>
                            <div>
                                <div style="font-weight: 600; font-size: 13px;">ShikshaPlay</div>
                                <div style="font-size: 11px; color: var(--vscode-text-muted);">Learning Platform</div>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div style="margin-top: 20px; padding: 12px; background: rgba(0, 122, 204, 0.1); 
                    border-radius: 8px; border: 1px solid rgba(0, 122, 204, 0.2);">
                    <p style="font-size: 11px; color: var(--vscode-text-muted); margin: 0;">
                        💡 View all repositories on GitHub
                    </p>
                </div>
            </div>
        `;
    }

    function showExtensions() {
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <span>EXTENSIONS</span>
            </div>
            <div style="padding: 15px; color: var(--vscode-text);">
                <p style="font-size: 13px; margin-bottom: 15px; color: var(--vscode-text-muted);">
                    🧩 Installed Skills & Tools
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div class="extension-item" data-section="skills" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">⚡</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">Full-Stack Development</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">React, Node.js, MongoDB</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="extension-item" data-section="skills" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">📱</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">Android Development</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">Kotlin, Jetpack Compose</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="extension-item" data-section="skills" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">🤖</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">AI/ML Integration</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">OpenAI API, ML Kit</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="extension-item" data-section="certifications" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">🏆</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">Certifications</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">4 Professional Certificates</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="extension-item" data-section="skills" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">☁️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">Cloud Services</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">AWS EC2, S3, IAM</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="extension-item" data-section="skills" 
                        style="padding: 10px; background: var(--glass-bg); border: 1px solid var(--glass-border); 
                        border-radius: 6px; cursor: pointer; transition: all 0.2s;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span style="font-size: 18px;">🎨</span>
                            <div>
                                <div style="font-weight: 600; font-size: 12px;">UI/UX Design</div>
                                <div style="font-size: 10px; color: var(--vscode-text-muted);">Figma, Tailwind CSS</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: rgba(78, 201, 176, 0.1); 
                    border-radius: 8px; border: 1px solid rgba(78, 201, 176, 0.2);">
                    <p style="font-size: 11px; color: var(--vscode-text-muted); margin: 0;">
                        💡 Click any extension to view details
                    </p>
                </div>
            </div>
        `;
        
        // Add click handlers to extension items
        document.querySelectorAll('.extension-item').forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                navigateToSection(sectionId);
            });
            
            item.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(78, 201, 176, 0.15)';
                this.style.borderColor = 'rgba(78, 201, 176, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.background = 'var(--glass-bg)';
                this.style.borderColor = 'var(--glass-border)';
            });
        });
    }

    function navigateToSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Switch back to explorer view
        activityIcons.forEach(i => i.classList.remove('active'));
        document.querySelector('[data-tab="explorer"]').classList.add('active');
        showExplorer();
        
        // Update active file in explorer
        setTimeout(() => {
            const file = document.querySelector(`[data-section="${sectionId}"]`);
            if (file) {
                document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
                file.classList.add('active');
                
                const fileName = file.querySelector('.file-name').textContent;
                const fileIcon = file.querySelector('.file-icon').textContent;
                const tabName = document.querySelector('.tab-name');
                const tabIcon = document.querySelector('.tab-icon');
                
                if (tabName) tabName.textContent = fileName;
                if (tabIcon) tabIcon.textContent = fileIcon;
            }
        }, 100);
        
        // Smooth scroll to top
        const editorContent = document.querySelector('.editor-content');
        if (editorContent) {
            editorContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

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
            alert('⌨️ Keyboard Shortcuts:\n\n1-7: Navigate sections\nCtrl+Shift+T: Toggle theme\nCtrl+B: Toggle sidebar\nCtrl+Shift+F: Search');
        }
        
        // Ctrl/Cmd + Shift + T for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
        }
        
        // Ctrl/Cmd + Shift + F for search
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            document.querySelector('[data-tab="search"]').click();
        }
        
        // Number keys for quick navigation
        if (e.key >= '1' && e.key <= '7') {
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
    console.log('%c🔍 Search: Ctrl+Shift+F | Sidebar: Ctrl+B', 'font-size: 11px; color: #858585;');
    console.log('%cHint: Press Ctrl+K for all keyboard shortcuts!', 'font-size: 11px; color: #858585;');
    console.log('%c✨ Portfolio loaded successfully!', 'font-size: 14px; font-weight: bold; color: #28c840;');
});
