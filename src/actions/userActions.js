import axios from 'axios'

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from '../constants/userConstants'

import { API_URL } from '../constants/constants'

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const login = (username, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/autenticar`,
      { nombre: username, contraseña: password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const register = (username, email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/usuario`,
      { nombre: username, correo: email, contraseña: password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}
