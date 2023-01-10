import {ICart, ICartItem} from '../interfaces/cart.interfaces'
import {defaultCart} from '../data/cart.data'
import {makeAutoObservable} from 'mobx'
import {IItem} from '../interfaces/catalog.interfaces'


export class ShopState {
    private static readonly LS_CART_STATE_KEY: string = 'LS_KEY_ONLINE_SHOP_CART_STATE_RS'

    public readonly cart: ICart

    public constructor() {
        this.cart = this.getSavedCartState()
        this.cart.showModal = false
        this.cart.limit = this.cart.items.length
        this.cart.page = 1
        //this.checkPageAfterLimitChangeOrItemsCountChange()
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

    public setCartLimit(newLimit: number, querySetter?: (obj: unknown) => void): void {
        if (newLimit > 0 && newLimit <= this.cart.items.length && Number.isInteger(newLimit)) {
            this.cart.page = 1
            this.cart.limit = newLimit
            querySetter && querySetter({limit: this.cart.limit, page: this.cart.page})
            this.saveCartState()
        }
    }

    private setCartPage(newPage: number, querySetter?: (obj: unknown) => void): void {
        if (newPage > 0 && newPage <= this.cart.items.length && Number.isInteger(newPage)) {
            this.cart.page = newPage
            querySetter && querySetter({limit: this.cart.limit, page: this.cart.page})
            this.saveCartState()
        }
    }

    public changePageInCart(delta: -1 | 1, querySetter: (obj: unknown) => void): void {
        if (this.cart.page + delta <= 0 || this.cart.limit * (this.cart.page + delta - 1) >= this.cart.items.length) {
            return
        }

        this.cart.page += delta
        querySetter({limit: this.cart.limit, page: this.cart.page})
        this.saveCartState()
    }

    public clearCart(): void {
        this.cart.items.length = 0
        this.cart.page = 1
        this.cart.limit = 1
        this.cart.totalCount = 0
        this.cart.showModal = false
        this.saveCartState()
    }

    private getSavedCartState(): ICart {
        const tryGet: string | null = localStorage.getItem(ShopState.LS_CART_STATE_KEY)

        if (tryGet === null) return defaultCart

        try {
            return JSON.parse(tryGet)
        } catch (error) {
            console.warn('Can\'t parse saved state. Setting default one', error)
            return defaultCart
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

    public buyNow(item: IItem): void {
        const isAlreadyInCart: boolean = this.isItemInCart(item.id)
        this.cart.showModal = true
        if (isAlreadyInCart) {
            return
        }
        this.increaseQuantityInCart(item, true)
    }

    public closeModal(): void {
        this.cart.showModal = false
    }

    public openModal(): void {
        this.cart.showModal = true
    }

    public getCartFromQuery(query: URLSearchParams) {
        query.has('limit') && this.setCartLimit(Number(query.get('limit')))
        query.has('page') && this.setCartPage(Number(query.get('page')))
    }
}
