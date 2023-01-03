import React, { useState } from 'react'
import { useSearchParams, ParamKeyValuePair } from 'react-router-dom';
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import { Filter } from '../../core/utils/filter';
import { Sort } from '../../core/utils/sort';
import { ShopState } from '../../core/state/ShopState'

interface IItemsPageProps {
    state: ShopState
}

type FilterType = {
    category: null | string,
    brand: null | string,
    inCart: null | string,
}

type SortType = {
    price: null | 'assent' | 'descent',
    store: null | 'assent' | 'descent',
}

type itemsQueryOptions = {
    filter: FilterType,
    sort: SortType,
    search: null | string,
}

let currentOptions: itemsQueryOptions = {
    filter: {
        category: null,
        brand: null,
        inCart: null,
    },
    sort: {
        price: null,
        store: null,
    },
    search: null,
};

export const ItemsPage = (props: IItemsPageProps): JSX.Element => {
    const itemCatalog: IItem[] = [...catalog.products];
    const [searchParams, setSearchParams] = useSearchParams();

    //получкам каталог товаров
    let catalogItems: IItem[] = [...catalog.products];

    //сброс опций
    const resetOption = () => {
        currentOptions = {
            filter: {
                category: null,
                brand: null,
                inCart: null,
            },
            sort: {
                price: null,
                store: null,
            },
            search: null,
        };
    }

    //создаем массивы для фильтрации по брендам и категориям
    const categories: string[] = Filter.createNameSet(catalogItems, 'category');
    const brands: string[] = Filter.createNameSet(catalogItems, 'brand');
    const [brandsInCategory, setBrandsInCategory] = useState(brands);

    // Проверяем есть ли в url строке квери параметры, если есть то записываем их в текучие параметры и рендерим
    // меняем объект с параметрами в соответствии
    const getCurrentParams = () => {
        resetOption();
        let paramsCount = 0;

        for (const key in currentOptions) {
            const objKey = key as keyof itemsQueryOptions;
            if (objKey === 'filter') {
                const filter: FilterType = currentOptions.filter;
                for (const subObjKey in filter) {
                    let subKey = subObjKey as keyof FilterType;
                    const params = searchParams.get(`${subKey}`);
                    if (params !== null) {
                        currentOptions.filter[subKey] = params;
                        paramsCount++;
                    }
                }
            }
            if (objKey === 'sort') {
                const sort: SortType = currentOptions.sort;
                for (const subObjKey in sort) {
                    let subKey = subObjKey as keyof SortType;
                    const params = searchParams.get(`${subKey}`) as "assent" | "descent" | null;
                    if (params !== null) {
                        currentOptions.sort[subKey] = params;
                        paramsCount++;
                    }
                }
            }
            if (objKey === 'search') {
                const params = searchParams.get(`${objKey}`) as "assent" | "descent" | null;
                if (params !== null) {
                    currentOptions.search = params;
                    paramsCount++;
                }
            }
        }
    }
    getCurrentParams();

    const filterItems = (value: string, itemObjectKey: keyof IItem, items: IItem[]) => {
        let filterItems: IItem[] = [];
        if (value === '...') {
            return filterItems;
        }
        filterItems = items.filter(el => el[itemObjectKey] === value);
        return filterItems;
    }

    const sortItems = (direction: 'assent' | 'descent', itemObjectKey: keyof IItem, items: IItem[]) => {
        if (itemObjectKey === 'price') {
            Sort.sortByPrice(items, direction);
        }
        if (itemObjectKey === 'stock') {
            Sort.sortByInStock(items, direction);
        }


    }

    const modifyItemsByParams = () => {
        const urlParams: ParamKeyValuePair[] = [];
        catalogItems = [...catalog.products];

        for (const objKey in currentOptions) {
            const key = objKey as keyof itemsQueryOptions;
            if (key === 'search') {
                const v = currentOptions[key];
                if (v !== null) {
                    urlParams.push([`${key}`, v]);
                }
            }
            if (key === 'filter') {
                const filter: FilterType = currentOptions.filter;
                for (const subObjKey in filter) {
                    const subKey = subObjKey as keyof FilterType;
                    const param = subKey as keyof IItem;
                    const v = filter[subKey];
                    if (v !== null) {
                        const filtering = filterItems(v, param, catalogItems);
                        if (filtering.length > 0) {
                            catalogItems = filtering;
                            if (v !== '...') {
                                urlParams.push([`${subKey}`, v]);
                            }
                        }
                    }
                }
            }
            if (key == 'sort') {
                const sort: SortType = currentOptions.sort;
                for (const subObjKey in sort) {
                    const subKey = subObjKey as keyof SortType;
                    const keyAsItemsKet = subKey as keyof IItem;
                    const v = sort[subKey];
                    if (v !== null) {
                        sortItems(v, keyAsItemsKet, catalogItems);
                        urlParams.push([`${subKey}`, v]);
                    }
                }
            }
        }
        return urlParams;
    }

    //сортируем.фильтруем товары
    modifyItemsByParams();
    const [prods, setProds] = useState(catalogItems);

    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        currentOptions.filter[itemObjectKey] = value;
        const url = modifyItemsByParams();
        setProds(catalogItems);
        setSearchParams(url);
    }

    const sortItemsOnClick = (e: React.MouseEvent) => {
        currentOptions.sort.price = null;
        currentOptions.sort.store = null;
        const elem = e.target as HTMLElement;
        const direction = elem.dataset.direction as 'assent' | 'descent' | null;
        const option = elem.dataset.option as keyof SortType;
        currentOptions.sort[option] = direction;
        const url = modifyItemsByParams();
        setProds(catalogItems);
        setSearchParams(url);
    }

    const itemsList: JSX.Element[] = prods.map(elem => <ItemCard item={elem} state={props.state} key={elem.id} />);


    const categoriesFilter: JSX.Element[] = categories.map((name) =>
        <option
            key={name}
            value={name}>
            {name}
        </option>
    );

    const brandFilter: JSX.Element[] = brandsInCategory.map((name, i) => {
        return (
            <option
                key={name}
                value={name}>
                {name}
            </option>)
    });

    let categorySelectValue = currentOptions.filter.category === null ? '...' : currentOptions.filter.category;
    let brandSelectValue = currentOptions.filter.brand === null ? '...' : currentOptions.filter.brand;
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
                        <div className='catalog__wrap__tools-wrap__sort__by-price'>
                            <span>Sort by price</span>
                            <div className='catalog__wrap__tools-wrap__sort__by-price__button-wrap'>
                                <button
                                    data-direction='assent'
                                    data-option='price'
                                    onClick={sortItemsOnClick}
                                >🠕</button>
                                <button
                                    data-direction='descent'
                                    data-option='price'
                                    onClick={sortItemsOnClick}
                                >🠗</button>
                            </div>

                        </div>
                        <div className='catalog__wrap__tools-wrap__sort__by-stock'>
                            <span>Sort by stock</span>
                            <div className='catalog__wrap__tools-wrap__sort__by-stock__button-wrap'>
                                <button
                                    data-direction='assent'
                                    data-option='stock'
                                    onClick={sortItemsOnClick}
                                >🠕</button>
                                <button
                                    data-direction='descent'
                                    data-option='stock'
                                    onClick={sortItemsOnClick}
                                >🠗</button>
                            </div>
                        </div>
                    </div>
                    <div className='catalog__wrap__tools-wrap__filter'>
                        <div className='catalog__wrap__tools-wrap__filter__wrap'>
                            <h3>Category</h3>
                            <select
                                className='catalog__wrap__tools-wrap__filter__wrap__category'
                                id='category'
                                onChange={filterItemsOnChange}
                                value={categorySelectValue}>
                                <option value='...'>...</option>
                                {categoriesFilter}
                            </select>
                        </div>
                        <div className='catalog__wrap__tools-wrap__filter__wrap'>
                            <h3>Brand</h3>
                            <select
                                id='brand'
                                className='catalog__wrap__tools-wrap__filter__wrap__brand'
                                onChange={filterItemsOnChange}
                                value={brandSelectValue}>
                                <option value='...'>...</option>
                                {brandFilter}
                            </select>
                        </div>

                    </div>
                    <div className='catalog__wrap__tools-wrap__search'>
                        <input
                            className='catalog__wrap__tools-wrap__search__input'
                            type='text'
                            placeholder="Product search" />
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

