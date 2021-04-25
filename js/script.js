window.addEventListener('DOMContentLoaded', () => {


    // Функция калькулятора

    function calc(itemPeriods, payment_, calcInput_, selectMobile, itemPeriodActiveClass) {
        const cards = document.querySelectorAll(itemPeriods),
              payment = document.querySelector(payment_),
              calcInput = document.querySelector(calcInput_),
              select = document.querySelector(selectMobile);

            // маска
        function prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        }

        function getPayment(sum, period, rate) {
            // *
            // * sum - сумма кредита
            // * period - срок в годах
            // * rate - годовая ставка в процентах
            // * 
            let i,
                koef;

            // ставка в месяц
            i = (rate / 12) / 100;

            // коэффициент аннуитета
            koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

            // итог
            payment.textContent = (sum * koef).toFixed();
        }

        function getPaymentDesktop() {
            cards.forEach(card => {
                if (card.classList.contains(itemPeriodActiveClass)) {
                    let sum = +calcInput.value.replace(/\D/g, ''),
                        period = +card.dataset.period;

                    getPayment(sum, period, 4);
                }
            });
        }

        function getPaymentMobile() {
            let sum = +calcInput.value.replace(/\D/g, ''),
                period = +select.value;

            getPayment(sum, period, 4);
        }

        function clearActiveClass() {
            cards.forEach(card => {
                card.classList.remove(itemPeriodActiveClass);
            });
        }

        cards.forEach(card => {
            card.addEventListener('click', () => {
                clearActiveClass();
                card.classList.add(itemPeriodActiveClass); +
                calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentDesktop() : payment.textContent = '0';
            });
        });

        select.addEventListener('input', () => {
            +calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000 ? getPaymentMobile() : payment.textContent = '0';
        });

        calcInput.addEventListener('input', () => {
            if (calcInput.value[0] == 0) {
                calcInput.value = calcInput.value.replace(/./g, '');
            }
            calcInput.value = calcInput.value.replace(/\D/g, '');

            calcInput.value = prettify(calcInput.value);
            getPaymentDesktop();

            if (+calcInput.value.replace(/\D/g, '') > 20000000) {
                calcInput.value = prettify(20000000);
            }

            if (+calcInput.value.replace(/\D/g, '') >= 100000 && +calcInput.value.replace(/\D/g, '') <= 20000000) {
                if (select.value != '') {
                    getPaymentMobile();
                }
                getPaymentDesktop();
            } else {
                payment.textContent = '0';
            }

        });
    }

    calc('.calc__box__item', '.calc__box__result span', '.calc__box__input', '.calc__box__select', 'calc__box__item--active');

    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');
      
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
      
        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
      
        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
              modal_ = document.querySelector(modal),
              modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });
    
            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains(modal.replace(/\./, ''))) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal', 'modal--visible', '[data-modal]', '.modal__close');


    // Функция для меню при нажатии на бургер

    function menu(trigger, menu, menuActiveClass, burger, burgerActiveClass) {
        const trigger_ = document.querySelector(trigger),
              menu_ = document.querySelector(menu),
              burger_ = document.querySelector(burger);

        trigger_.addEventListener('click', () => {
            burger_.classList.toggle(burgerActiveClass);
            menu_.classList.toggle(menuActiveClass);
        });
    }

    menu('.header__burger', '.header__menu', 'header__menu--active', '.header__burger', 'header__burger--active');

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