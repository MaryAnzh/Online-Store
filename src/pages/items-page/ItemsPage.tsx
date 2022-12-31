import React, { useState } from 'react'
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import { Filter } from '../../core/utils/filter';

export const ItemsPage = (): JSX.Element => {
    const itemCatalog: IItem[] = [...catalog.products];
    const [prods, setProds] = useState(itemCatalog);
    const categories: string[] = Filter.createNameSet(itemCatalog, 'category');
    const brands: string[] = Filter.createNameSet(itemCatalog, 'brand');
    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        if (elem.value === '...') {
            setProds(itemCatalog);
            return;
        }
        const itemObjectKey: keyof IItem = elem.id as keyof IItem;
        const filteringArr = [...itemCatalog].filter(el => el[itemObjectKey] === elem.value);
        setProds(filteringArr);
    }

    const itemsList: JSX.Element[] = prods.map(elem => {
        return (
            <ItemCard
                key={elem.id}
                item={elem} />)
    });

    const categoriesFilter: JSX.Element[] = categories.map((name) =>
        <option
            key={name}
            value={name}>
            {name}
        </option>
    );

    const brandFilter: JSX.Element[] = brands.map((name, i) => {
        return (
            <option
                key={name}
                value={name}>
                {name}
            </option>)
    });

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
                        <div className='catalog__wrap__tools-wrap__filter__wrap'>
                            <h3>Category</h3>
                            <select
                                className='catalog__wrap__tools-wrap__filter__wrap__category'
                                id='category'
                                onChange={filterItemsOnChange}>
                                <option value='...'>...</option>
                                {categoriesFilter}
                            </select>
                        </div>
                        <div className='catalog__wrap__tools-wrap__filter__wrap'>
                            <h3>Brand</h3>
                            <select
                                id='brand'
                                className='catalog__wrap__tools-wrap__filter__wrap__brand'
                                onChange={filterItemsOnChange}>
                                <option value='...'>...</option>
                                {brandFilter}
                            </select>
                        </div>

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

            </div >
        </section >
    )
}
