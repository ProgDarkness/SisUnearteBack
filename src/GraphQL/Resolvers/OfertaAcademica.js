import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerOfertaAcademica: async () => {
      try {
        const ofertas = await dbp.manyOrNone(
          `SELECT oa.id_oferta, oa.id_periodo, p.tx_mensaje, oa.id_carrera, c.nb_carrera, tp.nb_tp_carrera,
            ci.nb_ciclo, oa.nu_cupos, oa.nu_seccion, oa.id_sede, s.nb_sede, oa.id_estatus_oferta, eo.nb_estatus_oferta
            FROM public.t008t_oferta_academica oa, public.m006t_carreras c, public.t011t_sedes s,
            public.t006t_periodo_lectivo p, public.m042t_estatus_oferta eo, public.m036t_tipo_carrera tp, public.m043t_ciclos ci
            WHERE oa.id_periodo = p.id_periodo AND oa.id_carrera = c.id_carrera AND oa.id_sede = s.id_sede
            AND oa.id_estatus_oferta = eo.id_estatus_oferta AND c.id_tp_carrera = tp.id_tp_carrera AND c.id_ciclo = ci.id_ciclo;`
        )
        return {
          status: 200,
          message: 'Ofertas encontradas',
          type: 'success',
          response: ofertas
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    crearOferta: async (_, { input }) => {
      const { periodo, carrera, cupos, seccion, sede, materia, trayecto } =
        input

      try {
        let estatus = null
        let visible = null
        estatus = 1
        visible = true
        const idofertas = await dbp.oneOrNone(
          `INSERT INTO public.t008t_oferta_academica(
                    id_periodo, id_carrera, nu_cupos, nu_seccion, id_sede, visible, id_estatus_oferta)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING id_oferta;`,
          [periodo, carrera, cupos, seccion, sede, visible, estatus]
        )

        await dbp.none(
          `INSERT INTO public.r008t_oferta_materia_carrera(
                        id_oferta, id_carrera, id_materia, id_trayecto)
                        VALUES ( $1, $2, $3, $4);`,
          [idofertas.id_oferta, carrera, materia, trayecto]
        )

        return {
          status: 200,
          message: 'Oferta registrada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarOferta: async (_, { idOferta }) => {
      try {
        await dbp.none(
          `DELETE FROM public.t008t_oferta_academica
               WHERE id_oferta = $1;`,
          [idOferta]
        )

        return {
          status: 200,
          message: 'Oferta eliminada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
