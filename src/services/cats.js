import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_API_URL}/api/cats/`

export const create = async (cat) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(cat),
    })
    return await res.json()
  } catch (error) {
    console.log(error)
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

export const update = async (cat) => {
  try {
    const res = await fetch(`${BASE_URL}${cat.id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(cat)
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const addFeeding = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}${id}/add_feeding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

export const assocToy = async (catId, toyId) => {
  try {
    const res = await fetch(`${BASE_URL}${catId}/assoc_toy/${toyId}`, {
      method: "LINK",
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
    })
    return await res.json()
  } catch (error) {
    console.log(error)
    throw error
  }
}