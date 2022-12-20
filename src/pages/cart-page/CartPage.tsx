import React from 'react'
import styles from './CartPage.scss'
import {ItemBuyModal} from '../../containers/item-buy-modal/ItemBuyModal'


export const CartPage = (): JSX.Element => {
    const [showModal, setShowModal] = React.useState<boolean>(true)

    return (
        <>
            <h2>CartPage work</h2>
            <ItemBuyModal show={showModal}
                          closeCallback={() => setShowModal(false)}
            />
        </>
    )
}
