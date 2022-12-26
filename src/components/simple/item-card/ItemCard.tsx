import React from 'react'
import './ItemCard.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { ReactComponent as CartLogo } from '../../../assets/cart.svg';


type ItemTypeProps = {
    item: IItem,
}

export const ItemCard = (props: ItemTypeProps): JSX.Element => {

    return (<section className='item-card'>

        <div className='item-card__wrap'>
            <div className='item-card__wrap__image-wrap'>
                <img
                    className='item-card__wrap__image-wrap__image'
                    src={props.item.thumbnail} alt={props.item.title} />
            </div>

            <div className='item-card__wrap__info'>
                <h5 className='item-card__wrap__info__category'>
                    {props.item.category}
                </h5>
                <h4 className='item-card__wrap__info__title'>
                    {props.item.title}
                </h4>
                <h5 className='item-card__wrap__info__brand'>
                    Brand: <span>{props.item.brand}</span>
                </h5>
                <div className='item-card__wrap__info__description'>
                    <p> {props.item.description}</p>
                </div>
            </div>
            <div className='item-card__wrap__buy-info'>
                <button className='blue-button item-card__wrap__buy-info__button'>
                    <CartLogo />
                    Buy
                </button>
                <p className='item-card__wrap__buy-info__price'>
                    {props.item.price} &#36;
                </p>
            </div>
        </div>
    </section>)
}