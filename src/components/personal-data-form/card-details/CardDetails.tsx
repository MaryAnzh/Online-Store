

interface ICardDetailsProps {
    cardNumber: string
    onCardNumberChange: (newCardNumber: string) => void
    cvv: string
    onCvvChange: (newCvv: string) => void
    expirationDate: string
    onExpirationDateChange: (newExpirationDate: string) => void
}

export const CardDetails = (props: ICardDetailsProps): JSX.Element => {
    return (
        <></>
    )
}
