import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerPeridosOferta: async () => {
      try {
        const periodos = await dbp.manyOrNone(
          `SELECT id_periodo as id, CONCAT(co_periodo, ' - ', anio_periodo, ' - ', tx_mensaje) as nombre	
         FROM public.periodo_lectivo;`
        )

        return {
          status: 200,
          message: 'Periodos encontrados',
          type: 'success',
          response: periodos
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerDetalleMalla: async (_, { carrera }) => {
      try {
        const detalleCarrerasInit = []

        const trayectosCarrera = await dbp.manyOrNone(
          `SELECT t.id_trayecto, t.nb_trayecto
          FROM public.carrera_trayecto ct, public.trayectos t
            WHERE ct.id_trayecto = t.id_trayecto AND ct.id_carrera = $1;`,
          [carrera]
        )

        const materiasCarrera = await dbp.manyOrNone(
          `SELECT  cm.id_carrema, cm.id_carrera, c.nb_carrera, cm.id_materia, m.nb_materia, cm.id_trayecto,
          dm.id_personal, CONCAT(p.nb_personal, ' ', p.ape_personal) personal
          FROM public.r002t_carrera_materia cm 
          LEFT JOIN public.carreras c ON c.id_carrera = cm.id_carrera 
          LEFT JOIN public.materias m ON m.id_materia = cm.id_materia
          LEFT JOIN public.docente_materia dm ON dm.id_materia = cm.id_materia
          LEFT JOIN public.personal p ON dm.id_personal = p.id_personal
          WHERE cm.id_carrera = $1`,
          [carrera]
        )

        for (let i = 0; i < materiasCarrera.length; i++) {
          const {
            id_materia,
            id_trayecto: idTrayectoMateria,
            nb_materia,
            id_carrema,
            id_personal,
            personal
          } = materiasCarrera[i]

          for (let i = 0; i < trayectosCarrera.length; i++) {
            const { id_trayecto: idTrayectoCarrera, nb_trayecto } =
              trayectosCarrera[i]
            if (idTrayectoCarrera === idTrayectoMateria) {
              detalleCarrerasInit.push({
                id_carrema,
                idTrayectoCarrera,
                nb_trayecto,
                id_materia,
                nb_materia,
                id_personal,
                personal
              })
            } else {
              detalleCarrerasInit.push({
                id_carrema,
                idTrayectoCarrera,
                nb_trayecto
              })
            }
          }
        }

        const trayecto0 = detalleCarrerasInit.filter(
          (t) => t.nb_trayecto === 'Trayecto Inicial'
        )
        const trayecto1 = detalleCarrerasInit.filter(
          (t) => t.nb_trayecto === 'Trayecto I'
        )
        const trayecto2 = detalleCarrerasInit.filter(
          (t) => t.nb_trayecto === 'Trayecto II'
        )
        const trayecto3 = detalleCarrerasInit.filter(
          (t) => t.nb_trayecto === 'Trayecto III'
        )
        const trayecto4 = detalleCarrerasInit.filter(
          (t) => t.nb_trayecto === 'Trayecto IV'
        )

        const detalleCarreraEnd = trayecto0
          .concat(trayecto1)
          .concat(trayecto2)
          .concat(trayecto3)
          .concat(trayecto4)

        const detalleCarreraEndNotNull = detalleCarreraEnd.filter(
          (t) => t.id_materia > 0
        )

        return {
          status: 200,
          message: 'Carreras encontrado',
          type: 'success',
          response: detalleCarreraEndNotNull
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerOfertaAcademica: async () => {
      try {
        const ofertas = await dbp.manyOrNone(
          `SELECT oa.id_oferta, oa.co_oferta, oa.id_periodo, p.tx_mensaje, oa.id_carrera, c.nb_carrera, tp.nb_tp_carrera,
          ci.nb_ciclo, oa.nu_cupos, oa.nu_seccion, oa.id_sede, s.nb_sede, oa.id_estatus_oferta, eo.nb_estatus_oferta
          FROM public.oferta_academica oa, public.carreras c, public.sedes s,
          public.periodo_lectivo p, public.estatus_oferta eo, public.tipo_carrera tp, public.ciclos ci
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
        const estatus = 1
        const visible = true

        const idofertas = await dbp.oneOrNone(
          `INSERT INTO public.oferta_academica(
                    id_periodo, id_carrera, nu_cupos, nu_seccion, id_sede, visible, id_estatus_oferta)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7) RETURNING id_oferta;`,
          [periodo, carrera, cupos, seccion, sede, visible, estatus]
        )

        await dbp.none(
          `INSERT INTO public.oferta_materia_carrera(
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
          `DELETE FROM public.oferta_academica
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
