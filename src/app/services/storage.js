import Basil from 'basil.js'

const Storage = () => {
  const config = {
    namespace: 'goread',
    storages: ['cookie', 'session', 'local'],
  }

  return new Basil(config)
}

export default Storage()
