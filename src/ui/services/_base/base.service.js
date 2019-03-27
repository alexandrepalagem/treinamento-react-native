import axios from 'axios'

const httpClient = baseURL => axios.create({
  timeout: 30000, 
  headers: {
    'Content-type': 'application/json'
  },
  baseURL
})

export class BaseService {
  constructor(baseURL) {
    this.client = httpClient(baseURL)
  }


  get(url) {
    return this.client
      .get(url)
      .then(result => result.data)
  }
}