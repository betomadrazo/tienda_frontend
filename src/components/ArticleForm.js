import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'

const ArticleForm = ({ onSubmit }) => {
  const currentArticle = useSelector((state) => state.currentArticle) || null
  const { article } = currentArticle

  const initialValues = {
    nombre: (article && article.nombre )||  '',
    precio: (article && article.precio) || 0,
    descripcion: (article && article.descripcion) || '',
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Campo requerido'),
    precio: Yup.number().required('Precio(mayor a $0) requerido'),
    descripcion: Yup.string(),
  })

  const formik = useFormik({ initialValues, onSubmit, validationSchema })

  return (
    <div className='login'>
      <form onSubmit={formik.handleSubmit}>
        <div className='login__form-group'>
          <label className='login__label' htmlFor='name'>
            Nombre del artículo
            <input
              className='login__input'
              type='text'
              id='name'
              name='nombre'
              placeholder='Qué artículo es?'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
            {formik.errors.nombre && formik.touched.nombre ? (
              <div className='login--error'>{formik.errors.nombre}</div>
            ) : null}
          </label>
        </div>
        <div className='login__form-group'>
          <label className='login__label' htmlFor='price'>
            Precio
            <input
              className='login__input'
              type='number'
              id='price'
              name='precio'
              placeholder='Cuánto cuesta?'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.precio}
            />
            {formik.errors.precio && formik.touched.precio ? (
              <div className='login--error'>{formik.errors.precio}</div>
            ) : null}
          </label>
        </div>
        <div className='login__form-group'>
          <label className='login__label' htmlFor='description'>
            Descripción
            <textarea
              className='login__textarea'
              id='description'
              name='descripcion'
              placeholder='Describe tu producto'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.descripcion}
            ></textarea>
            {formik.errors.descripcion && formik.touched.descripcion ? (
              <div className='login--error'>{formik.errors.descripcion}</div>
            ) : null}
          </label>
        </div>
        <button type="submit">Okas</button>
      </form>
    </div>
  )
}

export default ArticleForm
