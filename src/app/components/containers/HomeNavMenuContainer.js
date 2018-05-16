import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import R from 'ramda';
import { getCategories as getArticlesCategories, resetArticlesCategories, getTop5Articles } from '../../redux/actions/articles';
import { getCategories as getBooksCategories, resetPopularBooksCategories, resetBooksSubjects } from '../../redux/actions/books';
import { getBooksSubjects, getPopularCategories } from '../../redux/selectors/books';
import { getParentCategories, getTop5Articles as top5ArticlesSelector } from '../../redux/selectors/articles';

const SubMenus = [
  {
    key: 0,
    parentKey: 0,
    title: 'Books',
    content: [
      {
        key: 0,
        title: null,
        itemsKey: 'BOOK_SUBJECTS',
        columns: 3,
        max: 12,
        more: { id: 0, text: 'See More >', action: '/store', isLink: true },
      },
    ],
    ad: {
      title: 'GR Weekly Pick!',
      image: 'http://via.placeholder.com/400x400',
      description: 'True You by Fatima',
      target: { id: 0, text: 'Buy it Now', action: '#', isLink: true },
    },
  },
  {
    key: 1,
    parentKey: 1,
    title: 'Best Sellers',
    content: [
      {
        key: 0,
        title: "POPULAR",
        itemsKey: 'POPULAR_CATEGORIES',
        columns: 1,
        max: 12,
        more: null,
      },
      {
        key: 1,
        title: "ALL SUBJECTS",
        itemsKey: 'BOOK_SUBJECTS',
        columns: 2,
        max: 12,
        more: { id: 0, text: 'See More >', action: '/store', isLink: true },
      },
    ],
    ad: {
      title: 'Coming Soon',
      image: 'http://via.placeholder.com/400x400',
      description: 'Pre-order tomorrow\'s best selling books today!',
      target: { id: 0, text: 'Shop Now', action: '#', isLink: true },
    },
  },
  {
    key: 2,
    parentKey: 2,
    title: 'New Releases',
    content: [
      {
        key: 0,
        title: null,
        itemsKey: 'BOOK_SUBJECTS',
        columns: 2,
        max: 12,
        more: { id: 0, text: 'See More >', action: '/store', isLink: true },
      },
    ],
    ad: {
      title: 'Book Series',
      image: 'http://via.placeholder.com/400x400',
      description: 'Special edition of Book series releasing on May 31st!',
      target: { id: 0, text: 'Shop Now', action: '#', isLink: true },
    },
  },
  {
    key: 3,
    parentKey: 3,
    title: 'Articles',
    content: [
      {
        key: 0,
        title: 'TOP 20',
        itemsKey: "ARTICLE_CATEGORIES",
        columns: 1,
        max: 18,
        more: null,
      },
      {
        key: 1,
        title: 'TOP 5 ARTICLES',
        itemsKey: "TOP_FIVE_ARTICLES",
        columns: 1,
        max: 5,
        more: null,
      },
    ],
    ad: {
      title: 'GoRead Buzz',
      image: 'http://via.placeholder.com/400x400',
      description: 'You get paid when your articles are shared.',
      target: { id: 0, text: 'Learn More', action: '#', isLink: true },
    },
  },
];

const parseColumn = ({ key, title, items, columns, max, more }) => {
  const cols = [];
  for (let i = 0; i < columns; i += 1) {
    const col = {};
    col.key = `${key}_${i}`;
    col.title = title && i === 0 ? title : null;
    col.more = more && i === columns - 1 ? more : null;
    col.max = max;
    col.items = items.slice(i * max, (i * max) + max);
    cols.push(col);
  }
  return cols;
};

const parseBookCategoryToLink = category => ({
  id: category.id,
  text: category.name,
  action: `/categories/${category.slug}`,
  isLink: true,
});

const parseArticleCategoryToLink = category => ({
  id: category.id,
  text: category.display,
  action: '/articles',
  isLink: true,
});

const parseArticleToColumnData = ({ article }) => ({
  id: article.id,
  text: article.title,
  action: article.link,
  isLink: true,
});

const parse = (menu) => {
  const parsedContent = [];
  menu.content.map((col, idx) => parsedContent.push(parseColumn(col, idx)));
  return { ...menu, content: R.flatten(parsedContent) };
};

const populateSubMenuWithData = (subMenu, data) => ({
  ...subMenu,
  content: subMenu.content.map(contentItem => ({
    ...contentItem,
    items: data[contentItem.itemsKey],
  })),
});

const getSubMenu = (menu, data) => parse(populateSubMenuWithData(menu, data));


const mapStateToProps = (state) => {
  const booksPopularCategories = getPopularCategories(state).map(parseBookCategoryToLink);
  const booksSubjects = getBooksSubjects(state).map(parseBookCategoryToLink);
  const articleCategories = getParentCategories(state).map(parseArticleCategoryToLink);
  const top5Articles = top5ArticlesSelector(state).map(parseArticleToColumnData);

  const MenuLinks = [
    { id: 0, text: 'Books', action: '#', isLink: false, subMenu: getSubMenu(SubMenus[0], { 'BOOK_SUBJECTS': booksSubjects }) },
    { id: 1, text: 'Best Sellers', action: '#', isLink: false, subMenu: getSubMenu(SubMenus[1], { 'BOOK_SUBJECTS': booksSubjects, 'POPULAR_CATEGORIES': booksPopularCategories }) },
    { id: 2, text: 'New Releases', action: '#', isLink: false, subMenu: getSubMenu(SubMenus[2], { 'BOOK_SUBJECTS': booksSubjects }) },
    { id: 3, text: 'Articles', action: '#', isLink: false, subMenu: getSubMenu(SubMenus[3], { 'ARTICLE_CATEGORIES': articleCategories, 'TOP_FIVE_ARTICLES': top5Articles })},
    { id: 4, text: 'For Authors', action: 'https://go.earnmoneybywriting.com/grlf-landing', isLink: false, subMenu: null },
    { id: 5, text: 'For Readers', action: '/accounts/signup', isLink: true, subMenu: null },
    { id: 6, text: 'Buy a Book, Give a Book!', action: '#', isLink: false, subMenu: null },
  ];

  return ({
    MenuLinks,
  });
};

const mapDispatchToProps = {
  getArticlesCategories,
  getTop5Articles,
  getBooksCategories,
  resetBooksSubjects,
  resetPopularBooksCategories,
  resetArticlesCategories,
};

const withData = lifecycle({
  componentWillMount() {
    this.props.getArticlesCategories({ page: 1, perPage: 100 });
    this.props.getTop5Articles();
    this.props.getBooksCategories({
      page: 1,
      perPage: 51,
      type: 'subject',
      sort: 'alphabetically',
    });
    this.props.getBooksCategories({
      page: 1,
      perPage: 51,
      type: 'popular',
      sort: 'popularity',
    });
  },
  componentWillUnmount() {
    this.props.resetPopularBooksCategories();
    this.props.resetBooksSubjects();
    this.props.resetArticlesCategories();
  },
});


export default Component => connect(mapStateToProps, mapDispatchToProps)(withData(Component));
