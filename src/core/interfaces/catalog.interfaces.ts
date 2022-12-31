export interface ICatalog {
    products: IItem[],
    total: number,
    skip: number,
    limit: number,
    itemsInCart: number,
}

export interface IItem {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    inCartCount: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
}
