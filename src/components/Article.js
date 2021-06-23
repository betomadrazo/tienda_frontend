import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteArticle } from '../actions/articleActions'

import { getCurrentArticle } from '../actions/articleActions'

const Article = ({ history, article, handleShowUpdateModal, articleId }) => {

  const dispatch = useDispatch()

  const handleUpdateArticle = () => {
    dispatch(getCurrentArticle(articleId))
    history.push('actualizar_articulo')
  }

  const handleDeleteArticle = (event) => {
    event.preventDefault()
    if (window.confirm('Borrar este artículo?')) {
      dispatch(deleteArticle(article._id.$oid))
    }
  }

  return (
    <div className="article">
      <img src={article.imagen} alt={article.nombre} />
      <h3>{article.nombre}</h3>
      <p>{article.descripcion}</p>
      <p className="article__price">$ {article.precio}</p>
      <div className="article__update-delete">
        <button onClick={() => handleUpdateArticle(articleId)}>U</button>
        <button onClick={handleDeleteArticle}>X</button>
      </div>
    </div>
  )
}

export default Article
