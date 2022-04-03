import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_API_URL}/toys/`

export const create = async (toy) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(toy),
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const getAll = async () => {
  try {
    const res = await fetch(`${BASE_URL}`)
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const getOne = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}${id}`)
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const deleteOne = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const update = async (toy) => {
  try {
    const res = await fetch(`${BASE_URL}${toy.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(toy)
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}