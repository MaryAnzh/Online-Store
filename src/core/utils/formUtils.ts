export const CARD_NUMBER_DELIMITER: string = ' '
export const CARD_DATE_DELIMITER: string = '/'
const MAX_CARD_NUMBER_LENGTH: number = 16
const DIGITS: string = '0123456789'


export const verifyCardNumber = (cardNumber: string): boolean =>
    Array.from(cardNumber).every(symbol => DIGITS.includes(symbol)) && cardNumber.length <= MAX_CARD_NUMBER_LENGTH


export const formatCardNumber = (cardNumber: string): string => {
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

export const verifyDate = (date: string): boolean => {
    const DIGITS: string = '0123456789'
    const MAX_CARD_NUMBER_LENGTH: number = 4

    if (date.length === 2) {
        if (Number.parseInt(date.slice(0, 2)) > 12) return false
    }

    return Array.from(date).every(symbol => DIGITS.includes(symbol)) && date.length <= MAX_CARD_NUMBER_LENGTH
}

export const formatCardDate = (cardDate: string): string => {
    if (cardDate.length <= 2)
        return cardDate

    return cardDate.slice(0, 2) + CARD_DATE_DELIMITER + cardDate.slice(2)
}

export const PATTERN_FOR_TYPE: Accordance = {
    name: '[A-Za-zа-яА-Я]{3,}[ ]+[A-Za-zа-яА-Я]{3,}(?:[ ]+[A-Za-zа-яА-Я]{3,})*[ ]*',
    phone: '[\\+][0-9]{9,}',
    address: '^[A-Za-zа-яА-Я0-9]{5,}[ ]+[A-Za-zа-яА-Я0-9]{5,}[ ]+(?:[ ]*[A-Za-zа-яА-Я0-9]{5,})+[ ]*$'
}

export const INPUT_TYPE_FOR_TYPE: Required<Accordance> = {
    name: 'text',
    phone: 'text',
    email: 'email',
    address: 'text'
}

export type FormGroupType = 'name' | 'address' | 'email' | 'phone'

export type Accordance = {
    [key in FormGroupType]?: string
}

export const verifyCard = (date: string, cvv: string, number: string): boolean => {
    return verifyCardNumber(number)
        && number.length === MAX_CARD_NUMBER_LENGTH
        && cvv.length === 3
        && Array.from(cvv).every(symbol => DIGITS.includes(symbol))
        && date.length === 4
        && Array.from(date).every(symbol => DIGITS.includes(symbol))
        && Number.parseInt(date.slice(0, 2)) <= 12
        && Number.parseInt(date.slice(0, 2)) !== 0
}
