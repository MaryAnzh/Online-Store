import React from 'react'
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import {ShopState} from '../../core/state/ShopState'


interface IItemsPageProps {
    state: ShopState
}

export const ItemsPage = (props: IItemsPageProps): JSX.Element => {
    const itemCatalog: IItem[] = [...catalog.products];
    const itemsList: JSX.Element[] = itemCatalog.map(elem => <ItemCard item={elem} state={props.state} key={elem.id}/>);

    return (
        <section className='catalog'>
            <div className='catalog__wrap'>
                <section className='catalog__wrap__info-wrap'>
                    <div className='catalog__wrap__info-wrap__info'>
                        <h3 className='catalog__wrap__info-wrap__info__title'>
                            Welcome to Online Store
                        </h3>
                        <p className='catalog__wrap__info-wrap__info__text'>
                            A big choice of products, for every taste and wallet.
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
                            type='text'
                            placeholder="Product search"/>
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
