import styles from './CardDetails.module.scss'
import chipImage from '../../../assets/chip.png'
import globusImage from '../../../assets/globe.png'
import React from 'react'

interface ICardDetailsProps {
    cardNumber: string
    onCardNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    owner: string
    onOwnerChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    expirationDate: string
    onExpirationDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CardDetails = (props: ICardDetailsProps): JSX.Element => {

    return (
        <div className={styles.card}>
            <div className={styles.row}>
                <img src={chipImage} className={styles.chip} alt="chip"/>
                <img src={globusImage} className={styles.globus} alt="globus"/>
            </div>

            <div className={styles.row}>
                <input type="text"
                       inputMode="numeric"
                       required
                       pattern="\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d"
                       className={styles.cardNumberInput}
                       value={props.cardNumber}
                       onChange={props.onCardNumberChange}
                />
            </div>

            <div className={styles.row}>
                <input type="text"
                       inputMode="text"
                       required
                       className={styles.cardOwnerInput}
                       value={props.owner}
                       onChange={props.onOwnerChange}
                       maxLength={20}
                />

                <input type="text"
                       inputMode="numeric"
                       required
                       className={styles.cardExpirationDateInput}
                       value={props.expirationDate}
                       onChange={props.onExpirationDateChange}
                       maxLength={5}
                />
            </div>
        </div>
    )
}

