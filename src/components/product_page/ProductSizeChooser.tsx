import React from 'react';

interface ProductSizeChooserProps {
    className: string;
}

function ProductSizeChooser(props: ProductSizeChooserProps) {

    return (
        <section className={`${props.className} sizeChooser`}>
            <article className="sizeChooser__measure">
                <h2 className="sizeChooser__measure-title"><b>Обратите внимание!</b> Как измерить длину стопы и
                    подобрать свой размер:</h2>
                <ol className="sizeChooser__measure-content">
                    <li className="sizeChooser__measure-point">Возьми лист бумаги и прижмите его к стене или другой
                        вертикальной поверхности.
                    </li>
                    <li className="sizeChooser__measure-point">Наденьте носки, которые вы обычно носите с таким типом
                        обуви.
                    </li>
                    <li className="sizeChooser__measure-point">Встаньте на лист бумаги полной стопой, прижимая пятку к
                        стене.
                    </li>
                    <li className="sizeChooser__measure-point">Отметьте карандашом на бумаге положение самого длинного
                        пальца на ноге. Важно: держите карандаш вертикально под углом 90 градусов к полу, не наклоняйте
                        его (карандаш не должен заходить под стопу).
                    </li>
                    <li className="sizeChooser__measure-point">Измерьте расстояние от края бумаги, который находится
                        около стены, до метки вашего пальца.
                    </li>
                    <li className="sizeChooser__measure-point">Подберите нужный размер, исходя из третьего столбика
                        таблицы. Полученное вами значение длины должно находиться в нужном диапазоне.
                    </li>
                </ol>
            </article>

            <div className="sizeChooser__table">
                <div className="sizeChooser__table-row sizeChooser__table-header">
                    <div className="sizeChooser__table-cell">
                        Российский размер
                    </div>
                    <div className="sizeChooser__table-cell">
                        Длина стельки, мм
                    </div>
                    <div className="sizeChooser__table-cell">
                        Длина стопы в носке, мм
                    </div>
                </div>

                <div className="sizeChooser__table-row">
                    <div className="sizeChooser__table-cell" data-title="Российский размер">
                        36
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стельки, мм">
                        240
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стопы (одетая в носок), мм">
                        234 - 238
                    </div>
                </div>

                <div className="sizeChooser__table-row">
                    <div className="sizeChooser__table-cell" data-title="Российский размер">
                        37
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стельки, мм">
                        245
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стопы (одетая в носок), мм">
                        239 - 243
                    </div>
                </div>

                <div className="sizeChooser__table-row">
                    <div className="sizeChooser__table-cell" data-title="Российский размер">
                        38
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стельки, мм">
                        250
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стопы (одетая в носок), мм">
                        244 - 248
                    </div>
                </div>

                <div className="sizeChooser__table-row">
                    <div className="sizeChooser__table-cell" data-title="Российский размер">
                        39
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стельки, мм">
                        255
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стопы (одетая в носок), мм">
                        249 - 253
                    </div>
                </div>

                <div className="sizeChooser__table-row">
                    <div className="sizeChooser__table-cell" data-title="Российский размер">
                        40
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стельки, мм">
                        260
                    </div>
                    <div className="sizeChooser__table-cell" data-title="Длина стопы (одетая в носок), мм">
                        254 - 258
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductSizeChooser;
