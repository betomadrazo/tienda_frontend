import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './components/Header'
import './App.scss'

function App() {
  return (
    <Router basename='/tienda'>
      <Header />
      <main>
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} exact />
        <Route path='/registrarse' component={RegisterPage} exact />
      </main>
    </Router>
  )
}

export default App
