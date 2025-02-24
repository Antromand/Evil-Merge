// Элемент для отображения следующего предмета
const nextLevelElement = document.getElementById('nextLevel');

// Создаём взвешенный массив уровней
const weightedLevels = [];
LEVEL_WEIGHTS.forEach(({ level, weight }) => {
    for (let i = 0; i < weight; i++) {
        weightedLevels.push(level);
    }
});

// Генерация следующего предмета
function generateNextItem() {
    if (weightedLevels.length === 0) return 1; // На случай, если массив пустой
    const randomIndex = Math.floor(Math.random() * weightedLevels.length);
    return weightedLevels[randomIndex];
}

// Обновление отображения следующего предмета
function updateNextItemDisplay() {
    nextLevelElement.style.backgroundColor = LEVEL_COLORS[nextItem - 1];
}

// Инициализация следующего предмета
let nextItem = generateNextItem();
updateNextItemDisplay();

// Получение следующего предмета и генерация нового
function getNextItem() {
    const currentItem = nextItem;
    nextItem = generateNextItem();
    updateNextItemDisplay();
    return currentItem;
}