import styles from './Checkbox.module.scss'
import React from 'react'


interface ICheckboxProps {
    initialChecked?: boolean
    onChange: (checked: boolean) => void
    styles?: React.CSSProperties
}

export const Checkbox = (props: ICheckboxProps): JSX.Element => {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(event.currentTarget.checked)
    }

    return (
        <label className={styles.wrapper} style={props.styles}>
            <input type="checkbox" className={styles.checkbox} onChange={changeHandler}/>
        </label>
    )
}
