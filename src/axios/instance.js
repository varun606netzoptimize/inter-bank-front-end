import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const headers = {
  Accept: 'application/json'
}

const instance = axios.create({
  baseURL: baseURL,
  headers: headers
})

export default instance
