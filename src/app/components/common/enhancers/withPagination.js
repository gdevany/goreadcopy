import { mapProps } from 'recompose';

const getPaginatedItems = (items = [], page = 1, numberOfItemsPerPage) => {
  const lastElementOnPage = (page * numberOfItemsPerPage);

  return items.slice(0, lastElementOnPage);
};

const withPagination = ({ numberOfItemsPerPage = 5 } = {}) => (
  mapProps(({ page, items, ...props }) => {
    const paginatedItems = getPaginatedItems(items, page, numberOfItemsPerPage);

    return {
      ...props,
      items: paginatedItems,
    };
  })
);

export default withPagination;
