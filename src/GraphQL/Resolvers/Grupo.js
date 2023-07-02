import { dbp } from '../../postgresdb'
import { ApolloError } from 'apollo-server-core'

export default {
  Query: {
    getGrupos: async (_, __, { auth }) => {
      // if (!auth) throw new ApolloError('Sesión no válida')
      try {
        return await dbp.manyOrNone('SELECT id_grupo, grupo FROM grupos') 
      } catch (e) {
        throw new ApolloError(e.message)
      }
    }
  }
}
