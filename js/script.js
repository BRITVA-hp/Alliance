window.addEventListener('DOMContentLoaded', () => {


    // Функция аккордиона

    function accord(headers, activeClass, paddingBottom) {
        const headers_ = document.querySelectorAll(headers);

        headers_.forEach(item => {
            item.addEventListener('click', () => {
                item.parentElement.classList.toggle(activeClass);
                if (item.parentElement.classList.contains(activeClass)) {
                    item.nextElementSibling.style.cssText = `max-height: ${item.nextElementSibling.scrollHeight + paddingBottom}px; padding-bottom: ${paddingBottom}px;`;
                } else {
                    item.nextElementSibling.style.cssText = `max-height: 0px; padding-bottom: 0px;`;
                }
            });
        });
    }

    accord('.faq__item__header', 'faq__item--active', 20);
});