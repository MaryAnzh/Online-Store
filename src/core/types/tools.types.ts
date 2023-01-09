export type FilterType = {
    category: null | string,
    brand: null | string,
    inCart: null | string,
}

export type SortType = {
    price: null | 'assent' | 'descent',
    stock: null | 'assent' | 'descent',
}

export type RangeType = {
    rangePrice: RangeToolType | null,
    rangeStock: RangeToolType | null,
}

export type RangeToolType = {
    minValue: number,
    maxValue: number,
}

export type ItemsQueryOptions = {
    filter: FilterType,
    sort: SortType,
    search: null | string,
    range: RangeType,
    itemsView?: 'card' | 'list',
}