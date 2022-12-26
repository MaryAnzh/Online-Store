import React from 'react'
import './Apps.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ItemsPage} from './pages/items-page/ItemsPage'
import {CartPage} from './pages/cart-page/CartPage'
import {NotFoundPage} from './pages/not-found-page/NotFoundPage'
import {Header} from './components/common/header/Header'
import {Footer} from './components/common/footer/Footer'

export const App = (): JSX.Element => (
    <Router>
        <section className="wrapper">
            <Header/>
            <main className="wrapper__main">
                <Routes>
                    <Route path="/" element={<ItemsPage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/*" element={<NotFoundPage/>}/>
                </Routes>
            </main>
            < Footer/>
        </section>
    </Router>
)
