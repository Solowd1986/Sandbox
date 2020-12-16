//import React, {Component} from "react";
import styles from "./simple_overlay.module.scss";

class SimpleOverlay {

    static calcScrollBarWidth() {
        // Получаем ширину окна, это аналог width: 100vw (то есть ширина 100% + ширина scrollbar)
        const windowWidth = window.innerWidth;
        // Получаем ширину документа, это аналог width: 100%
        const documentWidth = document.documentElement.clientWidth;
        // Возвращаем разницу между этими величинами, это и есть ширина scrollbar.
        // Если его нет, то вернутся такие значения -1 или 0, поэтому проверка лучше на > 0
        return windowWidth - documentWidth;
    };

    static addOffsetFixedElements(selector) {
        if (SimpleOverlay.calcScrollBarWidth() > 0) {
            const elements = document.querySelectorAll(selector);
            let documentWidth = document.documentElement.clientWidth;

            elements.forEach(item => {
                //console.log(document.documentElement.clientWidth);
                //console.log(parseInt(getComputedStyle(item).getPropertyValue("width")));

                const elementWidth = parseInt(getComputedStyle(item).getPropertyValue("width"));

                if (documentWidth === elementWidth) {
                    const elementWidth = item.clientWidth;
                    item.style.cssText = `width: ${elementWidth}px;`;
                } else {
                    const offsetRigth = parseInt(getComputedStyle(item).getPropertyValue("right"));
                    const resultOffset = offsetRigth + SimpleOverlay.calcScrollBarWidth();
                    item.style.cssText = `right: ${resultOffset}px;`;
                }

            })
        }
    }


    static removeOffsetFixedElements(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.style.removeProperty("width");
            item.style.removeProperty("right");

        })
    }


    static addScrollbarOffset() {
        if (SimpleOverlay.calcScrollBarWidth() > 0) {
            document.body.style.cssText = `padding-right: ${SimpleOverlay.calcScrollBarWidth()}px`;
            SimpleOverlay.addOffsetFixedElements("[data-fs]");
        }

        document.body.style.cssText += "overflow: hidden";
    };

    static removeScrollbarOffset() {
        document.body.style.removeProperty("padding-right");
        SimpleOverlay.removeOffsetFixedElements("[data-fs]");
        document.body.style.removeProperty("overflow");
    };


    static create() {
        let overlay = document.createElement("div");
        overlay.classList.add(styles.overlay);
        document.body.append(overlay);
        SimpleOverlay.addScrollbarOffset();
        return overlay;
    };

    static destroy(overlay) {
        SimpleOverlay.removeScrollbarOffset();
        overlay.remove();
        overlay = null;
    };
}


export default SimpleOverlay;






