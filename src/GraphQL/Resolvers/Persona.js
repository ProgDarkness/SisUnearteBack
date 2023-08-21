import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerEstatusPostulacion: async () => {
      try {
        const estatus = await dbp.manyOrNone(
          `SELECT id_estatus_postulacion as id, nb_estatus_postulacion as nombre FROM m046t_estatus_postulacion;`
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
          `SELECT p.id_postulacion as id, tn.co_nacionalidad as nacionalidad, u.ced_usuario as cedula, u.nb_usuario as nombre, u.ape_usuario as apellido,
                            p.fe_postulacion as fepostulacion, ep.nb_estatus_postulacion estatus, pl.anio_periodo as periodo, tp.nb_tp_periodo as tperiodo,
                            c.nb_carrera as carrera
                            FROM t001t_usuarios as u, m028t_tipo_nacionalidad as tn, t013t_postulacion as p, 
                            r005t_fecha_estatus_postulacion as fep, m046t_estatus_postulacion as ep, t006t_periodo_lectivo as pl, 
                            m007t_tipo_periodo as tp, m006t_carreras as c
                            WHERE u.id_nacionalidad = tn.id_nacionalidad
                            AND u.id_usuario = p.id_usuario
                            AND c.id_carrera = p.id_carrera
                            AND fep.id_estatus_postulacion = ep.id_estatus_postulacion
                            AND p.id_periodo = pl.id_periodo
                            AND tp.id_tp_periodo = pl.id_tp_periodo;`
        )
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
      const { usuario, carrera, periodo, fepostulacion } = input

      try {
        let estatus = null
        let activo = null
        estatus = 4
        activo = true

        await dbp.none(
          `INSERT INTO public.t013t_postulacion(
                      id_usuario, id_carrera, id_periodo, fe_postulacion, id_estatus_postulacion, st_activo)
                      VALUES ( $1, $2, $3, $4, $5, $6);`,
          [usuario, carrera, periodo, fepostulacion, estatus, activo]
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
          `UPDATE public.t013t_postulacion
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
