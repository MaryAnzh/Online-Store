import React, { useEffect } from 'react';
import './Preview.scss';

type PreviewProps = {
    id: string,
    src: string,
    title: string,
    isActive: boolean,
    changeImageOnClick: (e: React.MouseEvent<HTMLElement>) => void,
}

export const Preview = ({ id, title, src, isActive, changeImageOnClick }: PreviewProps) => {
    //console.log(`${id}: ${isActive}`);
    return (
        <li
            className={isActive ? 'preview-item-active' : 'preview-item-anActive'}
            id={id}
            onClick={changeImageOnClick}>
            <img src={src} alt={title} />
        </li>
    )
}