import React, { useState, useEffect } from 'react';
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
    const [active, setActive] = useState<boolean>(false);

    const activePreView = (value: boolean) => {
        setActive(value);
    }

    const changeImageOnClick = ({ target }: React.MouseEvent<HTMLElement>): void => {
        const elem = target as HTMLImageElement;
        const childeNode = Array.from(elem.childNodes);
        const img = childeNode[0] as HTMLImageElement;
        const src = img !== undefined ? img.src : '';
        setSRC(src);
    };

    const previews = images.map((src, i) =>

        <Preview
            key={src}
            imageSRC={src}
            title={props.title}
            changeImageOnClick={changeImageOnClick}
            active={active}
            handleClick={setActive}
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