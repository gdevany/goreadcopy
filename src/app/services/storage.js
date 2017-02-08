import Basil from 'basil.js'

const Storage = () => {
  const config = {
    namespace: 'goread',
    storages: ['session', 'local', 'cookie'],
  }

  return new Basil(config)
}

export default Storage()
