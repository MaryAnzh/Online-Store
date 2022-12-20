import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ItemsPage } from './pages/items-page/ItemsPage'
import { CartPage } from './pages/cart-page/CartPage'
import { NotFoundPage } from './pages/not-found-page/NotFoundPage'
import { Checkbox } from './components/ui/checkbox/Checkbox'
import { Header } from './containers/header/Header'
import { Footer } from './containers/footer/Footer'


export const App = (): JSX.Element => (
    <Router>
        < Header />
        <main>
            <Routes>
                <Route path="/" element={<ItemsPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
                <Route path="/*" element={<NotFoundPage />}></Route>
            </Routes>
        </main>
        < Footer />
    </Router>
)
