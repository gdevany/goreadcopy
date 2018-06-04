import { lifecycle, withHandlers, compose, withState } from 'recompose';
import ReactDOM from 'react-dom';

const getElementScroll = currentElement => (
  -currentElement.getBoundingClientRect().top
);

const getScrollOffsetFromElementTop = currentElement => (
  -currentElement.getBoundingClientRect().top
);

const getScrollOffsetFromElementBottom = currentElement => (
  currentElement.getBoundingClientRect().bottom
);

const isScrollingOverComponent = currentElement => (
  getScrollOffsetFromElementTop(currentElement) >= 0
  && getScrollOffsetFromElementBottom(currentElement) >= 0
);

const withInfiniteScroll = ({ fetchMoreItems, shouldFetchMoreItems }) => compose(
  withState('scroll', 'setScroll', 0),
  withHandlers({
    onScroll: props => (getCurrentElement) => {
      const { setScroll, scroll } = props;
      const currentElement = getCurrentElement();

      if (!currentElement) {
        return;
      }

      const currentScroll = getElementScroll(currentElement);
      const isScrollingDown = currentScroll > scroll;

      if (
        isScrollingDown
        && isScrollingOverComponent(currentElement)
        && shouldFetchMoreItems(props)
      ) {
        fetchMoreItems(props);
      }

      setScroll(currentScroll);
    },
  }),
  lifecycle({
    componentWillMount() {
      const { onScroll } = this.props;
      const getCurrentElement = () => this.currentElement;

      this.event = window.addEventListener('scroll', () => onScroll(getCurrentElement));
    },
    componentWillUnmount() {
      const { onScroll } = this.props;
      const getCurrentElement = () => this.currentElement;

      window.removeEventListener('scroll', () => onScroll(getCurrentElement));
    },
    componentDidMount() {
      // This is a hack since I can't find a way to get the reference of the BaseComponent
      this.currentElement = ReactDOM.findDOMNode(this);
    },
  }),
);

export default withInfiniteScroll;
