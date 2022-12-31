import {IItem} from '../../../core/interfaces/catalog.interfaces'
import styles from './CartItemRow.module.scss'
import React from 'react'
import {ICartItem} from '../../../core/interfaces/cart.interfaces'

interface ICartItemRowProps {
    item: ICartItem
    number: number
    onIncreaseCount: (item: ICartItem) => void
    onDecreaseCount: (item: ICartItem) => void
}


export const CartItemRow = (props: ICartItemRowProps): JSX.Element => {
    const [totalPrice, setTotalPrice] = React.useState<number>(props.item.price * (1 - props.item.discountPercentage / 100))

    React.useEffect((): void => {
        setTotalPrice(props.item.count * props.item.price * (1 - props.item.discountPercentage / 100))
    }, [props.item.count, props.item.discountPercentage, props.item.price])

    const increaseCountClick = (): void => props.onIncreaseCount(props.item)
    const decreaseCountClick = (): void => props.onDecreaseCount(props.item)

    return (
        <div className={styles.cartItem}>
            <span className={styles.number}>{props.number}</span>
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
}
