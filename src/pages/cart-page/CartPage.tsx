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

    // JUST TEST FOR DEMO
    const [selectedItems, setSelectedItems] = React.useState<Array<ICartItem>>([...catalog.products.map(item => ({...item, count: 1}))])

    // JUST TEST FOR DEMO
    const increaseSomeItemCount = (item: ICartItem): void => {
        if (item.count < item.stock) {
            const index = selectedItems.findIndex(i => i.id === item.id)
            const copy = selectedItems.map(i => ({...i}))
            copy[index].count += 1
            setSelectedItems([...copy])
        }
    }
    // JUST TEST FOR DEMO
    const decreaseSomeItemCount = (item: ICartItem): void => {
        if (item.count > 1) {
            const index = selectedItems.findIndex(i => i.id === item.id)
            const copy = selectedItems.map(i => ({...i}))
            copy[index].count -= 1
            setSelectedItems([...copy])
        } else {
            setSelectedItems([...selectedItems.filter(i => i.id !== item.id)])
        }
    }
    // JUST TEST FOR DEMO
    React.useEffect((): void => {
        const newPrice: number = Math.floor(selectedItems.reduce((result: number, item: ICartItem) => result + item.price * (1 - item.discountPercentage / 100) * item.count, 0))
        setTotalPrice(newPrice)
        const newCount: number = selectedItems.reduce((result: number, current: ICartItem) => result + current.count, 0)
        setTotalCount(newCount)
    }, [selectedItems])

    return (
        <div className={styles.container}>
            <div className={styles.cart}>
                <CartItemsList selectedItems={selectedItems} onIncreaseCount={increaseSomeItemCount} onDecreaseCount={decreaseSomeItemCount}/>
                <CartSummary itemsCount={totalCount} totalPrice={totalPrice} workingPromoCodes={promoCodes}/>
            </div>
        </div>
    )
}
