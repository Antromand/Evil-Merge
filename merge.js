let lastClick = null; // Храним координаты последнего клика

// Проверка и слияние групп на всём поле
function checkAndMerge() {
    let merged = false;
    do {
        merged = false;
        let visited = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false));

        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                if (grid[x][y] !== 0 && !visited[x][y]) {
                    let group = findGroup(x, y, grid[x][y], visited);
                    if (group.length >= 3) {
                        mergeGroup(group);
                        merged = true;
                        drawGrid();
                        break; // Прерываем цикл, чтобы обновить поле и начать заново
                    }
                }
            }
        }
    } while (merged); // Продолжаем, пока есть слияния
}

// Поиск группы одинаковых предметов
function findGroup(x, y, level, visited) {
    let group = [];
    let stack = [[x, y]];

    while (stack.length > 0) {
        let [cx, cy] = stack.pop();
        if (cx < 0 || cx >= GRID_SIZE || cy < 0 || cy >= GRID_SIZE || visited[cx][cy] || grid[cx][cy] !== level) {
            continue;
        }

        visited[cx][cy] = true;
        group.push([cx, cy]);

        // Проверяем соседей (влево, вправо, вверх, вниз)
        stack.push([cx - 1, cy]);
        stack.push([cx + 1, cy]);
        stack.push([cx, cy - 1]);
        stack.push([cx, cy + 1]);
    }

    return group;
}

// Слияние группы
function mergeGroup(group) {
    if (!lastClick) return;

    const [newX, newY] = lastClick; // Координаты последнего клика
    const level = grid[group[0][0]][group[0][1]]; // Текущий уровень группы

    // Очищаем все ячейки группы
    for (let [gx, gy] of group) {
        grid[gx][gy] = 0;
    }

    // Помещаем новый предмет и начисляем очки, если уровень не максимальный
    if (level < MAX_LEVEL) {
        const newLevel = level + 1;
        grid[newX][newY] = newLevel;
        updateScore(newLevel); // Начисляем очки за новый уровень
    }
}