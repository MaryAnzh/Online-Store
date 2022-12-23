import React from 'react'
<<<<<<< HEAD
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
=======
import './Apps.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ItemsPage } from './pages/items-page/ItemsPage'
import { CartPage } from './pages/cart-page/CartPage'
import { NotFoundPage } from './pages/not-found-page/NotFoundPage'
import { Checkbox } from './components/ui/checkbox/Checkbox'
import { Header } from './containers/header/Header'
import { Footer } from './containers/footer/Footer'

export const App = (): JSX.Element => (
    <Router>
        <section className='wrapper'>
            < Header />
            <main className='wrapper__main'>
                <Routes>
                    <Route path="/" element={<ItemsPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/*" element={<NotFoundPage />}></Route>
                </Routes>
            </main>
            < Footer />

        </section>

>>>>>>> 5528c709ce294c5e50faafae013205caf76f5c6d
    </Router>
)
