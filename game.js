// Обработка клика
canvas.addEventListener('click', (event) => {
    if (gameScreen.style.display === 'block') { // Только если игра активна
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / CELL_SIZE);
        const y = Math.floor((event.clientY - rect.top) / CELL_SIZE);

        if (grid[x][y] === 0) {
            grid[x][y] = getNextItem();
            lastClick = [x, y];
            drawGrid();
            checkAndMerge();
        }
    }
});

// Начальная отрисовка не нужна здесь, она вызывается в menu.js