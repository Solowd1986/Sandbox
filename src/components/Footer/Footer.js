
import React from "react";
import common from "~scss/common.module.scss";
import styles from "./footer.module.scss";

const Footer = props => {
    return (
        <div className={styles.footer_bg}>
            <div className={common.wrapper}>
                <footer className={styles.footer}>
                    <p className={styles.copyright}>Copyright © 2017 - 2021 OnePlus Store. Все права защищены.</p>
                    {/*<span className={styles.working_hours}>10:00 – 21:00 пн-вс</span>*/}
                    <ul className={styles.social_list}>
                        <li className={styles.social_list__item}>
                            <a href="" target="_blank">
                                <svg className={styles.social_list__img}
                                     viewBox="0 0 56.693 56.693"
                                     width={30}
                                     height={30}>
                                    <path
                                        d="M52.837 15.065a20.11 20.11 0 01-5.805 1.591 10.125 10.125 0 004.444-5.592 20.232 20.232 0 01-6.418 2.454 10.093 10.093 0 00-7.377-3.192c-5.581 0-10.106 4.525-10.106 10.107 0 .791.089 1.562.262 2.303-8.4-.422-15.848-4.445-20.833-10.56a10.055 10.055 0 00-1.368 5.082c0 3.506 1.784 6.6 4.496 8.412a10.078 10.078 0 01-4.578-1.265l-.001.128c0 4.896 3.484 8.98 8.108 9.91a10.162 10.162 0 01-4.565.172c1.287 4.015 5.019 6.938 9.441 7.019a20.276 20.276 0 01-12.552 4.327c-.815 0-1.62-.048-2.411-.142a28.6 28.6 0 0015.493 4.541c18.591 0 28.756-15.4 28.756-28.756 0-.438-.009-.875-.028-1.309a20.47 20.47 0 005.042-5.23z"/>
                                </svg>
                            </a>
                        </li>
                        <li className={styles.social_list__item}>
                            <a href="" target="_blank">
                                <svg className={styles.social_list__img} viewBox="0 0 1000 1000" width={28} height={28}>
                                    <path
                                        d="M759.4 10H240.6C113.8 10 10 113.8 10 240.6v518.8C10 886.2 113.8 990 240.6 990h518.8C886.2 990 990 886.2 990 759.4V240.6C990 113.8 886.2 10 759.4 10zm173 749.4c0 95.3-77.6 172.9-172.9 172.9H240.6c-95.3 0-172.9-77.6-172.9-172.9V413.5h184.9c-16.5 35.2-26.3 74-26.3 115.3 0 151 122.8 273.8 273.8 273.8s273.8-122.8 273.8-273.8c0-41.3-9.9-80.1-26.3-115.3h184.9v345.9h-.1zM716.2 528.8C716.2 648 619.2 745 500 745s-216.2-97-216.2-216.2c0-119.2 97-216.2 216.2-216.2s216.2 97 216.2 216.2zm-5.7-172.9C660.3 294.8 585.1 255 500 255s-160.3 39.8-210.5 100.9H67.6V240.6c0-95.3 77.6-172.9 172.9-172.9h518.8c95.3 0 172.9 77.6 172.9 172.9v115.3H710.5zm132.7-189v74.8c0 17.2-14.1 31.3-31.2 31.3h-78.9c-17.3-.1-31.4-14.1-31.4-31.3v-74.8c0-17.2 14.1-31.3 31.4-31.3H812c17.2 0 31.2 14.1 31.2 31.3z"/>
                                </svg>
                            </a>
                        </li>
                        <li className={styles.social_list__item}>
                            <a href="" target="_blank">
                                <svg className={styles.social_list__img} viewBox="0 0 512 512" width={30} height={30}>
                                    <path
                                        d="M484.689 98.231l-69.417 327.37c-5.237 23.105-18.895 28.854-38.304 17.972L271.2 365.631l-51.034 49.086c-5.647 5.647-10.372 10.372-21.256 10.372l7.598-107.722L402.539 140.23c8.523-7.598-1.848-11.809-13.247-4.21L146.95 288.614 42.619 255.96c-22.694-7.086-23.104-22.695 4.723-33.579L455.423 65.166c18.893-7.085 35.427 4.209 29.266 33.065z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    )
};

export default Footer;


