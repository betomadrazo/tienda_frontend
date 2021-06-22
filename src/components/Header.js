import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo } = userLogin
  const { userInfo: userReg } = userRegister

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className='header'>
      <div className='ident'>
        <Link className='header__log-link' to='/'>
          Tienda
        </Link>
      </div>
      <div className='header__menu'>
        <ul>
          <li></li>
        </ul>
      </div>
      <div className='header__user-account'>
        {userInfo ? (
          <>
            <span>{userInfo.nombre}</span>
            <span onClick={handleLogout} className='header__log-link'>
              Salir
            </span>
          </>
        ) : (
          <Link className='header__log-link' to='/login'>
            Entrar
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
