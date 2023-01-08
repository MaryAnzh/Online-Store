import React from 'react'
import styles from './NotFoundPage.module.scss'
import {NavigateFunction, useNavigate} from 'react-router-dom'


export const NotFoundPage = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()

    const goHomeClick = (): void => navigate('/')

    return (
        <div className={styles.container}>
            <div className={styles.notFound}>
                <code className={styles.title}>
                    {'<Error>'}
                    <br/>
                    <span className={styles.tab}>The requested page was not found</span>
                    <br/>
                    {'</Error>'}
                </code>

                <button className={styles.goHome} onClick={goHomeClick}>Go to homepage</button>
            </div>
        </div>
    )
}
