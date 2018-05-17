import http from '../http';
import { Endpoints } from '../../constants';

const { getPageContent, getSectionContent } = Endpoints;

const Cms = () => ({
  getPageContent: params => http.get(getPageContent(params)),
  getSectionContent: params => http.get(getSectionContent(params)),
});

export default Cms();
