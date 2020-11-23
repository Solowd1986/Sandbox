import React from "react";
import styles from "./product.module.scss";

const Specification = props => {
    console.log(props);
    const specs = props.specs;
    console.log(specs);
    
    
    return (
        <>
            {/*Блок характеристик*/}
            <div className={`${styles.attributes} ${styles.tab}`} id="tab-attributes">
                <h2 className={styles.attributes__table_title}>Общие характеристики</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тип</td>
                        <td>{specs.type}</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>{specs.color}</td>
                    </tr>
                    <tr>
                        <td>Тип корпуса</td>
                        <td>{specs.caseType}</td>
                    </tr>
                    <tr>
                        <td>Материал корпуса</td>
                        <td>{specs.caseMaterial}</td>
                    </tr>
                    <tr>
                        <td>Тип SIM-карты</td>
                        <td>{specs.simType}</td>
                    </tr>
                    <tr>
                        <td>Количество SIM-карт</td>
                        <td>{specs.simCount}</td>
                    </tr>
                    <tr>
                        <td>Вес</td>
                        <td>{specs.weight}</td>
                    </tr>
                    <tr>
                        <td>Размеры</td>
                        <td>{specs.size}</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Экран</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тип экрана</td>
                        <td>{specs.screenType}</td>
                    </tr>
                    <tr>
                        <td>Диагональ</td>
                        <td>{specs.screenSize}</td>
                    </tr>
                    <tr>
                        <td>Размер изображения</td>
                        <td>{specs.screenResolution}</td>
                    </tr>
                    <tr>
                        <td>Автоматический поворот экрана</td>
                        <td>{specs.screenRotate}</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Мультимедийные возможности</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Тыловая фотокамера</td>
                        <td>{specs.mainCamera}</td>
                    </tr>
                    <tr>
                        <td>Фотовспышка</td>
                        <td>{specs.flashType}</td>
                    </tr>
                    <tr>
                        <td>Функции тыловой фотокамеры</td>
                        <td>{specs.mainCameraFunction}</td>
                    </tr>
                    <tr>
                        <td>Диафрагма тыловой фотокамеры</td>
                        <td>{specs.caseType}</td>
                    </tr>
                    <tr>
                        <td>Запись видео</td>
                        <td>{specs.recordingVideo}</td>
                    </tr>
                    <tr>
                        <td>Макс. частота кадров видео</td>
                        <td>{specs.maximumFramerate}</td>
                    </tr>
                    <tr>
                        <td>Аудио</td>
                        <td>{specs.audioSupport}</td>
                    </tr>
                    </tbody>
                </table>


                <h2 className={styles.attributes__table_title}>Связь</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Стандарт</td>
                        <td>{specs.connectionStandart}</td>
                    </tr>
                    <tr>
                        <td>Поддержка диапазонов LTE</td>
                        <td>{specs.lte}</td>
                    </tr>
                    <tr>
                        <td>Интерфейсы</td>
                        <td>{specs.interfaces}</td>
                    </tr>
                    <tr>
                        <td>Спутниковая навигация</td>
                        <td>{specs.satellite}</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Память и процессор</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Процессор</td>
                        <td>{specs.cpu}</td>
                    </tr>
                    <tr>
                        <td>Количество ядер процессора</td>
                        <td>{specs.cpuCoresAmount}</td>
                    </tr>
                    <tr>
                        <td>Видеопроцессор</td>
                        <td>{specs.videoCpu}</td>
                    </tr>
                    <tr>
                        <td>Объем встроенной памяти</td>
                        <td>{specs.memory}</td>
                    </tr>
                    <tr>
                        <td>Объем оперативной памяти</td>
                        <td>{specs.ram}</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Питание</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Емкость аккумулятора</td>
                        <td>{specs.acc}</td>
                    </tr>
                    <tr>
                        <td>Тип аккумулятора</td>
                        <td>{specs.accType}</td>
                    </tr>
                    <tr>
                        <td>Тип разъема для зарядки</td>
                        <td>{specs.connectorType}</td>
                    </tr>
                    </tbody>
                </table>

                <h2 className={styles.attributes__table_title}>Дополнительная информация</h2>
                <table className={styles.attributes__table_data}>
                    <tbody>
                    <tr>
                        <td>Комплектация</td>
                        <td>{specs.supplies}</td>
                    </tr>
                    <tr>
                        <td>Дата анонсирования</td>
                        <td>{specs.announceDate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Specification;


