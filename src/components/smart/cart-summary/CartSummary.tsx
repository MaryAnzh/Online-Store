import styles from './CartSummary.module.scss'
import {IPromoCode} from '../../../core/interfaces/promoCode.interfaces'
import React from 'react'
import {ItemBuyModal} from '../../../containers/item-buy-modal/ItemBuyModal'


interface ICartSummaryProps {
    itemsCount: number
    totalPrice: number
    workingPromoCodes: Array<IPromoCode>
}


export const CartSummary = (props: ICartSummaryProps): JSX.Element => {
    const [promosActivated, setPromosActivated] = React.useState<Array<IPromoCode>>([])
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = React.useState<number>(props.totalPrice)

    const [isModalShown, setIsModalShown] = React.useState<boolean>(false)

    const closeModal = (): void => setIsModalShown(false)
    const openModal = (): void => setIsModalShown(true)


    React.useEffect((): void => {
        const totalDiscount: number = promosActivated.reduce((response, current) => response + current.discount, 0)
        setTotalPriceWithDiscount(Math.floor(props.totalPrice * (1 - totalDiscount / 100)))
    }, [props.totalPrice, promosActivated])

    const inputReference: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)

    const addPromoHandler = (): void => {
        const inputedValue: string = inputReference.current?.value || ''

        if (promosActivated.find((item: IPromoCode) => item.code === inputedValue)) return

        const tryFind = props.workingPromoCodes.find((code: IPromoCode) => code.code === inputedValue)

        if (!tryFind) return

        setPromosActivated((old: Array<IPromoCode>): Array<IPromoCode> => [...old, tryFind])
    }

    const deactivatePromoCode = (code: string): void => {
        setPromosActivated((old: Array<IPromoCode>) => old.filter((item: IPromoCode) => item.code !== code))
    }

    return (
        <div className={styles.cartSummary}>
            <h2 className={styles.title}>Summary</h2>
            <span className={styles.info}>Products: {props.itemsCount}</span>
            <span className={styles.info}>Total: {totalPriceWithDiscount} $</span>

            {
                promosActivated.length > 0
                &&
                <div className={styles.promosActivated}>
                    {
                        promosActivated.map((promo: IPromoCode): JSX.Element => (
                            <article className={styles.promoActivated} key={promo.code}>
                                <span className={styles.promoName}>{promo.code}</span>
                                <span className={styles.promoDiscount}>-{promo.discount}%</span>
                                <button className={styles.dropPromo}
                                        title="Deactivate promo code"
                                        onClick={(): void => deactivatePromoCode(promo.code)}>
                                    &times;
                                </button>
                            </article>
                        ))
                    }
                </div>
            }

            <div className={styles.enterPromo}>
                <input className={styles.enterPromoInput} placeholder="Enter your promo here" ref={inputReference}/>
                <button className={styles.enterPromoButton} title="Activate promo code" onClick={addPromoHandler}>Add</button>
            </div>

            <button className={styles.buy} onClick={openModal}>Buy now</button>

            {isModalShown && <ItemBuyModal closeCallback={closeModal}/>}
        </div>
    )
}
