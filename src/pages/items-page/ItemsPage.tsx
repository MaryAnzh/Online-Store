import React, { useState } from 'react'
import { useSearchParams, ParamKeyValuePair } from 'react-router-dom';
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import { Filter } from '../../core/utils/filter';
import { Sort } from '../../core/utils/sort';
import { ShopState } from '../../core/state/ShopState'
import { FilterType, SortType, ItemsQueryOptions } from '../../core/types/tools.types';
import { Tools } from '../../components/smart/tools/Tools';
import { toolsModel, ModifyItemsType } from '../../core/model/toolsModel';

interface IItemsPageProps {
    state: ShopState
}

export const ItemsPage = (props: IItemsPageProps): JSX.Element => {
    //прослушиваем url
    const [searchParams, setSearchParams] = useSearchParams();

    //получкам каталог товаров
    const catalogItems: IItem[] = [...catalog.products];
    const toolsSetting = toolsModel.toolsSetting;

    //создаем массивы для фильтрации по брендам и категориям
    const categories: string[] = Filter.createNameSet(catalogItems, 'category');
    const brands: string[] = Filter.createNameSet(catalogItems, 'brand');
    const [brandsInCategory, setBrandsInCategory] = useState(brands);

    // Проверяем есть ли в url строке квери параметры, если есть то записываем их в текучие параметры и рендерим
    // меняем объект с параметрами в соответствии
    const getCurrentParams = () => {
        toolsModel.resetToolsSettings(toolsSetting);
        let isParam = searchParams.toString() !== '';
        if (isParam) {
            for (const key in toolsSetting) {
                const objKey = key as keyof ItemsQueryOptions;
                if (objKey === 'filter') {
                    const filter: FilterType = toolsSetting.filter;
                    for (const subObjKey in filter) {
                        let subKey = subObjKey as keyof FilterType;
                        const params = searchParams.get(`${subKey}`);
                        if (params !== null) {
                            toolsSetting.filter[subKey] = params;
                        }
                    }
                }
                if (objKey === 'sort') {
                    const sort: SortType = toolsSetting.sort;
                    for (const subObjKey in sort) {
                        let subKey = subObjKey as keyof SortType;
                        const params = searchParams.get(`${subKey}`) as "assent" | "descent" | null;
                        if (params !== null) {
                            toolsSetting.sort[subKey] = params;
                        }
                    }
                }
                if (objKey === 'search') {
                    const params = searchParams.get(`${objKey}`) as "assent" | "descent" | null;
                    if (params !== null) {
                        toolsSetting.search = params;
                    }
                }
            }
        }
    }
    getCurrentParams();

    //сортируем.фильтруем товары
    const modifyItems: ModifyItemsType = toolsModel.modifyItemsByParams(catalogItems, toolsSetting);
    const [prods, setProds] = useState(modifyItems.items);

    const setItemsData = () => {
        const modifyData = toolsModel.modifyItemsByParams(catalogItems, toolsSetting);
        setProds(modifyData.items);
        setSearchParams(modifyData.urlParams);
    }

    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        toolsSetting.filter[itemObjectKey] = value;
        setItemsData();
    }

    const sortItemsOnClick = (e: React.MouseEvent) => {
        toolsSetting.sort.price = null;
        toolsSetting.sort.store = null;
        const elem = e.target as HTMLElement;
        const direction = elem.dataset.direction as 'assent' | 'descent' | null;
        const option = elem.dataset.option as keyof SortType;
        toolsSetting.sort[option] = direction;
        setItemsData();
    }

    const itemsList: JSX.Element[] = prods.map(elem =>
        <ItemCard
            item={elem}
            state={props.state}
            key={elem.id} />);

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

    let categorySelectValue = toolsSetting.filter.category === null ? '...' : toolsSetting.filter.category;
    let brandSelectValue = toolsSetting.filter.brand === null ? '...' : toolsSetting.filter.brand;

    const setItemsFromTools = (items: IItem[]) => {
        setProds(items);
    }

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
                <Tools items={prods} setItems={setItemsFromTools} />
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

