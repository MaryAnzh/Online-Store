import './Preview.scss';

type PreviewProps = {
    imageSRC: string,
    title: string,
    active: boolean,
    changeImageOnClick: (e: React.MouseEvent<HTMLElement>) => void,
    handleClick: React.Dispatch<React.SetStateAction<boolean>>
}

export const Preview = ({ active, changeImageOnClick, imageSRC, title, handleClick }: PreviewProps) => {
    let isActive = active ? 'preview-item active-item' : 'preview-item';
    console.log(`Change class name to ${isActive}`);

    return (
        <li
            className={isActive}
            onClick={changeImageOnClick}>
            <img src={imageSRC} alt={title} />
        </li>
    )
}