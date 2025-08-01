1. Technical Architecture Overview
Front-End Stack:
HTML5 – Structural layout of all tools and interface components.

CSS3 – Theming (dark/light mode), responsive design via Flexbox/Grid, animations, and transitions.

Vanilla JavaScript – Controls interactivity, app logic, local storage, and DOM manipulation.

External Libraries:
Chart.js – For rendering responsive, interactive charts in the Analytics Dashboard.

Marked.js – Converts Markdown syntax into live HTML preview.

Canvas-Confetti.js – Adds animated confetti celebration on task completion.

File Structure (Suggested):

productivity-toolkit/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── music/
│   ├── icons/
├── libs/
│   ├── chart.min.js
│   ├── marked.min.js
│   └── canvas-confetti.min.js



2. Core Functional Logic
a) To-Do Task Manager:
Priority Mapping: Priority values (High, Medium, Low) mapped to color codes.

Persistence: Data saved using localStorage.setItem() and retrieved on load with getItem().

Confetti Trigger: Triggered via Canvas-Confetti when task is marked complete.

Auto-update: Task list updates immediately on add/delete without refreshing.

b) Timer Module:
Stopwatch Logic: setInterval() for time increments, clearInterval() on stop.

Pomodoro Logic: Alternates between 25-min focus and 5-min break. State machine logic used to alternate sessions.

Notifications: Uses Notification API, requests permission on first run.

c) BMI Calculator:
Formula: BMI = weight / (height/100)^2

Validates input before calculation.

Automatically saves results to history in local storage.

d) Markdown Notes:
Converts user input in real-time.

Saves automatically as you type.

Can include headers, bold, italic, and lists.

e) Analytics Dashboard:
Loads and updates charts dynamically using Chart.js:

Doughnut: Completed vs. pending tasks.

Bar: Pending tasks by priority.

Line: BMI changes over time.


3. Global Features
Dark/Light Mode:

Controlled by a toggle button and synced with prefers-color-scheme.

Theme preference stored in local storage.

Focus Music Player:

Uses HTML5 <audio> tag.

JS allows track switching and volume adjustment.

Music pauses automatically when user switches away from the tab (using visibilitychange event).

Motivational Quote of the Day:

Rotates daily using an array of quotes and local time-based index.

Settings Panel:

Export: JSON.stringify() to prepare backup file for download.

Import: JSON file is parsed and injected into local storage.

Clear Data: Full app reset with localStorage.clear().



4. Data Handling & Privacy
All data is stored locally in the browser using localStorage.

No external server/API calls – making it lightweight and privacy-friendly.

Users have full control to export, import, and delete their data.



5. Responsiveness & Accessibility
Media Queries: Adapt layout for mobile, tablet, and desktop views.

Accessibility Considerations:

Alt text for images.

High contrast themes.

ARIA labels for buttons where needed.
