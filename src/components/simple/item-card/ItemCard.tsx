import React from 'react'
import './ItemCard.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { ReactComponent as CartLogo } from '../../../assets/cart.svg';
import { Link } from 'react-router-dom';


type ItemTypeProps = {
    item: IItem,
}

export const ItemCard = (props: ItemTypeProps): JSX.Element => {

    return (
        <div 
        key={`products_${props.item.id}`}
        className='item-card'>
            <div className='item-card__image-wrap'>
                <Link to={`/products/${props.item.id}`} className='item-card__image-wrap__link'>
                    <img
                        className='item-card__image-wrap__link__image'
                        src={props.item.thumbnail} alt={props.item.title} />
                </Link>
            </div>

            <div className='item-card__info'>
                <h5 className='item-card__info__category'>
                    {props.item.category}
                </h5>
                <h4 className='item-card__info__title'>
                    {props.item.title}
                </h4>
                <h5 className='item-card__info__brand'>
                    Brand: <span>{props.item.brand}</span>
                </h5>
                <p className='item-card__info__description'>
                    {props.item.description}
                </p>
            </div>
            <div className='item-card__buy-info'>
                <button className='blue-button item-card__buy-info__button'>
                    <CartLogo />
                    Buy
                </button>
                <p className='item-card__buy-info__price'>
                    {props.item.price} &#36;
                </p>
            </div>
        </div>)
}