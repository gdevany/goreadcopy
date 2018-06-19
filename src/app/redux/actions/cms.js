import { createAction } from 'redux-actions';
import { CMS as A } from '../const/actionTypes';
import CmsAPI from '../../services/api/cms';

export const getPageContent = createAction(
  A.GET_PAGE_CONTENT,
  ({ page }) => (
    new Promise((resolve, reject) => (
      CmsAPI.getPageContent({ page })
        .then(({ data }) => resolve({
          page,
          content: data,
        }))
        .catch(err => reject(err))
    ))
  ),
);

export const getSectionContent = createAction(
  A.GET_SECTION_CONTENT,
  ({ page, section }) => (
    new Promise((resolve, reject) => (
      CmsAPI.getSectionContent({ page, section })
        .then(({ data }) => resolve({
          page,
          section,
          content: data,
        }))
        .catch(err => reject(err))
    ))
  ),
);
