# Skeeter Todo List Application

A modern, feature-rich to-do list application built with vanilla JavaScript, featuring local storage, priority management, and data import/export capabilities.

## Features

✨ **Core Features**
- ✅ Add, edit, delete, and complete tasks
- 💾 Persistent local storage (data survives browser refresh)
- 🎯 Priority levels (Low, Medium, High)
- 🔍 Filter by status and priority
- 📊 Real-time statistics (Total, Completed, Pending)

🚀 **Advanced Features**
- 📤 Export tasks to JSON file
- 📥 Import tasks from JSON file
- ⏱️ Task timestamps (created date and last updated)
- 🎨 Beautiful dark theme UI
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🔒 HTML sanitization for security

## File Structure

```
todo/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── todo.js         # Main application logic
└── README.md       # Documentation
```

## Installation & Usage

### Local Usage

1. **Open the application:**
   - Simply open `todo/index.html` in your web browser
   - No server or build tools required!

2. **Add a task:**
   - Type your task in the input field
   - Select priority level (Low, Medium, High)
   - Click "Add Task" or press Enter

3. **Manage tasks:**
   - ✅ Check the checkbox to mark as complete
   - ✏️ Click Edit to modify a task
   - 🗑️ Click Delete to remove a task

4. **Filter tasks:**
   - Click filter buttons to view: All, Active, Completed, or High Priority

5. **Export/Import:**
   - **Export**: Click "Export" to download tasks as JSON
   - **Import**: Click "Import" to upload a previously exported JSON file
   - **Clear Completed**: Remove all finished tasks at once

## Local Storage

All tasks are automatically saved to your browser's local storage under the key `skeeter_todos`. Your tasks will persist even after:
- Closing the browser
- Closing the tab
- Refreshing the page
- Computer restart

### View Stored Data

Open browser DevTools (F12) → Application → Local Storage and search for `skeeter_todos` to see the JSON data.

## Data Format

### Todo Object Structure

```javascript
{
  id: 1234567890,              // Unique timestamp-based ID
  text: "Task description",    // Task content
  priority: "medium",          // "low", "medium", or "high"
  completed: false,            // Completion status
  createdAt: "2024-01-15...", // ISO timestamp
  updatedAt: "2024-01-15..."  // ISO timestamp
}
```

## Export/Import Example

### Exported JSON Format

```json
[
  {
    "id": 1704048000000,
    "text": "Buy groceries",
    "priority": "high",
    "completed": false,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  },
  {
    "id": 1704048060000,
    "text": "Finish project",
    "priority": "medium",
    "completed": true,
    "createdAt": "2024-01-01T10:01:00.000Z",
    "updatedAt": "2024-01-01T10:05:00.000Z"
  }
]
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Add new task from input |
| `Enter` (in edit mode) | Save edited task |
| `Escape` (in edit mode) | Cancel editing |

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ Requires local storage support

## Styling Customization

The application uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    --danger-color: #ef4444;
    --warning-color: #f59e0b;
    /* ... more colors ... */
}
```

Modify these variables in `styles.css` to change the entire color scheme.

## Tips & Tricks

1. **Backup Your Tasks**: Regularly export your tasks as backup
2. **Quick Filters**: Use filter buttons to focus on specific task categories
3. **Bulk Import**: Export from one device and import on another
4. **Dark Theme**: The application uses a dark theme optimized for reduced eye strain

## Troubleshooting

### Tasks not saving?
- Check if local storage is enabled in browser settings
- Ensure you're not in private/incognito mode (usually disables storage)
- Try clearing cache and reloading

### Import not working?
- Verify the JSON file format matches the export structure
- Check browser console (F12) for error messages
- Ensure file is not corrupted

### Storage quota exceeded?
- Local storage typically allows 5-10MB
- Export and archive old tasks
- Clear completed tasks

## Performance

- ⚡ No external dependencies
- ⚡ Instant rendering
- ⚡ Smooth 60fps animations
- ⚡ Minimal memory footprint

## Security

- ✅ HTML sanitization to prevent XSS attacks
- ✅ No external API calls
- ✅ All data stored locally
- ✅ No user tracking

## Future Enhancements

- 🌐 Cloud synchronization
- 📱 PWA installation
- 🔔 Notifications and reminders
- 📅 Calendar view
- 🏷️ Tags and categories
- 🔄 Recurring tasks
- 🎨 Theme customization UI
- 📊 Task statistics and analytics

## License

MIT License - Feel free to use, modify, and distribute!

---

**Made with ❤️ for productivity**

Enjoy staying organized! 📋✨