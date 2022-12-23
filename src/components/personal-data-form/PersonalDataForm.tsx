import styles from './PersonalDataForm.module.scss'
import React from 'react'


interface ICardDetails {
    // TODO
}

interface IFormData {
    name: string
    telephone: string
    email: string
    card: ICardDetails
}

interface IPersonalDataFormProps {
    onSubmitCallback?: (data: IFormData) => void
}


export const PersonalDataForm = (props: IPersonalDataFormProps): JSX.Element => {
    const name: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const telephone: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const address: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const email: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)

    return (
        <form action="#" onSubmit={e => e.preventDefault()} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Name & Surname</label>
                <input type="text"
                       pattern="[A-ZА-Я][a-zа-я-]+[ ]*([A-ZА-я][a-zа-я-]+)?[ ]*([A-ZА-я][a-zа-я-]+)?[ ]*"
                       className={styles.input}
                       placeholder="Tony Stark"
                       required={true}
                       ref={name}
                />
                <small className={styles.note}>Enter valid name and surname</small>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Telephone</label>
                <input type="text"
                       pattern="([\+])?[0-9 -]+[0-9]"
                       className={styles.input}
                       placeholder="+123 123 123 123"
                       required={true}
                       ref={telephone}
                />
                <small className={styles.note}>
                    Enter valid phone number consisting of digits (may be with plus in the beginning)
                </small>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Delivery address</label>
                <input type="text"
                       className={styles.input}
                       placeholder="New York, Avengers tower, 7 floor"
                       required={true}
                       ref={address}
                />
                <small className={styles.note}>Is it really an address ?</small>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Email address</label>
                <input type="email"
                       className={styles.input}
                       placeholder="iron-man@email.com"
                       required={true}
                       ref={email}
                />
                <small className={styles.note}>Entered string doesn't seem to be a real email address</small>
            </div>

            {/* HERE WILL BE CARD COMPONENT */}
        </form>
    )
}
