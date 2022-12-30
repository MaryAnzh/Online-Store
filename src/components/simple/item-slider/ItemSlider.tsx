import React, { useState, useEffect } from 'react';
import { Preview } from '../preview-icon/Preview';
import './ItemSlider.scss';

type ItemSliderProps = {
    title: string,
    images: string[],
}

type ImgPreview = {
    id: string,
    src: string,
    title: string,
    isActive: boolean
}

export const ItemSlider = (props: ItemSliderProps) => {
    const images = [...props.images];
    const lastSRC = images.pop();
    if (lastSRC !== undefined) {
        images.unshift(lastSRC);
    }

    const imagesSet: ImgPreview[] = images.map((src, i) => {
        const isActive = (i == 0);
        return {
            id: `${props.title}_${i}`,
            src: src,
            title: props.title,
            isActive: isActive,
        }
    });

    const [previewSRC, setSRC] = useState<string>(images[0]);
    const [prods, setProds] = useState(imagesSet);
    const [active, setActive] = useState<boolean>(false);

    const activePreview = (id: string) => {
        setProds(prods.map(prod => {
            if (prod.id == id) {
                prod.isActive = true;
                setActive(true);
            } else {
                prod.isActive = false;
                setActive(false);
            }
            return prod;
        }));
    }

    const changeImageOnClick = ({ target }: React.MouseEvent<HTMLElement>): void => {
        const elem = target as HTMLImageElement;
        activePreview(elem.id);
        const id = elem.id;
        const info = imagesSet.find(el => el.id == id);
        if (info !== undefined) {
            setSRC(info.src);
        }
    };

    const previews: JSX.Element[] = imagesSet.map((elem) => {
        console.log(`active: ${active}`);
        return <Preview
            key={elem.id}
            id={elem.id}
            title={elem.title}
            src={elem.src}
            isActive={elem.isActive}
            changeImageOnClick={changeImageOnClick}
        />
    });

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