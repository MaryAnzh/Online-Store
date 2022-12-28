import React from 'react'
import './ItemPage.scss'
import { useParams } from 'react-router-dom'
import { catalog } from '../../core/data/catalog.data';

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
                <h2 className='item__wrap__title'>{products.title}</h2>
                <div className='item__wrap__info'>
                    <div className='item__wrap__info__img-wrap'>
                        <img
                            className='item__wrap__info__img-wrap__image'
                            src={products.thumbnail}
                            alt={products.title} />
                    </div>
                    <div className='item__wrap__info__about'>
                    </div>
                </div>
            </div>

        </section>
    )
}
