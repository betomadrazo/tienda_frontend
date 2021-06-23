import axios from 'axios'

import {
  ARTICLE_CREATE_SUCCESS,
  ARTICLE_CREATE_FAIL,
  ARTICLE_GET_SUCCESS,
  ARTICLE_GET_FAIL,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_UPDATE_SUCCESS,
  ARTICLE_UPDATE_FAIL,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_CURRENT_ID,
} from '../constants/articleConstants'

import { API_URL } from '../constants/constants'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const createArticle = (article) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const createArticleConfig = JSON.parse(JSON.stringify(config))
    createArticleConfig.headers[
      'Authorization'
    ] = `Bearer ${userInfo.jwt_token}`

    const { data } = await axios.post(
      `${API_URL}/articulos`,
      article,
      createArticleConfig
    )

    dispatch({ type: ARTICLE_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ARTICLE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listArticles = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const listArticlesConfig = JSON.parse(JSON.stringify(config))
    listArticlesConfig.headers['Authorization'] = `Bearer ${userInfo.jwt_token}`

    const { data } = await axios.get(
      `${API_URL}/articulos/usuario/${userInfo.id.$oid}`,
      listArticlesConfig
    )

    dispatch({
      type: ARTICLE_LIST_SUCCESS,
      payload: data,
    })
    localStorage.setItem('userArticles', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ARTICLE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateArticle = (articleId, article) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const updateArticleConfig = JSON.parse(JSON.stringify(config))
    updateArticleConfig.headers[
      'Authorization'
    ] = `Bearer ${userInfo.jwt_token}`

    const { data } = await axios.put(
      `${API_URL}/articulos/${articleId}`,
      article,
      updateArticleConfig
    )

    dispatch({ type: ARTICLE_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ARTICLE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteArticle = (articleId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const deleteArticleConfig = JSON.parse(JSON.stringify(config))
    deleteArticleConfig.headers[
      'Authorization'
    ] = `Bearer ${userInfo.jwt_token}`

    const { data } = await axios.delete(
      `${API_URL}/articulos/${articleId}`,
      deleteArticleConfig
    )

    dispatch({
      type: ARTICLE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ARTICLE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const currentArticleId = (articleId) => async (dispatch) => {
  dispatch({
    type: ARTICLE_CURRENT_ID,
    payload: articleId,
  })
}


export const getCurrentArticle = (articleId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const articleGetConfig = JSON.parse(JSON.stringify(config))
    articleGetConfig.headers['Authorization'] = `Bearer ${userInfo.jwt_token}`

    const { data } = await axios.get(
      `${API_URL}/articulos/${articleId}`,
      articleGetConfig
    )

    dispatch({
      type: ARTICLE_GET_SUCCESS,
      payload: data,
    })
    localStorage.setItem('currentArticle', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ARTICLE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}