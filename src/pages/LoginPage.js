import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { login } from '../actions/userActions'

function LoginPage({ location, history }) {
  const initialValues = {
    nombre: '',
    contraseña: '',
  }

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const onSubmit = async (values) => {
    dispatch(login(values.nombre, values.contraseña))
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    contraseña: Yup.string().required('Requerida'),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const redirect = location.search ? location.search.split('=')[1] : '/login'

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo, redirect])


  return (
    <div className='login'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Ingresa a tu cuenta</h2>
        <p className="login--error">{ error }</p>

        <div className='login__form-group'>
          <label className='login__label' htmlFor='name'>
            Nombre de usuario
          </label>
          <input
            className='login__input'
            type='text'
            id='name'
            name='nombre'
            placeholder='Sin espacios en blanco ni caracteres especiales'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
          />
          {formik.errors.nombre && formik.touched.nombre ? (
            <div className='login--error'>{formik.errors.nombre}</div>
          ) : null}
        </div>

        <div className="login__form-group">
        <label className='login__label' htmlFor='contraseña'>
          Contraseña
        </label>
        <input
          className='login__input'
          type='password'
          id='password'
          name='contraseña'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.errors.contraseña && formik.touched.contraseña ? (
          <div className='login--error'>{formik.errors.contraseña}</div>
        ) : null}
        </div>

        <button type='submit'>Entrar</button>
        <p>
          ¿No tienes cuenta?
          <Link to={'/registrarse'}>Regístrate</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
