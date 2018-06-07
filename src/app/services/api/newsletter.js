import http from '../http';
import { Endpoints } from '../../constants';

const {
  registerNewsletter,
} = Endpoints;

export default {
  registerNewsletter: params => http.post(registerNewsletter(), params),
};
