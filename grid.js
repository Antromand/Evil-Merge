// Получаем канвас и контекст
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Массив состояния поля
let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

const ASSIST_SETTINGS = {
    cooldownMs: 8000,
    softShuffleSwaps: 6,
    hintDurationMs: 2000
};

let hintCells = [];
let lastAssistTime = 0;

// Отрисовка сетки и предметов
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            const isHinted = hintCells.some(([hx, hy]) => hx === x && hy === y);
            ctx.strokeStyle = isHinted ? 'gold' : 'black';
            ctx.lineWidth = isHinted ? 3 : 1;
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            if (grid[x][y] > 0 && grid[x][y] <= MAX_LEVEL) {
                ctx.fillStyle = LEVEL_COLORS[grid[x][y] - 1];
                ctx.fillRect(x * CELL_SIZE + 5, y * CELL_SIZE + 5, CELL_SIZE - 10, CELL_SIZE - 10);
            }
        }
    }
}

function hasEmptyCell() {
    return grid.some(column => column.some(cell => cell === 0));
}

function hasMergeablePair() {
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            const level = grid[x][y];
            if (level === 0) continue;
            const rightSame = x + 1 < GRID_SIZE && grid[x + 1][y] === level;
            const downSame = y + 1 < GRID_SIZE && grid[x][y + 1] === level;
            if (rightSame || downSame) return true;
        }
    }
    return false;
}

function findMergeHint() {
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            const level = grid[x][y];
            if (level === 0) continue;
            if (x + 1 < GRID_SIZE && grid[x + 1][y] === level) {
                return [[x, y], [x + 1, y]];
            }
            if (y + 1 < GRID_SIZE && grid[x][y + 1] === level) {
                return [[x, y], [x, y + 1]];
            }
        }
    }
    return [];
}

function setHintCells(cells) {
    hintCells = cells;
    if (cells.length > 0) {
        setTimeout(() => {
            hintCells = [];
            drawGrid();
        }, ASSIST_SETTINGS.hintDurationMs);
    }
}

function softShuffleGrid() {
    const filledCells = [];
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            if (grid[x][y] !== 0) filledCells.push([x, y]);
        }
    }

    if (filledCells.length < 2) return;

    for (let i = 0; i < ASSIST_SETTINGS.softShuffleSwaps; i++) {
        const first = filledCells[Math.floor(Math.random() * filledCells.length)];
        const second = filledCells[Math.floor(Math.random() * filledCells.length)];
        const temp = grid[first[0]][first[1]];
        grid[first[0]][first[1]] = grid[second[0]][second[1]];
        grid[second[0]][second[1]] = temp;
    }
}

function isDeadlocked() {
    return !hasMergeablePair() && !hasEmptyCell();
}

// Подсказка/автошаффл при полном тупике с кулдауном
function evaluateDeadlockAssist() {
    if (!isDeadlocked()) {
        if (hintCells.length > 0) {
            hintCells = [];
            drawGrid();
        }
        return;
    }

    const now = Date.now();
    if (now - lastAssistTime < ASSIST_SETTINGS.cooldownMs) {
        return;
    }

    lastAssistTime = now;
    softShuffleGrid();
    const hint = findMergeHint();
    if (hint.length > 0) {
        setHintCells(hint);
    }
    drawGrid();
}
