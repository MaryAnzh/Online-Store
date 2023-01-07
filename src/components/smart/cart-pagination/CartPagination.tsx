import styles from './CartPagination.module.scss'
import React from 'react'
import {ShopState} from '../../../core/state/ShopState'
import {observer} from 'mobx-react-lite'
import {useSearchParams} from 'react-router-dom'


interface ICartPaginationProps {
    state: ShopState
}

export const CartPagination = observer((props: ICartPaginationProps): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams()
    React.useEffect(() => {
        props.state.getCartFromQuery(searchParams)
    }, [])

    const onLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.state.setCartLimit(Number(event.currentTarget.value), setSearchParams as  any)
    const nextPageClick = (): void => props.state.changePageInCart(1, setSearchParams as  any)
    const previousPageClick = (): void => props.state.changePageInCart(-1, setSearchParams as  any)

    return (
        <div className={styles.pagination}>
            <div className={styles.limit}>
                <span className={styles.limitTitle}>Limit</span>
                <input className={styles.limitInput} type="number"
                       value={props.state.cart.limit} onChange={onLimitChange}
                       min="1" max={props.state.cart.items.length} step="1"
                />
            </div>
            <div className={styles.page}>
                <span className={styles.pageTitle}>Page</span>
                <button className={styles.pageButton} onClick={previousPageClick}>{'<'}</button>
                <span className={styles.pageNumber}>{props.state.cart.page}</span>
                <button className={styles.pageButton} onClick={nextPageClick}>{'>'}</button>
            </div>
        </div>
    )
})
