// Элементы интерфейса
const mainMenu = document.getElementById('mainMenu');
const gameScreen = document.getElementById('gameScreen');
const newGameBtn = document.getElementById('newGameBtn');
const continueBtn = document.getElementById('continueBtn');
const exitBtn = document.getElementById('exitBtn');

// Показать главное меню
function showMainMenu() {
    mainMenu.style.display = 'block';
    gameScreen.style.display = 'none';
}

// Показать игру
function showGameScreen() {
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'block';
}

// Начать новую игру
function startNewGame() {
    grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    score = 0;
    nextItem = generateNextItem();
    updateScore(0); // Устанавливаем счёт 0 явно
    updateNextItemDisplay();
    drawGrid();
    showGameScreen();
}

// Сохранить сессию
function saveSession() {
    const session = {
        grid: grid,
        score: score,
        nextItem: nextItem
    };
    localStorage.setItem('mergeGameSession', JSON.stringify(session));
}

// Загрузить сессию
function loadSession() {
    const savedSession = localStorage.getItem('mergeGameSession');
    if (savedSession) {
        const session = JSON.parse(savedSession);
        grid = session.grid;
        score = session.score;
        nextItem = session.nextItem;
        updateScore(score); // Устанавливаем сохранённый счёт
        updateNextItemDisplay();
        drawGrid();
        showGameScreen();
    } else {
        startNewGame(); // Если сессии нет, начинаем новую игру
    }
}

// Обработчики кнопок
newGameBtn.addEventListener('click', startNewGame);
continueBtn.addEventListener('click', loadSession);
exitBtn.addEventListener('click', () => {
    saveSession();
    showMainMenu();
});

// Изначально показываем главное меню
showMainMenu();