import React from 'react'
import './Apps.scss'
import { BrowserRouter as Router, Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom'
import { ItemsPage } from './pages/items-page/ItemsPage'
import { CartPage } from './pages/cart-page/CartPage'
import { NotFoundPage } from './pages/not-found-page/NotFoundPage'
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer/Footer'
import { ItemPage } from './pages/item-page/ItemPage'
import { ShopState } from './core/state/ShopState'


export const App = (): JSX.Element => {
    const state: React.MutableRefObject<ShopState> = React.useRef<ShopState>(new ShopState())

    return (
        <HashRouter>
            <section className="wrapper">
                <Header state={state.current} />
                <main className="wrapper__main">
                    <Routes>
                        <Route path="/" element={<ItemsPage state={state.current} />} />
                        <Route path="/cart" element={<CartPage state={state.current} />} />
                        <Route path="/products-id/:id" element={<ItemPage state={state.current} />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                < Footer />
            </section>
        </HashRouter>
    )
}
