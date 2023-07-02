import promise from 'bluebird'
import pgPromise from 'pg-promise'
import plantillaConfig from '../../postgres-plantilla.json'
import OdooSigespConfig from '../../postgres-OdooSigesp.json'
import OdooConstrupatriaConfig from '../../postgres-Odoo-construpatria.json'
// import {Diagnostics} from './diagnostics'

const initOptions = {
  promiseLib: promise
}
const pgp = pgPromise(initOptions)
export const dbp = pgp(plantillaConfig)
export const dbo = pgp(OdooSigespConfig)
export const dbc = pgp(OdooConstrupatriaConfig)
// Diagnostics.init(initOptions);
