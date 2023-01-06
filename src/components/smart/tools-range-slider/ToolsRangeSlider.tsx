import React, { useState } from 'react';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import './ToolsRangeSlider.scss';

type RangeSliderType = {

    filterBy: string,
    min: number,
    max: number,
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}
type ElemMoveType = {
    isMouseDown: boolean,
    isDrag: boolean,
    runnerLeftPos: number,
    cursorStartPos: null | number,
}

export const ToolsRangeSlider = (props: RangeSliderType) => {
    const sliderWidth = 340;
    const min = props.filterBy === 'price' ? `${props.min} $` : props.min;
    const max = props.filterBy === 'price' ? `${props.max} $` : props.max;
    let isRightMoveStart = false;
    let leftPos = 0;
    const leftRunnerDrag: ElemMoveType = {
        isMouseDown: false,
        isDrag: false,
        runnerLeftPos: 0,
        cursorStartPos: null,
    }

    const leftRuggerId = `${props.filterBy}LeftRunner`;
    let leftRangeStyle = {
        transform: 'translateX(0px)',
    };
    const [leftRunnerPosX, setLeftRunnerPosX] = useState(leftRangeStyle);

    const resetDrag = (dragObj: ElemMoveType) => {
        dragObj.isDrag = false;
        dragObj.isMouseDown = false;
        dragObj.cursorStartPos = 0;
    }

    const runnerMouseMove = (e: MouseEvent) => {
        if (leftRunnerDrag.isMouseDown) {
            if (leftRunnerDrag.cursorStartPos === null) {
                leftRunnerDrag.cursorStartPos = e.clientX;
                leftRunnerDrag.isDrag = true;
            }

            const minPos = 0;
            const maxPos = sliderWidth;
            let position = leftRunnerDrag.runnerLeftPos + (e.clientX - leftRunnerDrag.cursorStartPos);
            console.log(position);
            if (position < minPos) {
                position = minPos;
            }
            if (position > maxPos) {
                position = maxPos;
            }

            leftPos = position;
            leftRangeStyle = {
                transform: `translateX(${position}px)`,
            };
            setLeftRunnerPosX(leftRangeStyle);
        }
    }

    const runnerMouseUp = (e: MouseEvent) => {
        if (leftRunnerDrag.isMouseDown) {
            leftRangeStyle = {
                transform: `translateX(${leftPos}px)`,
            };
            setLeftRunnerPosX(leftRangeStyle);
            resetDrag(leftRunnerDrag);
        }
        isRightMoveStart = false;
        window.removeEventListener('mousemove', runnerMouseMove);
        window.removeEventListener('mouseup', runnerMouseUp);
    }

    const runnerMouseDown = (e: React.MouseEvent) => {
        const elem = e.target as HTMLElement;
        const type = elem.dataset.type as 'left' | 'right';
        if (type === 'left') {
            leftRunnerDrag.isMouseDown = true;
            leftRunnerDrag.runnerLeftPos = elem.offsetLeft;
            console.log('leftRunnerDrag.runnerLeftPos');
            console.log(leftRunnerDrag.runnerLeftPos);
        }

        if (type === 'right') {
            isRightMoveStart = true;
        }

        window.addEventListener('mousemove', runnerMouseMove);
        window.addEventListener('mouseup', runnerMouseUp);

    };

    return (
        <div className='range-slider'>
            <div className='range-slider__input'>
                <div
                    className='range-slider__input__runner-left'
                    data-type='left'
                    style={leftRunnerPosX}
                    id={leftRuggerId}
                    onMouseDown={runnerMouseDown}>
                </div>
                <div
                    className='range-slider__input__runner-right'
                    id={`${props.filterBy}RightRunner`}
                    data-type='right'
                    onMouseDown={runnerMouseDown}>
                </div>
            </div>
            <div className='range-slider__number-line'>
                <span>{min}</span>
                <span>{max}</span>
            </div>

        </div>
    )
}