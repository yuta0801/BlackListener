const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const {
  defaultSettings,
  defaultUser,
  defaultBans,
} = require('./contents')

/**
 * @type {mongodb.Db}
 */
let db

;(async () => {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
  db = client.db('blacklistener')
})()

async function dataStore(id, type, _default) {
  const collection = db.collection(type)
  const documents = await collection.find({ _id: id }).toArray()
  const data = Object.assign(_default, documents[0])
  return new Proxy(data, {
    get(target, key) {
      if (typeof target[key] === 'object' && target[key] !== null) {
        return new Proxy(target[key], this)
      } else {
        return target[key]
      }
    },
    async set(obj, prop, value) {
      if (obj[prop] === value) return true
      obj[prop] = value
      await collection.save({ _id: id, ...obj })
      return true
    },
  })
}

module.exports = {
  async server(id) {
    return await dataStore(id, 'servers', defaultSettings)
  },
  async user(id) {
    return await dataStore(id, 'users', defaultUser)
  },
  async bans() {
    return await dataStore('', 'bans', defaultBans)
  },
}
