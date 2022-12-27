import React from 'react'
import './ItemPage.scss'
import { useParams } from 'react-router-dom'
import { catalog } from '../../core/data/catalog.data';
import { NotFoundPage } from '../not-found-page/NotFoundPage';

export const ItemPage = (): JSX.Element => {
    const params = useParams();
    const prodId = params.id;
    const products = catalog.products.find((el) => `${el.id}` === prodId);
    if (products === undefined) {
        return (
            <div className='item'>
                <h2>Products not found</h2>
            </div>
        )
    }
    return (
        <div className='item'>
            <h2>{products.title}</h2>
        </div>
    )
}
