import styles from './CartSummary.module.scss'
import {IPromoCode} from '../../../core/interfaces/promoCode.interfaces'
import React from 'react'
import {ItemBuyModal} from '../../../containers/item-buy-modal/ItemBuyModal'
import {ActivatedPromo} from '../../simple/activated-promo/ActivatedPromo'
import {ShopState} from '../../../core/state/ShopState'
import {NavigateFunction, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'


interface ICartSummaryProps {
    itemsCount: number
    totalPrice: number
    workingPromoCodes: Array<IPromoCode>
    state: ShopState
}


export const CartSummary = observer((props: ICartSummaryProps): JSX.Element => {
    const [promosActivated, setPromosActivated] = React.useState<Array<IPromoCode>>([])
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = React.useState<number>(props.totalPrice)
    const isModalShown: boolean = props.state.cart.showModal
    const [inputedPromo, setInputedPromo] = React.useState<string>('')
    const [isAddPromoButtonShown, setIsAddPromoButtonShown] = React.useState<boolean>(false)

    const navigate: NavigateFunction = useNavigate()

    const closeModal = (): void => props.state.closeModal()
    const openModal = (): void => props.state.openModal()

    React.useEffect((): void => {
        const totalDiscount: number = promosActivated.reduce((response, current) => response + current.discount, 0)
        setTotalPriceWithDiscount(Math.floor(props.totalPrice * (1 - totalDiscount / 100)))
    }, [props.totalPrice, promosActivated])

    React.useEffect((): void => {
        if (promosActivated.find((item: IPromoCode) => item.code === inputedPromo)) {
            setIsAddPromoButtonShown(false)
            return
        }
        const tryFind = props.workingPromoCodes.find((code: IPromoCode) => code.code === inputedPromo)
        if (!tryFind) {
            setIsAddPromoButtonShown(false)
            return
        }

        setIsAddPromoButtonShown(true)
    }, [inputedPromo, props.workingPromoCodes, promosActivated])

    const onPromoInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputedPromo(event.currentTarget.value)
    }

    const addPromoButtonClickHandler = (): void => {
        if (promosActivated.find((item: IPromoCode) => item.code === inputedPromo)) return

        const tryFind = props.workingPromoCodes.find((code: IPromoCode) => code.code === inputedPromo)

        if (!tryFind) return

        setPromosActivated((old: Array<IPromoCode>): Array<IPromoCode> => [...old, tryFind])
        setIsAddPromoButtonShown(false)
        setInputedPromo('')
    }

    const deactivatePromoCode = (code: string): void => {
        setPromosActivated((old: Array<IPromoCode>) => old.filter((item: IPromoCode) => item.code !== code))
    }

    const confirmModal = (): void => {
        window.alert('Thank you for purchase')

        window.setTimeout((): void => {
            props.state.clearCart()
            navigate('/')
        }, 3500)
    }

    return (
        <div className={styles.cartSummary}>
            <h2 className={styles.title}>Summary</h2>
            <span className={styles.info}>Products: {props.itemsCount}</span>
            {
                promosActivated.length !== 0
                &&
                <span className={styles.oldPrice}>Total: {props.totalPrice} $</span>
            }
            <span className={styles.info}>Total: {totalPriceWithDiscount} $</span>

            {
                promosActivated.length > 0
                &&
                <div className={styles.promosActivated}>
                    {
                        promosActivated.map((promo: IPromoCode): JSX.Element => (
                            <ActivatedPromo promo={promo} key={promo.code} onDeactivate={deactivatePromoCode}/>
                        ))
                    }
                </div>
            }

            <div className={styles.enterPromo}>
                <input className={styles.enterPromoInput}
                       placeholder="Enter your promo here"
                       value={inputedPromo}
                       onChange={onPromoInputChange}
                />
                {
                    isAddPromoButtonShown
                    &&
                    <button className={styles.enterPromoButton}
                            title="Activate promo code"
                            onClick={addPromoButtonClickHandler}>Add <small>{inputedPromo}</small></button>
                }
            </div>

            <small className={styles.hint}>Check promocodes: "RS" and "stage2"</small>

            <button className={styles.buy} onClick={openModal}>Buy now</button>

            {isModalShown && <ItemBuyModal closeCallback={closeModal} state={props.state} submitCallback={confirmModal}/>}
        </div>
    )
})
