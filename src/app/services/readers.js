import { default as http } from 'axios'
import endpoints from '../constants/endpoints'

const { readers, readerValidation } = endpoints

const Readers = {
  createReader: (body) => http.post(readers(), body),
  checkValidation: (params) => http.get(readerValidation(params))
}

export default Readers
