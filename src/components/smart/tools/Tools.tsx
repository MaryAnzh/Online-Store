import './Tools.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { toolsModel, ModifyItemsType } from '../../../core/model/toolsModel';
import { ParamKeyValuePair } from 'react-router-dom';
import React, { useState } from 'react';
import { FilterType, ItemsQueryOptions, SortType } from '../../../core/types/tools.types';
import { ToolsSearch } from '../tools-search/ToolsSearch';
import { ToolsRangeSlider } from '../tools-range-slider/ToolsRangeSlider';

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
    const minPrice = Math.min.apply(null, allItems.map(el => el.price));
    const maxPrice = Math.max.apply(null, allItems.map(el => el.price));
    const minInStock = Math.min.apply(null, allItems.map(el => el.stock));
    const maxInStock = Math.max.apply(null, allItems.map(el => el.stock));

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

    const filterItemsOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const elem = e.target;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        toolsSettings.filter[itemObjectKey] = value;
        checkFilters(toolsSettings);
        setBrands(selectView.brands);
        setCategories(selectView.categories);
        setItemsData();
    }

    const sortItemsOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        toolsSettings.sort.price = null;
        toolsSettings.sort.stock = null;

        const elem = e.target;
        const value = elem.value === 'select' ? null : elem.value as 'assent' | 'descent';
        const itemObjectKey = elem.id as keyof SortType;
        toolsSettings.sort[itemObjectKey] = value;
        checkSort(toolsSettings);
        setPriceValue(selectView.price);
        setStockValue(selectView.stock);
        setItemsData();
    }

    const modifyItemsFromChild = (settings: ItemsQueryOptions) => {
        const modifyData: ModifyItemsType = toolsModel.modifyItemsByParams(allItems, settings);
        props.setItems(modifyData.items, modifyData.urlParams);
    }

    return (
        <section className='tools'>
            <div className='tools__visible'>
                <h4 className='tools__visible__title'>
                    Tools
                </h4>
                <div className='tools__visible__search-wrap'>
                    <ToolsSearch toolsSetting={toolsSettings} modifyItems={modifyItemsFromChild} />
                </div>
            </div>
            <div className='tools__selects-wrap'>
                <div className='tools__selects-wrap__select-tools'>
                    <div className='tools__selects-wrap__select-tools__tool'>
                        <div className='tools__selects-wrap__select-tools__tool__title'>
                            <span className='tools__selects-wrap__select-tools__tool__title__name'>
                                Category
                            </span>
                            <div className='tools__selects-wrap__select-tools__tool__title__count'>
                                (<span>{categories.length}</span>)
                            </div>
                        </div>
                        <select
                            className='tools__selects-wrap__select-tools__tool__select filter-select'
                            id='category'
                            value={categorySelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {categoriesFilter}
                        </select>
                    </div>
                    <div className='tools__selects-wrap__select-tools__tool'>
                        <div className='tools__selects-wrap__select-tools__tool__title'>
                            <span className='tools__selects-wrap__select-tools__tool__title__name'>
                                Brand
                            </span>
                            <div className='tools__selects-wrap__select-tools__tool__title__count'>
                                (<span>{brands.length}</span>)
                            </div>
                        </div>
                        <select
                            className='tools__selects-wrap__select-tools__tool__select filter-selects'
                            id='brand'
                            value={brandSelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {brandFilter}
                        </select>
                    </div>
                </div>
                <div className='tools__selects-wrap__select-tools'>
                    <div className='tools__selects-wrap__select-tools__tool'>
                        <div className='tools__selects-wrap__select-tools__tool__title'>
                            <span className='tools__selects-wrap__select-tools__tool__title__name'>
                                Sorn by Price
                            </span>
                        </div>
                        <select
                            className='tools__selects-wrap__select-tools__tool__select filter-select'
                            id='price'
                            value={priceValue}
                            onChange={sortItemsOnChange}>
                            <option value='select'>...</option>
                            <option value='assent'>low to hight</option>
                            <option value='descent'>hight to low</option>
                        </select>
                    </div>
                    <div className='tools__selects-wrap__select-tools__tool'>
                        <div className='tools__selects-wrap__select-tools__tool__title'>
                            <span className='tools__selects-wrap__select-tools__tool__title__name'>
                                Sort by Stock
                            </span>
                        </div>
                        <select
                            className='tools__selects-wrap__select-tools__tool__select filter-selects'
                            id='stock'
                            value={stockValue}
                            onChange={sortItemsOnChange}>
                            <option value='select'>...</option>
                            <option value='assent'>low to hight</option>
                            <option value='descent'>hight to low</option>
                        </select>
                    </div>
                </div>
            </div>
            <h4 className='tools__title'>Filtering by range</h4>
            <div className='tools__range-sliders'>
                <div className='tools__range-sliders__range'>
                    <h4 className='tools__range-sliders__range__title'>Price</h4>
                    <ToolsRangeSlider
                        filterBy='rangePrice'
                        min={minPrice}
                        max={maxPrice}
                        toolsSetting={toolsSettings}
                        modifyItems={modifyItemsFromChild} />
                </div>
                <div className='tools__range-sliders__range'>
                    <h4 className='tools__range-sliders__range__title'>Stock</h4>
                    <ToolsRangeSlider
                        filterBy='rangeStock'
                        min={minInStock}
                        max={maxInStock}
                        toolsSetting={toolsSettings}
                        modifyItems={modifyItemsFromChild} />
                </div>
            </div>
        </section>
    );
}