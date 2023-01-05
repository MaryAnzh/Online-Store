import React from 'react'
import styles from './ItemBuyModal.module.scss'
import ReactDOM from 'react-dom'
import {PersonalDataForm} from '../../components/smart/personal-data-form/PersonalDataForm'
import {ShopState} from '../../core/state/ShopState'


interface IItemBuyModal {
    closeCallback: () => void
    state: ShopState
    submitCallback: () => void
}

export const ItemBuyModal = (props: IItemBuyModal): JSX.Element => ReactDOM.createPortal(
        <div className={styles.wrapper}>
            <dialog className={styles.dialog} open>
                <h1 className={styles.title}>Personal details</h1>
                <PersonalDataForm onSubmitCallback={props.submitCallback}/>
                <button className={styles.close} onClick={props.closeCallback}>&times;</button>
            </dialog>
        </div>,
        document.getElementById('modal-root') as HTMLDivElement
    )

