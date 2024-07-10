import axios from 'axios'
const baseUrl = '/api/blogs'

let userToken = null
const setUserToken = token => {
  userToken = `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (object) => {
  const config = {
    headers: { Authorization: userToken }
  }
  const request = axios.post(baseUrl, object, config)
  return request.then(response => response.data)
}

const update = (object) => {
  const config = {
    headers: { Authorization: userToken }
  }
  const request = axios.put(`${baseUrl}/${object.id}`, object, config)
  return request.then(response => response.data)
}

export default { getAll, setUserToken, create, update }