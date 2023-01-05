export type FilterType = {
    category: null | string,
    brand: null | string,
    inCart: null | string,
}

export type SortType = {
    price: null | 'assent' | 'descent',
    stock: null | 'assent' | 'descent',
}

export type ItemsQueryOptions = {
    filter: FilterType,
    sort: SortType,
    search: null | string,
}