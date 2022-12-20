import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Header.scss';

export const Header = (): JSX.Element => (
    <header className='header' style={Style}>
        <div className='header__wrapper'>
            <div className='header__wrapper__catalog'>
                <div className='header__wrapper__catalog__logo'>
                    <Link to="/">LOGO</Link>
                </div>
                <Link to="/">Catalog</Link>
            </div>
            <div className='header__wrapper__cart'>
                <Link to="/cart">Cart</Link>
            </div>
        </div>

    </header>
)

