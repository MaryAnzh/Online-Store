import styles from './PersonalDataForm.module.scss'
import React from 'react'
import {FormGroup} from './form-group/FormGroup'
import {CardDetails} from './card-details/CardDetails'
import globeImage from '../../../assets/globe.png'
import mastercardImage from '../../../assets/mastercard.png'
import visaImage from '../../../assets/visa.png'
import unionPayImage from '../../../assets/union.png'
import {
    CARD_DATE_DELIMITER,
    CARD_NUMBER_DELIMITER, formatCardDate,
    formatCardNumber, INPUT_TYPE_FOR_TYPE, PATTERN_FOR_TYPE, verifyCard,
    verifyCardNumber, verifyDate
} from '../../../core/utils/formUtils'
import { validate } from 'is-it-email';



interface IFormData {
    name: string
    phone: string
    email: string
    cardNumber: string
    cardExpirationDate: string
    address: string
}

interface IPersonalDataFormProps {
    onSubmitCallback: (data: IFormData) => void
}




export const PersonalDataForm = (props: IPersonalDataFormProps): JSX.Element => {
    const [name, setName] = React.useState<string>('')
    const [nameInvalid, setNameInvalid] = React.useState<boolean>(false)
    const onNameChange = (value: string): void => {
        setName(value)
        setNameInvalid(false)
    }

    const [email, setEmail] = React.useState<string>('')
    const [emailInvalid, setEmailInvalid] = React.useState<boolean>(false)
    const onEmailChange = (value: string): void => {
        setEmail(value)
        setEmailInvalid(false)
    }

    const [address, setAddress] = React.useState<string>('')
    const [addressInvalid, setAddressInvalid] = React.useState<boolean>(false)
    const onAddressChange = (value: string): void => {
        setAddress(value)
        setAddressInvalid(false)
    }

    const [phone, setPhone] = React.useState<string>('')
    const [phoneInvalid, setPhoneInvalid] = React.useState<boolean>(false)
    const onPhoneChange = (value: string): void => {
        setPhone(value)
        setPhoneInvalid(false)
    }

    const [cardNumber, setCardNumber] = React.useState<string>('')
    const [shownCardNumberValue, setShownCardNumberValue] = React.useState<string>('')
    const cardNumberChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.currentTarget.value.replaceAll(CARD_NUMBER_DELIMITER, '')
        if (verifyCardNumber(newValue) && newValue !== cardNumber) {
            setCardNumber(newValue)
            setShownCardNumberValue(formatCardNumber(newValue))
        }

        setShowInvalidTextInCard(false)
    }

    const [cardExpirationDate, setCardExpirationDate] = React.useState<string>('')
    const [cardShownExpirationDate, setCardShownExpirationDate] = React.useState<string>('')
    const cardExpDateChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newValue: string = event.currentTarget.value.replaceAll(CARD_DATE_DELIMITER, '')
        if (verifyDate(newValue) && newValue !== cardExpirationDate) {
            setCardExpirationDate(newValue)
            setCardShownExpirationDate(formatCardDate(newValue))
        }

        setShowInvalidTextInCard(false)
    }

    const [cardCvv, setCardCvv] = React.useState<string>('')
    const cardCvvChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: number = Number.parseInt(event.currentTarget.value)

        if (!Number.isNaN(newValue) && Number.isInteger(newValue) && event.currentTarget.value.length <= 3 && newValue > 0) {
            setCardCvv(event.currentTarget.value)
        } else if (event.currentTarget.value === '') {
            setCardCvv(event.currentTarget.value)
        }

        setShowInvalidTextInCard(false)
    }

    const cancelDefaultFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => event.preventDefault()

    const [paymentSystemLogo, setPaymentSystemLogo] = React.useState<string>('')

    const [showInvalidTextInCard, setShowInvalidTextInCard] = React.useState<boolean>(false)

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

    const confirmButtonClicked = React.useCallback((): void => {
        const isNameValid: boolean = new RegExp(PATTERN_FOR_TYPE.name!).test(name)
        const isAddressValid: boolean = new RegExp(PATTERN_FOR_TYPE.address!).test(address)
        const isEmailValid: boolean = validate(email)
        const isPhoneValid: boolean = new RegExp(PATTERN_FOR_TYPE.phone!).test(phone)

        const isCardValid: boolean = verifyCard(cardExpirationDate, cardCvv, cardNumber)
        if (isNameValid && isAddressValid && isEmailValid && isPhoneValid && isCardValid) {
            props.onSubmitCallback({name, phone, email, cardNumber, cardExpirationDate, address })
            return
        }

        !isNameValid && setNameInvalid(true)
        !isAddressValid && setAddressInvalid(true)
        !isEmailValid && setEmailInvalid(true)
        !isPhoneValid && setPhoneInvalid(true)
        !isCardValid && setShowInvalidTextInCard(true)
    }, [address, cardCvv, cardExpirationDate, cardNumber, email, name, phone, props])




    return (
        <form action="#" onSubmit={cancelDefaultFormSubmit} className={styles.form}>
            <FormGroup value={name}
                       onChange={onNameChange}
                       type="name"
                       label="Name & surname"
                       placeholder="Tony Stark"
                       invalidText="Enter valid name and surname (at least 2 words with length 3 or more letters)"
                       showInvalidText={nameInvalid}
            />
            <FormGroup value={phone}
                       onChange={onPhoneChange}
                       type="phone"
                       label="Phone number"
                       placeholder="+123 123 123 123"
                       invalidText="Enter valid phone number consisting of 9 or more digits and with plus at the beginning"
                       showInvalidText={phoneInvalid}
            />
            <FormGroup value={address}
                       onChange={onAddressChange}
                       type="address"
                       label="Delivery address"
                       placeholder="New York, Avengers tower, 7 floor"
                       invalidText="A real address looks like 3+ words with length 5+ letters !"
                       showInvalidText={addressInvalid}
            />
            <FormGroup value={email}
                       onChange={onEmailChange}
                       type="email"
                       label="Email address"
                       placeholder="iron-man@email.com"
                       invalidText="Entered string doesn't seem to be a real email address"
                       showInvalidText={emailInvalid}
            />

            <CardDetails cardNumber={shownCardNumberValue}
                         expirationDate={cardShownExpirationDate}
                         onCardNumberChange={cardNumberChanged}
                         onExpirationDateChange={cardExpDateChanged}
                         cvv={cardCvv}
                         onCvvChange={cardCvvChanged}
                         paymentSystem={paymentSystemLogo}
                         showInvalidText={showInvalidTextInCard}
            />

            <button className={`blue-button ${styles.sendForm}`} onClick={confirmButtonClicked}>Confirm</button>
        </form>
    )
}




