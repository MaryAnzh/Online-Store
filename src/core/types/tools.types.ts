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
    rangePrice: [number, number] | null,
    rangeStock: [number, number] | null,
}

export type ItemsQueryOptions = {
    filter: FilterType,
    sort: SortType,
    search: null | string,
    range: RangeType,
}