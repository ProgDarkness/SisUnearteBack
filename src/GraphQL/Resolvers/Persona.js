import { dbp } from '../../postgresdb'
import { ApolloError } from 'apollo-server-core'

export default {
  Query: {
    getPersonas: async (_, __, { auth }) => {
      // if (!auth) throw new ApolloError('Sesión no válida')

      try {
        return await dbp.manyOrNone(
          'SELECT p.id_persona, p.nb_persona, g.grupo, g.id_grupo, p.telefono FROM personas p, grupos g WHERE p.id_grupo = g.id_grupo ORDER BY p.id_persona'
        )
      } catch (e) {
        throw new ApolloError(e.message)
      }
    }
  },
  Mutation: {
    savePersona: async (_, { input }, { auth }) => {
      // if (!auth) throw new ApolloError('Sesión no válida')

      try {
        const { nb_persona, telefono, id_grupo } = input

        return dbp
          .tx(async (t) => {
            if (input?.id_persona) {
              await t.none(
                'UPDATE personas SET nb_persona = $1, id_grupo = $2 WHERE id_persona = $3',
                [nb_persona, id_grupo, input.id_persona]
              )

              await t.none(
                'UPDATE personas SET telefono = $1 WHERE id_persona = $2',
                [
                  telefono
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', ''),
                  input.id_persona
                ]
              )
            } else {
              const { id_persona } = await t.one(
                'INSERT INTO personas (nb_persona, id_grupo) VALUES ($1, $2) RETURNING id_persona',
                [nb_persona, id_grupo]
              )

              await t.none(
                `UPDATE public.personas
                SET telefono=$2
                WHERE id_persona=$1;`,
                [
                  id_persona,
                  telefono
                    .replace('(', '')
                    .replace(')', '')
                    .replace(' ', '')
                    .replace('-', '')
                ]
              )
            }
          })
          .then((data) => {
            return true
          })
          .catch((error) => {
            throw new ApolloError(error.message)
          })
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    deletePersona: async (_, { id }, { auth }) => {
      // if (!auth) throw new ApolloError('Sesión no válida')

      try {
        return dbp
          .tx(async (t) => {
            await t.none('DELETE FROM personas WHERE id_persona = $1', [id])
          })
          .then((data) => {
            return true
          })
          .catch((error) => {
            throw new ApolloError(error.message)
          })
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    deletePersonas: async (_, { ids }, { auth }) => {
      // if (!auth) throw new ApolloError('Sesión no válida')

      try {
        return dbp
          .tx(async (t) => {
            for (const id of ids) {
              await t.none('DELETE FROM personas WHERE id_persona = $1', [id])
            }
          })
          .then((data) => {
            return true
          })
          .catch((error) => {
            throw new ApolloError(error.message)
          })
      } catch (e) {
        throw new ApolloError(e.message)
      }
    }
  }
}
