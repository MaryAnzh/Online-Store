import React from 'react'
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'


export const ItemsPage = (): JSX.Element => (
    <section className='catalog'>
        <div className='catalog__wrap'>
            <div className='catalog__wrap__info-wrap'>
                <div className='catalog__wrap__info-wrap__info'>
                    <h3 className='catalog__wrap__info-wrap__info__title'>
                        Добро пожаловать в Online Stor
                    </h3>
                    <p className='catalog__wrap__info-wrap__info__text'>
                        Большой выбор товаров, на любой вкус и кошелек.
                    </p>
                </div>

            </div>

        </div>
    </section>
)