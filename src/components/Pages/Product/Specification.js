import React from "react";
import styles from "./product.module.scss";

const Specification = props => {
    return (
        <>
            {/*Блок характеристик*/}
            <div className={`${styles.attributes} ${styles.tab}`} id="tab-attributes">
                <h2 className={styles.attributes__table_title}>Общие характеристики</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Цвет</td>
                        <td>зеркальный серый</td>
                    </tr>
                    <tr>
                        <td>Тип</td>
                        <td>смартфон</td>
                    </tr>
                    <tr>
                        <td>Тип корпуса</td>
                        <td>классический</td>
                    </tr>
                    <tr>
                        <td>Материал корпуса</td>
                        <td>стекло Gorilla Glass 6 от Corning</td>
                    </tr>
                    <tr>
                        <td>Тип SIM-карты</td>
                        <td> nano SIM</td>
                    </tr>
                    <tr>
                        <td>Вес</td>
                        <td> nano SIM</td>
                    </tr>
                    <tr>
                        <td>Размеры</td>
                        <td> nano SIM</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Экран</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тип экрана</td>
                        <td>Fluid AMOLED, сенсорный</td>
                    </tr>
                    <tr>
                        <td>Тип сенсорного экрана</td>
                        <td>мультитач, емкостный</td>
                    </tr>
                    <tr>
                        <td>Диагональ</td>
                        <td>6.67 дюйм.</td>
                    </tr>
                    <tr>
                        <td>Размер изображения</td>
                        <td>3120 x 1440</td>
                    </tr>
                    <tr>
                        <td>Автоматический поворот экрана</td>
                        <td>есть</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Мультимедийные возможности</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>тройная 8/16/48 МП</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>тыльная, светодиодная</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>автофокус, оптическая стабилизация</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>f/1.6</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>60 кадров/с</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Связь</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>тройная 8/16/48 МП</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>тыльная, светодиодная</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>автофокус, оптическая стабилизация</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>f/1.6</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>60 кадров/с</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Память и процессор</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>тройная 8/16/48 МП</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>тыльная, светодиодная</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>автофокус, оптическая стабилизация</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>f/1.6</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>60 кадров/с</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Питание</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>тройная 8/16/48 МП</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>тыльная, светодиодная</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>автофокус, оптическая стабилизация</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>f/1.6</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>60 кадров/с</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Дополнительная информация</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>тройная 8/16/48 МП</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>тыльная, светодиодная</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>автофокус, оптическая стабилизация</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>f/1.6</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>60 кадров/с</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Specification;


