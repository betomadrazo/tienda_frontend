import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {
  articleCreateReducer,
  userArticlesReducer,
  articleUpdateReducer,
  articleDeleteReducer,
  articleCurrentIdReducer,
  articleGetReducer,
} from './reducers/articleReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  articleCreate: articleCreateReducer,
  userArticles: userArticlesReducer,
  articleUpdate: articleUpdateReducer,
  articleDelete: articleDeleteReducer,
  articleCurrentId: articleCurrentIdReducer,
  currentArticle: articleGetReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userArticlesFromStorage = localStorage.getItem('userArticles')
  ? JSON.parse(localStorage.getItem('userArticles'))
  : null

const currentArticleFromStorage = localStorage.getItem('currentArticle')
  ? JSON.parse(localStorage.getItem('currentArticle'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userArticles: { userArticles: userArticlesFromStorage },
  currentArticle: { currentArticle: currentArticleFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
