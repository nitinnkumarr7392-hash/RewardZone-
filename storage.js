const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage read error:', e);
            return null;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage remove error:', e);
        }
    }
};

// User auth functions
function loginUser(email, password) {
    // Demo login - in real app, validate with server
    const demoUser = {
        username: email.split('@')[0],
        email,
        points: Storage.get('userData')?.points || 100,
        streak: Storage.get('userData')?.streak || 1,
        todayPoints: 0,
        joined: new Date().toISOString()
    };
    
    Storage.set('userData', demoUser);
    showNotification('Login successful! Welcome back!');
    setTimeout(() => window.location.href = 'index.html', 1000);
}

function signupUser(username, email, password) {
    const newUser = {
        username,
        email,
        points: 50, // Welcome bonus
        streak: 1,
        todayPoints: 0,
        joined: new Date().toISOString()
    };
    
    Storage.set('userData', newUser);
    showNotification('Account created! +50 Welcome Points 🎉');
    setTimeout(() => window.location.href = 'index.html', 1500);
}
