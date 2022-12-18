import React from 'react'
import styles from './Apps.scss'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    RouteMatch,
    useParams
} from 'react-router-dom'
import {ItemsPage} from './pages/items-page/ItemsPage'
import {CartPage} from './pages/cart-page/CartPage'
import {NotFoundPage} from './pages/not-found-page/NotFoundPage'
import {Header} from './containers/header/Header'
import {Footer} from './containers/footer/Footer'


export const App = () => (
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

        <main>
            <Routes>
                <Route path="/" element={<ItemsPage/>}></Route>
                <Route path="/cart" element={<CartPage/>}></Route>
                <Route path="/*" element={<NotFoundPage/>}></Route>
            </Routes>
        </main>
    </Router>
)
