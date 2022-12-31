import React from 'react'
import {CartSummary} from '../../components/smart/cart-summary/CartSummary'
import {promoCodes} from '../../core/data/promoCode.data'
import styles from './CartPage.module.scss'
import {catalog} from '../../core/data/catalog.data'
import {ICartItem} from '../../core/interfaces/cart.interfaces'
import {CartItemsList} from '../../components/simple/cart-items-list/CartItemsList'


export const CartPage = (): JSX.Element => {
    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const [totalCount, setTotalCount] = React.useState<number>(0)
    const [items, setItems] = React.useState<Array<ICartItem>>([...catalog.products.map(item => ({...item, count: 1}))])

    // JUST TEST FOR DEMO
    const increaseSomeItemCount = (item: ICartItem): void => {
        if (item.count < item.stock) {
            const index: number = items.findIndex(i => i.id === item.id)
            const copy: Array<ICartItem> = items.map(i => ({...i}))
            copy[index].count += 1
            setItems([...copy])
        }
    }
    // JUST TEST FOR DEMO
    const decreaseSomeItemCount = (item: ICartItem): void => {
        if (item.count > 1) {
            const index: number = items.findIndex(i => i.id === item.id)
            const copy: Array<ICartItem> = items.map(i => ({...i}))
            copy[index].count -= 1
            setItems([...copy])
        } else {
            setItems([...items.filter(i => i.id !== item.id)])
        }
    }
    // JUST TEST FOR DEMO
    React.useEffect((): void => {
        const newPrice: number = Math.floor(items.reduce((result: number, item: ICartItem) => result + item.price * (1 - item.discountPercentage / 100) * item.count, 0))
        setTotalPrice(newPrice)
        const newCount: number = items.reduce((result: number, current: ICartItem) => result + current.count, 0)
        setTotalCount(newCount)
    }, [items])


    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <span className={styles.emptyCartMessage}>Cart is empty</span>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.cart}>
                <CartItemsList items={items} onIncreaseCount={increaseSomeItemCount} onDecreaseCount={decreaseSomeItemCount}/>
                <CartSummary itemsCount={totalCount} totalPrice={totalPrice} workingPromoCodes={promoCodes}/>
            </div>
        </div>
    )
}
