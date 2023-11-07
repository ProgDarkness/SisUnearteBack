import promise from 'bluebird'
import pgPromise from 'pg-promise'
import plantillaConfig from '../../postgres-plantilla.json'
import plantillaConfig2 from '../../postgres-plantilla-2.json'
// import {Diagnostics} from './diagnostics'

const initOptions = {
  promiseLib: promise
}

const pgp = pgPromise(initOptions)
export const dbp = pgp(plantillaConfig)
export const dbp2 = pgp(plantillaConfig2)
// Diagnostics.init(initOptions);
