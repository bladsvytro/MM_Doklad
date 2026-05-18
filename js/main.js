// Основной JavaScript файл для презентации "Начала Евклида"

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация интерактивных элементов
    initInteractiveElements();
    initMathJax();
    setupEventListeners();
    setupSlideTransitions();
    
    console.log('Презентация "Начала Евклида" загружена');
});

function initInteractiveElements() {
    // Добавляем интерактивность к платоновым телам
    const solids = document.querySelectorAll('.solid');
    solids.forEach(solid => {
        solid.addEventListener('click', function() {
            const solidName = this.querySelector('.solid-name').textContent;
            showSolidInfo(solidName);
        });
        
        solid.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        solid.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
    
    // Инициализация геометрического канваса
    if (typeof initGeometry === 'function') {
        initGeometry();
    }
}

function initMathJax() {
    // Конфигурация MathJax для русского языка
    if (window.MathJax) {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
                processEnvironments: true
            },
            'HTML-CSS': {
                preferredFont: 'STIX',
                scale: 100,
                linebreaks: { automatic: true }
            },
            CommonHTML: {
                linebreaks: { automatic: true }
            },
            SVG: {
                linebreaks: { automatic: true }
            },
            showProcessingMessages: false,
            messageStyle: 'none'
        });
        
        // Перерисовка формул при смене слайдов
        Reveal.addEventListener('slidechanged', function(event) {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        });
    }
}

function setupEventListeners() {
    // Кнопки навигации для интерактивной демонстрации
    const demoButtons = document.querySelectorAll('.interactive-controls button');
    demoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            logAction(action);
        });
    });
    
    // Обработчики для ссылок на ресурсы
    const resourceLinks = document.querySelectorAll('.resources a');
    resourceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            const linkText = this.textContent;
            
            // Показать подтверждение для внешних ссылок
            if (confirm(`Открыть "${linkText}" в новой вкладке?`)) {
                window.open(url, '_blank');
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    setupScrollAnimations();
}

function setupSlideTransitions() {
    // Плавные переходы между слайдами
    Reveal.configure({
        transition: 'slide',
        backgroundTransition: 'fade',
        transitionSpeed: 'fast',
        controls: true,
        progress: true,
        history: true,
        center: true,
        mouseWheel: true,
        hideAddressBar: true,
        previewLinks: false,
        touch: true,
        overview: true,
        focusBodyOnPageVisibilityChange: true
    });
    
    // События Reveal.js
    Reveal.addEventListener('ready', function(event) {
        console.log('Презентация готова, текущий слайд:', event.indexh, event.indexv);
        highlightCurrentSlide();
    });
    
    Reveal.addEventListener('slidechanged', function(event) {
        console.log('Слайд изменен:', event.indexh, event.indexv);
        highlightCurrentSlide();
        
        // Автоматическая активация интерактивных элементов на определенных слайдах
        if (event.indexh === 4 && event.indexv === 0) {
            // Слайд с интерактивной демонстрацией
            setTimeout(() => {
                if (typeof drawEquilateralTriangle === 'function') {
                    drawEquilateralTriangle();
                }
            }, 500);
        }
    });
}

function highlightCurrentSlide() {
    // Убираем выделение со всех слайдов
    const slides = document.querySelectorAll('.slides section');
    slides.forEach(slide => {
        slide.classList.remove('current-slide');
    });
    
    // Добавляем выделение текущему слайду
    const currentSlide = Reveal.getCurrentSlide();
    if (currentSlide) {
        currentSlide.classList.add('current-slide');
    }
}

function setupScrollAnimations() {
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые нужно анимировать
    const animatableElements = document.querySelectorAll('.axiom, .step, .legacy-item, .point, .solid');
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

function showSolidInfo(solidName) {
    const info = getSolidInfo(solidName);
    
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'solid-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${solidName}</h3>
            <div class="modal-body">
                <p><strong>Количество граней:</strong> ${info.faces}</p>
                <p><strong>Количество вершин:</strong> ${info.vertices}</p>
                <p><strong>Количество рёбер:</strong> ${info.edges}</p>
                <p><strong>Форма граней:</strong> ${info.faceShape}</p>
                <p><strong>Элемент по Платону:</strong> ${info.element}</p>
                <p>${info.description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Стили для модального окна
    const style = document.createElement('style');
    style.textContent = `
        .solid-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: #2c3e50;
        }
        
        .close-modal:hover {
            color: #e74c3c;
        }
        
        .modal-body {
            margin-top: 1rem;
        }
        
        .modal-body p {
            margin-bottom: 0.8rem;
            font-size: 1.2rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    // Закрытие модального окна
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    });
}

function getSolidInfo(solidName) {
    const solids = {
        'Тетраэдр': {
            faces: '4',
            vertices: '4',
            edges: '6',
            faceShape: 'Равносторонние треугольники',
            element: 'Огонь',
            description: 'Самый простой из правильных многогранников. Все грани — равносторонние треугольники.'
        },
        'Куб': {
            faces: '6',
            vertices: '8',
            edges: '12',
            faceShape: 'Квадраты',
            element: 'Земля',
            description: 'Также известен как гексаэдр. Единственный правильный многогранник, который можно заполнить пространство без промежутков.'
        },
        'Октаэдр': {
            faces: '8',
            vertices: '6',
            edges: '12',
            faceShape: 'Равносторонние треугольники',
            element: 'Воздух',
            description: 'Двойственный кубу. Можно представить как две пирамиды, соединённые основаниями.'
        },
        'Додекаэдр': {
            faces: '12',
            vertices: '20',
            edges: '30',
            faceShape: 'Правильные пятиугольники',
            element: 'Эфир',
            description: 'Самый сложный из платоновых тел. Символизировал весь космос в древнегреческой философии.'
        },
        'Икосаэдр': {
            faces: '20',
            vertices: '12',
            edges: '30',
            faceShape: 'Равносторонние треугольники',
            element: 'Вода',
            description: 'Имеет наибольшее количество граней среди платоновых тел. Двойственный додекаэдру.'
        }
    };
    
    return solids[solidName] || {
        faces: 'Неизвестно',
        vertices: 'Неизвестно',
        edges: 'Неизвестно',
        faceShape: 'Неизвестно',
        element: 'Неизвестно',
        description: 'Информация об этом многограннике отсутствует.'
    };
}

function logAction(action) {
    const log = document.createElement('div');
    log.className = 'action-log';
    log.textContent = `Выполнено: ${action} (${new Date().toLocaleTimeString()})`;
    
    const logContainer = document.getElementById('action-log-container');
    if (!logContainer) {
        const container = document.createElement('div');
        container.id = 'action-log-container';
        container.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            max-width: 300px;
            z-index: 100;
        `;
        document.body.appendChild(container);
        container.appendChild(log);
    } else {
        logContainer.appendChild(log);
        
        // Ограничиваем количество записей
        if (logContainer.children.length > 5) {
            logContainer.removeChild(logContainer.firstChild);
        }
    }
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (log.parentNode) {
            log.parentNode.removeChild(log);
        }
    }, 5000);
}

// Утилиты для работы с математикой
function calculateGoldenRatio() {
    return (1 + Math.sqrt(5)) / 2;
}

function calculatePythagorean(a, b) {
    return Math.sqrt(a * a + b * b);
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Экспорт функций для использования в консоли
window.EuclidPresentation = {
    calculateGoldenRatio,
    calculatePythagorean,
    degreesToRadians,
    radiansToDegrees,
    drawEquilateralTriangle,
    drawCircle,
    drawPerpendicular,
    drawPythagoras,
    clearCanvas
};