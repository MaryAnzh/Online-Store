import './ToolsSearch.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';
import { ItemsQueryOptions } from '../../../core/types/tools.types';
import { ReactComponent as SearchLogo } from '../../../assets/search.svg';

type ToolsSearchProps = {
    toolsSetting: ItemsQueryOptions,
    modifyItems: (settings: ItemsQueryOptions) => void,
}

export const ToolsSearch = (props: ToolsSearchProps) => {
    return (
        <div className='tools-search'>
            <input
                className='tools-search__input'
                type='text' />
            <SearchLogo />
        </div>
    )


}