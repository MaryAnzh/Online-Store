import React from 'react'
import './ItemCard.scss'
import { IItem } from '../../../core/interfaces/catalog.interfaces'
import { ReactComponent as CartLogo } from '../../../assets/cart.svg'
import { ReactComponent as FlagLogo } from '../../../assets/flag.svg';
import { Link } from 'react-router-dom'
import { ShopState } from '../../../core/state/ShopState'
import { observer } from 'mobx-react-lite'


type ItemTypeProps = {
    item: IItem,
    state: ShopState
}

export const ItemCard = observer((props: ItemTypeProps): JSX.Element => {
    const isItemInCard: boolean = props.state.isItemInCart(props.item.id)

    const buyButtonClicked = (): void => {
        isItemInCard
            ? props.state.dropItemFromCart(props.item.id)
            : props.state.increaseQuantityInCart(props.item, true)
    }

    return (
        <div
            key={`products_${props.item.id}`}
            className="item-card">
            <FlagLogo />
            <div className='item-card__in-stock'>Stock: {props.item.stock}</div>

            <div className="item-card__image-wrap">
                <Link to={`/products/${props.item.id}`} className="item-card__image-wrap__link">
                    <img
                        className="item-card__image-wrap__link__image"
                        src={props.item.thumbnail} alt={props.item.title} />
                </Link>
            </div>
            <Link to={`/products/${props.item.id}`}>
                <div className="item-card__info">
                    <h5 className="item-card__info__category">
                        {props.item.category}
                    </h5>
                    <h4 className="item-card__info__title">
                        {props.item.title}
                    </h4>
                    <h5 className="item-card__info__brand">
                        Brand: <span>{props.item.brand}</span>
                    </h5>
                    <p className="item-card__info__description">
                        {props.item.description}
                    </p>
                </div>
            </Link>
            <div className="item-card__buy-info">
                <button className="blue-button item-card__buy-info__button"
                    onClick={buyButtonClicked}>
                    <CartLogo />
                    {props.state.isItemInCart(props.item.id) ? 'In cart' : 'Buy'}
                </button>
                <p className="item-card__buy-info__price">
                    {props.item.price} &#36;
                </p>
            </div>
        </div>
    )
})
