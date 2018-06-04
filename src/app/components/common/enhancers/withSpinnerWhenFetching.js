import React from 'react';
import { branch, renderComponent } from 'recompose';
import { LoadingSpinner } from '../';

const renderSpinnerWithComponent = BaseComponent => props => (
  <BaseComponent {...props}>
    <LoadingSpinner />
  </BaseComponent>
);

const withSpinnerWhenFetching =
  ({ showBaseComponent = false } = {}) => branch(
    ({ isFetching }) => isFetching,
    showBaseComponent ?
      renderSpinnerWithComponent :
      renderComponent(LoadingSpinner),
  );

export default withSpinnerWhenFetching;
