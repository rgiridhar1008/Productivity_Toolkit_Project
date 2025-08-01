# Productivity Toolkit – Project Overview

**1. Technical Architecture**

Front-End Stack

HTML5: 

Defines the structural skeleton of the application and component hierarchy.

CSS3:

Responsive layout using Flexbox and CSS Grid.

Dark/Light theme switching with CSS variables.

Smooth transitions and animations for UI feedback.

Vanilla JavaScript:

Handles UI interactivity, event handling, local storage, and component logic.

Modular structure, no front-end frameworks used (e.g., React/Vue).

External Libraries
Chart.js: For creating charts in the Analytics tab (doughnut, bar, and line).

Marked.js: Parses Markdown input into real-time rendered HTML.

Canvas-Confetti.js: Adds celebratory animation when tasks are completed.

📁 Suggested File Structure


productivity-toolkit/

├── index.html             
├── style.css              
├── script.js              
├── assets/
  
 ├── music/             
│   └── icons/             
├── libs/   

│   ├── chart.min.js

│   ├── marked.min.js

│   └── canvas-confetti.min.js

**2. Core Features & Functional Logic**
To-Do Task Manager
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

Headings

**bold**, *italic*

Lists with - or *

Auto-save: Every keystroke updates local storage.

📊 Analytics Dashboard
Uses Chart.js to visualize:

Doughnut Chart: Completed vs. Pending Tasks

Bar Chart: Remaining tasks by priority

Line Chart: Historical BMI data

⚙  **3. Global Features**
Dark/Light Mode
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

🔒 **4. Privacy & Data Handling**
Storage: 100% local – all data is stored securely in the browser using localStorage.

No Backend/API: Fully offline. No user data is transmitted externally.

Export/Import: Users can back up and restore data manually.

📱 **5. Responsiveness & Accessibility**
✅ Responsive Layout
Uses CSS media queries for:

Mobile (vertical layout, touch-friendly buttons)

Tablet/Desktop (side-by-side layout)

♿ Accessibility Features
All interactive elements are keyboard navigable.

ARIA labels for buttons and icons (e.g., trash, theme toggle).

High contrast theme options.


# **Welcome to Your Productivity Toolkit: A Complete User Guide**

1. The Main Interface
When you first open the website, you'll land on the main dashboard. Key features include:

Navigation Tabs:
At the top, you'll find tabs labeled To-Do, Timer, BMI Calc, Notes, and Analytics. Click on any tab to switch between tools.

Theme Switcher (Sun/Moon Icon):
Located in the top-right corner, clicking the sun/moon icon toggles between a Light Mode and a Dark Mode. Your theme preference is saved for future visits.

Settings Icon:
Next to the theme switcher is the gear icon. Click it to access settings where you can manage your data (export/import, or clear all app data).

2. How to Use Each Tool
✅ To-Do Task Manager
Adding a Task:

In the "Add a new task..." field, type your task.

Select a priority (Low, Medium, or High) from the dropdown menu.

Click the Add Task button.
Your task will appear in the list below, color-coded by its priority.

Completing a Task:

Click on the task to mark it as complete. Enjoy a fun confetti celebration when you do!

Deleting a Task:

Click the trash can icon next to the task you want to remove.

⏱️ The Timer (Stopwatch & Pomodoro)
This tool offers two modes:

Stopwatch Mode:

Click Start to begin timing.

Click Stop to pause.

Click Reset to set the timer back to zero.

Pomodoro Timer Mode:

Ideal for focused work sessions (commonly 25 minutes) followed by short breaks (usually 5 minutes).

Click Start to begin your focus session.

When the focus session ends, a browser notification will alert you (ensure notifications are enabled).

The timer will automatically shift to break mode.

Use Pause to interrupt and Reset to start over.

🧮 BMI Calculator
Using the BMI Calculator:

Enter your weight (in kilograms).

Enter your height (in centimeters).

Click Calculate & Save.
Your BMI is calculated, displayed, and saved to your history, which you can later review in the Analytics section.

📋 Markdown Notes
Creating and Formatting Notes:

Type your notes into the top text box.

Format using Markdown symbols:

# for big headings.

**bold** for bold text.

*italic* for italic text.

- for list items.

A Live Preview panel below shows your formatted text instantly.

All notes are automatically saved.

📊 Analytics Dashboard
Viewing Your Productivity:

The Task Completion chart displays the ratio of completed tasks to remaining tasks.

Pending by Priority breaks down remaining tasks by their assigned priority.

BMI History shows a line graph of all your saved BMI calculations over time.

Simply click the Analytics tab to view updated, dynamic charts based on your activity.

3. Additional Features in the Footer
🎧 Focus Music Player
Play/Pause:
Click the play/pause button to control the music.

Change Tracks:
Click the current track name (e.g., "Lo-Fi Beat") to open a menu and choose a different song.

Adjust Volume:
Use the volume slider to set your preferred sound level.

🌈 Quote of the Day
A new, motivational quote appears daily to keep you inspired as you work.

4. Settings (Managing Your Data)
Access the settings page by clicking the gear icon in the header. Here you can:

Export My Data:
Save a backup file containing your tasks, notes, and BMI history.

Import My Data:
Load a previously saved backup file.

Clear All App Data:
Use this option with caution—it permanently deletes all your app data and resets your experience.
