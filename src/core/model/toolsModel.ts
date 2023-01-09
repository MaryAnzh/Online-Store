import { ParamKeyValuePair } from "react-router-dom";
import { IItem } from "../interfaces/catalog.interfaces";
import { FilterType, ItemsQueryOptions, SortType, RangeType } from "../types/tools.types";

export type ModifyItemsType = {
    items: IItem[],
    urlParams: ParamKeyValuePair[],
};

class ToolsModel {
    public toolsSetting: ItemsQueryOptions;

    constructor() {
        this.toolsSetting = {
            filter: {
                category: null,
                brand: null,
                inCart: null,
            },
            sort: {
                price: null,
                stock: null,
            },
            range: {
                rangePrice: null,
                rangeStock: null,
            },
            search: null,
        };
    }

    resetToolsSettings = (settings: ItemsQueryOptions): ItemsQueryOptions => {
        return {
            filter: {
                category: null,
                brand: null,
                inCart: null,
            },
            sort: {
                price: null,
                stock: null,
            },
            range: {
                rangePrice: null,
                rangeStock: null,
            },
            search: null,
        };
    }

    isSettingsEmpty = (settings: ItemsQueryOptions): boolean => {
        let isSettingsEmpty = true;
        if (settings.search !== null || settings.filter.category !== null || settings.filter.brand !== null
            || settings.filter.inCart !== null || settings.sort.price !== null || settings.sort.stock !== null) {
            isSettingsEmpty = false;
        }
        return isSettingsEmpty;
    }

    updateBrandSet = (items: IItem[], category: string): string[] => {
        return items.reduce((arr: string[], el) => {
            if (el.category === category) {
                if (arr.indexOf(el.brand) === -1) {
                    arr.push(el.brand);
                }
            }
            return arr;
        }, []);
    }

    updateCategorySet = (items: IItem[], brand: string): string[] => {
        return items.reduce((arr: string[], el) => {
            if (el.brand === brand) {
                if (arr.indexOf(el.category) === -1) {
                    arr.push(el.category);
                }
            }
            return arr;
        }, []);
    }

    filterItems = (value: string, itemObjectKey: keyof IItem, items: IItem[]) => {
        let filterItems: IItem[] = [];
        if (value === '...') {
            return filterItems;
        }
        filterItems = items.filter(el => el[itemObjectKey] === value);
        return filterItems;
    }

    sortItems = (direction: 'assent' | 'descent', itemObjectKey: keyof IItem, items: IItem[]) => {
        items.sort((a: IItem, b: IItem) => +a[itemObjectKey] - +b[itemObjectKey]);
        if (direction === 'descent') {
            items.reverse();
        }
    }

    rangeItems = (itemObjectKey: keyof IItem, min: number, max: number, items: IItem[]): IItem[] => {
        return items.filter(el => (el[itemObjectKey] >= min && el[itemObjectKey] < (max + 1)));
    }

    modifyItemsByParams = (items: IItem[], setting: ItemsQueryOptions): ModifyItemsType => {
        const urlParams: ParamKeyValuePair[] = [];
        for (const objKey in setting) {
            const key = objKey as keyof ItemsQueryOptions;
            if (key === 'search') {
                const v = setting[key];
                if (v !== null) {
                    v.toLowerCase();

                    urlParams.push([`${key}`, v]);
                    const searchItems = items.filter(el => el.brand.toLowerCase().indexOf(v) > -1 || el.category.toLowerCase().indexOf(v) > -1
                        || el.description.toLowerCase().indexOf(v) > -1 || el.title.toLowerCase().indexOf(v) > -1
                        || el.price.toString() === v || el.stock.toString() === v);
                    items = searchItems;
                }
            }
            if (key === 'filter') {
                const filter: FilterType = setting.filter;
                for (const subObjKey in filter) {
                    const subKey = subObjKey as keyof FilterType;
                    const param = subKey as keyof IItem;
                    const v = filter[subKey];

                    if (v !== null) {
                        const filtering = this.filterItems(v, param, items);
                        if (filtering.length > 0) {
                            items = filtering;
                            if (v !== '...') {
                                urlParams.push([`${subKey}`, v]);
                            }
                        }
                    }
                }
            }
            if (key == 'sort') {
                const sort: SortType = setting.sort;
                for (const subObjKey in sort) {
                    const subKey = subObjKey as keyof SortType;
                    const keyAsItemsKey = subKey as keyof IItem;
                    const v = sort[subKey];
                    if (v !== null) {
                        this.sortItems(v, keyAsItemsKey, items);
                        urlParams.push([`${subKey}`, v]);
                    }
                }
            }
            if (key === 'range') {
                const range: RangeType = setting.range;
                for (const key in range) {
                    const objKey = key as keyof RangeType;
                    const v = range[objKey];
                    if (v !== null) {
                        const itemsKey = objKey === 'rangePrice' ? 'price' : 'stock';
                        const min = v.minValue;
                        const max = v.maxValue;
                        const rangeArr = this.rangeItems(itemsKey, min, max, items);

                        items = rangeArr;
                        const urlValue = `${min}-${max}`;
                        urlParams.push([`${key}`, urlValue]);
                    }
                }
            }
        }

        const view = setting.itemsView;
        if (view !== undefined) {
            const v = view;
            urlParams.push([`view`, v]);
        }

        const modifyItems: ModifyItemsType = {
            items: items,
            urlParams: urlParams
        }
        return modifyItems;
    }

    createSelectViewByToolsTitle = (name: string, array: IItem[]) => {
        return array.reduce((arr: string[], curr) => {
            const key = name as keyof IItem;
            const k = curr[key];
            if (arr.indexOf(`${k}`) === -1) {
                arr.push(`${k}`);
            }
            return arr;
        }, []);
    }
}

export const toolsModel = new ToolsModel();