import './ToolsSearch.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import { ReactComponent as SearchLogo } from '../../../assets/search.svg';
import React, { useState } from 'react';

type ToolsSearchProps = {
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}

export const ToolsSearch = (props: ToolsSearchProps) => {
    let currentInputValue: string = '';
    const checkToolsSetting = () => {
        const search: string | null = props.toolsSetting.search;
        if (search !== null) {
            currentInputValue = search;
        }
    }
    checkToolsSetting();

    let timerTime = 0;
    let timer: NodeJS.Timer;
    const [inputValue, setInputValue] = useState(currentInputValue);

    const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearInterval(timer);
        const value = e.target.value;
        setInputValue(value);
        timer = setInterval(() => {
            if (timerTime < 1000) {
                timerTime += 100;
            } else {
                timerTime = 0;
                props.toolsSetting.search = value;
                props.modifyItems(props.toolsSetting);
                clearInterval(timer);
            }
        }, 100);
    }

    return (
        <div className='tools-search'>
            <input
                className='tools-search__input'
                type='text'
                value={inputValue}
                onInput={searchInput} />
            <SearchLogo />
        </div>
    )


}