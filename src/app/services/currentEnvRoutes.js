const currentEnvRoutes = () => {
  const base = {
    backend: process.env.BACKEND_SERVICE_BASE_URL,
    api: '/api/onboarding',
    app: '/'
  }

  const backendUrl = (path) => `${base.backend}${path}`
  const apiBaseUrl = (path) => `${base.api}${path}`
  const appBaseUrl = (path) => `${base.app}${path}`

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
