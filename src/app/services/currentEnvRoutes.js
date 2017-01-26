import base from './base'

const currentEnvRoutes = () => {
  const { backendUrl, apiUrl, appUrl } = base

  const routes = {
    bookStore: () => backendUrl('browse'),
    about: () => backendUrl('aboutus-maybe'),
    news: () => backendUrl('news'),
    articles: () => backendUrl('articles'),
    authors: () => backendUrl('authors-maybe'),
  }
  return routes
}

export default currentEnvRoutes()
