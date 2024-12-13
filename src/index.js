// Packages
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// View
import App from './components/app';

// styles
import 'antd/dist/antd.css'
import './index.css'

// Mock the `fs` module for browser environments
if (typeof window !== 'undefined') {
  global.fs = {};
}

// context
import RootProvider from './Context/RootProvider'

// Root element
const ROOT = document.getElementById('root')

// render
render(
  <BrowserRouter>
    <RootProvider>
      <App />
    </RootProvider>
  </BrowserRouter>,
  ROOT
)
