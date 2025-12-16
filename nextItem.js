// Элемент для отображения следующего предмета
const nextLevelElement = document.getElementById('nextLevel');

function isLevelUnlocked(level) {
    const threshold = RARE_LEVEL_THRESHOLDS.find(t => t.level === level);
    if (!threshold) return true;
    return score >= threshold.minScore && totalMergeCount >= threshold.minMerges;
}

function getActiveSpawnTable() {
    return placementCount < EARLY_GAME_PROTECTION.turns ? INITIAL_SPAWN_TABLE : LEVEL_WEIGHTS;
}

function buildWeightedPool() {
    const pool = [];
    const table = getActiveSpawnTable();
    table.forEach(({ level, weight }) => {
        if (!isLevelUnlocked(level) || weight <= 0) return;
        let adjustedWeight = weight;
        const isJunk = EARLY_GAME_PROTECTION.junkLevels.includes(level);
        if (placementCount < EARLY_GAME_PROTECTION.turns && isJunk) {
            adjustedWeight = Math.max(1, Math.round(weight * (1 - EARLY_GAME_PROTECTION.reduction)));
        }
        for (let i = 0; i < adjustedWeight; i++) {
            pool.push(level);
        }
    });

    if (pool.length === 0) {
        // Фоллбек, чтобы генератор не сломался
        pool.push(1);
    }

    return pool;
}

// Генерация следующего предмета
function generateNextItem() {
    const pool = buildWeightedPool();
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

// Обновление отображения следующего предмета
function updateNextItemDisplay() {
    nextLevelElement.style.backgroundColor = LEVEL_COLORS[nextItem - 1];
    nextLevelElement.textContent = `${nextItem}`;
}

// Инициализация следующего предмета
let nextItem = generateNextItem();
updateNextItemDisplay();

// Получение следующего предмета и генерация нового
function getNextItem() {
    const currentItem = nextItem;
    registerPlacement();
    nextItem = generateNextItem();
    updateNextItemDisplay();
    return currentItem;
}
