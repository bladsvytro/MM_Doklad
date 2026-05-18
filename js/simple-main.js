// Упрощенный JavaScript для минимальной версии презентации

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Reveal.js
    Reveal.initialize({
        // Базовые настройки
        controls: true,
        progress: true,
        center: true,
        hash: true,
        transition: 'slide',
        
        // Упрощенные настройки
        slideNumber: false,
        history: false,
        keyboard: true,
        overview: true,
        touch: true,
        loop: false,
        rtl: false,
        shuffle: false,
        fragments: true,
        embedded: false,
        help: false,
        showNotes: false,
        autoPlayMedia: null,
        preloadIframes: null,
        autoSlide: 0,
        autoSlideStoppable: true,
        autoSlideMethod: Reveal.navigateNext,
        defaultTiming: 120,
        mouseWheel: true,
        hideInactiveCursor: true,
        hideCursorTime: 5000,
        
        // Параметры отображения
        width: "100%",
        height: "100%",
        margin: 0.04,
        minScale: 0.2,
        maxScale: 2.0,
        
        // Плагины (отключены для простоты)
        plugins: []
    });
    
    // Настройка MathJax
    if (window.MathJax) {
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true
            },
            'HTML-CSS': {
                scale: 100,
                linebreaks: { automatic: true }
            }
        });
        
        // Перерендерить формулы после инициализации Reveal
        Reveal.addEventListener('slidechanged', function() {
            MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
        });
    }
    
    // Простые обработчики событий для отладки
    Reveal.addEventListener('slidechanged', function(event) {
        console.log('Слайд изменен: ' + event.indexh + ', ' + event.indexv);
    });
    
    // Информация о презентации
    console.log('Минимальная версия презентации "Начала Евклида" загружена');
    console.log('Reveal.js версия: ' + Reveal.VERSION);
    console.log('Всего слайдов: ' + Reveal.getTotalSlides());
    
    // Добавим простую клавиатурную подсказку
    document.addEventListener('keydown', function(e) {
        if (e.key === '?') {
            alert('Управление:\n← → - навигация\nПробел - следующий фрагмент\nF - полноэкранный режим\nESC - обзор слайдов');
        }
    });
});