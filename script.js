// ================================================================
// VS Code Portfolio — Script
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── State ──────────────────────────────────────────────────────
    const state = {
        activeSection: 'about',
        openTabs: ['about'],
        activePanel: 'explorer',
        theme: localStorage.getItem('vscode-theme') || 'dark',
    };

    // ── Elements ───────────────────────────────────────────────────
    const body          = document.body;
    const themeToggle   = document.getElementById('themeToggle');
    const themeIcon     = document.getElementById('themeIcon');
    const tabbar        = document.getElementById('tabbar');
    const editorContent = document.getElementById('editorContent');
    const sidebar       = document.querySelector('.sidebar');
    const sbLang        = document.getElementById('sb-lang');
    const sbPos         = document.getElementById('sb-pos');
    const breadcrumbActive = document.getElementById('breadcrumb-active');

    // Section metadata
    const sectionMeta = {
        about:          { name: 'about.jsx',          ext: 'jsx',  lang: 'JSX' },
        projects:       { name: 'projects.tsx',        ext: 'tsx',  lang: 'TSX' },
        skills:         { name: 'skills.json',         ext: 'json', lang: 'JSON' },
        experience:     { name: 'positions.ts',        ext: 'ts',   lang: 'TypeScript' },
        internships:    { name: 'internships.tsx',     ext: 'tsx',  lang: 'TSX' },
        certifications: { name: 'certifications.md',  ext: 'md',   lang: 'Markdown' },
        contact:        { name: 'contact.css',         ext: 'css',  lang: 'CSS' },
    };

    // ── Theme ─────────────────────────────────────────────────────
    function applyTheme(t) {
        if (t === 'light') {
            body.classList.add('light');
            themeIcon.textContent = '🌙';
        } else {
            body.classList.remove('light');
            themeIcon.textContent = '☀️';
        }
        localStorage.setItem('vscode-theme', t);
        state.theme = t;
    }

    applyTheme(state.theme);

    themeToggle.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // ── Line Gutters ───────────────────────────────────────────────
    function buildGutter(id, lines = 60) {
        const gutter = document.getElementById(id);
        if (!gutter) return;
        gutter.innerHTML = '';
        for (let i = 1; i <= lines; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            span.style.display = 'block';
            span.style.lineHeight = '1.65';
            span.style.fontSize = '13px';
            gutter.appendChild(span);
        }
    }

    buildGutter('gutter-about', 40);
    buildGutter('gutter-projects', 80);
    buildGutter('gutter-skills', 55);
    buildGutter('gutter-internships', 35);
    buildGutter('gutter-experience', 55);
    buildGutter('gutter-certifications', 30);
    buildGutter('gutter-contact', 35);

    // ── Section Navigation ─────────────────────────────────────────
    function navigateTo(sectionId) {
        if (!sectionMeta[sectionId]) return;
        const meta = sectionMeta[sectionId];

        // Hide all sections
        document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));

        // Show target
        const target = document.getElementById(sectionId);
        if (target) target.classList.add('active');

        state.activeSection = sectionId;

        // Update sidebar file highlights
        document.querySelectorAll('.tree-file').forEach(f => {
            f.classList.toggle('active', f.dataset.section === sectionId);
        });
        document.querySelectorAll('.sidebar-file').forEach(f => {
            f.classList.toggle('active', f.dataset.section === sectionId);
        });

        // Add tab if not open
        if (!state.openTabs.includes(sectionId)) {
            state.openTabs.push(sectionId);
            addTab(sectionId, meta);
        }

        // Update all tabs active state
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.toggle('active', t.dataset.section === sectionId);
        });

        // Update status bar language
        if (sbLang) sbLang.textContent = meta.lang;

        // Update breadcrumb
        if (breadcrumbActive) breadcrumbActive.textContent = meta.name;

        // Scroll editor to top
        editorContent.scrollTo({ top: 0, behavior: 'smooth' });

        // Update open editors list
        updateOpenEditorsList();
    }

    function addTab(sectionId, meta) {
        const existing = document.querySelector(`.tab[data-section="${sectionId}"]`);
        if (existing) return;

        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.section = sectionId;
        tab.innerHTML = `
            <span class="tab-file-icon file-icon ${meta.ext}">${meta.ext.toUpperCase()}</span>
            <span class="tab-name">${meta.name}</span>
            <span class="tab-close">✕</span>
        `;

        tab.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close')) {
                closeTab(sectionId, tab);
                return;
            }
            navigateTo(sectionId);
        });

        tabbar.appendChild(tab);
    }

    function closeTab(sectionId, tabEl) {
        if (state.openTabs.length <= 1) return; // keep at least one
        const idx = state.openTabs.indexOf(sectionId);
        state.openTabs.splice(idx, 1);
        tabEl.remove();

        // Navigate to adjacent tab
        const newSection = state.openTabs[Math.min(idx, state.openTabs.length - 1)];
        navigateTo(newSection);
        updateOpenEditorsList();
    }

    function updateOpenEditorsList() {
        const list = document.getElementById('open-editors-list');
        if (!list) return;
        list.innerHTML = '';
        state.openTabs.forEach(sid => {
            const meta = sectionMeta[sid];
            if (!meta) return;
            const div = document.createElement('div');
            div.className = 'sidebar-file' + (sid === state.activeSection ? ' active' : '');
            div.dataset.section = sid;
            div.innerHTML = `<span class="file-dot">●</span><span class="file-icon ${meta.ext}">${meta.ext.toUpperCase()}</span><span>${meta.name}</span>`;
            div.addEventListener('click', () => navigateTo(sid));
            list.appendChild(div);
        });
    }

    // ── Tree File Clicks ───────────────────────────────────────────
    document.querySelectorAll('.tree-file').forEach(f => {
        f.addEventListener('click', () => navigateTo(f.dataset.section));
    });

    // ── Initial tab click handler (about tab is in HTML) ──────────
    const initialTab = document.querySelector('.tab[data-section="about"]');
    if (initialTab) {
        initialTab.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-close')) {
                closeTab('about', initialTab);
                return;
            }
            navigateTo('about');
        });
    }

    // ── Activity Bar Panels ────────────────────────────────────────
    const abIcons  = document.querySelectorAll('.ab-icon');
    const panels   = document.querySelectorAll('.panel');

    function switchPanel(panelId) {
        panels.forEach(p => p.classList.remove('active'));
        abIcons.forEach(i => i.classList.remove('active'));

        const panel = document.getElementById(`panel-${panelId}`);
        if (panel) panel.classList.add('active');

        const icon = document.querySelector(`.ab-icon[data-panel="${panelId}"]`);
        if (icon) icon.classList.add('active');

        state.activePanel = panelId;
    }

    abIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const panelId = icon.dataset.panel;
            if (panelId === 'settings') {
                // Settings toggles theme
                const newTheme = state.theme === 'dark' ? 'light' : 'dark';
                applyTheme(newTheme);
                return;
            }
            if (panelId === 'account') return;
            if (state.activePanel === panelId) {
                // Toggle sidebar on same panel click (collapse)
                sidebar.style.display = sidebar.style.display === 'none' ? '' : '';
            }
            switchPanel(panelId);
        });
    });

    // ── Extensions panel clicks ────────────────────────────────────
    document.querySelectorAll('.ext-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.section);
            switchPanel('explorer');
        });
    });

    // ── Search ─────────────────────────────────────────────────────
    const searchInput   = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            if (q.length < 2) {
                searchResults.innerHTML = '<p class="search-hint">Type to search across all sections</p>';
                return;
            }

            const sections = document.querySelectorAll('.editor-section');
            const hits = [];
            sections.forEach(sec => {
                if (sec.textContent.toLowerCase().includes(q)) {
                    hits.push(sec.id);
                }
            });

            if (hits.length === 0) {
                searchResults.innerHTML = '<p class="search-hint">No results found</p>';
                return;
            }

            searchResults.innerHTML = `<p class="search-hint" style="color:var(--green)">✓ ${hits.length} match${hits.length > 1 ? 'es' : ''}</p>` +
                hits.map(id => {
                    const meta = sectionMeta[id] || { name: id, ext: 'jsx' };
                    return `<div class="search-result-item" data-section="${id}">
                        <span class="file-icon ${meta.ext}">${meta.ext.toUpperCase()}</span>
                        <span>${meta.name}</span>
                    </div>`;
                }).join('');

            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    navigateTo(item.dataset.section);
                    switchPanel('explorer');
                });
            });
        });
    }

    // ── Traffic Lights ─────────────────────────────────────────────
    const tlRed    = document.getElementById('tlRed');
    const tlYellow = document.getElementById('tlYellow');
    const tlGreen  = document.getElementById('tlGreen');
    const app      = document.getElementById('vscodeApp');

    if (tlRed) {
        tlRed.addEventListener('click', () => {
            if (confirm('Close portfolio?')) {
                app.style.transition = 'opacity 0.4s';
                app.style.opacity = '0';
                setTimeout(() => app.style.display = 'none', 400);
            }
        });
    }

    if (tlYellow) {
        tlYellow.addEventListener('click', () => {
            const scaled = app.style.transform === 'scale(0.92)';
            app.style.transition = 'transform 0.3s ease';
            app.style.transform = scaled ? 'scale(1)' : 'scale(0.92)';
        });
    }

    if (tlGreen) {
        tlGreen.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        });
    }

    // ── Status Bar — scroll position tracker ─────────────────────
    editorContent.addEventListener('scroll', () => {
        const lineHeight = 21;
        const approxLine = Math.floor(editorContent.scrollTop / lineHeight) + 1;
        if (sbPos) sbPos.textContent = `Ln ${approxLine}, Col 1`;
    });

    // ── Keyboard Shortcuts ─────────────────────────────────────────
    document.addEventListener('keydown', e => {
        // Ctrl/Cmd + Shift + T → toggle theme
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            applyTheme(state.theme === 'dark' ? 'light' : 'dark');
        }
        // Ctrl/Cmd + B → toggle sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            sidebar.style.display = sidebar.style.display === 'none' ? '' : 'none';
        }
        // Ctrl/Cmd + Shift + F → focus search
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            switchPanel('search');
            setTimeout(() => searchInput && searchInput.focus(), 100);
        }
        // Ctrl/Cmd + P → show shortcut help
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            const keys = [
                '1-7         Navigate sections',
                'Ctrl+Shift+T  Toggle theme',
                'Ctrl+B        Toggle sidebar',
                'Ctrl+Shift+F  Search',
            ];
            alert('⌨️  Keyboard Shortcuts\n\n' + keys.join('\n'));
        }
        // Number keys 1–7 for quick nav
        if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key >= '1' && e.key <= '7') {
            const sections = Object.keys(sectionMeta);
            const target   = sections[parseInt(e.key) - 1];
            if (target) navigateTo(target);
        }
    });

    // ── Terminal Typing Effect ─────────────────────────────────────
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        const lines = [
            { prompt: true,  text: 'git clone https://github.com/rizzit17/awesome-project.git' },
            { prompt: true,  text: 'cd awesome-project' },
            { prompt: true,  text: 'npm install && npm start' },
            { prompt: false, text: '✓ Ready to collaborate!', success: true },
        ];

        let lineIdx = 0;

        function typeLine() {
            if (lineIdx >= lines.length) {
                // Cursor at end
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                terminalBody.appendChild(cursor);
                return;
            }

            const line = lines[lineIdx];
            const p = document.createElement('p');
            if (line.success) p.className = 'terminal-success';

            if (line.prompt) {
                const promptSpan = document.createElement('span');
                promptSpan.className = 'terminal-prompt';
                promptSpan.textContent = '$ ';
                p.appendChild(promptSpan);
            }

            terminalBody.appendChild(p);
            lineIdx++;

            let charIdx = 0;
            const textNode = document.createTextNode('');
            p.appendChild(textNode);

            const interval = setInterval(() => {
                if (charIdx < line.text.length) {
                    textNode.textContent += line.text[charIdx];
                    charIdx++;
                } else {
                    clearInterval(interval);
                    setTimeout(typeLine, 400);
                }
            }, line.prompt ? 28 : 18);
        }

        setTimeout(typeLine, 800);
    }

    // ── Hover effects on cards ─────────────────────────────────────
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-1px)';
        });
        tag.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // ── Console Easter Egg ─────────────────────────────────────────
    console.log('%c🚀 Rishit Chaudhary — Portfolio', 'font-size:18px; font-weight:bold; color:#007acc;');
    console.log('%c💻 Full-Stack Developer | React · Node.js · MongoDB', 'font-size:13px; color:#4ec9b0;');
    console.log('%c📧 rishitwork28@gmail.com | 🐙 github.com/rizzit17', 'font-size:12px; color:#ce9178;');
    console.log('%c⌨️  Press Ctrl+P for keyboard shortcuts', 'font-size:11px; color:#858585;');

    // ── Init ───────────────────────────────────────────────────────
    navigateTo('about');

});
