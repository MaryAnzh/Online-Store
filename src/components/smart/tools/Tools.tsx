import './Tools.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { toolsModel, ModifyItemsType } from '../../../core/model/toolsModel';
import { ParamKeyValuePair } from 'react-router-dom';
import React, { useState } from 'react';
import { FilterType, ItemsQueryOptions, SortType } from '../../../core/types/tools.types';

interface IToolsProps {
    items: IItem[],
    toolsSetting: ItemsQueryOptions,
    setItems: (items: IItem[], urlParam: ParamKeyValuePair[]) => void;
}

type SelectViewType = {
    categories: string[],
    brands: string[],
    price: 'select' | 'assent' | 'descent',
    stock: 'select' | 'assent' | 'descent',
}

export const Tools = (props: IToolsProps) => {
    //инициализация
    // переемные
    const toolsSettings = props.toolsSetting;
    const allItems = props.items;
    const selectView: SelectViewType = {
        categories: [],
        brands: [],
        price: 'select',
        stock: 'select',
    }
    let categorySelectValue = '...';
    let brandSelectValue = '...';
    let isSettingsShow = false;

    //функции
    const checkFilters = (settings: ItemsQueryOptions) => {
        const filter: FilterType = settings.filter;
        const category = filter.category;
        if (category === null || category == '...') {
            categorySelectValue = '...';
            selectView.brands = toolsModel.createSelectViewByToolsTitle('brand', allItems);
        } else {
            categorySelectValue = category;
            selectView.brands = toolsModel.updateBrandSet(allItems, category);
        }
        const brand = filter.brand;
        if (brand === null || brand === '...') {
            brandSelectValue = '...';
            selectView.categories = toolsModel.createSelectViewByToolsTitle('category', allItems);
        } else {
            brandSelectValue = brand;
            selectView.categories = toolsModel.updateCategorySet(allItems, brand);
        }
    }

    const checkSort = (settings: ItemsQueryOptions) => {
        const sort = settings.sort;
        const price = sort.price;
        if (price === null) {
            selectView.price = 'select';
        } else {
            selectView.price = price;
        }
        const stock = sort.stock;
        if (stock === null) {
            selectView.stock = 'select';
        } else {
            selectView.stock = stock;
        }
    }

    //проверяем пустые ли параметры, если нет
    //то подгоняем отображение под параметры
    for (const key in toolsSettings) {
        const keyInObj = key as keyof ItemsQueryOptions;
        if (keyInObj === 'filter') {
            checkFilters(toolsSettings);
        }
        if (keyInObj === 'sort') {
            checkSort(toolsSettings);
        }
    }

    //устанавливаем состояние отображения фильтров по категории и бренду
    const [categories, setCategories] = useState(selectView.categories);
    const [brands, setBrands] = useState(selectView.brands);
    const [priceValue, setPriceValue] = useState(selectView.price);
    const [stockValue, setStockValue] = useState(selectView.stock);

    // рендеринг списков
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

    const setItemsData = () => {
        const modifyData: ModifyItemsType = toolsModel.modifyItemsByParams(allItems, toolsSettings);
        props.setItems(modifyData.items, modifyData.urlParams);
    }

    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        toolsSettings.filter[itemObjectKey] = value;
        checkFilters(toolsSettings);
        setBrands(selectView.brands);
        setCategories(selectView.categories);
        setItemsData();
    }

    const sortItemsOnChange = (e: React.ChangeEvent) => {
        toolsSettings.sort.price = null;
        toolsSettings.sort.stock = null;

        const elem = e.target as HTMLSelectElement;
        const value = elem.value === 'select' ? null : elem.value as "assent" | "descent";
        const itemObjectKey = elem.id as keyof SortType;
        toolsSettings.sort[itemObjectKey] = value;
        console.log(`id: ${itemObjectKey}, value: ${value}`);

        checkSort(toolsSettings);
        setPriceValue(selectView.price);
        setStockValue(selectView.stock);
        console.log(selectView.stock);
        setItemsData();
    }

    return (
        <section className='tools'>
            <div className='tools__visible'>
                <div className='tools__visible__show-button-wrap'>
                    <button className='tools__visible__show-button-wrap__button'>
                        Show filters
                    </button>
                </div>
                <div className='tools__visible__search'>
                    <input
                        className='tools__visible__search__input'
                        type="text" />
                </div>
            </div>
            <div className='tools__hidden'>
                <div className='tools__hidden__select-tools'>
                    <div className='tools__hidden__select-tools__tool'>
                        <div className='tools__hidden__select-tools__tool__title'>
                            <span className='tools__hidden__select-tools__tool__title__name'>
                                Category
                            </span>
                            <div className='tools__hidden__select-tools__tool__title__count'>
                                (<span>{categories.length}</span>)
                            </div>
                        </div>
                        <select
                            className='tools__hidden__select-tools__tool__select filter-select'
                            id='category'
                            value={categorySelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {categoriesFilter}
                        </select>
                    </div>
                    <div className='tools__hidden__select-tools__tool'>
                        <div className='tools__hidden__select-tools__tool__title'>
                            <span className='tools__hidden__select-tools__tool__title__name'>
                                Brand
                            </span>
                            <div className='tools__hidden__select-tools__tool__title__count'>
                                (<span>{brands.length}</span>)
                            </div>
                        </div>
                        <select
                            className='tools__hidden__select-tools__tool__select filter-selects'
                            id='brand'
                            value={brandSelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {brandFilter}
                        </select>
                    </div>
                </div>
                <div className='tools__hidden__select-tools'>
                    <div className='tools__hidden__select-tools__tool'>
                        <div className='tools__hidden__select-tools__tool__title'>
                            <span className='tools__hidden__select-tools__tool__title__name'>
                                Sorn by Price
                            </span>
                        </div>
                        <select
                            className='tools__hidden__select-tools__tool__select filter-select'
                            id='price'
                            value={priceValue}
                            onChange={sortItemsOnChange}>
                            <option value='select'>...</option>
                            <option value='assent'>low to hight</option>
                            <option value='descent'>hight to low</option>
                        </select>
                    </div>
                    <div className='tools__hidden__select-tools__tool'>
                        <div className='tools__hidden__select-tools__tool__title'>
                            <span className='tools__hidden__select-tools__tool__title__name'>
                                Sort by Stock
                            </span>
                        </div>
                        <select
                            className='tools__hidden__select-tools__tool__select filter-selects'
                            id='stock'
                            value={selectView.stock}
                            onChange={sortItemsOnChange}>
                            <option value='select'>...</option>
                            <option value='assent'>low to hight</option>
                            <option value='descent'>hight to low</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}