/**
 * Application Generators
 * Creates content for different applications
 */

const AppGenerator = {
    /**
     * Generate Files app
     */
    generateFiles() {
        return `
            <div class="file-list">
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <div class="file-info">
                        <div class="file-name">Desktop</div>
                        <div class="file-details">Folder</div>
                    </div>
                </div>
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <div class="file-info">
                        <div class="file-name">Documents</div>
                        <div class="file-details">Folder</div>
                    </div>
                </div>
                <div class="file-item">
                    <span class="file-icon">📁</span>
                    <div class="file-info">
                        <div class="file-name">Projects</div>
                        <div class="file-details">Folder</div>
                    </div>
                </div>
                <div class="file-item">
                    <span class="file-icon">📄</span>
                    <div class="file-info">
                        <div class="file-name">README.md</div>
                        <div class="file-details">12 KB</div>
                    </div>
                </div>
                <div class="file-item">
                    <span class="file-icon">🎵</span>
                    <div class="file-info">
                        <div class="file-name">Music Folder</div>
                        <div class="file-details">Folder • 245 songs</div>
                    </div>
                </div>
                <div class="file-item">
                    <span class="file-icon">🖼️</span>
                    <div class="file-info">
                        <div class="file-name">Pictures</div>
                        <div class="file-details">Folder • 342 items</div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Generate Development Log
     */
    generateDevlog() {
        return `
            <div class="devlog-entry">
                <div class="devlog-date">📅 June 9, 2026 - v1.0 Initial Release</div>
                <div class="devlog-title">🚀 Desktop Environment Foundation</div>
                <div class="devlog-content">
                    Launched the core desktop environment with draggable windows. Implemented the window manager system that handles all window lifecycle events including creation, destruction, and z-index management. Created a beautiful dark theme with gradient accents and smooth animations.
                </div>
                <div class="devlog-features">
                    <span class="devlog-badge">Draggable Windows</span>
                    <span class="devlog-badge">Dark Theme</span>
                    <span class="devlog-badge">Taskbar System</span>
                </div>
            </div>

            <div class="devlog-entry v2">
                <div class="devlog-date">📅 June 9, 2026 - v1.1 Application Suite</div>
                <div class="devlog-title">✨ Multi-App Integration</div>
                <div class="devlog-content">
                    Added 5 fully functional applications: File Manager, Text Editor, Calculator, Dashboard, and Theme Settings. Each app has its own UI/UX design optimized for the desktop environment. Implemented persistent local storage for text notes and user preferences.
                </div>
                <div class="devlog-features">
                    <span class="devlog-badge">5 Apps</span>
                    <span class="devlog-badge">Local Storage</span>
                    <span class="devlog-badge">Settings System</span>
                </div>
            </div>

            <div class="devlog-entry v3">
                <div class="devlog-date">📅 June 9, 2026 - v1.2 UX Enhancement</div>
                <div class="devlog-title">🎨 Polish & Performance</div>
                <div class="devlog-content">
                    Refined the entire interface with better animations, improved scrolling performance, and added real-time clock and date display. Implemented window minimize/restore functionality and added multiple theme options. Created a context menu system for desktop interactions. Added smooth window transitions and visual feedback.
                </div>
                <div class="devlog-features">
                    <span class="devlog-badge">Minimize/Restore</span>
                    <span class="devlog-badge">Context Menu</span>
                    <span class="devlog-badge">Real-time Clock</span>
                    <span class="devlog-badge">New Feature: Themes</span>
                </div>
            </div>
        `;
    },

    /**
     * Generate Text Editor
     */
    generateNotes() {
        return `
            <div class="text-editor">
                <div class="editor-toolbar">
                    <button class="editor-btn" onclick="this.saveNote()">💾 Save</button>
                    <button class="editor-btn" onclick="this.clearNote()">🗑️ Clear</button>
                </div>
                <textarea class="textarea" id="notepad" placeholder="Type your notes here..."></textarea>
            </div>
            <script>
                const textarea = document.getElementById('notepad');
                const savedNote = localStorage.getItem('skeeter_note');
                if (savedNote) textarea.value = savedNote;
                textarea.addEventListener('input', () => {
                    localStorage.setItem('skeeter_note', textarea.value);
                });
            </script>
        `;
    },

    /**
     * Generate Calculator
     */
    generateCalculator() {
        return `
            <div class="calculator">
                <div class="calculator-display" id="calcDisplay">0</div>
                <button class="calc-btn" onclick="appendToDisplay('7')">7</button>
                <button class="calc-btn" onclick="appendToDisplay('8')">8</button>
                <button class="calc-btn" onclick="appendToDisplay('9')">9</button>
                <button class="calc-btn operator" onclick="appendToDisplay('/')">/</button>
                <button class="calc-btn" onclick="appendToDisplay('4')">4</button>
                <button class="calc-btn" onclick="appendToDisplay('5')">5</button>
                <button class="calc-btn" onclick="appendToDisplay('6')">6</button>
                <button class="calc-btn operator" onclick="appendToDisplay('*')">×</button>
                <button class="calc-btn" onclick="appendToDisplay('1')">1</button>
                <button class="calc-btn" onclick="appendToDisplay('2')">2</button>
                <button class="calc-btn" onclick="appendToDisplay('3')">3</button>
                <button class="calc-btn operator" onclick="appendToDisplay('-')">−</button>
                <button class="calc-btn" onclick="appendToDisplay('0')">0</button>
                <button class="calc-btn" onclick="appendToDisplay('.')">.</button>
                <button class="calc-btn operator" onclick="appendToDisplay('+'))">+</button>
                <button class="calc-btn equal" onclick="calculateResult()">=</button>
            </div>
            <script>
                let display = '0';
                function appendToDisplay(value) {
                    const elem = document.getElementById('calcDisplay');
                    if (display === '0' && value !== '.') display = '';
                    display += value;
                    elem.textContent = display;
                }
                function calculateResult() {
                    try {
                        display = String(eval(display));
                        document.getElementById('calcDisplay').textContent = display;
                    } catch (e) {
                        document.getElementById('calcDisplay').textContent = 'Error';
                        display = '0';
                    }
                }
            </script>
        `;
    },

    /**
     * Generate Dashboard
     */
    generateDashboard() {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

        return `
            <div class="dashboard">
                <div class="dashboard-card full">
                    <div class="dashboard-label">${greeting}! 👋</div>
                    <div class="dashboard-value">Skeeter OS</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-label">System Status</div>
                    <div class="dashboard-value">✅ Online</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-label">Memory Usage</div>
                    <div class="dashboard-value">42%</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-label">Active Windows</div>
                    <div class="dashboard-value" id="windowCount">0</div>
                </div>
                <div class="dashboard-card">
                    <div class="dashboard-label">System Uptime</div>
                    <div class="dashboard-value">Stable</div>
                </div>
                <div class="dashboard-card full">
                    <div class="dashboard-label">Current Time</div>
                    <div class="dashboard-value" id="dashTime">00:00</div>
                </div>
            </div>
            <script>
                function updateDash() {
                    document.getElementById('windowCount').textContent = document.querySelectorAll('.window').length;
                    const now = new Date();
                    document.getElementById('dashTime').textContent = now.toLocaleTimeString();
                }
                updateDash();
                setInterval(updateDash, 1000);
            </script>
        `;
    },

    /**
     * Generate Theme Settings
     */
    generateThemeSettings() {
        return `
            <div class="settings-section">
                <label class="settings-label">🎨 Theme</label>
                <div class="settings-row">
                    <div class="theme-option selected" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);" onclick="applyTheme('default')"></div>
                    <div class="theme-option" style="background: linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 50%, #3a3a7f 100%);" onclick="applyTheme('purple')"></div>
                    <div class="theme-option" style="background: linear-gradient(135deg, #0a1f2e 0%, #16a085 50%, #117a65 100%);" onclick="applyTheme('teal')"></div>
                    <div class="theme-option" style="background: linear-gradient(135deg, #2c1810 0%, #5a3a2a 50%, #8b5a2b 100%);" onclick="applyTheme('warm')"></div>
                </div>
            </div>
            <div class="settings-section">
                <label class="settings-label">💡 About</label>
                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                    <strong>Skeeter OS v1.2</strong><br>
                    A modern desktop environment built with vanilla JavaScript.<br><br>
                    Features:
                    • Draggable Windows<br>
                    • Multiple Applications<br>
                    • Dark Theme with Animations<br>
                    • Local Storage Support<br>
                    • Real-time System Info<br>
                </p>
            </div>
            <div class="settings-section">
                <label class="settings-label">⚙️ System Info</label>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    <strong>Build:</strong> Production<br>
                    <strong>Platform:</strong> Web<br>
                    <strong>License:</strong> MIT<br>
                </p>
            </div>
            <script>
                function applyTheme(theme) {
                    const themes = {
                        default: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                        purple: 'linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 50%, #3a3a7f 100%)',
                        teal: 'linear-gradient(135deg, #0a1f2e 0%, #16a085 50%, #117a65 100%)',
                        warm: 'linear-gradient(135deg, #2c1810 0%, #5a3a2a 50%, #8b5a2b 100%)'
                    };
                    document.body.style.background = themes[theme];
                    document.body.style.backgroundAttachment = 'fixed';
                    localStorage.setItem('skeeter_theme', theme);
                }
            </script>
        `;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppGenerator;
}