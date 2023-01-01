import {IItem} from './catalog.interfaces'


export interface ICartItem extends IItem {
    count: number
}

export interface ICart {
    limit: number
    page: number
    items: Array<ICartItem>
}
