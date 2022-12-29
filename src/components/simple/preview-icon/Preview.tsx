import './Preview.scss';

type PreviewProps = {
    imageSRC: string,
    title: string,
    changeImageOnClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Preview = (props: PreviewProps) => {
    let isActive = false;
    let active = isActive ? '' : 'active-item';

    return (
        <li
            className={`preview-item ${active}`}
            onClick={props.changeImageOnClick}>
            <img src={props.imageSRC} alt={props.title} />
        </li>
    )
}