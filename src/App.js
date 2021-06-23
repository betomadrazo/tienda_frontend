import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import ArticlePage from './pages/ArticlePage'
import ArticleEditPage from './pages/ArticleEditPage'
import ArticleUpdatePage from './pages/ArticleUpdatePage'
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
        <Route path='/usuario' component={ProfilePage} exact />
        <Route path='/articulo' component={ArticlePage} exact />
        <Route path='/crear_articulo' component={ArticleEditPage} exact />
        <Route path='/actualizar_articulo' component={ArticleUpdatePage} exact />
      </main>
    </Router>
  )
}

export default App
