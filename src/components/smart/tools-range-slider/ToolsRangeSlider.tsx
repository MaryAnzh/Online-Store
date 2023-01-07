import React, { useState } from 'react';
import { ItemsQueryOptions, RangeType } from '../../../core/types/tools.types';
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

export const ToolsRangeSlider = (props: RangeSliderType) => {
    const sliderWidth = 300;
    const runnerRadius = 12;
    const min = props.min;
    const max = props.max;
    let minSettingValue = min;
    let maxSettingValue = max;
    const sliderRange = +max - +min;

    const convertPXToValue = (px: number): number => {
        return Math.round(((sliderRange / 100) * (px / (sliderWidth / 100))) + +min);
    }
    const convertValueToPx = (value: number): number => {
        return Math.round(((value - +min) / (sliderRange / 100)) * (sliderWidth / 100));
    }

    const convertPXToValueWithCorrect = (px: number): number => {
        return Math.round(((sliderRange / 100) * ((px + (runnerRadius * 2)) / (sliderWidth / 100))) + +min);
    }

    let currentRunnerLeftPos = convertValueToPx(min);
    let currentRunnerRightPos = convertValueToPx(max);

    const checkToolsSettings = () => {
        const range = props.toolsSetting.range;
        const key = props.filterBy as keyof RangeType;
        const rangeSetting = range[key];

        if (rangeSetting !== null) {
            minSettingValue = rangeSetting[0];
            maxSettingValue = rangeSetting[1];
            currentRunnerLeftPos = convertValueToPx(minSettingValue);
            currentRunnerRightPos = convertValueToPx(maxSettingValue);
        }
    }
    checkToolsSettings();
    const [minCount, setMinCount] = useState(minSettingValue);
    const [maxCount, setMaxCount] = useState(maxSettingValue);
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
        marginLeft: `${currentRunnerLeftPos}px`,
    };
    const [leftRunnerPosX, setLeftRunnerPosX] = useState(leftRunnerStyle);

    let rightRunnerStyle = {
        marginLeft: `${currentRunnerRightPos}px`,
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
            const maxPos = currentRunnerRightPos;
            let position = leftRunnerDrag.startRunnerPos + (e.clientX - leftRunnerDrag.cursorStartPos);
            if (position < minPos) {
                position = minPos;
            }
            if (position > maxPos) {
                position = maxPos;
            }
            leftRunnerDrag.currentRunnerPos = position;
            leftRunnerStyle = {
                marginLeft: `${position}px`,
            };
            setLeftRunnerPosX(leftRunnerStyle);
            let num = convertPXToValue(position);
            setMinCount(num);
        }

        if (rightRunnerDrag.isMouseDown) {
            if (rightRunnerDrag.cursorStartPos === null) {
                rightRunnerDrag.cursorStartPos = e.clientX;
                rightRunnerDrag.isDrag = true;
            }

            const minPos = currentRunnerLeftPos;
            const maxPos = sliderWidth - runnerRadius * 2;
            let position = rightRunnerDrag.startRunnerPos + (e.clientX - rightRunnerDrag.cursorStartPos);
            if (position < minPos) {
                position = minPos;
            }
            if (position > maxPos) {
                position = maxPos;
            }
            rightRunnerDrag.currentRunnerPos = position;
            let num = convertPXToValueWithCorrect(position);
            setMaxCount(num);
            rightRunnerStyle = {
                marginLeft: `${position}px`,
            };
            setRightRunnerPosX(rightRunnerStyle);
        }
    }

    const runnerMouseUp = (e: MouseEvent) => {
        currentRunnerLeftPos = leftRunnerDrag.currentRunnerPos;
        currentRunnerRightPos = rightRunnerDrag.currentRunnerPos;
        const leftValue = convertPXToValue(currentRunnerLeftPos);
        const rightValue = convertPXToValueWithCorrect(currentRunnerRightPos);
        console.log(currentRunnerRightPos);
        console.log(rightValue);

        const key = props.filterBy as keyof RangeType;
        if (leftValue === min && rightValue === max) {
            props.toolsSetting.range[key] = null;
        } else {
            props.toolsSetting.range[key] = [leftValue, rightValue];
        }
        props.modifyItems(props.toolsSetting);

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
                <span className='range-slider__number-line__dynamic'>{minCount} - {maxCount}</span>
                <span>{max}</span>
            </div>

        </div>
    )
}