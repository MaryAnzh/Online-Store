import styles from '../../smart/cart-summary/CartSummary.module.scss'
import React from 'react'
import {IPromoCode} from '../../../core/interfaces/promoCode.interfaces'

interface IActivatedPromoProps {
    promo: IPromoCode
    onDeactivate: (code: string) => void
}

export const ActivatedPromo = (props: IActivatedPromoProps): JSX.Element => {
    const deactivatePromocode = (): void => props.onDeactivate(props.promo.code)

    return (
        <div className={styles.promoActivated} key={props.promo.code}>
            <span className={styles.promoName}>{props.promo.code}</span>
            <span className={styles.promoDiscount}>-{props.promo.discount}%</span>
            <button className={styles.dropPromo} title="Deactivate promo code" onClick={deactivatePromocode}>
                &times;
            </button>
        </div>
    )
}
