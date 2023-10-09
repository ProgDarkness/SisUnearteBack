import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerListadoInscritoMateria: async (_, { input }) => {
      const { periodo, carrera, trayecto } = input
      try {
        let inscritos
        if (periodo && !carrera && !trayecto) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos_materia WHERE idperiodo = $1;`,
            [periodo]
          )
        }

        if (!periodo && carrera && !trayecto) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos_materia WHERE idcarrera = $1;`,
            [carrera]
          )
        }

        if (!periodo && !carrera && trayecto) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos_materia WHERE idtrayecto = $1;`,
            [trayecto]
          )
        }

        if (periodo && carrera && trayecto) {
          inscritos = await dbp.manyOrNone(
            `SELECT * FROM info_inscritos_materia WHERE idperiodo = $1 AND idcarrera = $2 AND idtrayecto = $3;`,
            [periodo, carrera, trayecto]
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
          message: 'Listados de inscritos con materias encontrados',
          type: 'success',
          response: inscritos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    crearNotas: async (_, { input }) => {
      const { estudiante, nota, materia, trayecto, carrera } = input

      try {
        await dbp.oneOrNone(
          `INSERT INTO public.notas(
                      id_estudiante, nu_nota, id_materia, id_trayecto, id_carrera, created_at)
                      VALUES ($1, $2, $3, $4, $5, now());`,
          [estudiante, nota, materia, trayecto, carrera]
        )

        return {
          status: 200,
          type: 'success',
          message: 'Notas registradas exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
