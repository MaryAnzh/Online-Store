import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import {ItemsPage} from './pages/items-page/ItemsPage'
import {CartPage} from './pages/cart-page/CartPage'
import {NotFoundPage} from './pages/not-found-page/NotFoundPage'
import {Checkbox} from './components/ui/checkbox/Checkbox'

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

        <Checkbox onChange={() => {}}/>
        <main>
            <Routes>
                <Route path="/" element={<ItemsPage/>}></Route>
                <Route path="/cart" element={<CartPage/>}></Route>
                <Route path="/*" element={<NotFoundPage/>}></Route>
            </Routes>
        </main>
    </Router>
)
