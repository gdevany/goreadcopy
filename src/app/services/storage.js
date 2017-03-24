import Basil from 'basil.js'

const Storage = () => {
  const config = {
    namespace: 'goread',
    storages: ['local', 'session', 'cookie'],
  }

  return new Basil(config)
}

export default Storage()
