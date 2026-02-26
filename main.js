let currentUser = null;
let pointsBalance = 0;
let streak = 0;
let todayPoints = 0;

function initApp() {
    loadUserData();
    updateUI();
    requestNotificationPermission();
    checkDailyLogin();
}

function loadUserData() {
    const userData = Storage.get('userData') || {};
    currentUser = userData;
    pointsBalance = userData.points || 0;
    streak = userData.streak || 0;
    todayPoints = userData.todayPoints || 0;
    
    if (!currentUser.username) {
        window.location.href = 'login.html';
    }
}

function updateUI() {
    document.getElementById('pointsBalance').textContent = pointsBalance.toLocaleString();
    document.getElementById('streakCounter').textContent = `Streak: ${streak} days`;
    document.getElementById('todayPoints').textContent = todayPoints;
    document.getElementById('usernameDisplay').textContent = currentUser.username || 'Guest';
}

function addPoints(amount, reason = 'Task Completed') {
    pointsBalance += amount;
    todayPoints += amount;
    
    // Update storage
    currentUser.points = pointsBalance;
    currentUser.todayPoints = todayPoints;
    Storage.set('userData', currentUser);
    
    // UI Updates
    updateUI();
    showNotification(`+${amount} Points! ${reason}`);
    createPointsAnimation(amount);
    
    // Add to activity
    addActivityLog(amount, reason);
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    const notifText = document.getElementById('notifText');
    notifText.textContent = message;
    notif.classList.remove('hidden');
    
    setTimeout(() => {
        notif.classList.add('hidden');
    }, 3000);
}

function createPointsAnimation(amount) {
    const flyPoint = document.createElement('div');
    flyPoint.className = 'points-flying';
    flyPoint.textContent = `+${amount}`;
    flyPoint.style.left = Math.random() * 80 + 'vw';
    flyPoint.style.top = '50vh';
    document.body.appendChild(flyPoint);
    
    setTimeout(() => flyPoint.remove(), 2000);
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Page navigation
function showPage(page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}
