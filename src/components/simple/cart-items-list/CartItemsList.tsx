import styles from './CartItemsList.module.scss'
import {CartItemRow} from '../../smart/cart-item-row/CartItemRow'
import React from 'react'
import {ICartItem} from '../../../core/interfaces/cart.interfaces'
import {CartPagination} from '../../smart/cart-pagination/CartPagination'
import {ShopState} from '../../../core/state/ShopState'
import {observer} from 'mobx-react-lite'


interface ICartItemsListProps {
    state: ShopState
}



export const CartItemsList = observer((props: ICartItemsListProps): JSX.Element => {
    const {limit, page} = props.state.cart
    const renderedItems = [...props.state.cart.items.slice((page - 1) * limit, (page - 1) * limit + limit)]

    return (
        <div className={styles.list}>
            <CartPagination state={props.state}/>
            <div className={styles.cartItemsList}>
                {
                    renderedItems.map((item: ICartItem): JSX.Element => (
                        <CartItemRow item={item} state={props.state} key={item.id}/>
                    ))
                }
            </div>
        </div>
    )
})
