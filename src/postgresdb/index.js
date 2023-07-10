import promise from 'bluebird'
import pgPromise from 'pg-promise'
import plantillaConfig from '../../postgres-plantilla.json'
// import {Diagnostics} from './diagnostics'

const initOptions = {
  promiseLib: promise
}
const pgp = pgPromise(initOptions)
export const dbp = pgp(plantillaConfig)
// Diagnostics.init(initOptions);
