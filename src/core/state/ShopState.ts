import {ICart, ICartItem} from '../interfaces/cart.interfaces'
import {cart} from '../data/cart.data'
import {makeAutoObservable} from 'mobx'
import {IItem} from '../interfaces/catalog.interfaces'


export class ShopState {
    private static readonly LS_CART_STATE_KEY: string = 'LS_KEY_ONLINE_SHOP_CART_STATE_RS'

    public readonly cart: ICart

    public constructor() {
        this.cart = this.getSavedCartState()
        this.checkPageAfterLimitChangeOrItemsCountChange()
        makeAutoObservable(this, {}, {deep: true})
    }


    public increaseQuantityInCart(item: IItem, fromCatalog: boolean = false): void {
        const tryIfItemInCart = this.cart.items.find((it: ICartItem): boolean => it.id === item.id)

        if (tryIfItemInCart && !fromCatalog) {
            if (tryIfItemInCart.count >= tryIfItemInCart.stock) return

            ++tryIfItemInCart.count
        } else {
            this.cart.items.push({...item, count: 1})
        }

        if (fromCatalog) {
            this.cart.limit = this.cart.items.length
        }

        ++this.cart.totalCount

        this.saveCartState()
    }

    public dropItemFromCart(id: number): void {
        const position: number = this.getPositionInCart(id)
        if (position === -1) {
            return
        }
        this.cart.totalCount -= this.cart.items[position].count

        this.cart.items.splice(position, 1)
        this.checkLimitAndPage()
        this.saveCartState()
    }

    public decreaseQuantityInCart(item: ICartItem): void {
        if (item.count > 1) {
            --item.count
        } else {
            const position: number = this.getPositionInCart(item.id)
            this.cart.items.splice(position, 1)
            this.checkLimitAndPage()
        }

        --this.cart.totalCount

        this.saveCartState()
    }

    public isItemInCart(id: number): boolean {
        return !!this.cart.items.find((item: ICartItem): boolean => item.id === id)
    }

    public getPositionInCart(id: number): number {
        return this.cart.items.findIndex((it: ICartItem): boolean => it.id === id)
    }

    public setCartLimit(newLimit: number): void {
        this.cart.page = 1

        if (newLimit > 0 && newLimit <= this.cart.items.length) {
            this.cart.limit = newLimit
            this.cart.page = 1
            this.saveCartState()
        }
    }

    public changePageInCart(delta: -1 | 1): void {
        if (this.cart.page + delta <= 0 || this.cart.limit * (this.cart.page + delta - 1) >= this.cart.items.length) {
            return
        }

        this.cart.page += delta
        this.saveCartState()
    }

    public clearCart(): void {
        this.cart.items.length = 0
        this.cart.page = 1
        this.cart.limit = 1
        this.cart.totalCount = 0
        this.saveCartState()
    }

    private getSavedCartState(): ICart {
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
        localStorage.setItem(ShopState.LS_CART_STATE_KEY, JSON.stringify(this.cart))
    }

    private checkLimitAndPage(): void {
        this.cart.limit = Math.min(this.cart.limit, this.cart.items.length)
        this.checkPageAfterLimitChangeOrItemsCountChange()
    }

    private checkPageAfterLimitChangeOrItemsCountChange(): void {
        // if it was last item on page, page should decrement after item drop
        if (this.cart.limit * (this.cart.page - 1) >= this.cart.items.length && this.cart.page > 1) {
            --this.cart.page
        }
    }

    public getTotalPrice(): number {
        return this.cart.items.reduce((result: number, current: ICartItem) => result + current.count * current.price, 0)
    }
}
