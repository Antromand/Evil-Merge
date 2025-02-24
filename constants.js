const CELL_SIZE = 50;
const GRID_SIZE = 5;
const MAX_LEVEL = 10;

// Цвета для уровней
const LEVEL_COLORS = [
    'green',   // Уровень 1
    'blue',    // Уровень 2
    'red',     // Уровень 3
    'yellow',  // Уровень 4
    'purple',  // Уровень 5
    'orange',  // Уровень 6
    'pink',    // Уровень 7
    'cyan',    // Уровень 8
    'lime',    // Уровень 9
    'magenta'  // Уровень 10
];

// Вероятности появления уровней (веса)
const LEVEL_WEIGHTS = [
    { level: 1, weight: 60 }, // 60%
    { level: 2, weight: 20 }, // 20%
    { level: 3, weight: 10 }, // 10%
    { level: 4, weight: 5 },  // 5%
    { level: 5, weight: 3 },  // 3%
    { level: 6, weight: 2 },  // 2%
    { level: 7, weight: 0 },  // 0%
    { level: 8, weight: 0 },  // 0%
    { level: 9, weight: 0 },  // 0%
    { level: 10, weight: 0 }  // 0%
];

// Очки за улучшение до каждого уровня
const SCORE_LEVELS = {
    2: 1,    // До уровня 2
    3: 5,    // До уровня 3
    4: 10,   // До уровня 4
    5: 20,   // До уровня 5
    6: 50,   // До уровня 6
    7: 100,  // До уровня 7
    8: 500,  // До уровня 8
    9: 2000, // До уровня 9
    10: 5000 // До уровня 10
};