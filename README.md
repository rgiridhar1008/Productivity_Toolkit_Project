Productivity Toolkit – Project Overview

🔧 1. Technical Architecture
🖥 Front-End Stack
HTML5: Defines the structural skeleton of the application and component hierarchy.

CSS3:

Responsive layout using Flexbox and CSS Grid.

Dark/Light theme switching with CSS variables.

Smooth transitions and animations for UI feedback.

Vanilla JavaScript:

Handles UI interactivity, event handling, local storage, and component logic.

Modular structure, no front-end frameworks used (e.g., React/Vue).

📦 External Libraries
Chart.js: For creating charts in the Analytics tab (doughnut, bar, and line).

Marked.js: Parses Markdown input into real-time rendered HTML.

Canvas-Confetti.js: Adds celebratory animation when tasks are completed.

📁 Suggested File Structure
bash
Copy code
productivity-toolkit/
├── index.html             # Main UI layout
├── style.css              # Theming, layout, animations
├── script.js              # Application logic and event handling
├── assets/
│   ├── music/             # Lo-Fi, Ambient, Classical, etc.
│   └── icons/             # App icons (sun, moon, trash, etc.)
├── libs/                  # External libraries
│   ├── chart.min.js
│   ├── marked.min.js
│   └── canvas-confetti.min.js
🧠 2. Core Features & Functional Logic
✅ To-Do Task Manager
Task creation: Includes text input + priority dropdown.

Color-coded priorities: High (red), Medium (orange), Low (green).

Auto-saving: Uses localStorage to persist tasks between sessions.

Completion feedback: Uses Canvas Confetti to reward task completion.

Dynamic UI updates: DOM is updated instantly on add/delete.

⏱️ Timer (Stopwatch + Pomodoro)
Stopwatch Mode:

Uses setInterval() and clearInterval().

Allows pause/resume/reset.

Pomodoro Mode:

Follows a 25/5 cycle (25 min focus, 5 min break).

Automatically switches sessions.

Integrates Notification API for browser alerts.

Optional sound/vibration support can be added.

⚖️ BMI Calculator & History
Calculation formula: BMI = weight / (height/100)^2

Real-time validation: Prevents empty or invalid inputs.

History log: Each entry saved in local storage and timestamped.

Analytics display: History is visualized on the line chart in the Analytics tab.

📝 Markdown Notes
Live Preview: Input + output panels update in real time.

Formatting support:

# Headings

**bold**, *italic*

Lists with - or *

Auto-save: Every keystroke updates local storage.

📊 Analytics Dashboard
Uses Chart.js to visualize:

Doughnut Chart: Completed vs. Pending Tasks

Bar Chart: Remaining tasks by priority

Line Chart: Historical BMI data

⚙️ 3. Global Features
🎨 Dark/Light Mode
Toggle via button in header (sun/moon icon).

Auto-detects OS preference via window.matchMedia.

Saves theme choice in localStorage (theme = "dark" or "light").

🎧 Focus Music Player
HTML <audio> element with JS-based controls.

User can:

Play/Pause

Change track

Adjust volume

Auto-pause on tab switch using visibilitychange event listener.

📅 Motivational Quote of the Day
Daily rotating quotes from an internal array.

Indexed based on new Date().getDate() for daily rotation.

🛠 Settings Panel
Export Data: Generates JSON file of all app data.

Import Data: Parses a user-uploaded JSON and restores saved tasks, notes, BMI, etc.

Clear Data: Deletes everything from localStorage after confirmation.

🔒 4. Privacy & Data Handling
Storage: 100% local – all data is stored securely in the browser using localStorage.

No Backend/API: Fully offline. No user data is transmitted externally.

Export/Import: Users can back up and restore data manually.

📱 5. Responsiveness & Accessibility
✅ Responsive Layout
Uses CSS media queries for:

Mobile (vertical layout, touch-friendly buttons)

Tablet/Desktop (side-by-side layout)

♿ Accessibility Features
All interactive elements are keyboard navigable.

ARIA labels for buttons and icons (e.g., trash, theme toggle).

High contrast theme options.

