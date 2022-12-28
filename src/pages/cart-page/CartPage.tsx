import React from 'react'
import {CartSummary} from '../../components/smart/cart-summary/CartSummary'
import {promoCodes} from '../../core/data/promoCode.data'
import styles from './CartPage.module.scss'
import {IItem} from '../../core/interfaces/catalog.interfaces'
import {catalog} from '../../core/data/catalog.data'
import {ICartItem} from '../../core/interfaces/cart.interfaces'
import {CartItemsList} from '../../components/simple/cart-items-list/CartItemsList'


export const CartPage = (): JSX.Element => {
    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const [totalCount, setTotalCount] = React.useState<number>(0)

    // temp for test
    const selectedItems: Array<ICartItem> = [...catalog.products.map(item => ({...item, count: 1}))]
    const increaseSomeItemCount = (item: ICartItem): void => {

    }

    const decreaseSomeItemCount = (item: ICartItem): void => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.cart}>
                <CartItemsList selectedItems={selectedItems} onIncreaseCount={increaseSomeItemCount} onDecreaseCount={decreaseSomeItemCount}/>
                <CartSummary itemsCount={totalCount} totalPrice={totalPrice} workingPromoCodes={promoCodes}/>
            </div>
        </div>
    )
}
