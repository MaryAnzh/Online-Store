import styles from './CartItemsList.module.scss'
import {CartItemRow} from '../../smart/cart-item-row/CartItemRow'
import React from 'react'
import {ICartItem} from '../../../core/interfaces/cart.interfaces'
import {CartPagination} from '../../smart/cart-pagination/CartPagination'


interface ICartItemsListProps {
    items: Array<ICartItem>
    onIncreaseCount: (item: ICartItem) => void
    onDecreaseCount: (item: ICartItem) => void
}

const MAX_LIMIT: number = 20

export const CartItemsList = (props: ICartItemsListProps): JSX.Element => {
    const [renderedItems, setRenderedItems] = React.useState<Array<ICartItem>>([...props.items])
    const [limit, setLimit] = React.useState<number>(Math.min(props.items.length, MAX_LIMIT))
    const [page, setPage] = React.useState<number>(1)

    React.useEffect((): void => {
        setPage(1)
        setRenderedItems([...props.items.slice(0, limit)])
    }, [limit, props.items])

    React.useEffect((): void => {
        if (limit <= 0 || limit > MAX_LIMIT || Number.isNaN(limit)) setLimit(1)
    }, [limit])

    const limitChanged = (newLimit: number) => (limit > 0 && limit <= MAX_LIMIT) && setLimit(newLimit)

    const pageChanged = (delta: number): void => {
        if (page + delta <= 0 || limit * (page + delta - 1) >= props.items.length) return

        setRenderedItems([...props.items.slice((page + delta - 1) * limit, (page + delta - 1) * limit + limit)])
        setPage((old:  number): number => old + delta)
    }

    return (
        <div className={styles.list}>
            <CartPagination page={page} onLimitChange={limitChanged} limit={limit} onPageChange={pageChanged} maxLimit={MAX_LIMIT}/>
            <div className={styles.cartItemsList}>
                {
                    renderedItems.map((item: ICartItem): JSX.Element => (
                        <CartItemRow item={item} number={props.items.findIndex(it => it.id === item.id) + 1}
                                     key={item.id}
                                     onDecreaseCount={props.onDecreaseCount}
                                     onIncreaseCount={props.onIncreaseCount}
                        />
                    ))
                }
            </div>
        </div>
    )
}
