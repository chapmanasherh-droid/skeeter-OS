/**
 * Skeeter Todo List Application
 * Features: Local Storage, Priorities, Filtering, Import/Export
 */

class TodoApp {
    constructor() {
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.fileInput = document.getElementById('fileInput');

        // Stats elements
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.pendingCount = document.getElementById('pendingCount');

        // Button elements
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');

        // Data
        this.todos = [];
        this.currentFilter = 'all';
        this.STORAGE_KEY = 'skeeter_todos';

        // Initialize
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Add todo
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        // Quick actions
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.exportBtn.addEventListener('click', () => this.exportTodos());
        this.importBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.importTodos(e));

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    /**
     * Add a new todo
     */
    addTodo() {
        const text = this.todoInput.value.trim();
        const priority = this.prioritySelect.value;

        if (!text) {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text,
            priority,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        this.todoInput.value = '';
        this.prioritySelect.value = 'medium';
        this.render();
    }

    /**
     * Toggle todo completion
     */
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Delete a todo
     */
    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Edit a todo
     */
    editTodo(id, newText) {
        const todo = this.todos.find(t => t.id === id);
        if (todo && newText.trim()) {
            todo.text = newText.trim();
            todo.updatedAt = new Date().toISOString();
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Clear all completed todos
     */
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear!');
            return;
        }

        if (confirm(`Clear ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
        }
    }

    /**
     * Filter todos based on current filter
     */
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            case 'high':
                return this.todos.filter(t => t.priority === 'high');
            case 'all':
            default:
                return this.todos;
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const pending = total - completed;

        this.totalCount.textContent = total;
        this.completedCount.textContent = completed;
        this.pendingCount.textContent = pending;
    }

    /**
     * Render all todos
     */
    render() {
        this.updateStats();

        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<div class="empty-state"><p>🎉 No tasks yet. Add one to get started!</p></div>';
            return;
        }

        this.todoList.innerHTML = filteredTodos
            .map(todo => this.createTodoElement(todo))
            .join('');

        // Attach event listeners to todo items
        this.attachTodoListeners();
    }

    /**
     * Create HTML for a todo item
     */
    createTodoElement(todo) {
        const date = new Date(todo.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const priorityEmoji = {
            low: '🟢',
            medium: '🟡',
            high: '🔴'
        }[todo.priority];

        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                >
                <div class="todo-content">
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <div class="todo-meta">
                        <span class="todo-date">📅 ${date}</span>
                        <span class="priority-badge ${todo.priority}">${priorityEmoji} ${todo.priority}</span>
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="todo-action-btn edit-btn" data-id="${todo.id}">✏️ Edit</button>
                    <button class="todo-action-btn delete-btn" data-id="${todo.id}">🗑️ Delete</button>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners to todo items
     */
    attachTodoListeners() {
        // Checkboxes
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });
        });

        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const todo = this.todos.find(t => t.id === id);
                this.startEdit(id, todo.text);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTodo(parseInt(e.target.dataset.id));
            });
        });
    }

    /**
     * Start editing a todo
     */
    startEdit(id, currentText) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        const contentDiv = todoElement.querySelector('.todo-content');
        const actionsDiv = todoElement.querySelector('.todo-actions');

        todoElement.classList.add('edit-mode');
        contentDiv.innerHTML = `<input type="text" class="edit-input" value="${this.escapeHtml(currentText)}">`;
        actionsDiv.innerHTML = `
            <button class="save-btn" data-id="${id}">✔️ Save</button>
            <button class="cancel-btn" data-id="${id}">✖️ Cancel</button>
        `;

        const input = contentDiv.querySelector('.edit-input');
        input.focus();

        const saveBtn = actionsDiv.querySelector('.save-btn');
        const cancelBtn = actionsDiv.querySelector('.cancel-btn');

        const save = () => {
            const newText = input.value.trim();
            if (newText) {
                this.editTodo(id, newText);
            } else {
                this.render();
            }
        };

        saveBtn.addEventListener('click', save);
        cancelBtn.addEventListener('click', () => this.render());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') save();
            if (e.key === 'Escape') this.render();
        });
    }

    /**
     * Export todos to JSON file
     */
    exportTodos() {
        if (this.todos.length === 0) {
            alert('No tasks to export!');
            return;
        }

        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Import todos from JSON file
     */
    importTodos(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                if (!Array.isArray(importedTodos)) {
                    throw new Error('Invalid format: expected an array');
                }

                // Validate todo structure
                importedTodos.forEach(todo => {
                    if (!todo.id || !todo.text) {
                        throw new Error('Invalid todo format: missing id or text');
                    }
                });

                if (confirm(`Import ${importedTodos.length} task(s)? This will add to your existing tasks.`)) {
                    this.todos = [...importedTodos, ...this.todos];
                    this.saveToStorage();
                    this.render();
                    alert('Tasks imported successfully!');
                }
            } catch (error) {
                alert(`Import failed: ${error.message}`);
            }
        };
        reader.readAsText(file);
        this.fileInput.value = '';
    }

    /**
     * Save todos to local storage
     */
    saveToStorage() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    }

    /**
     * Load todos from local storage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            this.todos = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load todos:', error);
            this.todos = [];
        }
    }

    /**
     * Escape HTML special characters
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});