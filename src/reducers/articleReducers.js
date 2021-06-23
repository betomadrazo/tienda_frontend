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

export const articleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_CREATE_SUCCESS:
      return { success: true, article: action.payload }
    case ARTICLE_CREATE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const userArticlesReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_LIST_SUCCESS:
      return { articles: action.payload }
    case ARTICLE_LIST_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const articleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_UPDATE_SUCCESS:
      return { success: true }
    case ARTICLE_UPDATE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const articleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_DELETE_SUCCESS:
      return { success: true}
    case ARTICLE_DELETE_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}

export const articleCurrentIdReducer = (state = null, action) => {
  switch (action.type) {
    case ARTICLE_CURRENT_ID:
      return { articleId: action.payload}
    default:
      return state
  }
}

export const articleGetReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_GET_SUCCESS:
      return { success: true, article: action.payload }
    case ARTICLE_GET_FAIL:
      return { error: action.payload }
    default:
      return state
  }
}
