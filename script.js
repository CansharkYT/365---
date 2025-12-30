// script.js
const STORAGE_KEY = 'irisPurpleSavings_365';
let savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

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

// 頁面載入時渲染
window.onload = () => {
    savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    render();
};
