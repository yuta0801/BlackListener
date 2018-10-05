require('./lib/yaml')
const Klasa = require('klasa')
const contents = require('./lib/contents')
const logger = require('./lib/logger').getLogger('client', 'cyan', false)
const isTravisBuild = process.argv.includes('--travis-build')

let s
try {
  s = isTravisBuild ? require('./travis.yml') : require('./secret.yml')
} catch (e) {
  logger.emerg('Not found \'secret.yml\' and not specified option \'--travis-build\' or specified option \'--travis-build\' but not found \'travis.yml\'')
    .emerg('Hint: Place secret.yml at src folder.')
  process.exit(1)
}

const client = new Klasa.Client({
  prefix: contents.prefix,
})

client.login(s.token)
