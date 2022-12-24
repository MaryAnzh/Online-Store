import styles from './PersonalDataForm.module.scss'
import React from 'react'
import {FormGroup, FormGroupType} from './form-group/FormGroup'
import {CardDetails} from './card-details/CardDetails'




interface IFormData {
    name: string
    telephone: string
    email: string
    cardNumber: string
    cardCvv: string
    cardExpirationDate: string
}

interface IPersonalDataFormProps {
    onSubmitCallback?: (data: IFormData) => void
}


export const PersonalDataForm = (props: IPersonalDataFormProps): JSX.Element => {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')

    const [cardNumber, setCardNumber] = React.useState<string>('')
    const [cardCvv, setCardSvv] = React.useState<string>('')
    const [cardExpirationDate, setCardExpirationDate] = React.useState<string>('')

    const cancelSubmit = (event: React.FormEvent<HTMLFormElement>): void => event.preventDefault()

    return (
        <form action="#" onSubmit={cancelSubmit} className={styles.form}>
            <FormGroup value={name}
                       onChange={setName}
                       type="name"
                       label="Name & surname"
                       placeholder="Tony Stark"
                       invalidText="Enter valid name and surname"
            />
            <FormGroup value={phone}
                       onChange={setPhone}
                       type="phone"
                       label="Phone number"
                       placeholder="+123 123 123 123"
                       invalidText="Enter valid phone number consisting of digits (may be with plus in the beginning)"
            />
            <FormGroup value={address}
                       onChange={setAddress}
                       type="address"
                       label="Delivery address"
                       placeholder="New York, Avengers tower, 7 floor"
                       invalidText="Is it really an address ? :|"
            />
            <FormGroup value={email}
                       onChange={setEmail}
                       type="email"
                       label="Email address"
                       placeholder="iron-man@email.com"
                       invalidText="Entered string doesn't seem to be a real email address"
            />

            <CardDetails cardNumber={cardNumber}
                         cvv={cardCvv}
                         expirationDate={cardExpirationDate}
                         onCardNumberChange={setCardNumber}
                         onExpirationDateChange={setCardExpirationDate}
                         onCvvChange={setCardSvv}
            />
        </form>
    )
}
