// useful when we start using query params within currentEnvRoutes.js
import QS from 'query-string';
import R from 'ramda';

const QueryParamsHelper = () => {
  const asParams = (paramsObj) => {
    return R.isEmpty(paramsObj)
      ? ''
      : `?${QS.stringify(paramsObj)}`;
  };

  return {
    asParams,
  };
};

export default QueryParamsHelper();
