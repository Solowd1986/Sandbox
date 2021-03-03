export const calcScrollBarWidth = () => {
    // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
    const windowWidth = window.innerWidth;
    // Получаем ширину документа, это аналог width: 100%
    const documentWidth = document.documentElement.clientWidth;
    // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
    // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
    return windowWidth - documentWidth;
};

export const addScrollbarOffset = () => {
    const scrollBarWidth = calcScrollBarWidth();
    if (scrollBarWidth > 0) {
        document.body.style.cssText = `overflow: hidden; padding-right: ${calcScrollBarWidth()}px`;
    }
};

export const removeScrollbarOffset = () => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
};
