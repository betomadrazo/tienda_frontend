import React from 'react'
import { FileDrop } from 'react-file-drop'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

import PhotoModal from '../components/PhotoModal'

const UploadImage = ({
  handleImageUpload,
  handleShowModal,
  previewImage,
  onTargetClick,
  onFileInputChange,
  fileInputRef,
  showModal,
  handleTakePhoto,
}) => {
  return (
    <div className='login__upload-area'>
      <FileDrop
        onTargetClick={onTargetClick}
        onDrop={(files, event) => {
          handleImageUpload(files)
        }}
      >
        <div className='login__image-zone'>
          <span className='login__instructions-area'>
            <p>Agrega la imagen arrastrándola o dando click</p>
            <span className='login__photo-link' onClick={handleShowModal}>
              foto
            </span>
          </span>
          <span className='login__image-area'>
            <img style={{ height: '100%' }} src={previewImage} alt='' />
          </span>
        </div>
      </FileDrop>

      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type='file'
        className='hidden'
      />
      <PhotoModal show={showModal}>
        {showModal && (
          <Camera
            isFullScreen={false}
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri)
            }}
          />
        )}
      </PhotoModal>
    </div>
  )
}

export default UploadImage
