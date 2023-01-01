import React from 'react'
import {CartSummary} from '../../components/smart/cart-summary/CartSummary'
import {promoCodes} from '../../core/data/promoCode.data'
import styles from './CartPage.module.scss'
import {CartItemsList} from '../../components/simple/cart-items-list/CartItemsList'
import {ShopState} from '../../core/state/ShopState'
import {observer} from 'mobx-react-lite'


interface ICartPageProps {
    state: ShopState
}

export const CartPage = observer((props: ICartPageProps): JSX.Element => {
    const totalPrice: number = props.state.getTotalPrice()
    const totalCount: number = props.state.cart.totalCount

    if (totalCount === 0) {
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
                <CartSummary itemsCount={totalCount}
                             totalPrice={totalPrice}
                             workingPromoCodes={promoCodes}
                             state={props.state}
                />
            </div>
        </div>
    )
})
