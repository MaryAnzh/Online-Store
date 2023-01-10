import './ToolsSearch.scss';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import { ReactComponent as SearchLogo } from '../../../assets/search.svg';
import React, { useState } from 'react';

type ToolsSearchProps = {
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}

export const ToolsSearch = (props: ToolsSearchProps) => {
    console.log('перезагрузка');
    let currentInputValue: string = '';
    const checkToolsSetting = () => {
        const search: string | null = props.toolsSetting.search;
        console.log(`search = ${props.toolsSetting.search}`);
        if (search !== null) {
            currentInputValue = search;
        } else {
            currentInputValue = '';
            console.log(`search = ${props.toolsSetting.search} отработал`);
            console.log(currentInputValue);
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
                if (value.length > 2) {
                    props.toolsSetting.search = value;
                    props.modifyItems(props.toolsSetting);
                }
                if (value === '') {
                    props.toolsSetting.search = null;
                    props.modifyItems(props.toolsSetting);
                }
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
                    placeholder='Enter more then 3 characters'
                    onInput={searchInput} />
                <SearchLogo />
            
        </div>
    )


}