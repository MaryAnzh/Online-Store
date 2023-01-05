import './Tools.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { toolsModel, ModifyItemsType } from '../../../core/model/toolsModel';
import { ParamKeyValuePair } from 'react-router-dom';
import React, { useState } from 'react';
import { FilterType, ItemsQueryOptions } from '../../../core/types/tools.types';

type ToolsProps = {
    items: IItem[],
    toolsSetting: ItemsQueryOptions,
    setItems: (items: IItem[], urlParam: ParamKeyValuePair[]) => void;
}

type SelectViewType = {
    categories: string[],
    brands: string[],
}

export const Tools = (props: ToolsProps) => {
    const toolsSettings = props.toolsSetting;
    const checkToolsSetting = () => {
        let isSettingsEmpty = true;
        for (const key in props.toolsSetting) {
            if (props.toolsSetting.search !== null || props.toolsSetting.filter.brand !== null
                || props.toolsSetting.filter.category !== null || props.toolsSetting.filter.inCart
                || props.toolsSetting.sort.price !== null || props.toolsSetting.sort.store !== null
            ) {
                isSettingsEmpty = false;
            }
        }
    }

    const selectView = {
        categories: toolsModel.createSelectViewByToolsTitle('category', props.items),
        brands: toolsModel.createSelectViewByToolsTitle('brand', props.items),
    }

    const [categories, setCategories] = useState(selectView.categories);
    const [brands, setBrands] = useState(selectView.brands);

    const modifyItems = (items: IItem[], urlParam: ParamKeyValuePair[]) => {
        props.setItems(items, urlParam);
    }

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

    let isSettingsShow = false;
    let categorySelectValue = toolsSettings.filter.category === null ? '...' : toolsSettings.filter.category;
    let brandSelectValue = toolsSettings.filter.brand === null ? '...' : toolsSettings.filter.brand;

    const setItemsData = () => {
        const modifyData: ModifyItemsType = toolsModel.modifyItemsByParams(props.items, toolsSettings);
        props.setItems(modifyData.items, modifyData.urlParams);
    }

    const filterItemsOnChange = (e: React.ChangeEvent) => {
        const elem = e.target as HTMLSelectElement;
        const value = elem.value;
        const itemObjectKey = elem.id as keyof FilterType;
        toolsSettings.filter[itemObjectKey] = value;
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
                    <div>
                        <h4>Category</h4>
                        <select
                            id='category'
                            value={categorySelectValue}
                            onChange={filterItemsOnChange}>
                            <option value={'...'}></option>
                            {categoriesFilter}
                        </select>
                    </div>
                    <div>
                        <h4>Brand</h4>
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