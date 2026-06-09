/**
 * Skeeter Desktop OS
 * Main application logic and initialization
 */

class SketetrOS {
    constructor() {
        this.windowManager = new WindowManager();
        this.appGenerator = AppGenerator;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.restoreTheme();
        this.setupContextMenu();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Start button
        const startBtn = document.getElementById('startBtn');
        const startMenu = document.getElementById('startMenu');
        const closeStart = document.getElementById('closeStart');

        startBtn.addEventListener('click', () => {
            startMenu.classList.toggle('active');
        });

        closeStart.addEventListener('click', () => {
            startMenu.classList.remove('active');
        });

        // Start menu items
        document.querySelectorAll('.start-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const app = e.currentTarget.dataset.app;
                this.launchApp(app);
                startMenu.classList.remove('active');
            });
        });

        // Close start menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-btn') && !e.target.closest('.start-menu')) {
                startMenu.classList.remove('active');
            }
        });

        // Context menu
        document.addEventListener('contextmenu', (e) => {
            if (e.target.id === 'desktop' || e.target.id === 'windowsContainer') {
                e.preventDefault();
                this.showContextMenu(e.clientX, e.clientY);
            }
        });
    }

    /**
     * Launch an application
     */
    launchApp(appId) {
        const apps = {
            files: {
                title: 'File Manager',
                icon: '📁',
                content: this.appGenerator.generateFiles(),
                width: 600,
                height: 450
            },
            devlog: {
                title: 'Development Log',
                icon: '📝',
                content: this.appGenerator.generateDevlog(),
                width: 700,
                height: 500
            },
            notes: {
                title: 'Text Editor',
                icon: '📄',
                content: this.appGenerator.generateNotes(),
                width: 650,
                height: 480
            },
            calculator: {
                title: 'Calculator',
                icon: '🧮',
                content: this.appGenerator.generateCalculator(),
                width: 320,
                height: 420
            },
            weather: {
                title: 'Dashboard',
                icon: '🌤️',
                content: this.appGenerator.generateDashboard(),
                width: 600,
                height: 380
            },
            theme: {
                title: 'Theme Settings',
                icon: '🎨',
                content: this.appGenerator.generateThemeSettings(),
                width: 500,
                height: 450
            }
        };

        const app = apps[appId];
        if (!app) return;

        const windowId = this.windowManager.createWindow(
            appId,
            app.title,
            app.icon,
            app.content,
            app.width,
            app.height
        );

        this.windowManager.addToTaskbar(windowId, app.title, app.icon);
    }

    /**
     * Update clock display
     */
    updateClock() {
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const dateStr = now.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });

            document.getElementById('time').textContent = timeStr;
            document.getElementById('date').textContent = dateStr;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    /**
     * Restore theme from storage
     */
    restoreTheme() {
        const savedTheme = localStorage.getItem('skeeter_theme') || 'default';
        const themes = {
            default: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            purple: 'linear-gradient(135deg, #1a1a3e 0%, #2d2d5f 50%, #3a3a7f 100%)',
            teal: 'linear-gradient(135deg, #0a1f2e 0%, #16a085 50%, #117a65 100%)',
            warm: 'linear-gradient(135deg, #2c1810 0%, #5a3a2a 50%, #8b5a2b 100%)'
        };
        document.body.style.background = themes[savedTheme];
        document.body.style.backgroundAttachment = 'fixed';
    }

    /**
     * Show context menu
     */
    showContextMenu(x, y) {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.classList.add('active');
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';

        // Hide on click
        const hideMenu = () => {
            contextMenu.classList.remove('active');
            document.removeEventListener('click', hideMenu);
        };
        document.addEventListener('click', hideMenu);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SketetrOS();
});
