import React, { useState } from 'react'
import { useSearchParams, ParamKeyValuePair } from 'react-router-dom';
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import { Filter } from '../../core/utils/filter';
import { StorageService } from '../../core/utils/localStorage';

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

export const ItemsPage = (): JSX.Element => {
    // сервис для работы с локал сторж
    const storageService = new StorageService();
    const storageKey = 'maryangItemsQueryParams';

    //хук квери параметров url
    const [searchParams, setSearchParams] = useSearchParams();

    //получкам каталог товаров
    const itemCatalog: IItem[] = [...catalog.products];

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
    const categories: string[] = Filter.createNameSet(itemCatalog, 'category');
    const brands: string[] = Filter.createNameSet(itemCatalog, 'brand');

    // Проверяем есть ли в url строке квери параметры, если есть то записываем их в текучие параметры и рендерим
    //если нет, то проверяем есть ли информация в локал сторж о предыдущем поиске
    //модифицируем каталог товаров в соответствии с условиями
    const getCurrentParams = () => {
        resetOption();

        if (searchParams.getAll.length > 0) {
            for (const key in currentOptions) {
                const objKey = key as keyof itemsQueryOptions;
                if (objKey === 'filter') {
                    const filter: FilterType = currentOptions.filter;
                    for (const subObjKey in filter) {
                        let subKey = subObjKey as keyof FilterType;
                        const params = searchParams.get(`${subKey}`);
                        if (params !== null) {
                            currentOptions.filter[subKey] = params;
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
                        }
                    }
                }
                if (objKey === 'search') {
                    const params = searchParams.get(`${objKey}`) as "assent" | "descent" | null;
                    if (params !== null) {
                        currentOptions.search = params;
                    }
                }
            }
        } else if (storageService.getData('maryangItemsQueryParam') !== null) {
            currentOptions = storageService.getData(storageKey) as itemsQueryOptions;
        }
    }
    getCurrentParams();

    const filterItems = (value: string, itemObjectKey: keyof IItem, items: IItem[]) => {
        if (value === '...') {
            return items;
        }

        const filteringArr = items.filter(el => el[itemObjectKey] === value);
        return filteringArr;
    }

    const modifyItemsByParams = (items = itemCatalog) => {
        setSearchParams([]);
        storageService.setData(storageKey, null);
        let itemsByOptions = items;
        const urlParams: ParamKeyValuePair[] = [];
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
                        itemsByOptions = filterItems(v, param, itemsByOptions);
                        if (v !== '...') {
                            urlParams.push([`${subKey}`, v]);
                        }
                    }
                }
            }
            if (key == 'sort') {
                const sort: SortType = currentOptions.sort;
                for (const subObjKey in sort) {
                    const subKey = subObjKey as keyof SortType;
                    const v = sort[subKey];
                    if (v !== null) {
                        urlParams.push([`${subKey}`, v]);
                    }
                }
            }
        }

        setSearchParams(urlParams);
        storageService.setData(storageKey, currentOptions);
        setProds(itemsByOptions);
    }

    const [prods, setProds] = useState(itemCatalog);

    // const itemsByQueryOptions = (items = itemCatalog) => {
    //     setSearchParams([]);
    //     let itemsByOptions = items;

    //     const urlParams: ParamKeyValuePair[] = [];
    //     for (const objKey in currentOptions) {
    //         const key = objKey as keyof itemsQueryOptions;
    //         if (key === 'search') {
    //             const v = currentOptions[key];
    //             if (v !== null) {
    //                 urlParams.push([`${key}`, v]);
    //             }
    //         }
    //         if (key === 'filter') {
    //             const filter: FilterType = currentOptions.filter;
    //             for (const subObjKey in filter) {
    //                 const subKey = subObjKey as keyof FilterType;
    //                 const param = subKey as keyof IItem;
    //                 const v = filter[subKey];
    //                 if (v !== null) {
    //                     itemsByOptions = filterItems(v, param, itemsByOptions);
    //                     urlParams.push([`${subKey}`, v]);
    //                 }
    //             }
    //         }
    //         if (key == 'sort') {
    //             const sort: SortType = currentOptions.sort;
    //             for (const subObjKey in sort) {
    //                 const subKey = subObjKey as keyof SortType;
    //                 const v = sort[subKey];
    //                 if (v !== null) {
    //                     urlParams.push([`${subKey}`, v]);
    //                 }
    //             }
    //         }
    //     }

    //     setSearchParams(urlParams);
    //     setProds(itemsByOptions);
    // }

    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        currentOptions.filter[itemObjectKey] = value;
        modifyItemsByParams();
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
