/**
 * RATLIK.ORG — INCLUDER
 * Подключает header и footer на все страницы
 */

(function() {
    'use strict';

    // Пути к файлам
    const HEADER_PATH = '/header.html';
    const FOOTER_PATH = '/footer.html';

    // Контейнеры для вставки
    const HEADER_PLACEHOLDER = 'header-placeholder';
    const FOOTER_PLACEHOLDER = 'footer-placeholder';

    /**
     * Загружает HTML с указанного пути и вставляет в элемент с заданным id
     */
    async function loadInclude(path, elementId) {
        const container = document.getElementById(elementId);
        if (!container) {
            console.warn(`Контейнер #${elementId} не найден на странице`);
            return;
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки ${path}: ${response.status}`);
            }
            const html = await response.text();
            container.innerHTML = html;
        } catch (error) {
            console.error(`Не удалось загрузить ${path}:`, error);
            container.innerHTML = `<!-- Ошибка загрузки ${path} -->`;
        }
    }

    /**
     * Устанавливает класс active на текущий пункт меню
     */
    function setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const menuLinks = document.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.replace(/^\.\//, ''))) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Инициализация
     */
    async function init() {
        await loadInclude(HEADER_PATH, HEADER_PLACEHOLDER);
        await loadInclude(FOOTER_PATH, FOOTER_PLACEHOLDER);
        setActiveMenuItem();
    }

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();