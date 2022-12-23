import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Game from './routes/CangkulanGame'
import MainMenu from './routes/MainMenu'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />
  },
  {
    path: '/cangkulan',
    element: <Game />
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
