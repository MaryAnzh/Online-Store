import React from 'react'
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';

export const ItemsPage = (): JSX.Element => {
    const itemCatalog: IItem[] = [...catalog.products];
    const itemsList: JSX.Element[] = itemCatalog.map(elem => <ItemCard item={elem} />);
    const category =
        console.log();
    return (
        <section className='catalog'>
            <div className='catalog__wrap'>
                <section className='catalog__wrap__info-wrap'>
                    <div className='catalog__wrap__info-wrap__info'>
                        <h3 className='catalog__wrap__info-wrap__info__title'>
                            Welcome to Online Stor
                        </h3>
                        <p className='catalog__wrap__info-wrap__info__text'>
                            A big choose of products, for every taste and wallet.
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
                <section className='catalog__wrap__items'>
                    <h3 className='catalog__wrap__items__title'>
                        Products
                    </h3>

                    <div className='catalog__wrap__items__items-wrap'>
                        {itemsList}
                    </div>
                </section>

            </div>
        </section>
    )
}
