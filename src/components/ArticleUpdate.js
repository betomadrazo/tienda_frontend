import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UploadImage from './UploadImage'
import ArticleForm from './ArticleForm'
import { updateArticle } from '../actions/articleActions'

const ArticleUpdate = ({ show, handleShowUpdateModal }) => {
  const showHideClassName = show
    ? 'modal-update-article--display-block'
    : 'modal-update-article--display-none'
  const [previewImage, setPreviewImage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const fileInputRef = useRef(null)

  const dispatch = useDispatch()

  const handleImageUpload = (files) => {}

  const handleShowModal = (event) => {
    event.stopPropagation()
    setShowModal(!showModal)
  }

  const onTargetClick = () => {
    fileInputRef.current.click()
  }

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

  const onSubmit = async (values) => {
    let base64String = previewImage.split(',')[1]

    const article = { ...values, imagen: base64String }
    dispatch(updateArticle(article))
  }

  return (
    <div className={`modal-update-article ${showHideClassName}`}>
      <div className='modal-update-article__content'>

        <h2>Modifica tu artículo</h2>

        <ArticleForm onSubmit={onSubmit} />

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
        {/* <button type='submit'>Actualizar</button> */}
        <button type='submit' onClick={handleShowUpdateModal}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default ArticleUpdate
