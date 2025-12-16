// Элемент для отображения очков
const scoreElement = document.getElementById('score');
let goalElement = document.getElementById('goal');
const headerElement = document.querySelector('.game-header');

if (!goalElement && headerElement) {
    goalElement = document.createElement('div');
    goalElement.id = 'goal';
    headerElement.appendChild(goalElement);
}

let score = 0;
let comboStreak = 0;
let lastMergeTime = 0;

const COMBO_WINDOW_MS = 3500;
const COMBO_STEP = 0.2;
const CHAIN_DEPTH_STEP = 0.25;
const GROUP_SIZE_STEP = 0.15;
const GROWTH_FACTOR = 1.12;

function getComboMultiplier() {
    return 1 + comboStreak * COMBO_STEP;
}

function renderScore() {
    scoreElement.textContent = `Очки: ${score} (x${getComboMultiplier().toFixed(2)})`;
    if (goalElement && activeGoal) {
        goalElement.textContent = `Цель: ${formatGoal(activeGoal)}`;
    }
}

function touchCombo() {
    const now = Date.now();
    if (now - lastMergeTime <= COMBO_WINDOW_MS) {
        comboStreak += 1;
    } else {
        comboStreak = 1;
    }
    lastMergeTime = now;
}

function calculateReward({ newLevel, groupSize, chainDepth }) {
    const baseScore = SCORE_LEVELS[newLevel] || newLevel;
    const growth = Math.pow(GROWTH_FACTOR, newLevel - 1);
    const groupBonus = 1 + Math.max(0, groupSize - 3) * GROUP_SIZE_STEP;
    const chainBonus = 1 + chainDepth * CHAIN_DEPTH_STEP;
    const reward = Math.round(baseScore * growth * groupBonus * chainBonus * getComboMultiplier());
    return reward;
}

// Краткосрочные цели
function createGoal() {
    const goalPool = [
        { type: 'level', target: Math.min(MAX_LEVEL - 1, 3 + Math.floor(totalMergeCount / 4)), reward: 120 },
        { type: 'merges', target: totalMergeCount + 6, reward: 90 },
        { type: 'score', target: score + 180, reward: 100 }
    ];
    return goalPool[Math.floor(Math.random() * goalPool.length)];
}

let activeGoal = createGoal();

function formatGoal(goal) {
    switch (goal.type) {
        case 'level':
            return `достигните уровня ${goal.target}`;
        case 'merges':
            return `сделайте ${goal.target - totalMergeCount} слияний`;
        case 'score':
            return `наберите ещё ${goal.target - score} оч.`;
        default:
            return '';
    }
}

function checkGoalCompletion(levelReached) {
    if (!activeGoal) return;

    let achieved = false;
    if (activeGoal.type === 'level' && levelReached >= activeGoal.target) {
        achieved = true;
    } else if (activeGoal.type === 'merges' && totalMergeCount >= activeGoal.target) {
        achieved = true;
    } else if (activeGoal.type === 'score' && score >= activeGoal.target) {
        achieved = true;
    }

    if (achieved) {
        score += activeGoal.reward;
        activeGoal = createGoal();
    }
}

function registerMergeReward(info) {
    touchCombo();
    const reward = calculateReward(info);
    score += reward;
    checkGoalCompletion(info.newLevel);
    renderScore();
}

// Обновление очков (если передан newLevel, добавляем очки; если value, устанавливаем напрямую)
function updateScore(newLevelOrValue) {
    if (typeof newLevelOrValue === 'number' && SCORE_LEVELS[newLevelOrValue]) {
        const reward = SCORE_LEVELS[newLevelOrValue];
        score += reward;
    } else if (typeof newLevelOrValue === 'number') {
        score = newLevelOrValue; // Устанавливаем значение напрямую
    }
    renderScore();
}

function resetScoreState() {
    score = 0;
    comboStreak = 0;
    lastMergeTime = 0;
    activeGoal = createGoal();
    renderScore();
}
