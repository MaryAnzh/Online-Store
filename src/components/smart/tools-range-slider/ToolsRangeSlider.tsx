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
    return (
        <div className='range-slider'>

        </div>
    )
}