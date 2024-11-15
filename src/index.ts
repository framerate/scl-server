import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { init, start } from './server'

// temp init
init()
  .then(() => {
    console.log('initialized') // eslint-disable-line no-console
  })
  .then(async () => await start())
  .catch((err) => {
    console.log(err) // eslint-disable-line no-console
  })
