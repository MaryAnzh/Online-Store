import React from 'react'
import styles from './ItemBuyModal.module.scss'
import ReactDOM from 'react-dom'


interface IItemBuyModal {
    show: boolean
    closeCallback: () => void
}

export const ItemBuyModal = (props: IItemBuyModal): JSX.Element => {
    const backdropClickHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.currentTarget === event.target && props.closeCallback()
    }, [])

    const inputName: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const inputTelephone: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)
    const inputEmail: React.RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(null)


    if (!props.show) return <></>

    return ReactDOM.createPortal(
        <div className={styles.wrapper} onClick={backdropClickHandler}>
            <dialog open={true} className={styles.dialog}>
                <h1 className={styles.title}>Personal details</h1>
                <form action="#" onSubmit={e => e.preventDefault()} className={styles.form}>
                   <div className={styles.formGroup}>
                       <label className={styles.label}>Name & Surname</label>
                       <input type="text"
                              pattern="[A-ZА-Я][a-zа-я-]+[ ]*([A-ZА-я][a-zа-я-]+)?[ ]*([A-ZА-я][a-zа-я-]+)?[ ]*"
                              className={styles.input}
                              placeholder="Tony Stark"
                              required={true}
                              ref={inputName}
                       />
                       <small className={styles.note}>Enter valid name and surname</small>
                   </div>
                   <div className={styles.formGroup}>
                       <label className={styles.label}>Telephone</label>
                       <input type="text"
                              pattern="([\+])?[0-9 -]+[0-9]"
                              className={styles.input}
                              placeholder="+123 123 123 123"
                              required={true}
                              ref={inputTelephone}
                       />
                       <small className={styles.note}>Enter valid phone number consisting of digits (may be with plus in the beginning)</small>
                   </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Delivery address</label>
                        <input type="text"
                               className={styles.input}
                               placeholder="New York, Avengers tower, 7 floor"
                               required={true}
                        />
                        <small className={styles.note}>Is it really an address ?</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email address</label>
                        <input type="email"
                               className={styles.input}
                               placeholder="iron-man@email.com"
                               required={true}
                        />
                        <small className={styles.note}>Entered string doesn't seem to be a real email address</small>
                    </div>
                </form>
            </dialog>
        </div>,
        document.getElementById('modal-root') as HTMLDivElement
    )
}
