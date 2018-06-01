import { handleActions, handleAction, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';
import { CMS as A } from '../const/actionTypes';


const initialState = {
  entities: {},
  pages: [],
  sectionsByPage: {},
  isFetching: false,
};

export const mapEntities = (content, page, section) => (
  content.reduce((entities, entity) => ({
    ...entities, [`${page}.${section}.${entity.slug}`]: entity,
  }), {})
);

export const mapResponseToEntities = (response, page, section) => {
  if (section && section.length > 0) {
    return mapEntities(response[section].content, page, section);
  }

  return response[page].sections.reduce((entities, selectedSection) => {
    const selectedSectionKey = Object.keys(selectedSection)[0];

    return ({
      ...entities,
      ...mapEntities(selectedSection[selectedSectionKey].content, page, selectedSectionKey),
    });
  }, {});
};

export const entitiesReducer = handleAction(
  combineActions(
    A.GET_PAGE_CONTENT_FULFILLED,
    A.GET_SECTION_CONTENT_FULFILLED,
  ),
  (state, { payload }) => ({
    ...state, ...mapResponseToEntities(payload.content, payload.page, payload.section),
  }),
  initialState.entities,
);

export const pagesReducer = handleAction(
  combineActions(
    A.GET_PAGE_CONTENT_FULFILLED,
    A.GET_SECTION_CONTENT_FULFILLED,
  ),
  (state, { payload }) => [...state, payload.page],
  initialState.pages,
);

export const mapResponseToSections = (content, page, section) => (
  section && section.length > 0 ?
    section :
    content[page].sections.map(selectedSection => Object.keys(selectedSection)[0])
);

export const sectionsByPageReducer = handleAction(
  combineActions(
    A.GET_PAGE_CONTENT_FULFILLED,
    A.GET_SECTION_CONTENT_FULFILLED,
  ),
  (state, { payload }) => {
    const { content, page, section } = payload;
    const existPage = !!state[page];

    return existPage ?
      {
        ...state,
        [page]: _.uniq([...state[page], ...mapResponseToSections(content, page, section)]),
      } :
      { ...state, [page]: mapResponseToSections(content, page, section) };
  },
  initialState.sectionsByPage,
);

export const isFetchingReducer = handleActions({
  [A.GET_PAGE_CONTENT_FULFILLED]: () => initialState.isFetching,
  [A.GET_SECTION_CONTENT_FULFILLED]: () => initialState.isFetching,
  [A.GET_PAGE_CONTENT_PENDING]: () => true,
  [A.GET_SECTION_CONTENT_PENDING]: () => true,
}, initialState.isFetching);

export default combineReducers({
  entities: entitiesReducer,
  pages: pagesReducer,
  sectionsByPage: sectionsByPageReducer,
  isFetching: isFetchingReducer,
});
