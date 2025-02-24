// Элемент для отображения очков
const scoreElement = document.getElementById('score');
let score = 0;

// Обновление очков (если передан newLevel, добавляем очки; если value, устанавливаем напрямую)
function updateScore(newLevelOrValue) {
    if (typeof newLevelOrValue === 'number' && SCORE_LEVELS[newLevelOrValue]) {
        score += SCORE_LEVELS[newLevelOrValue];
    } else if (typeof newLevelOrValue === 'number') {
        score = newLevelOrValue; // Устанавливаем значение напрямую
    }
    scoreElement.textContent = `Очки: ${score}`;
}