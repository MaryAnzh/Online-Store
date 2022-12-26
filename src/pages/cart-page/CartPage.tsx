import React from 'react'
import {ItemBuyModal} from '../../containers/item-buy-modal/ItemBuyModal'
import {CartSummary} from '../../components/smart/cart-summary/CartSummary'
import {promoCodes} from '../../core/data/promoCode.data'


export const CartPage = (): JSX.Element => {


    return (
        <>
            <h2>CartPage works</h2>
            <div style={{width: 'fit-content',marginLeft: 'auto'}}><CartSummary itemsCount={10} totalPrice={1000} workingPromoCodes={promoCodes}/></div>
        </>
    )
}
