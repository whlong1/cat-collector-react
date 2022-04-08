import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/auth`

async function signup(user) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(user),
    })
    const json = await res.json()
    if (json.token) {
      tokenService.setToken(json.token)
    }
    if (json.err) {
      console.log(json.err)
      throw new Error(json.err)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

function getUser() {
  return tokenService.getUserFromToken()
}

function logout() {
  tokenService.removeToken()
}

async function login(credentials) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(credentials),
    })
    const json = await res.json()
    if (json.token) {
      tokenService.setToken(json.token)
    }
    if (json.err) {
      throw new Error(json.err)
    }
  } catch (err) {
    throw err
  }
}

export { signup, getUser, logout, login }