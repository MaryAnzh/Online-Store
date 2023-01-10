import {ICart} from '../interfaces/cart.interfaces'

export const defaultCart: ICart = {
    page: 1,
    limit: 1,
    items: [],
    totalCount: 0,
    showModal: false
}
