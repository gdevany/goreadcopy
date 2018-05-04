import R from 'ramda';

const ArticlesCategories = [
  { id: 0, text: 'Arts & Entertainment', action: '#', isLink: true },
  { id: 1, text: 'Children & Family', action: '#', isLink: true },
  { id: 2, text: 'Creativity', action: '#', isLink: true },
  { id: 3, text: 'Culture', action: '#', isLink: true },
  { id: 4, text: 'Design', action: '#', isLink: true },
  { id: 5, text: 'Entrepreneurs', action: '#', isLink: true },
  { id: 6, text: 'Food', action: '#', isLink: true },
  { id: 7, text: 'Gender & Sexuality', action: '#', isLink: true },
  { id: 8, text: 'Humanities', action: '#', isLink: true },
  { id: 9, text: 'Humor', action: '#', isLink: true },
  { id: 10, text: 'Marketing', action: '#', isLink: true },
  { id: 11, text: 'Media', action: '#', isLink: true },
  { id: 12, text: 'Personal Development', action: '#', isLink: true },
  { id: 13, text: 'Politics', action: '#', isLink: true },
  { id: 14, text: 'Productivity', action: '#', isLink: true },
  { id: 15, text: 'Relationships', action: '#', isLink: true },
  { id: 16, text: 'Self', action: '#', isLink: true },
  { id: 17, text: 'Stress', action: '#', isLink: true },
];

const Top5Articles = [
  { id: 0, text: 'The Lady or the Tiger', action: '#', isLink: true },
  { id: 1, text: 'The Lucky Cat', action: '#', isLink: true },
  { id: 2, text: 'Stepping Stones', action: '#', isLink: true },
  { id: 3, text: 'A Love Letter to Myself', action: '#', isLink: true },
  { id: 4, text: 'Writing is Therapy', action: '#', isLink: true },
];

const BookCategories = [
  { id: 0, text: 'Antiques & Collectibles', action: '#', isLink: true },
  { id: 1, text: 'Architecture', action: '#', isLink: true },
  { id: 2, text: 'Art', action: '#', isLink: true },
  { id: 3, text: 'Biography & Autobiography', action: '#', isLink: true },
  { id: 4, text: 'Body, Mind & Spirit', action: '#', isLink: true },
  { id: 5, text: 'Business & Economics', action: '#', isLink: true },
  { id: 6, text: 'Computers', action: '#', isLink: true },
  { id: 7, text: 'Cooking', action: '#', isLink: true },
  { id: 8, text: 'Crafts & Hobbies', action: '#', isLink: true },
  { id: 9, text: 'Current Affairs', action: '#', isLink: true },
  { id: 10, text: 'Design', action: '#', isLink: true },
  { id: 11, text: 'Diet, Health & Fitness', action: '#', isLink: true },
  { id: 12, text: 'Education', action: '#', isLink: true },
  { id: 13, text: 'Family & Relationships', action: '#', isLink: true },
  { id: 14, text: 'Fiction', action: '#', isLink: true },
  { id: 15, text: 'Foreign Languages', action: '#', isLink: true },
  { id: 16, text: 'Gardening', action: '#', isLink: true },
  { id: 17, text: 'History', action: '#', isLink: true },
  { id: 18, text: 'House & Home', action: '#', isLink: true },
  { id: 19, text: 'Humor', action: '#', isLink: true },
  { id: 20, text: 'Juvenile Fiction', action: '#', isLink: true },
  { id: 21, text: 'Juvenile Non-fiction', action: '#', isLink: true },
  { id: 22, text: 'Languages', action: '#', isLink: true },
  { id: 23, text: 'Law', action: '#', isLink: true },
  { id: 24, text: 'Mathematics', action: '#', isLink: true },
  { id: 25, text: 'Medical', action: '#', isLink: true },
  { id: 26, text: 'Music, Film & Arts', action: '#', isLink: true },
  { id: 27, text: 'Nature', action: '#', isLink: true },
  { id: 28, text: 'Nonfiction', action: '#', isLink: true },
  { id: 29, text: 'Parenting and Family', action: '#', isLink: true },
  { id: 30, text: 'Pets', action: '#', isLink: true },
  { id: 31, text: 'Philosophy', action: '#', isLink: true },
  { id: 32, text: 'Photography', action: '#', isLink: true },
  { id: 33, text: 'Poetry', action: '#', isLink: true },
  { id: 34, text: 'Political Science', action: '#', isLink: true },
];

const SubMenus = [
  {
    key: 0,
    parentKey: 0,
    title: 'Books',
    content: [
      {
        key: 0,
        title: null,
        items: BookCategories,
        columns: 3,
        max: 12,
        more: { id: 0, text: 'See More >', action: '#', isLink: true },
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
        items: BookCategories,
        columns: 1,
        max: 12,
        more: null,
      },
      {
        key: 1,
        title: "ALL SUBJECTS",
        items: BookCategories,
        columns: 2,
        max: 12,
        more: { id: 0, text: 'See More >', action: '#', isLink: true },
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
        items: BookCategories,
        columns: 2,
        max: 12,
        more: { id: 0, text: 'See More >', action: '#', isLink: true },
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
        items: ArticlesCategories,
        columns: 1,
        max: 18,
        more: null,
      },
      {
        key: 1,
        title: 'TOP 5 ARTICLES',
        items: Top5Articles,
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

const parse = (menu) => {
  const parsedContent = [];
  menu.content.map((col, idx) => parsedContent.push(parseColumn(col, idx)));
  return { ...menu, content: R.flatten(parsedContent) };
};

export const MenuLinks = [
  { id: 0, text: 'Books', action: '#', isLink: false, subMenu: parse(SubMenus[0]) },
  { id: 1, text: 'Best Sellers', action: '#', isLink: false, subMenu: parse(SubMenus[1]) },
  { id: 2, text: 'New Releases', action: '#', isLink: false, subMenu: parse(SubMenus[2]) },
  { id: 3, text: 'Articles', action: '#', isLink: false, subMenu: parse(SubMenus[3]) },
  { id: 4, text: 'For Authors', action: '#', isLink: false, subMenu: null },
  { id: 5, text: 'For Readers', action: '#', isLink: false, subMenu: null },
  { id: 6, text: 'Buy a Book, Give a Book!', action: '#', isLink: false, subMenu: null },
];
