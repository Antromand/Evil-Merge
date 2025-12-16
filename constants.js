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

// Основная таблица спавна (после разогрева)
const LEVEL_WEIGHTS = [
    { level: 1, weight: 32 },
    { level: 2, weight: 26 },
    { level: 3, weight: 18 },
    { level: 4, weight: 12 },
    { level: 5, weight: 7 },
    { level: 6, weight: 3 },
    { level: 7, weight: 2 },
    { level: 8, weight: 0 },
    { level: 9, weight: 0 },
    { level: 10, weight: 0 }
];

// Плавный старт: отдельная таблица для первых ходов
const INITIAL_SPAWN_TABLE = [
    { level: 1, weight: 56 },
    { level: 2, weight: 26 },
    { level: 3, weight: 12 },
    { level: 4, weight: 5 },
    { level: 5, weight: 1 }
];

// Пороги, при которых открываются редкие уровни
const RARE_LEVEL_THRESHOLDS = [
    { level: 5, minScore: 120, minMerges: 4 },
    { level: 6, minScore: 320, minMerges: 9 },
    { level: 7, minScore: 700, minMerges: 15 },
    { level: 8, minScore: 1150, minMerges: 22 },
    { level: 9, minScore: 1800, minMerges: 30 },
    { level: 10, minScore: 2500, minMerges: 38 }
];

// Защита от раннего "мусора"
const EARLY_GAME_PROTECTION = {
    junkLevels: [1],           // какие уровни считаются мусорными
    reduction: 0.45,           // на сколько режем их вес
    turns: 10                  // сколько ходов действует снижение
};

// Очки за улучшение до каждого уровня (базовая часть награды)
const SCORE_LEVELS = {
    2: 1,
    3: 5,
    4: 10,
    5: 20,
    6: 50,
    7: 100,
    8: 500,
    9: 2000,
    10: 5000
};
