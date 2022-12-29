import styles from './CartItemsList.module.scss'
import {IItem} from '../../../core/interfaces/catalog.interfaces'
import {CartItemRow} from '../../smart/cart-item-row/CartItemRow'
import React from 'react'
import {ICartItem} from '../../../core/interfaces/cart.interfaces'


interface ICartItemsListProps {
    selectedItems: Array<ICartItem>
    onIncreaseCount: (item: ICartItem) => void
    onDecreaseCount: (item: ICartItem) => void
}

export const CartItemsList = (props: ICartItemsListProps): JSX.Element => {
    return (
        <div className={styles.cartItemsList}>
            {
                props.selectedItems.map((item: ICartItem, index: number): JSX.Element => (
                    <CartItemRow item={item}
                                 number={index + 1}
                                 key={item.id}
                                 onDecreaseCount={props.onDecreaseCount}
                                 onIncreaseCount={props.onIncreaseCount}
                    />
                ))
            }
        </div>
    )
}
