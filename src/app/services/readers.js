import { default as http } from 'axios'
import endpoints from '../constants/endpoints'

const { readers } = endpoints

const Readers = {
  createReader: (body) => http.post(readers(), body),
}

export default Readers
