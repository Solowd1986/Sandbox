import React from "react";

export default class MobileNavbar extends React.Component {
    render() {
        return (
            <>
                <div className="mobile-menu__icon">
                    <span/>
                </div>
                <div className="header__mobile-menu-wrapper">
                    <ul className="header__mobile-menu-list">
                        <li>
                            <a href=""> Смартфоны</a>
                        </li>
                        <li>
                            <a href=""> Аксессуары</a>
                        </li>
                        <li>
                            <a href=""> Гаджеты</a>
                        </li>
                        <li>
                            <a href=""> Доставка</a>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}




