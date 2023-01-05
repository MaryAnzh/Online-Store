import styles from './FormGroup.module.scss'
import React from 'react'

export type FormGroupType = 'name' | 'address' | 'email' | 'phone'


interface IFormGroupProps {
    value: string
    onChange: any
    type: FormGroupType
    placeholder?: string
    label: string
    invalidText: string
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
            <small className={styles.note}>{props.invalidText}</small>
        </div>
    )
}

type Accordance = {
    [key in FormGroupType]?: string
}

const PATTERN_FOR_TYPE: Accordance = {
    name: '^[A-Za-zа-яА-Я]{3,}(?:[ ]*[A-Za-zа-яА-Я]{3,})+[ ]*$',
    phone: '[\\+][0-9]{9,}',
    address: '^[A-Za-zа-яА-Я]{5,}[ ]*[A-Za-zа-яА-Я]{5,}[ ]*(?:[ ]*[A-Za-zа-яА-Я]{5,})+[ ]*$'
}

const INPUT_TYPE_FOR_TYPE: Accordance = {
    name: 'text',
    phone: 'text',
    email: 'email',
    address: 'text'
}

