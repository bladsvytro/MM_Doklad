// Интерактивные геометрические построения для презентации "Начала Евклида"

class GeometryCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.clearCanvas();
        this.drawGrid();
        this.drawAxes();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.shapes = [];
        this.currentStep = 0;
        this.drawGrid();
        this.drawAxes();
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 0.5;
        
        // Вертикальные линии
        for (let x = 50; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Горизонтальные линии
        for (let y = 50; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawAxes() {
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 2;
        
        // Ось X
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();
        
        // Ось Y
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 0);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
        this.ctx.stroke();
    }

    drawPoint(x, y, color = '#e74c3c', radius = 5) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.shapes.push({ type: 'point', x, y, color });
    }

    drawLine(x1, y1, x2, y2, color = '#3498db', width = 3) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        this.shapes.push({ type: 'line', x1, y1, x2, y2, color, width });
    }

    drawCircle(x, y, radius, color = '#f39c12', width = 3) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.shapes.push({ type: 'circle', x, y, radius, color, width });
    }

    drawTriangle(x1, y1, x2, y2, x3, y3, color = '#2ecc71', fill = false) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.closePath();
        
        if (fill) {
            this.ctx.fillStyle = color + '40'; // Полупрозрачная заливка
            this.ctx.fill();
        }
        this.ctx.stroke();
        
        this.shapes.push({ type: 'triangle', points: [[x1, y1], [x2, y2], [x3, y3]], color, fill });
    }

    drawText(text, x, y, color = '#2c3e50', size = 16) {
        this.ctx.fillStyle = color;
        this.ctx.font = `${size}px Arial`;
        this.ctx.fillText(text, x, y);
        
        this.shapes.push({ type: 'text', text, x, y, color, size });
    }

    // Построение равностороннего треугольника (Предложение 1 Книги I)
    drawEquilateralTriangle() {
        this.clearCanvas();
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 150;
        
        // Точка A
        const Ax = centerX;
        const Ay = centerY - radius;
        
        // Точка B
        const Bx = centerX - radius * Math.cos(Math.PI / 6);
        const By = centerY + radius * Math.sin(Math.PI / 6);
        
        // Точка C
        const Cx = centerX + radius * Math.cos(Math.PI / 6);
        const Cy = By;
        
        // Рисуем окружность (построение циркулем)
        this.drawCircle(Ax, Ay, radius, '#f39c12', 2);
        
        // Рисуем треугольник
        this.drawTriangle(Ax, Ay, Bx, By, Cx, Cy, '#2ecc71', true);
        
        // Рисуем точки
        this.drawPoint(Ax, Ay, '#e74c3c');
        this.drawPoint(Bx, By, '#e74c3c');
        this.drawPoint(Cx, Cy, '#e74c3c');
        
        // Подписи
        this.drawText('A', Ax - 20, Ay - 20);
        this.drawText('B', Bx - 30, By + 20);
        this.drawText('C', Cx + 20, Cy + 20);
        this.drawText('Равносторонний треугольник', centerX - 100, centerY + 200);
        
        // Пояснение
        this.drawText('Построение: Из точки A проведена окружность радиусом AB', 50, 30);
        this.drawText('Точки пересечения окружностей дают вершины треугольника', 50, 60);
    }

    // Построение окружности (Постулат 3)
    drawCircleConstruction() {
        this.clearCanvas();
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 120;
        
        // Центр окружности
        this.drawPoint(centerX, centerY, '#e74c3c', 8);
        
        // Окружность
        this.drawCircle(centerX, centerY, radius, '#3498db', 3);
        
        // Радиус
        this.drawLine(centerX, centerY, centerX + radius, centerY, '#f39c12', 3);
        
        // Диаметр
        this.drawLine(centerX - radius, centerY, centerX + radius, centerY, '#2ecc71', 2);
        
        // Подписи
        this.drawText('O', centerX - 20, centerY - 20);
        this.drawText('r', centerX + radius/2, centerY - 10);
        this.drawText('Диаметр', centerX, centerY + 30);
        this.drawText('Постулат 3: Из любого центра можно описать окружность любого радиуса', 50, 30);
    }

    // Построение перпендикуляра (Предложение 11 Книги I)
    drawPerpendicular() {
        this.clearCanvas();
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Исходный отрезок AB
        const Ax = centerX - 150;
        const Ay = centerY;
        const Bx = centerX + 150;
        const By = centerY;
        
        // Точка C на отрезке AB
        const Cx = centerX;
        const Cy = centerY;
        
        // Перпендикулярная точка D
        const Dx = centerX;
        const Dy = centerY - 120;
        
        // Рисуем исходный отрезок
        this.drawLine(Ax, Ay, Bx, By, '#3498db', 3);
        
        // Рисуем перпендикуляр
        this.drawLine(Cx, Cy, Dx, Dy, '#e74c3c', 3);
        
        // Рисуем точки
        this.drawPoint(Ax, Ay, '#2c3e50');
        this.drawPoint(Bx, By, '#2c3e50');
        this.drawPoint(Cx, Cy, '#2c3e50');
        this.drawPoint(Dx, Dy, '#2c3e50');
        
        // Прямой угол
        this.drawRightAngle(Cx, Cy, Ax, Ay, Dx, Dy);
        
        // Подписи
        this.drawText('A', Ax - 20, Ay + 20);
        this.drawText('B', Bx + 10, By + 20);
        this.drawText('C', Cx - 20, Cy - 20);
        this.drawText('D', Dx - 20, Dy - 20);
        this.drawText('Перпендикуляр к прямой в заданной точке', centerX - 150, centerY + 150);
        this.drawText('Угол ACD = 90°', centerX - 50, centerY - 150);
    }

    drawRightAngle(x, y, x1, y1, x2, y2) {
        const angleSize = 20;
        
        // Вычисляем векторы
        const v1 = { x: x1 - x, y: y1 - y };
        const v2 = { x: x2 - x, y: y2 - y };
        
        // Нормализуем
        const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
        
        const u1 = { x: v1.x / len1, y: v1.y / len1 };
        const u2 = { x: v2.x / len2, y: v2.y / len2 };
        
        // Рисуем угол
        this.ctx.strokeStyle = '#f39c12';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + u1.x * angleSize, y + u1.y * angleSize);
        this.ctx.lineTo(x, y);
        this.ctx.lineTo(x + u2.x * angleSize, y + u2.y * angleSize);
        this.ctx.stroke();
    }

    // Визуализация теоремы Пифагора
    drawPythagorasTheorem() {
        this.clearCanvas();
        
        const centerX = this.canvas.width / 2 - 100;
        const centerY = this.canvas.height / 2;
        
        // Прямоугольный треугольник
        const Ax = centerX;
        const Ay = centerY;
        const Bx = centerX + 120;
        const By = centerY;
        const Cx = centerX;
        const Cy = centerY - 90;
        
        // Рисуем треугольник
        this.drawTriangle(Ax, Ay, Bx, By, Cx, Cy, '#2ecc71', true);
        
        // Квадраты на сторонах
        this.drawSquareOnSide(Ax, Ay, Bx, By, '#3498db40');
        this.drawSquareOnSide(Ax, Ay, Cx, Cy, '#e74c3c40');
        this.drawSquareOnSide(Bx, By, Cx, Cy, '#f39c1240');
        
        // Подписи
        this.drawText('a', (Ax + Bx)/2, (Ay + By)/2 + 20);
        this.drawText('b', (Ax + Cx)/2 - 20, (Ay + Cy)/2);
        this.drawText('c', (Bx + Cx)/2 + 20, (By + Cy)/2);
        this.drawText('a² + b² = c²', centerX + 300, centerY - 50);
        this.drawText('Теорема Пифагора (Книга I, Предложение 47)', centerX, centerY + 150);
    }

    drawSquareOnSide(x1, y1, x2, y2, color) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        
        // Вектор стороны
        const sideVector = { x: dx, y: dy };
        
        // Перпендикулярный вектор (поворот на 90 градусов)
        const perpVector = { x: -dy, y: dx };
        
        // Вершины квадрата
        const p1 = { x: x1, y: y1 };
        const p2 = { x: x2, y: y2 };
        const p3 = { x: x2 + perpVector.x, y: y2 + perpVector.y };
        const p4 = { x: x1 + perpVector.x, y: y1 + perpVector.y };
        
        // Рисуем квадрат
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.lineTo(p4.x, p4.y);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Контур квадрата
        this.ctx.strokeStyle = color.replace('40', '');
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}

// Инициализация и глобальные функции
let geometryCanvas;

function initGeometry() {
    geometryCanvas = new GeometryCanvas('geometry-canvas');
}

function drawEquilateralTriangle() {
    if (!geometryCanvas) initGeometry();
    geometryCanvas.drawEquilateralTriangle();
}

function drawCircle() {
    if (!geometryCanvas) initGeometry();
    geometryCanvas.drawCircleConstruction();
}

function drawPerpendicular() {
    if (!geometryCanvas) initGeometry();
    geometryCanvas.drawPerpendicular();
}

function drawPythagoras() {
    if (!geometryCanvas) initGeometry();
    geometryCanvas.drawPythagorasTheorem();
}

function clearCanvas() {
    if (!geometryCanvas) initGeometry();
    geometryCanvas.clearCanvas();
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGeometry);
} else {
    initGeometry();
}