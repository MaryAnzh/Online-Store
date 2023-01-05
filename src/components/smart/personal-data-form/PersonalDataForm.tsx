import styles from './PersonalDataForm.module.scss'
import React from 'react'
import {FormGroup} from './form-group/FormGroup'
import {CardDetails} from './card-details/CardDetails'
import globeImage from '../../../assets/globe.png'
import mastercardImage from '../../../assets/mastercard.png'
import visaImage from '../../../assets/visa.png'
import unionPayImage from '../../../assets/union.png'


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

    const [cardCvv, setCardCvv] = React.useState<string>('')
    const cardCvvChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: number = Number.parseInt(event.currentTarget.value)

        if (!Number.isNaN(newValue) && Number.isInteger(newValue) && event.currentTarget.value.length <= 3 && newValue > 0) {
            setCardCvv(event.currentTarget.value)
        } else if (event.currentTarget.value === '') {
            setCardCvv(event.currentTarget.value)
        }
    }

    const cancelDefaultFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => event.preventDefault()

    const confirmButtonClicked = () => {
        props.onSubmitCallback({name, phone, email, cardNumber, cardOwner, cardExpirationDate, address })
    }


    const [paymentSystemLogo, setPaymentSystemLogo] = React.useState<string>('')

    React.useEffect((): void => {
        if (cardNumber.length !== 0) {
            if (cardNumber[0] === '6') setPaymentSystemLogo(unionPayImage)
            else if (cardNumber[0] === '4') setPaymentSystemLogo(visaImage)
            else if (cardNumber[0] === '5') setPaymentSystemLogo(mastercardImage)
            else setPaymentSystemLogo(globeImage)
        } else {
            setPaymentSystemLogo(globeImage)
        }
    }, [cardNumber])

    return (
        <form action="#" onSubmit={cancelDefaultFormSubmit} className={styles.form}>
            <FormGroup value={name}
                       onChange={setName}
                       type="name"
                       label="Name & surname"
                       placeholder="Tony Stark"
                       invalidText="Enter valid name and surname (at least 2 words with length 3 or more letters)"
            />
            <FormGroup value={phone}
                       onChange={setPhone}
                       type="phone"
                       label="Phone number"
                       placeholder="+123 123 123 123"
                       invalidText="Enter valid phone number consisting of 9 or more digits and with plus at the beginning"
            />
            <FormGroup value={address}
                       onChange={setAddress}
                       type="address"
                       label="Delivery address"
                       placeholder="New York, Avengers tower, 7 floor"
                       invalidText="A real address looks like 3+ words with length 5+ letters !"
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
                         cvv={cardCvv}
                         onCvvChange={cardCvvChanged}
                         paymentSystem={paymentSystemLogo}
            />

            <button className={`blue-button ${styles.sendForm}`} onClick={confirmButtonClicked}>Confirm</button>
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

    if (date.length === 2) {
        if (Number.parseInt(date.slice(0, 2)) > 12) return false
    }

    return Array.from(date).every(symbol => DIGITS.includes(symbol)) && date.length <= MAX_CARD_NUMBER_LENGTH
}

const formatCardDate = (cardDate: string): string => {
    if (cardDate.length <= 2)
        return cardDate

    return cardDate.slice(0, 2) + CARD_DATE_DELIMITER + cardDate.slice(2)
}

