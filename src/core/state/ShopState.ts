import {ICart, ICartItem} from '../interfaces/cart.interfaces'
import {cart} from '../data/cart.data'
import {makeAutoObservable} from 'mobx'
import {IItem} from '../interfaces/catalog.interfaces'


export class ShopState {
    private static readonly LS_CART_STATE_KEY: string = 'LS_KEY_ONLINE_SHOP_CART_STATE_RS'

    public readonly cart: ICart

    public constructor() {
        this.cart = this.getCartState()
        makeAutoObservable(this, {}, {deep: true})
    }

    private getCartState(): ICart {
        const tryGet: string | null = localStorage.getItem(ShopState.LS_CART_STATE_KEY)

        if (tryGet === null) return cart

        try {
            return JSON.parse(tryGet)
        } catch (error) {
            console.warn('Can\'t parse saved state. Setting default one', error)
            return cart
        }
    }

    private saveCartState(): void {
        console.log(this.cart)
        localStorage.setItem(ShopState.LS_CART_STATE_KEY, JSON.stringify(this.cart))
    }

    public increaseQuantityInCart(item: IItem): void {
        const tryIfItemInCart = this.cart.items.find((it: ICartItem): boolean => it.id === item.id)

        if (tryIfItemInCart) {
            if (tryIfItemInCart.count >= tryIfItemInCart.stock) return

            ++tryIfItemInCart.count
        } else {
            this.cart.items.push({...item, count: 1})
        }

        this.saveCartState()
    }

    public decreaseQuantityInCart(item: ICartItem): void {
        if (item.count > 1) {
            --item.count
        } else {
            const position: number = this.getPositionInCart(item.id)
            this.cart.items.splice(position, 1)
        }

        this.saveCartState()
    }

    public isItemInCart(id: number): boolean {
        return !!this.cart.items.find((item: ICartItem): boolean => item.id === id)
    }

    public getPositionInCart(id: number): number {
        return this.cart.items.findIndex((it: ICartItem): boolean => it.id === id)
    }

    public setCartLimit(newLimit: number): void {
        if  (newLimit > 0 && newLimit <= this.cart.items.length)
            this.cart.limit = newLimit
    }

    public changePageInCart(delta: -1 | 1): void{
        if (this.cart.page + delta <= 0 || this.cart.limit * (this.cart.page + delta - 1) >= this.cart.items.length)
            return

        this.cart.page += delta
    }
}
