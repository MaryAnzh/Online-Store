import React from 'react'
import styles from './ItemBuyModal.module.scss'
import ReactDOM from 'react-dom'
import {PersonalDataForm} from '../../components/personal-data-form/PersonalDataForm'


interface IItemBuyModal {
    closeCallback: () => void
}

export const ItemBuyModal = (props: IItemBuyModal): JSX.Element => {
    const backdropClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.currentTarget === event.target && props.closeCallback()
    }

    return ReactDOM.createPortal(
        <div className={styles.wrapper} onClick={backdropClickHandler}>
            <dialog className={styles.dialog} open>
                <h1 className={styles.title}>Personal details</h1>
                <PersonalDataForm/>
            </dialog>
        </div>,
        document.getElementById('modal-root') as HTMLDivElement
    )
}
