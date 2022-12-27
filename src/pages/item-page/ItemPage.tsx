import React from 'react'
import './ItemPage.scss'
import { useParams } from 'react-router-dom'
import { catalog } from '../../core/data/catalog.data';

export const ItemPage = (): JSX.Element => {
    const params = useParams();
    const prodId = params.id;
    const products = catalog.products.find((el) => `${el.id}` === prodId);
    if(products === undefined) {
        return (<h2>Item: такого продукта нет</h2>)
    }
    return (<h2>{products.title}</h2>)
}
