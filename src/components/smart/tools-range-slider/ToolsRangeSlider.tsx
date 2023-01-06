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

type ElemDragType = {
    isMouseDown: boolean,
    isDrag: boolean,
    startRunnerPos: number,
    currentRunnerPos: number,
    cursorStartPos: null | number,
}

const sliderWidth = 340;
const runnerRadius = 12;
let leftRunner = 0;
let rightRunner = sliderWidth - runnerRadius * 2;


export const ToolsRangeSlider = (props: RangeSliderType) => {
    const min = props.min;
    const max = props.max;
    const count = +max - +min;
    const [minCount, setMinCount] = useState(min);
    const [maxCount, setMaxCount] = useState(max);
    // let minNum = (leftRunner / (sliderWidth / 100)) * (count / 100);
    // console.log(minNum);

    const leftRunnerDrag: ElemDragType = {
        isMouseDown: false,
        isDrag: false,
        startRunnerPos: 0,
        currentRunnerPos: 0,
        cursorStartPos: null,
    }

    const rightRunnerDrag: ElemDragType = {
        isMouseDown: false,
        isDrag: false,
        startRunnerPos: sliderWidth - runnerRadius * 2,
        currentRunnerPos: sliderWidth - runnerRadius * 2,
        cursorStartPos: null,
    }

    let leftRunnerStyle = {
        marginLeft: '0px',
    };
    const [leftRunnerPosX, setLeftRunnerPosX] = useState(leftRunnerStyle);

    let rightRunnerStyle = {
        marginLeft: `${rightRunnerDrag.startRunnerPos}px`,
    };
    const [rightRunnerPosX, setRightRunnerPosX] = useState(rightRunnerStyle);

    const resetDrag = (dragObj: ElemDragType) => {
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
            const maxPos = rightRunner;
            let position = leftRunnerDrag.startRunnerPos + (e.clientX - leftRunnerDrag.cursorStartPos);
            if (position < minPos) {
                position = minPos;
            }
            if (position > maxPos) {
                position = maxPos;
            }
            leftRunner = position;
            leftRunnerStyle = {
                marginLeft: `${position}px`,
            };
            setLeftRunnerPosX(leftRunnerStyle);
            let num = Math.round((((+max - +min) / 100) * (position / (sliderWidth / 100))) + +min);
            setMinCount(num);
        }

        if (rightRunnerDrag.isMouseDown) {
            if (rightRunnerDrag.cursorStartPos === null) {
                rightRunnerDrag.cursorStartPos = e.clientX;
                rightRunnerDrag.isDrag = true;
            }

            const minPos = leftRunner;
            const maxPos = sliderWidth - runnerRadius * 2;
            let position = rightRunnerDrag.startRunnerPos + (e.clientX - rightRunnerDrag.cursorStartPos);
            if (position < minPos) {
                position = minPos;
            }
            if (position > maxPos) {
                position = maxPos;
            }
            rightRunner = position;
            let num = Math.round((((+max - +min) / 100) * (position / (sliderWidth / 100))) + +min);
            setMaxCount(num);
            rightRunnerStyle = {
                marginLeft: `${position}px`,
            };
            setRightRunnerPosX(rightRunnerStyle);
        }
    }

    const runnerMouseUp = (e: MouseEvent) => {
        resetDrag(leftRunnerDrag);
        resetDrag(rightRunnerDrag);
        window.removeEventListener('mousemove', runnerMouseMove);
        window.removeEventListener('mouseup', runnerMouseUp);
    }

    const runnerMouseDown = (e: React.MouseEvent) => {
        const elem = e.target as HTMLElement;
        const type = elem.dataset.type as 'left' | 'right';
        if (type === 'left') {
            leftRunnerDrag.isMouseDown = true;
            const pos = elem.style.marginLeft.replace('px', '');
            leftRunnerDrag.startRunnerPos = +pos;
        }
        if (type == 'right') {
            rightRunnerDrag.isMouseDown = true;
            const pos = elem.style.marginLeft.replace('px', '');
            rightRunnerDrag.startRunnerPos = +pos;
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
                    onMouseDown={runnerMouseDown}>
                </div>
                <div
                    className='range-slider__input__runner-right'
                    data-type='right'
                    style={rightRunnerPosX}
                    onMouseDown={runnerMouseDown}>
                </div>
            </div>
            <div className='range-slider__number-line'>
                <span>{min}</span>
                <span>{minCount} - {maxCount}</span>
                <span>{max}</span>
            </div>

        </div>
    )
}