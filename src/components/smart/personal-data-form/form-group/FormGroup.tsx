import styles from './FormGroup.module.scss'
import React from 'react'
import {FormGroupType, INPUT_TYPE_FOR_TYPE, PATTERN_FOR_TYPE} from '../../../../core/utils/formUtils'



interface IFormGroupProps {
    value: string
    onChange: (newValue: string) => void
    type: FormGroupType
    placeholder?: string
    label: string
    invalidText: string
    showInvalidText: boolean
}


export const FormGroup = (props: IFormGroupProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.onChange(event.currentTarget.value)

    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>{props.label}</label>
            <input type={INPUT_TYPE_FOR_TYPE[props.type] || 'text'}
                   pattern={PATTERN_FOR_TYPE[props.type]}
                   className={styles.input}
                   placeholder={props.placeholder}
                   value={props.value}
                   onChange={handleChange}
                   required
            />
            <small className={`${styles.note} ${props.showInvalidText ? styles.show : ''}`}>{props.invalidText}</small>
        </div>
    )
}





