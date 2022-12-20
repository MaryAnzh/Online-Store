import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Header.scss';

export const Header = (): JSX.Element => (
    <header className='header' style={Style}>
        <h3 className='active'>header</h3>
        <nav>
            <ul>
                <li>
                    <Link to="/">Catalog</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </nav>
    </header>
)

