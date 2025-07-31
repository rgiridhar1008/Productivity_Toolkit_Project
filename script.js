document.addEventListener('DOMContentLoaded', () => {
    // --- GLOBAL HELPERS ---
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // --- DATA MANAGEMENT ---
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    let notes = localStorage.getItem('notes') || '';
    const saveData = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));
        localStorage.setItem('notes', notes);
    };

    // --- THEME SWITCHER ---
    const themeSwitcher = $('#theme-switcher');
    const applyTheme = (theme) => {
        document.body.className = theme;
        themeSwitcher.className = theme === 'light-mode' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', theme);
        if (document.querySelector('#analytics.active')) {
            renderAllCharts();
        }
    };
    themeSwitcher.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
        applyTheme(newTheme);
    });
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark-mode' : 'light-mode'));


    // --- TAB SWITCHING ---
    const activateTab = (tabName) => {
        $$('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        $$('.tool-content').forEach(c => c.classList.toggle('active', c.id === tabName));
        if (tabName === 'analytics') {
            $$('.chart-container').forEach(el => {
                el.classList.remove('animate__zoomIn');
                void el.offsetWidth;
                el.classList.add('animate__zoomIn');
            });
            renderAllCharts();
        }
    };
    $$('.nav-tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
    $('#settings-icon').addEventListener('click', () => activateTab('settings'));

    // --- QUOTE ---
    (async () => {
        try {
            const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
            const data = await res.json();
            $('#quote-of-the-day').textContent = `"${JSON.parse(data.contents)[0].q}"`;
        } catch {
            $('#quote-of-the-day').textContent = '"The secret of getting ahead is getting started."';
        }
    })();

    // --- ENHANCED MUSIC PLAYER ---
    const audio = $('#focus-audio');
    const playPauseBtn = $('#play-pause-music');
    const volumeSlider = $('#volume-slider');
    const customSelect = $('#custom-music-select');
    const currentTrackBtn = $('#current-track-btn');
    const currentTrackName = $('#current-track-name');
    const trackList = $('#track-list-options');

    const musicTracks = [
        { name: "Lo-Fi Beat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
        { name: "Ambient Calm", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
        { name: "Classical Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3" }
    ];

    // Populate custom dropdown
    musicTracks.forEach(track => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.dataset.url = track.url;
        trackList.appendChild(li);
    });

    const updateActiveTrack = () => {
        $$('#track-list-options li').forEach(li => {
            li.classList.toggle('active', li.dataset.url === audio.src);
        });
    };

    // Set initial track
    currentTrackName.textContent = musicTracks[0].name;
    audio.src = musicTracks[0].url;
    updateActiveTrack();

    playPauseBtn.addEventListener('click', () => {
        audio.paused ? (audio.play(), playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>')
                     : (audio.pause(), playPauseBtn.innerHTML = '<i class="fas fa-play"></i>');
    });

    volumeSlider.addEventListener('input', () => { audio.volume = volumeSlider.value; });

    currentTrackBtn.addEventListener('click', () => {
        customSelect.classList.toggle('open');
    });

    trackList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const wasPlaying = !audio.paused;
            audio.src = e.target.dataset.url;
            currentTrackName.textContent = e.target.textContent;
            if (wasPlaying) audio.play();
            updateActiveTrack();
            customSelect.classList.remove('open');
        }
    });

    window.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });


    // --- TO-DO LIST ---
    const renderTasks = () => {
        $('#task-list').innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `animate__animated animate__fadeInUp priority-${task.priority}`;
            if (task.completed) li.classList.add('completed');
            li.innerHTML = `
                <div>
                    <span class="task-text">${task.text}</span>
                </div>
                <div class="task-actions">
                    <span class="task-priority">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>`;
            li.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-btn')) {
                    tasks[index].completed = !tasks[index].completed;
                    if (tasks[index].completed) confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    saveData();
                    renderTasks();
                }
            });
            li.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveData();
                renderTasks();
            });
            $('#task-list').appendChild(li);
        });
    };
    $('#task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const text = $('#task-input').value.trim();
        if (text) {
            tasks.push({ text, priority: $('#task-priority').value, completed: false });
            saveData();
            renderTasks();
            $('#task-input').value = '';
        }
    });

    // --- TIMER (STOPWATCH & POMODORO) ---
    let stopwatchInterval, elapsedTime = 0;
    $('#start-stop-btn').addEventListener('click', () => {
        if ($('#start-stop-btn').textContent === 'Start') {
            const startTime = Date.now() - elapsedTime;
            stopwatchInterval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                const date = new Date(elapsedTime);
                $('#stopwatch-display').textContent = `${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}:${String(date.getUTCMilliseconds()).padStart(3, '0')}`;
            }, 10);
            $('#start-stop-btn').textContent = 'Stop';
        } else {
            clearInterval(stopwatchInterval);
            $('#start-stop-btn').textContent = 'Start';
        }
    });
    $('#reset-btn').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        elapsedTime = 0;
        $('#stopwatch-display').textContent = '00:00:00.000';
        $('#start-stop-btn').textContent = 'Start';
    });

    let pomodoroInterval, pomodoroTime = 25 * 60, currentMode = 'work';
    const updatePomodoroDisplay = () => {
        $('#pomodoro-display').textContent = `${String(Math.floor(pomodoroTime / 60)).padStart(2, '0')}:${String(pomodoroTime % 60).padStart(2, '0')}`;
        $('#pomodoro-status').textContent = currentMode === 'work' ? 'Time to focus!' : 'Time for a break!';
    }
    $('#start-pomodoro-btn').addEventListener('click', () => {
        if ($('#start-pomodoro-btn').textContent === 'Start') {
            if (pomodoroInterval) return;
            pomodoroInterval = setInterval(() => {
                pomodoroTime--;
                updatePomodoroDisplay();
                if (pomodoroTime < 0) {
                    clearInterval(pomodoroInterval); pomodoroInterval = null;
                    const notificationText = currentMode === 'work' ? 'Time for a break!' : 'Time to get back to work!';
                    if (Notification.permission === 'granted') new Notification('Pomodoro Alert', { body: notificationText, icon: './assets/icon.png' });
                    currentMode = currentMode === 'work' ? 'break' : 'work';
                    pomodoroTime = (currentMode === 'work' ? 25 : 5) * 60;
                    updatePomodoroDisplay();
                    $('#start-pomodoro-btn').textContent = 'Start';
                }
            }, 1000);
            $('#start-pomodoro-btn').textContent = 'Pause';
        } else {
            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            $('#start-pomodoro-btn').textContent = 'Start';
        }
    });
    $('#reset-pomodoro-btn').addEventListener('click', () => {
        clearInterval(pomodoroInterval); pomodoroInterval = null;
        pomodoroTime = 25 * 60; currentMode = 'work';
        updatePomodoroDisplay();
        $('#start-pomodoro-btn').textContent = 'Start';
    });
    $('#show-stopwatch').addEventListener('click', () => { $('#stopwatch-view').style.display = 'block'; $('#pomodoro-view').style.display = 'none'; });
    $('#show-pomodoro').addEventListener('click', () => { $('#stopwatch-view').style.display = 'none'; $('#pomodoro-view').style.display = 'block'; });

    // --- BMI CALCULATOR ---
    $('#bmi-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const weight = parseFloat($('#weight').value), height = parseFloat($('#height').value);
        if (weight > 0 && height > 0) {
            const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
            bmiHistory.push({ date: new Date().toISOString().split('T')[0], bmi });
            if (bmiHistory.length > 30) bmiHistory.shift();
            saveData();
            $('#bmi-result').textContent = `Your BMI is ${bmi}.`;
            $('#bmi-form').reset();
        }
    });

    // --- NOTES ---
    $('#notes-input').value = notes;
    $('#notes-output').innerHTML = marked.parse(notes);
    $('#notes-input').addEventListener('keyup', () => {
        notes = $('#notes-input').value;
        $('#notes-output').innerHTML = marked.parse(notes);
        saveData();
    });

    // --- ANALYTICS ---
    let charts = {};
    const renderAllCharts = () => {
        const chartColors = { 
            text: getComputedStyle(document.body).getPropertyValue('--text-color'),
            grid: getComputedStyle(document.body).getPropertyValue('--chart-grid-color')
        };
        const createChart = (id, type, data, options = {}) => {
            if (charts[id]) charts[id].destroy();
            const defaultOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: chartColors.text } } },
                scales: { y: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } }, x: { ticks: { color: chartColors.text }, grid: { color: chartColors.grid } } }
            };
            charts[id] = new Chart($(`#${id}`).getContext('2d'), { type, data, options: { ...defaultOptions, ...options } });
        };
        // Task Chart
        const completed = tasks.filter(t => t.completed).length;
        createChart('task-chart', 'doughnut', { labels: ['Completed', 'Pending'], datasets: [{ data: [completed, tasks.length - completed], backgroundColor: ['#11998e', '#ff7f50'], borderWidth: 0 }] }, { scales: { y: { display: false }, x: { display: false } } });
        // Priority Chart
        const pendingTasks = tasks.filter(t => !t.completed);
        const priorityCounts = { low: 0, medium: 0, high: 0 };
        pendingTasks.forEach(t => priorityCounts[t.priority]++);
        createChart('priority-chart', 'bar', { labels: ['Low', 'Medium', 'High'], datasets: [{ label: 'Pending Tasks', data: Object.values(priorityCounts), backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--priority-low'), getComputedStyle(document.documentElement).getPropertyValue('--priority-medium'), getComputedStyle(document.documentElement).getPropertyValue('--priority-high')] }] }, { scales: { x: { grid: { display: false } } } });
        // BMI Chart
        createChart('bmi-chart', 'line', { labels: bmiHistory.map(item => item.date), datasets: [{ label: 'BMI', data: bmiHistory.map(item => item.bmi), borderColor: '#11998e', tension: 0.1 }] });
    };

    // --- SETTINGS ---
    $('#notification-btn').addEventListener('click', () => Notification.requestPermission());
    $('#export-data-btn').addEventListener('click', () => {
        const dataStr = JSON.stringify({ tasks, bmiHistory, notes });
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'productivity_backup.json'; a.click();
        URL.revokeObjectURL(url);
    });
    $('#import-data-btn').addEventListener('click', () => $('#import-file-input').click());
    $('#import-file-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    tasks = data.tasks || [];
                    bmiHistory = data.bmiHistory || [];
                    notes = data.notes || '';
                    saveData();
                    location.reload();
                } catch { alert('Invalid backup file.'); }
            };
            reader.readAsText(file);
        }
    });
    $('#clear-all-data-btn').addEventListener('click', () => {
        if (confirm('Are you sure? This will delete all tasks, notes, and history permanently.')) {
            localStorage.clear();
            location.reload();
        }
    });

    // --- INITIAL RENDER ---
    renderTasks();
});