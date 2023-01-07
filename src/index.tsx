import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './style/style.scss'
import { App } from './App'
import './core/data/markScore';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
// console.log(catalog)