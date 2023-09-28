import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerListadoInscrito: async (_, { input }) => {
      const { periodo, carrera, sede } = input
      try {
        const inscritos = await dbp.manyOrNone(
          `SELECT * FROM info_inscritos WHERE idperiodo = $1 AND idcarrera = $2 AND idsede = $3 ORDER BY idestatus;`,
          [periodo, carrera, sede]
        )

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
