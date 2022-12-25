import React from 'react'
import {ItemBuyModal} from '../../containers/item-buy-modal/ItemBuyModal'


export const CartPage = (): JSX.Element => {
    const [isModalShown, setIsModalShown] = React.useState<boolean>(false)

    const closeModal = (): void => setIsModalShown(false)
    const openModal = (): void => setIsModalShown(true)

    return (
        <>
            <h2>CartPage works</h2>
            <button onClick={openModal}>Show modal</button>
            {isModalShown && <ItemBuyModal closeCallback={closeModal}/>}
        </>
    )
}
