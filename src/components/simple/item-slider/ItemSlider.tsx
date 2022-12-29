import React, { useState } from 'react';
import { Preview } from '../preview-icon/Preview';
import './ItemSlider.scss';

type ItemSliderProps = {
    title: string,
    images: string[],
}

export const ItemSlider = (props: ItemSliderProps) => {
    const images = [...props.images];
    const lastSRC = images.pop();
    if (lastSRC !== undefined) {
        images.unshift(lastSRC);
    }

    const [previewSRC, setSRC] = useState<string>(images[0]);
    const changeImageOnClick = (e: React.MouseEvent<HTMLElement>): void => {
        const elem = e.target as HTMLImageElement;
        const src = elem.src;
        elem.classList.add('item-active');
        setSRC(src);
    };

    const previews = images.map(src =>
        <Preview
            key={src}
            imageSRC={src}
            title={props.title}
            changeImageOnClick={changeImageOnClick}
        />
    );

    return (
        <div className='slider'>
            <ul className='slider__preview'>
                {previews}
            </ul>
            <div className='slider__image-wrap'>
                <img
                    className='slider__image-wrap__image'
                    src={previewSRC}
                    alt={props.title} />
            </div>
        </div>
    )
}