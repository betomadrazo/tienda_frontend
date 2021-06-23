import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import UploadImage from '../components/UploadImage'
import { updateArticle } from '../actions/articleActions'

const ArticleUpdatePage = ({ history }) => {
  const fileInputRef = useRef(null)
  const [previewImage, setPreviewImage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const onFileInputChange = (event) => {
    const { files } = event.target

    if (files && files[0]) {
      let reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = function () {
        setPreviewImage(reader.result)
      }
      reader.onerror = function (error) {
        alert('Hubo un error, vuelve a seleccionar una imagen')
      }
    }
  }

  function handleTakePhoto(dataUri) {
    setShowModal(false)
    setPreviewImage(dataUri)
  }

  const { currentArticle } = useSelector((state) => state.currentArticle)

  const initialValues = {
    nombre: currentArticle.nombre,
    precio: currentArticle.precio,
    descripcion: currentArticle.descripcion,
  }

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Campo requerido'),
    precio: Yup.number().required('Precio(mayor a $0) requerido'),
    descripcion: Yup.string(),
  })

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const articleUpdate = useSelector((state) => state.articleUpdate)
  const {
    success: successUpdate,
    error: errorUpdate,
    article: updatedArticle,
  } = articleUpdate

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (successUpdate) {
      history.push('/usuario')
    }
  }, [
    currentArticle,
    userInfo,
    history,
    previewImage,
    successUpdate,
  ])

  const onSubmit = async (values) => {
    let base64String = previewImage.split(',')[1]

    const article = { ...values, imagen: base64String }
    dispatch(updateArticle(currentArticle._id.$oid, article))
  }

  const formik = useFormik({ initialValues, onSubmit, validationSchema })

  const handleImageUpload = (files) => {}

  const onTargetClick = () => {
    fileInputRef.current.click()
  }

  const handleShowModal = (event) => {
    event.stopPropagation()
    setShowModal(true)
  }

  return (
    <div className='login'>
      {currentArticle && (
        <form onSubmit={formik.handleSubmit}>
          <h2>Crea un artículo</h2>
          {/* <p className="login--error">{ error }</p> */}
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

          <UploadImage
            handleImageUpload={handleImageUpload}
            handleShowModal={handleShowModal}
            previewImage={previewImage}
            onTargetClick={onTargetClick}
            onFileInputChange={onFileInputChange}
            fileInputRef={fileInputRef}
            showModal={showModal}
            handleTakePhoto={handleTakePhoto}
          />

          <button type='submit'>Actualizar Artículo</button>
        </form>
      )}
    </div>
  )
}

export default ArticleUpdatePage
