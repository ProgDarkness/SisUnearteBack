import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerEstatusPostulacion: async () => {
      try {
        const estatus = await dbp.manyOrNone(
          `SELECT id_estatus_postulacion as id, nb_estatus_postulacion as nombre FROM estatus_postulacion;`
        )
        return {
          status: 200,
          message: 'Estatus postulacion encontradas',
          type: 'success',
          response: estatus
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerListadoPostuladoCarrera: async () => {
      try {
        const postulados = await dbp.manyOrNone(
          `SELECT * FROM info_postulados;`
        )

        for (let i = 0; i < postulados.length; i++) {
          for (const key in postulados[i]) {
            const object = postulados[i]
            if (key.startsWith('fe')) {
              postulados[i][key] = new Date(object[key]).toLocaleDateString(
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
          message: 'Postulados encontrados',
          type: 'success',
          response: postulados
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    crearPostulacion: async (_, { input }) => {
      const { usuario, carrera, sede, fepostulacion } = input

      try {
        let estatus = null
        let activo = null
        estatus = 4
        activo = true

        const idperiodo = await dbp.oneOrNone(
          `SELECT id_periodo FROM periodo_trayecto as pt WHERE pt.id_carrera = $1 AND pt.id_trayecto = 1;`,
          [carrera]
        )

        console.log(input)

        await dbp.none(
          `INSERT INTO public.postulacion(
                      id_usuario, id_carrera, id_periodo, id_sede, fe_postulacion, id_estatus_postulacion, st_activo)
                      VALUES ( $1, $2, $3, $4, $5, $6, $7);`,
          [
            usuario,
            carrera,
            idperiodo.id_periodo,
            sede,
            fepostulacion,
            estatus,
            activo
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Postulacion registrada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    aprobarPostulacion: async (_, { input }) => {
      const { estatus, usuario, feaprobacion, observacion, idpostulacion } =
        input

      try {
        await dbp.none(
          `UPDATE public.postulacion
                    SET id_estatus_postulacion = $1, id_usuario_aprobacion = $2, fe_aprobacion = $3, tx_observacion = $4
                    WHERE id_postulacion = $5;`,
          [estatus, usuario, feaprobacion, observacion, idpostulacion]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Postulacion aprobada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
