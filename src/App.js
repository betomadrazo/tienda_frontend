import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <main>
        <Route path="/" component={HomePage} exact />
      </main>
    </Router>
  )
}

export default App
