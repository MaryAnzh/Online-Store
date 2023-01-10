import styles from './CartItemRow.module.scss'
import React from 'react'
import {ICartItem} from '../../../core/interfaces/cart.interfaces'
import {ShopState} from '../../../core/state/ShopState'
import {observer} from 'mobx-react-lite'

interface ICartItemRowProps {
    item: ICartItem
    state: ShopState
}


export const CartItemRow = observer((props: ICartItemRowProps): JSX.Element => {
    const totalPrice: number = props.item.price * props.item.count

    const decreaseCountClick = (): void => props.state.decreaseQuantityInCart(props.item)
    const increaseCountClick = (): void => props.state.increaseQuantityInCart(props.item)

    return (
        <div className={styles.cartItem}>
            <span className={styles.number}>{props.state.getPositionInCart(props.item.id) + 1}</span>
            <div className={styles.imgWrap}>
                <img src={props.item.thumbnail} alt={props.item.title} className={styles.image}/>
            </div>
            <div className={styles.information}>
                <span className={styles.title}>{props.item.title}</span>
                <p className={styles.description}>{props.item.description}</p>
                <div className={styles.informationRow}>
                    <span className={styles.rating}>Rating {props.item.rating}</span>
                    <span className={styles.discount}>Discount {props.item.discountPercentage}%</span>
                </div>
            </div>

            <div className={styles.conclusion}>
                <span className={styles.stock}>Stock: {props.item.stock}</span>
                <div className={styles.countBlock}>
                    <button className={styles.changeCountBtn} onClick={decreaseCountClick}>-</button>
                    <span className={styles.count}>{props.item.count}</span>
                    <button className={styles.changeCountBtn} onClick={increaseCountClick}>+</button>
                </div>
                <span className={styles.totalPrice}>{Math.floor(totalPrice)} $</span>
            </div>
        </div>
    )
})
