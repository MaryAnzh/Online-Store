import React from 'react'
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';

export const ItemsPage = (): JSX.Element => (
    <section className='catalog'>
        <div className='catalog__wrap'>
            <section className='catalog__wrap__info-wrap'>
                <div className='catalog__wrap__info-wrap__info'>
                    <h3 className='catalog__wrap__info-wrap__info__title'>
                        Добро пожаловать в Online Stor
                    </h3>
                    <p className='catalog__wrap__info-wrap__info__text'>
                        Большой выбор товаров, на любой вкус и кошелек.
                    </p>
                </div>
            </section>
            <section className='catalog__wrap__tools-wrap'>
                <div className='catalog__wrap__tools-wrap__sort'>
                    Sort
                </div>
                <div className='catalog__wrap__tools-wrap__filter'>
                    Filter
                </div>
                <div className='catalog__wrap__tools-wrap__search'>
                    <input
                        className='catalog__wrap__tools-wrap__search__input'
                        type='text' />
                    <button className='blue-button'>Search</button>
                </div>

            </section>

        </div>
    </section>
)