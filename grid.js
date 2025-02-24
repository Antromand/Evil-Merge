// Получаем канвас и контекст
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Массив состояния поля
let grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

// Отрисовка сетки и предметов
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            if (grid[x][y] > 0 && grid[x][y] <= MAX_LEVEL) {
                ctx.fillStyle = LEVEL_COLORS[grid[x][y] - 1];
                ctx.fillRect(x * CELL_SIZE + 5, y * CELL_SIZE + 5, CELL_SIZE - 10, CELL_SIZE - 10);
            }
        }
    }
}