import React, { useEffect, useState } from 'react';
import './ItemPage.scss';
import { Link, useParams } from 'react-router-dom';
import { catalog } from '../../core/data/catalog.data';
import { ReactComponent as CartLogo } from '../../assets/cart.svg';
import { ItemSlider } from '../../components/simple/item-slider/ItemSlider';

export const ItemPage = (): JSX.Element => {
    const params = useParams();
    const prodId = params.id;
    const products = catalog.products.find((el) => `${el.id}` === prodId);

    if (products === undefined) {
        return (
            <section className='item'>
                <h2>Products not found</h2>
            </section>
        )
    }

    return (
        <section className='item'>
            <div className='item__wrap'>
                <ul className='item__wrap__breadcrumb'>
                    <li className='item__wrap__breadcrumb__crumb'>
                        <Link to={'./'}>Catalog
                            <span>/</span> </Link>
                    </li>
                    <li className='item__wrap__breadcrumb__crumb'>{products.category}
                        <span>/</span>
                    </li>
                    <li className='item__wrap__breadcrumb__crumb'>{products.brand}
                    </li>
                </ul>
                <h2 className='item__wrap__title'>{products.title}</h2>
                <div className='item__wrap__info'>
                    <ItemSlider images={products.images} title={products.title} />
                    <div className='item__wrap__info__about'>
                        <div className='item__wrap__info__about__block'>
                            <p className='item__wrap__info__about__block__price'>{products.price} $</p>
                            <p className='item__wrap__info__about__block__category'>
                                Category: <span className='item__wrap__info__about__block__category__name'>{products.category}</span></p>
                            <p className='item__wrap__info__about__block__brand'>
                                Brand: <span className='item__wrap__info__about__block__brand__name'>{products.brand}</span>
                            </p>
                            <p className='item__wrap__info__about__block__description'>{products.description}</p>
                        </div>

                        <button className='blue-button item__wrap__info__about__button'>
                            <CartLogo />
                            <span>To Cart</span>
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}
