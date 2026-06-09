/**
 * Window Management System
 * Handles dragging, resizing, and window lifecycle
 */

class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.windowCounter = 0;
        this.draggedWindow = null;
        this.dragOffset = { x: 0, y: 0 };
    }

    /**
     * Create a new window
     */
    createWindow(id, title, icon, content, width = 600, height = 400) {
        const windowId = `window-${id}-${this.windowCounter++}`;
        const container = document.getElementById('windowsContainer');

        // Calculate random position
        const maxX = Math.max(window.innerWidth - width, 0);
        const maxY = Math.max(window.innerHeight - height - 50, 0);
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        // Create window element
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = windowId;
        windowEl.style.width = width + 'px';
        windowEl.style.height = height + 'px';
        windowEl.style.left = x + 'px';
        windowEl.style.top = y + 'px';

        windowEl.innerHTML = `
            <div class="window-header" draggable="true">
                <div class="window-title">
                    <span class="window-title-icon">${icon}</span>
                    <span>${title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-btn minimize" title="Minimize">−</button>
                    <button class="window-btn close" title="Close">×</button>
                </div>
            </div>
            <div class="window-content">${content}</div>
        `;

        container.appendChild(windowEl);

        // Store window info
        this.windows.set(windowId, {
            element: windowEl,
            id,
            title,
            minimized: false,
            originalHeight: height,
        });

        // Setup event listeners
        this.setupWindowEvents(windowId, windowEl);
        this.bringToFront(windowId);

        return windowId;
    }

    /**
     * Setup event listeners for a window
     */
    setupWindowEvents(windowId, windowEl) {
        const header = windowEl.querySelector('.window-header');
        const closeBtn = windowEl.querySelector('.window-btn.close');
        const minimizeBtn = windowEl.querySelector('.window-btn.minimize');

        // Bring to front on click
        windowEl.addEventListener('mousedown', () => {
            this.bringToFront(windowId);
        });

        // Dragging
        header.addEventListener('dragstart', (e) => this.startDrag(e, windowId));
        document.addEventListener('dragover', (e) => this.drag(e, windowId));
        document.addEventListener('dragend', (e) => this.endDrag(e, windowId));

        // Alternative drag with mouse
        let isDragging = false;
        let startX, startY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - windowEl.offsetLeft;
            startY = e.clientY - windowEl.offsetTop;
            header.classList.add('dragging');
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            windowEl.style.left = (e.clientX - startX) + 'px';
            windowEl.style.top = (e.clientY - startY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            header.classList.remove('dragging');
        });

        // Close button
        closeBtn.addEventListener('click', () => this.closeWindow(windowId));

        // Minimize button
        minimizeBtn.addEventListener('click', () => this.minimizeWindow(windowId));
    }

    /**
     * Start drag
     */
    startDrag(e, windowId) {
        this.draggedWindow = windowId;
        const windowEl = this.windows.get(windowId).element;
        this.dragOffset.x = e.clientX - windowEl.offsetLeft;
        this.dragOffset.y = e.clientY - windowEl.offsetTop;
    }

    /**
     * Drag window
     */
    drag(e, windowId) {
        if (!this.draggedWindow) return;
        e.preventDefault();

        const windowEl = this.windows.get(windowId).element;
        windowEl.style.left = (e.clientX - this.dragOffset.x) + 'px';
        windowEl.style.top = (e.clientY - this.dragOffset.y) + 'px';
    }

    /**
     * End drag
     */
    endDrag() {
        this.draggedWindow = null;
    }

    /**
     * Bring window to front
     */
    bringToFront(windowId) {
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
        document.querySelectorAll('.taskbar-item').forEach(t => t.classList.remove('active'));

        // Add active class to this window
        const windowEl = this.windows.get(windowId)?.element;
        if (windowEl) {
            windowEl.classList.add('active');
            windowEl.style.zIndex = 100 + Date.now();
            this.activeWindow = windowId;

            // Update taskbar
            const taskbarItem = document.querySelector(`[data-window-id="${windowId}"]`);
            if (taskbarItem) {
                taskbarItem.classList.add('active');
            }
        }
    }

    /**
     * Close window
     */
    closeWindow(windowId) {
        const windowInfo = this.windows.get(windowId);
        if (windowInfo) {
            windowInfo.element.remove();
            this.windows.delete(windowId);

            // Remove from taskbar
            const taskbarItem = document.querySelector(`[data-window-id="${windowId}"]`);
            if (taskbarItem) {
                taskbarItem.remove();
            }
        }
    }

    /**
     * Minimize window
     */
    minimizeWindow(windowId) {
        const windowInfo = this.windows.get(windowId);
        if (windowInfo) {
            const isMinimized = windowInfo.minimized;
            windowInfo.minimized = !isMinimized;
            windowInfo.element.style.display = isMinimized ? 'flex' : 'none';
        }
    }

    /**
     * Restore window
     */
    restoreWindow(windowId) {
        const windowInfo = this.windows.get(windowId);
        if (windowInfo) {
            windowInfo.minimized = false;
            windowInfo.element.style.display = 'flex';
            this.bringToFront(windowId);
        }
    }

    /**
     * Add window to taskbar
     */
    addToTaskbar(windowId, title, icon) {
        const taskbarApps = document.getElementById('taskbarApps');
        const item = document.createElement('button');
        item.className = 'taskbar-item';
        item.setAttribute('data-window-id', windowId);
        item.innerHTML = `<span>${icon}</span> <span>${title}</span>`;

        item.addEventListener('click', () => {
            const windowInfo = this.windows.get(windowId);
            if (windowInfo) {
                if (windowInfo.minimized) {
                    this.restoreWindow(windowId);
                } else {
                    this.bringToFront(windowId);
                }
            }
        });

        taskbarApps.appendChild(item);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WindowManager;
}