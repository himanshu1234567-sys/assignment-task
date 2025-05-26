
Install dependencies:

npm install
Start the development server:

npm run dev
The project will start running and you should see output similar to:

Local:   http://localhost:8080/
Network: http://[your-ip]:8080/

# 🎯 Task Assignment - Vanilla JavaScript Task Management SPA

A beautiful, modern Single Page Application (SPA) for task management built with pure vanilla JavaScript, CSS, and HTML. No frameworks or libraries required!

## ✨ Features

### ✅ Core Functionality
- **Add Tasks**: Create tasks with title, description, and due date
- **Task List**: Beautiful card-based display of all tasks
- **Data Persistence**: All tasks saved to localStorage
- **Form Validation**: Real-time validation with user-friendly feedback
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎨 Design Highlights
- Modern gradient background with glassmorphism effects
- Smooth animations and micro-interactions
- Clean typography and spacing
- Hover effects and transitions
- Success/error notifications
- Empty state with encouraging messaging

### 🛠 Technical Features
- **Modern ES6+ JavaScript**: Arrow functions, template literals, classes
- **Dynamic DOM Updates**: No page reloads required
- **localStorage API**: Persistent data storage
- **Responsive CSS**: Mobile-first design approach
- **Form Validation**: Client-side validation with error handling
- **Accessibility**: Semantic HTML and proper labels

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or servers required!

### Installation
1. Download or clone the project files
2. Ensure you have these files in the same directory:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`

### Running the Application
1. Open `index.html` in your web browser
2. That's it! The app is ready to use

**Alternative methods:**
- **Local Server**: Use a simple HTTP server like `python -m http.server` or `npx serve`
- **Live Server**: If using VS Code, install the Live Server extension
- **File Protocol**: Double-click `index.html` (works in most browsers)

## 📱 How to Use

### Adding a Task
1. Fill in the **Task Title** (required, 2-100 characters)
2. Add an optional **Description** 
3. Select a **Due Date** (required, cannot be in the past)
4. Click **Add Task**

### Viewing Tasks
- Tasks are displayed as cards in chronological order (earliest due date first)
- Each card shows:
  - Task title and description
  - Due date with color coding:
    - **Today**: Yellow highlight
    - **Overdue**: Red highlight
    - **Future**: Default styling
  - Task ID and creation timestamp

### Data Persistence
- All tasks are automatically saved to your browser's localStorage
- Tasks persist across browser sessions and page reloads
- Data is stored locally - no external servers involved

## 🏗 Project Structure

```
task-tango/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── app.js             # Complete JavaScript functionality
└── README.md          # This documentation
```

## 🔧 Technical Implementation

### JavaScript Architecture
- **TaskManager Class**: Main application controller
- **Event-Driven**: Responsive to user interactions
- **Modular Methods**: Separated concerns for maintainability
- **Error Handling**: Graceful error handling and user feedback

### Key JavaScript Features Used
- ES6 Classes and arrow functions
- Template literals for dynamic HTML
- localStorage API for data persistence
- DOM manipulation and event handling
- Array methods for data processing
- Date manipulation and formatting

### CSS Techniques
- CSS Grid and Flexbox for layouts
- CSS custom properties (variables)
- Gradient backgrounds and backdrop filters
- CSS animations and transitions
- Media queries for responsive design
- CSS Grid for form layouts

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `style.css`:
```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #28a745;
  --error-color: #e74c3c;
}
```

### Modifying Animations
Adjust animation durations and easing in the CSS:
```css
.task-card {
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease-out;
}
```

### Adding New Features
The code is structured for easy extension:
- Add new methods to the `TaskManager` class
- Extend the task object structure
- Add new UI components in the HTML

## 🔮 Future Enhancements (Bonus Features)

Ready-to-implement features for future versions:
- **Edit Tasks**: Modify existing tasks
- **Delete Tasks**: Remove completed tasks
- **Task Filtering**: Filter by status, date, or priority
- **Search**: Find tasks by title or description
- **Priority Levels**: High, Medium, Low priority
- **Drag & Drop**: Reorder tasks
- **Categories**: Organize tasks by category
- **Export**: Download tasks as JSON or CSV
- **Dark Mode**: Toggle between light and dark themes
- **Notifications**: Browser notifications for due tasks

## 🌟 Browser Compatibility

- **Chrome**: ✅ Full support
- **Firefox**: ✅ Full support  
- **Safari**: ✅ Full support
- **Edge**: ✅ Full support
- **Mobile Browsers**: ✅ Responsive design

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Built with ❤️ using vanilla JavaScript, CSS, and HTML**

*No frameworks were harmed in the making of this application* 😄
