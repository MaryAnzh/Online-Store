import styles from './CartPagination.module.scss'
import React from 'react'


interface ICartPaginationProps {
    limit: number
    maxLimit: number
    onLimitChange: (newLimit: number) => void
    page: number
    onPageChange: (delta: number) => void
}

export const CartPagination = (props: ICartPaginationProps): JSX.Element => {
    const onLimitChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.onLimitChange(Number(event.currentTarget.value))

    const nextPageClick = (): void => props.onPageChange(1)
    const previousPageClick = (): void => props.onPageChange(-1)

    return (
        <div className={styles.pagination}>
            <div className={styles.limit}>
                <span className={styles.limitTitle}>Limit</span>
                <input className={styles.limitInput} type="number" value={props.limit} onChange={onLimitChange} min="1" max={props.maxLimit} step="1"/>
            </div>
            <div className={styles.page}>
                <span className={styles.pageTitle}>Page</span>
                <button className={styles.pageButton} onClick={previousPageClick}>{'<'}</button>
                <span className={styles.pageNumber}>{props.page}</span>
                <button className={styles.pageButton} onClick={nextPageClick}>{'>'}</button>
            </div>
        </div>
    )
}
