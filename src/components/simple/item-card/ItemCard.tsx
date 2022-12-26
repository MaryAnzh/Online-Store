import React from 'react'
import './ItemCard.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';

type ItemTypeProps = {
    item: IItem,
}

export const ItemCard = (props: ItemTypeProps): JSX.Element => (
    <section className='item-card'>
        <h3>Items Card</h3>
        <div className='item-card__wrap'>
        </div>
    </section>
);