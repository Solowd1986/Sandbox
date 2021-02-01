/**
 * Статический метод расчета ширины скроллбара
 * @returns {number}
 */
export const calcScrollBarWidth = () => {
    // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
    const windowWidth = window.innerWidth;
    // Получаем ширину документа, это аналог width: 100%
    const documentWidth = document.documentElement.clientWidth;
    // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
    // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
    return windowWidth - documentWidth;
};



