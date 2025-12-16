let lastClick = null; // Храним координаты последнего клика
let placementCount = 0; // Сколько плиток было поставлено
let totalMergeCount = 0; // Сколько слияний выполнено всего

// Проверка и слияние групп на всём поле
function checkAndMerge() {
    let merged = false;
    let chainDepth = 0;

    do {
        merged = false;
        let visited = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false));

        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                if (grid[x][y] !== 0 && !visited[x][y]) {
                    let group = findGroup(x, y, grid[x][y], visited);
                    if (group.length >= 3) {
                        mergeGroup(group, chainDepth);
                        merged = true;
                        chainDepth++;
                        drawGrid();
                        break; // Прерываем цикл, чтобы обновить поле и начать заново
                    }
                }
            }
            if (merged) break;
        }
    } while (merged); // Продолжаем, пока есть слияния

    // После цикла проверяем тупик и выдаём подсказку/шаффл по кулдауну
    evaluateDeadlockAssist();
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
function mergeGroup(group, chainDepth) {
    if (!lastClick) return;

    const [newX, newY] = lastClick; // Координаты последнего клика
    const level = grid[group[0][0]][group[0][1]]; // Текущий уровень группы

    // Очищаем все ячейки группы
    for (let [gx, gy] of group) {
        grid[gx][gy] = 0;
    }

    const newLevel = Math.min(level + 1, MAX_LEVEL);
    grid[newX][newY] = newLevel;

    totalMergeCount++;
    registerMergeReward({
        previousLevel: level,
        newLevel,
        groupSize: group.length,
        chainDepth
    });
}

// Регистрируем ход, чтобы генератор мог снижать мусор на старте
function registerPlacement() {
    placementCount++;
}
