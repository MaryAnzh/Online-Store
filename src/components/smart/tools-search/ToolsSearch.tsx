import './ToolsSearch.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import { ReactComponent as SearchLogo } from '../../../assets/search.svg';
import React from 'react';

type ToolsSearchProps = {
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}

export const ToolsSearch = (props: ToolsSearchProps) => {
    let timerTime = 0;
    let timer: NodeJS.Timer;

    const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearInterval(timer);
        const value = e.target.value;
        timer = setInterval(() => {
            if (timerTime < 1000) {
                timerTime += 100;
            } else {
                console.log(value);
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
                onInput={searchInput} />
            <SearchLogo />
        </div>
    )


}