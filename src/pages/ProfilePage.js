import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listArticles } from '../actions/articleActions'
import Article from '../components/Article'
import ArticleUpdate from '../components/ArticleUpdate'

const ProfilePage = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const userArticles = useSelector((state) => state.userArticles)
  const { error, articles } = userArticles

  const deleteArticle = useSelector((state) => state.articleDelete)
  const {
    error: deleteError,
    success: deleteSuccess,
  } = deleteArticle

  const handleShowUpdateModal = () => {
    // Toggle de mostrar ocultar modal
    setShowUpdateModal(!showUpdateModal)
  }

  useEffect(() => {
    dispatch(listArticles())
    if (!userInfo) {
      history.push('/login')
    }

    // Vuelve a jalar los artículos del usuario
    if (deleteSuccess) {
      dispatch(listArticles())
    }
  }, [dispatch, userInfo, history, deleteSuccess])

  const articlesList =
    articles &&
    articles.map((article) => (
      <Article
        history={history}
        article={article}
        handleShowUpdateModal={handleShowUpdateModal}
        key={article._id.$oid}
        articleId={article._id.$oid}
      />
    ))

  return (
    <>
      <h2>Mis artículos en venta</h2>
      <ArticleUpdate
        show={showUpdateModal}
        handleShowUpdateModal={handleShowUpdateModal}
      />
      <div className='articles-list'>{articlesList}</div>
    </>
  )
}

export default ProfilePage
