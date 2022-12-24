import React from 'react'
import {ItemBuyModal} from '../../containers/item-buy-modal/ItemBuyModal'


export const CartPage = (): JSX.Element => {
    const [showModal, setShowModal] = React.useState<boolean>(false)

    const closeModal = (): void => setShowModal(false)
    const openModal = (): void => setShowModal(true)

    return (
        <>
            <h2>CartPage works</h2>
            <button onClick={openModal}>Show modal</button>
            {showModal && <ItemBuyModal closeCallback={closeModal}/>}
        </>
    )
}
