import React from 'react';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import './ToolsRangeSlider.scss';

type RangeSliderType = {
    filterBy: string,
    min: number,
    max: number,
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}

export const ToolsRangeSlider = (props: RangeSliderType) => {
    const min = props.filterBy === 'price' ? `${props.min} $` : props.min;
    const max = props.filterBy === 'price' ? `${props.max} $` : props.max;

    return (
        <div className='range-slider'>
            <div className='range-slider__input'>
                <div
                    className='range-slider__input__runner-left'
                    id={`${props.filterBy}LeftRunner`}></div>
                <div
                    className='range-slider__input__runner-right'
                    id={`${props.filterBy}RightRunner`}>
                </div>
            </div>
            <div className='range-slider__number-line'>
                <span>{min}</span>
                <span>{max}</span>
            </div>

        </div>
    )
}