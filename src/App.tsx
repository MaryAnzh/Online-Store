import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {ItemsPage} from './pages/items-page/ItemsPage'
import {CartPage} from './pages/cart-page/CartPage'
import {NotFoundPage} from './pages/not-found-page/NotFoundPage'
import {ItemBuyModal} from './containers/item-buy-modal/ItemBuyModal'


export const App = (): JSX.Element => (
    <Router>
        <header>
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

        <ItemBuyModal show={true} closeCallback={() => {}}/>

        <main>
            <Routes>
                <Route path="/" element={<ItemsPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/*" element={<NotFoundPage/>}/>
            </Routes>
        </main>
    </Router>
)
