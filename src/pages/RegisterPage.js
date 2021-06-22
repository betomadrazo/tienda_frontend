import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { register } from '../actions/userActions'

function RegisterPage({ location, history }) {
  const initialValues = {
    nombre: '',
    correo: '',
    contraseña: '',
  }

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const onSubmit = async (values) => {
    dispatch(register(values.nombre, values.correo, values.contraseña))
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    correo: Yup.string().email().required('Correo no válido'),
    contraseña: Yup.string().required('Requerida'),
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo, error, redirect])

  return (
    <div className='login'>
      <form onSubmit={formik.handleSubmit}>
        <h2>Regístrate</h2>
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

        <div className='login__form-group'>
          <label className='login__label' htmlFor='email'>
            Correo electrónico
          </label>
          <input
            className='login__input'
            type='text'
            id='email'
            name='correo'
            placeholder='Correo electrónico válido'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.correo && formik.touched.correo ? (
            <div className='login--error'>{formik.errors.correo}</div>
          ) : null}
        </div>

        <div className='login__form-group'>
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

        <button type='submit'>Registrarse</button>
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : 'redirect'}>
            Entra
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
