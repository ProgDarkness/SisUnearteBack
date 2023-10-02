import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerListadoInscrito: async (_, { input }) => {
      const { periodo, carrera, sede } = input
      try {
        let inscritos
        if (periodo && !carrera && !sede) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos WHERE idperiodo = $1 ORDER BY idestatus;`,
            [periodo]
          )
        }

        if (!periodo && carrera && !sede) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos WHERE idcarrera = $1 ORDER BY idestatus;`,
            [carrera]
          )
        }

        if (!periodo && !carrera && sede) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos WHERE idsede = $1 ORDER BY idestatus;`,
            [sede]
          )
        }

        if (periodo && carrera && sede) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos WHERE idperiodo = $1 AND idcarrera = $2 AND idsede = $3 ORDER BY idestatus;`,
            [periodo, carrera, sede]
          )
        }

        for (let i = 0; i < inscritos.length; i++) {
          for (const key in inscritos[i]) {
            const object = inscritos[i]
            if (key.startsWith('fe')) {
              inscritos[i][key] = new Date(object[key]).toLocaleDateString(
                'es-ES',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }
              )
            }
          }
        }
        return {
          status: 200,
          message: 'Listados de inscritos encontrados',
          type: 'success',
          response: inscritos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  }
}
