import { ParamKeyValuePair } from "react-router-dom";
import { IItem } from "../interfaces/catalog.interfaces";
import { FilterType, ItemsQueryOptions, SortType } from "../types/tools.types";

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
                store: null,
            },
            search: null,
        };
    }

    resetToolsSettings = (settings: ItemsQueryOptions) => {
        settings = {
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

    modifyItemsByParams = (items: IItem[], setting: ItemsQueryOptions): ModifyItemsType => {
        const urlParams: ParamKeyValuePair[] = [];
        for (const objKey in setting) {
            const key = objKey as keyof ItemsQueryOptions;
            if (key === 'search') {
                const v = setting[key];
                if (v !== null) {
                    urlParams.push([`${key}`, v]);
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
                    const keyAsItemsKet = subKey as keyof IItem;
                    const v = sort[subKey];
                    if (v !== null) {
                        this.sortItems(v, keyAsItemsKet, items);
                        urlParams.push([`${subKey}`, v]);
                    }
                }
            }
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