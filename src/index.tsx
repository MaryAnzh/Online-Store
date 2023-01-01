import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './style/style.scss'
import {App} from './App'
import {catalog} from './core/data/catalog.data'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
