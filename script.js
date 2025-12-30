// script.js
const STORAGE_KEY = 'irisPurpleSavings_365';
let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// 自動標記今天
function markToday() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

    if (!savedData.includes(dayOfYear)) {
        savedData.push(dayOfYear);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    }
}

function render() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    for (let i = 1; i <= 365; i++) {
        const div = document.createElement('div');
        div.className = `coin ${savedData.includes(i) ? 'active' : ''}`;
        div.innerText = i;
        div.onclick = () => toggle(i);
        grid.appendChild(div);
    }

    updateStats();
}

function toggle(num) {
    if (savedData.includes(num)) {
        savedData = savedData.filter(n => n !== num);
    } else {
        savedData.push(num);
        if (window.navigator.vibrate) window.navigator.vibrate(30);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
    render();
}

function updateStats() {
    const total = savedData.reduce((a, b) => a + b, 0);
    const days = savedData.length;
    const per = ((days / 365) * 100).toFixed(1);
    const target = 66795;

    document.getElementById('total-money').innerText = `$${total.toLocaleString()}`;
    document.getElementById('total-days').innerText = days;
    document.getElementById('percent').innerText = `${per}%`;
    document.getElementById('progress-fill').style.width = `${per}%`;
    document.getElementById('remaining').innerText = `$${(target - total).toLocaleString()}`;
}

function reset() {
    if (confirm('確定要清除所有進度重新開始嗎？')) {
        savedData = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
        render();
    }
}

// 頁面載入時
window.onload = () => {
    savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    markToday();   // 自動記今天
    render();
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch((err) => console.log('Service Worker registration failed:', err));
};
