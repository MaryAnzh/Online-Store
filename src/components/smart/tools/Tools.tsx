import './Tools.scss';
import { IItem } from '../../../core/interfaces/catalog.interfaces';

type ToolsProps = {
    items: IItem[],
    setItems: (items: IItem[]) => void;
}

export const Tools = (props: ToolsProps) => {
    const itemsList = props.items;
    const newList = itemsList.filter((el: IItem) => el.brand === 'Apple');
    const click = () => {
        props.setItems(newList);
    }

    return (
        <div>
            Items length: {newList.length}
            <button onClick={click}>Click</button>

        </div>
    );
}