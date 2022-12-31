import React from 'react'
import {Link} from 'react-router-dom'
import './Header.scss'

export const Header = (): JSX.Element => (
    <header className="header">
        <div className="header__wrapper">
            <div className="header__wrapper__catalog">
                <div className="header__wrapper__catalog__logo">
                    <Link to="/">Delivery</Link>
                </div>
                <div className="header__wrapper__catalog__link">
                    <Link to="/">Catalog</Link>
                </div>
            </div>
            <Link to="/cart" className="header__wrapper__cart">
                <div className="header__wrapper__cart__icon" title="Open cart">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 56.8 51.9">
                        <path d="M42.9,32.3c-3.1,0-6.2,0-9.2-0.1c-5.2-0.1-10.5-0.1-15.7,0l-2.1,0.1v-8.2c-0.1,0-0.3,0-0.4,0c-0.7,0-1.4-0.1-2.1,0l-2.2,0.2
	                     l0.3-20l45.3-0.4l-0.4,2.3c-0.7,4-1.6,8.2-2.5,12.3c-0.9,4-1.8,8.2-2.4,12.1l-0.3,1.6l-1.6,0C47.4,32.3,45.1,32.3,42.9,32.3z
	                     M24.6,28.1c3.1,0,6.2,0,9.2,0.1c4.6,0.1,9.4,0.1,14.1,0c0.6-3.5,1.4-7.1,2.2-10.6c0.7-3.2,1.4-6.5,2-9.7L15.4,8.2l-0.2,11.9
	                     c0.1,0,0.3,0,0.4,0c0.7,0,1.4,0.1,2.1,0l2.1-0.2v8.2C21.5,28.1,23,28.1,24.6,28.1z"/>
                        <polygon points="12,39.9 11.7,32.6 15.7,32.5 15.8,35.9 56.4,35.7 56.5,39.7 "/>
                        <circle cx="20.2" cy="46.4" r="5.5"/>
                        <circle cx="49.2" cy="46.4" r="5.5"/>
                        <rect width="12" height="4"/>
                    </svg>
                </div>
                <p className="header__wrapper__cart__count">0</p>
            </Link>
        </div>

    </header>
)

