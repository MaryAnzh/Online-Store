import React from 'react'
import styles from './Footer.module.scss'
import {Link} from 'react-router-dom'
import RSLogo from './../../../assets/rs_school_js.svg'


export const Footer = (): JSX.Element => (
    <footer className={styles.footer}>
        <div className={styles.container}>
            <nav className={styles.menuItems}>
                <Link to="/" className={styles.menuItem}>Catalog</Link>
                <Link to="/cart" className={styles.menuItem}>Cart</Link>
            </nav>
            <div className={styles.socialItems}>
                Copyright © 2022 - 2023<br/><br/>Created by: {' '}
                <a href="https://github.com/user-of-github" target="_blank" className={styles.socialItem}>@user-of-github</a>
                {'\u00A0'}and{'\u00A0'}
                <a href="https://github.com/MaryAnzh" target="_blank" className={styles.socialItem}>@MaryAnzh</a>
            </div>
            <div className={styles.inspiredBy} title="Inspired by Rolling Scopes School">
                <a href="https://rs.school/" target="_blank" className={styles.rsLink}>
                    <img src={RSLogo} alt="Rolling Scopes JS logo" width="100"/>
                </a>
            </div>
        </div>
    </footer>
)
