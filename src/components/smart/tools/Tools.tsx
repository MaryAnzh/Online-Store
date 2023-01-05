import './Tools.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { toolsModel, ModifyItemsType } from '../../../core/model/toolsModel';
import { ParamKeyValuePair } from 'react-router-dom';
import React, { useState } from 'react';
import { FilterType, ItemsQueryOptions } from '../../../core/types/tools.types';

interface IToolsProps {
    items: IItem[],
    toolsSetting: ItemsQueryOptions,
    setItems: (items: IItem[], urlParam: ParamKeyValuePair[]) => void;
}

type SelectViewType = {
    categories: string[],
    brands: string[],
}

export const Tools = (props: IToolsProps) => {
    //инициализация
    // переемные
    const toolsSettings = props.toolsSetting;
    const allItems = props.items;
    const selectView: SelectViewType = {
        categories: [],
        brands: [],
    }
    let categorySelectValue = '...';
    let brandSelectValue = '...';
    let isSettingsShow = false;

    //функции
    const modifyItems = (items: IItem[], urlParam: ParamKeyValuePair[]) => {
        props.setItems(items, urlParam);
    }
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

    //проверяем пустые ли параметры, если нет
    //то подгоняем отображение под параметры
    for (const key in toolsSettings) {
        const keyInObj = key as keyof ItemsQueryOptions;
        if (keyInObj === 'filter') {
            checkFilters(toolsSettings);
        }
    }

    //устанавливаем состояние отображения фильтров по категории и бренду
    const [categories, setCategories] = useState(selectView.categories);
    const [brands, setBrands] = useState(selectView.brands);

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
        const modifyData: ModifyItemsType = toolsModel.modifyItemsByParams(props.items, toolsSettings);
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
                <div className='tools__hidden__filter'>
                    <div className='tools__hidden__filter__category'>
                        <div className='tools__hidden__filter__category__title'>
                            <span className='tools__hidden__filter__brand__title__name'>
                                Category
                            </span>
                            <div className='tools__hidden__filter__category__title__count'>
                                (<span>{categories.length}</span>)
                            </div>
                        </div>
                        <select
                            id='category'
                            value={categorySelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {categoriesFilter}
                        </select>
                    </div>
                    <div className='tools__hidden__filter__brand'>
                        <div className='tools__hidden__filter__brand__title'>
                            <span className='tools__hidden__filter__brand__title__name'>
                                Brand
                            </span>
                            <div className='tools__hidden__filter__brand__title__count'>
                                (<span>{brands.length}</span>)
                            </div>
                        </div>
                        <select
                            id='brand'
                            value={brandSelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {brandFilter}
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}