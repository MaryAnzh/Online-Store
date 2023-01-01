import styles from './PersonalDataForm.module.scss'
import React from 'react'
import {FormGroup, FormGroupType} from './form-group/FormGroup'
import {CardDetails} from './card-details/CardDetails'


interface IFormData {
    name: string
    phone: string
    email: string
    cardNumber: string
    cardOwner: string
    cardExpirationDate: string
    address: string
}

interface IPersonalDataFormProps {
    onSubmitCallback: (data: IFormData) => void
}

const CARD_NUMBER_DELIMITER: string = ' '
const CARD_DATE_DELIMITER: string = '/'


export const PersonalDataForm = (props: IPersonalDataFormProps): JSX.Element => {
    const [name, setName] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [address, setAddress] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')

    const [cardNumber, setCardNumber] = React.useState<string>('')
    const [shownCardNumberValue, setShownCardNumberValue] = React.useState<string>('')
    const cardNumberChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.currentTarget.value.replaceAll(CARD_NUMBER_DELIMITER, '')
        if (verifyCardNumber(newValue) && newValue !== cardNumber) {
            setCardNumber(newValue)
            setShownCardNumberValue(formatCardNumber(newValue))
        }
    }
    const [cardOwner, setCardOwner] = React.useState<string>('')
    const cardOwnerChanged = (event: React.ChangeEvent<HTMLInputElement>) => setCardOwner(event.currentTarget.value)
    const [cardExpirationDate, setCardExpirationDate] = React.useState<string>('')
    const [cardShownExpirationDate, setCardShownExpirationDate] = React.useState<string>('')

    const cardExpDateChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.currentTarget.value.replaceAll(CARD_DATE_DELIMITER, '')
        if (verifyDate(newValue) && newValue !== cardExpirationDate) {
            setCardExpirationDate(newValue)
            setCardShownExpirationDate(formatCardDate(newValue))
        }
    }

    const cancelDefaultFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => event.preventDefault()

    const confirmButtonClicked = () => {
        props.onSubmitCallback({name, phone, email, cardNumber, cardOwner, cardExpirationDate, address })
    }

    return (
        <form action="#" onSubmit={cancelDefaultFormSubmit} className={styles.form}>
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

            <CardDetails cardNumber={shownCardNumberValue}
                         owner={cardOwner}
                         expirationDate={cardShownExpirationDate}
                         onCardNumberChange={cardNumberChanged}
                         onExpirationDateChange={cardExpDateChanged}
                         onOwnerChange={cardOwnerChanged}
            />

            <button className="blue-button">Confirm</button>
        </form>
    )
}


const verifyCardNumber = (cardNumber: string): boolean => {
    const DIGITS: string = '0123456789'
    const MAX_CARD_NUMBER_LENGTH: number = 16

    return Array.from(cardNumber).every(symbol => DIGITS.includes(symbol)) && cardNumber.length <= MAX_CARD_NUMBER_LENGTH
}

const formatCardNumber = (cardNumber: string): string => {
    let response: string = ''
    let counter: number = 0
    for (let index = 0; index < cardNumber.length; ++index) {
        if (counter === 4) {
            counter = 0
            response += CARD_NUMBER_DELIMITER
        }
        response += cardNumber[index]
        ++counter
    }
    return response
}

const verifyDate = (date: string): boolean => {
    const DIGITS: string = '0123456789'
    const MAX_CARD_NUMBER_LENGTH: number = 4

    return Array.from(date).every(symbol => DIGITS.includes(symbol)) && date.length <= MAX_CARD_NUMBER_LENGTH
}

const formatCardDate = (cardDate: string): string => {
    if (cardDate.length <= 2)
        return cardDate

    return cardDate.slice(0, 2) + CARD_DATE_DELIMITER + cardDate.slice(2)
}

