document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const successModal = document.getElementById('successModal');
    const goToDashboard = document.getElementById('goToDashboard');
    const googleLogin = document.getElementById('googleLogin');
    const facebookLogin = document.getElementById('facebookLogin');

    // Toggle Forms
    function showLogin() {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    }

    function showSignup() {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        loginToggle.classList.remove('active');
        signupToggle.classList.add('active');
    }

    loginToggle.addEventListener('click', showLogin);
    signupToggle.addEventListener('click', showSignup);

    // Form Submissions
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showError('Please fill all fields');
            return;
        }

        setButtonLoading(loginForm.querySelector('.login-btn'), true);
        
        // Simulate API delay
        setTimeout(() => {
            loginUser(email, password);
            setButtonLoading(loginForm.querySelector('.login-btn'), false);
        }, 1500);
    });

    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;

        if (!username || !email || !password || password.length < 6) {
            showError('Please fill all fields. Password must be 6+ characters');
            return;
        }

        setButtonLoading(signupForm.querySelector('.signup-btn'), true);
        
        setTimeout(() => {
            signupUser(username, email, password);
            setButtonLoading(signupForm.querySelector('.signup-btn'), false);
        }, 1500);
    });

    // Social Login
    googleLogin.addEventListener('click', function() {
        showNotification('Google login simulation...');
        setTimeout(() => {
            loginUser('google.user@gmail.com', 'demo');
        }, 1000);
    });

    facebookLogin.addEventListener('click', function() {
        showNotification('Facebook login simulation...');
        setTimeout(() => {
            loginUser('fb.user@facebook.com', 'demo');
        }, 1000);
    });

    // Success Modal
    goToDashboard.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Input focus effects
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.classList.remove('focused');
        });
    });
});

// Utility Functions
function setButtonLoading(button, loading) {
    const text = button.querySelector('.btn-text');
    const loader = button.querySelector('.btn-loader');
    
    if (loading) {
        button.classList.add('loading');
        text.style.opacity = '0';
        loader.classList.remove('hidden');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        text.style.opacity = '1';
        loader.classList.add('hidden');
        button.disabled = false;
    }
}

function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef5350;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Global auth functions (also used by other pages)
function loginUser(email, password) {
    const userData = Storage.get('userData');
    const demoUser = {
        username: email.split('@')[0] || 'User',
        email: email,
        points: userData?.points || 100,
        streak: userData?.streak || 1,
        todayPoints: 0,
        joined: new Date().toISOString().split('T')[0],
        referrals: userData?.referrals || 0
    };
    
    Storage.set('userData', demoUser);
    showSuccess('Login Successful!', 'Welcome back to RewardZone! 🎉');
}

function signupUser(username, email, password) {
    const newUser = {
        username: username,
        email: email,
        points: 50, // Welcome bonus
        streak: 1,
        todayPoints: 0,
        joined: new Date().toISOString().split('T')[0],
        referrals: 0,
        level: 1
    };
    
    Storage.set('userData', newUser);
    showSuccess('Account Created!', 'Welcome to RewardZone! +50 Welcome Points 💎');
}

function showSuccess(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').classList.remove('hidden');
}
