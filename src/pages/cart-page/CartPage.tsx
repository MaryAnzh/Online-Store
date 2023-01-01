import React from 'react'
import {CartSummary} from '../../components/smart/cart-summary/CartSummary'
import {promoCodes} from '../../core/data/promoCode.data'
import styles from './CartPage.module.scss'
import {catalog} from '../../core/data/catalog.data'
import {ICartItem} from '../../core/interfaces/cart.interfaces'
import {CartItemsList} from '../../components/simple/cart-items-list/CartItemsList'
import {ShopState} from '../../core/state/ShopState'
import {observer} from 'mobx-react-lite'


interface ICartPageProps {
    state: ShopState
}

export const CartPage = observer((props: ICartPageProps): JSX.Element => {
    const [totalPrice, setTotalPrice] = React.useState<number>(0)
    const [totalCount, setTotalCount] = React.useState<number>(0)
    const cartSize: number = props.state.cart.items.length

    // JUST TEST FOR DEMO
    React.useEffect((): void => {
        // const newPrice: number = Math.floor(items.reduce((result: number, item: ICartItem) => result + item.price * (1 - item.discountPercentage / 100) * item.count, 0))
        // setTotalPrice(newPrice)
        // const newCount: number = items.reduce((result: number, current: ICartItem) => result + current.count, 0)
        // setTotalCount(newCount)
    }, [/*items*/])


    if (cartSize === 0) {
        return (
            <div className={styles.container}>
                <span className={styles.emptyCartMessage}>Cart is empty</span>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.cart}>
                <CartItemsList state={props.state}/>
                <CartSummary itemsCount={totalCount} totalPrice={totalPrice} workingPromoCodes={promoCodes}/>
            </div>
        </div>
    )
})
