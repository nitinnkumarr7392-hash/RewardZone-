const tasksData = [
    { id: 1, title: 'Watch Video Ad', points: 15, type: 'video', duration: 30, completed: false },
    { id: 2, title: 'Install Free App', points: 75, type: 'app', completed: false },
    { id: 3, title: 'Daily Quiz (5 Qs)', points: 25, type: 'quiz', completed: false },
    { id: 4, title: 'Daily Check-in', points: 10, type: 'daily', completed: false },
    { id: 5, title: 'Share on WhatsApp', points: 20, type: 'social', completed: false },
    { id: 6, title: 'Spin Lucky Wheel', points: 50, type: 'game', completed: false },
    { id: 7, title: 'Solve Puzzle', points: 15, type: 'game', completed: false },
    { id: 8, title: 'Feedback Survey', points: 30, type: 'survey', completed: false },
    { id: 9, title: 'Tutorial Video', points: 20, type: 'video', duration: 45, completed: false },
    { id: 10, title: 'Invite Friends', points: 100, type: 'referral', completed: false }
];

function initTasksPage() {
    document.getElementById('backBtn')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    setupCategoryFilters();
    setupTaskModal();
}

function loadTasks() {
    const container = document.getElementById('tasksList');
    container.innerHTML = '';
    
    tasksData.forEach(task => {
        const taskCard = createTaskCard(task);
        container.appendChild(taskCard);
    });
}

function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card ${task.completed ? 'completed' : ''}`;
    card.innerHTML = `
        <div class="task-header">
            <h3>${task.title}</h3>
            <div class="points-badge">${task.points} 💎</div>
        </div>
        ${task.duration ? `<div class="task-duration">${task.duration}s</div>` : ''}
        <div class="task-progress">${task.completed ? '✅ Completed' : 'Tap to Start'}</div>
    `;
    
    card.addEventListener('click', () => openTaskModal(task));
    return card;
}

function openTaskModal(task) {
    const modal = document.getElementById('taskModal');
    const content = document.getElementById('taskContent');
    
    if (task.type === 'video') {
        content.innerHTML = `
            <video width="100%" controls>
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
            </video>
            <div class="timer-container">
                <div class="progress-bar">
                    <div class="progress-fill" id="videoProgress"></div>
                </div>
                <span id="timeLeft">${task.duration}s</span>
            </div>
        `;
        startVideoTimer(task.duration, () => completeTask(task));
    } else if (task.type === 'quiz') {
        content.innerHTML = generateQuiz(task);
    } else {
        content.innerHTML = `<p>${task.title}<br>Task simulation completed!</p>`;
        document.getElementById('completeTask').onclick = () => completeTask(task);
    }
    
    modal.classList.remove('hidden');
}

function completeTask(task) {
    if (task.completed) return;
    
    task.completed = true;
    addPoints(task.points, task.title);
    document.getElementById('taskModal').classList.add('hidden');
    loadTasks(); // Refresh tasks list
}
