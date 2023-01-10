import styles from './CardDetails.module.scss'
import chipImage from '../../../../assets/chip.png'

import React from 'react'

interface ICardDetailsProps {
    cardNumber: string
    onCardNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    expirationDate: string
    onExpirationDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    cvv: string
    onCvvChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    paymentSystem: string
    showInvalidText: boolean
}


export const CardDetails = (props: ICardDetailsProps): JSX.Element => {
    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <img src={chipImage} className={styles.chip} alt="chip"/>
                <img src={props.paymentSystem} className={styles.paymentSystemLogo} alt="globus" title="Starts with 4 - visa, 5 - mastercard, 6 - union pay"/>
            </div>

            <div className={styles.row}>
                <input type="text"
                       inputMode="numeric"
                       required
                       pattern="\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d"
                       className={styles.cardNumberInput}
                       value={props.cardNumber}
                       onChange={props.onCardNumberChange}
                       placeholder="0000 0000 0000 0000"
                       title="Starts with 4 - visa, 5 - mastercard, 6 - union pay"
                />
            </div>

            <div className={styles.row}>
                <input type="text"
                       inputMode="numeric"
                       required
                       className={styles.cardExpirationDateInput}
                       value={props.expirationDate}
                       onChange={props.onExpirationDateChange}
                       maxLength={5}
                       placeholder="11 / 22"
                />

                <input type="number"
                       required
                       className={styles.cardCvv}
                       value={props.cvv}
                       onChange={props.onCvvChange}
                       maxLength={3}
                       min="100"
                       max="999"
                       placeholder="CVV"
                />
            </div>

            <small className={styles.invalidText}>{props.showInvalidText && 'Some field in cart is filled wrong !'}</small>
        </div>
    )
}

