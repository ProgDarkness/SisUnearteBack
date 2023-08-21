import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerTodasCarreras: async () => {
      try {
        const carreras =
          await dbp.manyOrNone(`SELECT c.id_carrera as id, c.co_carrera as codigo, c.nb_carrera as nombre, tc.nb_tp_carrera as tipo, ciclo.nb_ciclo as ciclo,
                                e.nb_estatus_carrera as estatus, c.titulo_otorgado as titulo
                                FROM m006t_carreras as c, m036t_tipo_carrera as tc, m043t_ciclos as ciclo, m045t_estatus_carrera as e
                                where c.id_tp_carrera = tc.id_tp_carrera
                                and c.id_ciclo = ciclo.id_ciclo
                                and c.id_estatus_carrera = e.id_estatus_carrera;`)
        return {
          status: 200,
          message: 'Listado de carreras encontradas',
          type: 'success',
          response: carreras
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    obtenerDetalleCarrera: async (_, { input }) => {
      const { carrera } = input

      try {
        const detallecarreras = await dbp.manyOrNone(
          `SELECT c.id_carrera AS id, c.nb_carrera AS carrera, t.nb_trayecto AS trayecto,
                                            m.nb_materia AS materia, p.nb_personal AS personal, ec.nb_estatus_carrera AS estatus
                                            FROM m006t_carreras AS c, r002t_carrera_materia AS cm, m017t_trayectos AS t, m005t_materias AS m,
                                            r001t_docente_materia AS dm, t003t_personal AS p, m045t_estatus_carrera AS ec
                                            WHERE cm.id_trayecto = t.id_trayecto AND cm.id_materia = m.id_materia AND
                                            dm.id_personal = p.id_personal AND dm.id_materia = m.id_materia 
                                            AND ec.id_estatus_carrera = c.id_estatus_carrera AND c.id_carrera = $1;`, [carrera]);
                
                if (detallecarreras) {
                    return {status: 200, message: 'Carreras encontrado', type: "success", response: detallecarreras}
                } else {
                    return {status: 202, message: 'Carreras no encontrado', type: "error"}
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        crearCarrera: async (_, {input}) => {
            const {carrera, codigo, nombre, credito, tipo, hora} = input
            
            try {
                const idMateria = await dbp.oneOrNone(
                    `INSERT INTO public.m005t_materias(
                      co_materia, nb_materia, nu_credito, id_tp_materia, hr_semanal, id_estatus_materia)
                      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_materia;`, [codigo, nombre, credito, tipo, hora, 4])
                
                await dbp.none(
                    `INSERT INTO public.r002t_carrera_materia(
                        id_carrera, id_materia, visible, hora_semanal)
                        VALUES ($1, $2, $3, $4, $5);`, [carrera, idMateria, true, hora]
                )

                return {status: 200, message: 'Materia registrada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarCarrera: async (_, {input}) => {
            const {codigo, nombre, tipo, ciclo, titulo, idcarrera} = input
            
            try {     
                await dbp.none(
                    `UPDATE public.m006t_carreras
                    SET co_carrera = $1, nb_carrera = $2, id_tp_carrera = $3, id_ciclo = $4, titulo_otorgado = $5
                    WHERE id_carrera = $6;`, [codigo, nombre, tipo, ciclo, titulo, idcarrera])

                return {status: 200, message: 'Carrera actualizada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        eliminarCarrera: async (_, {input}) => {
            const {idcarrera} = input
            
            try {  
                const carreraperiodo = await dbp.manyOrNone(`SELECT * FROM r006t_periodo_carrera pc WHERE pc.id_carrera = $1;`, [idcarrera]);

                const carreramateria = await dbp.manyOrNone(`SELECT * FROM r002t_carrera_materia cm WHERE cm.id_carrera = $1;`, [idcarrera]);

                const carrerapostulacion = await dbp.manyOrNone(`SELECT * FROM t013t_postulacion p WHERE p.id_carrera = $1;`, [idcarrera]);

                if (carreraperiodo || carreramateria || carrerapostulacion) {
                    return {status: 202, message: 'Carrera no puede ser eliminada asociada a otros datos', type: "success"}
                } else {
                    await dbp.none(`DELETE FROM public.m006t_carreras WHERE id_carrera = $1;`, [idcarrera])

                    return {status: 200, message: 'Carrera eliminada exitosamente', type: "success"} 
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarEstatusCarrera: async (_, {input}) => {
            const {estatus, idcarrera} = input
            
            try {     
                await dbp.none(`UPDATE public.m006t_carreras SET id_estatus_carrera = $1 WHERE id_carrera = $2;`, [estatus, idcarrera])

                return {status: 200, message: 'Estatus de la carrera actualizada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    crearCarrera: async (_, { input }) => {
      const { codigo, nombre, tipo, ciclo, titulo, cantTrayectos, sede } = input

      try {
        const idcarrera = await dbp.oneOrNone(
          `INSERT INTO public.m006t_carreras(
                      co_carrera, nb_carrera, id_tp_carrera, id_ciclo, titulo_otorgado, visible, created_at, updated_at, id_estatus_carrera)
                      VALUES ($1, $2, $3, $4, $5, true, now(), now(), 1) RETURNING id_carrera;`,
          [codigo, nombre, tipo, ciclo, titulo]
        )

        const trayectos = await dbp.manyOrNone(
          `SELECT id_trayecto FROM m017t_trayectos;`
        )

        for (let i = 0; i < trayectos.length; i++) {
          await dbp.none(
            `INSERT INTO public.r009t_carrera_trayecto(id_carrera, id_trayecto) VALUES ($1, $2);`,
            [idcarrera.id_carrera, trayectos[i].id_trayecto]
          )
        }

        return {
          status: 200,
          message: 'Carrera registrada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    actualizarCarrera: async (_, { input }) => {
      const { codigo, nombre, tipo, ciclo, titulo, idcarrera } = input

      try {
        await dbp.none(
          `UPDATE public.m006t_carreras
                    SET co_carrera = $1, nb_carrera = $2, id_tp_carrera = $3, id_ciclo = $4, titulo_otorgado = $5
                    WHERE id_carrera = $6;`,
          [codigo, nombre, tipo, ciclo, titulo, idcarrera]
        )

        return {
          status: 200,
          message: 'Carrera actualizada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarCarrera: async (_, { input }) => {
      const { idcarrera } = input

      try {
        const carreraperiodo = await dbp.manyOrNone(
          `SELECT * FROM r006t_periodo_carrera pc WHERE pc.id_carrera = $1;`,
          [idcarrera]
        )

        const carreramateria = await dbp.manyOrNone(
          `SELECT * FROM r002t_carrera_materia cm WHERE cm.id_carrera = $1;`,
          [idcarrera]
        )

        const carrerapostulacion = await dbp.manyOrNone(
          `SELECT * FROM t013t_postulacion p WHERE p.id_carrera = $1;`,
          [idcarrera]
        )

        if (carreraperiodo || carreramateria || carrerapostulacion) {
          return {
            status: 202,
            message: 'Carrera no puede ser eliminada asociada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.m006t_carreras WHERE id_carrera = $1;`,
            [idcarrera]
          )

          return {
            status: 200,
            message: 'Carrera eliminada exitosamente',
            type: 'success'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    actualizarEstatusCarrera: async (_, { input }) => {
      const { estatus, idcarrera } = input

      try {
        await dbp.none(
          `UPDATE public.m006t_carreras SET id_estatus_carrera = $1 WHERE id_carrera = $2;`,
          [estatus, idcarrera]
        )

        return {
          status: 200,
          message: 'Estatus de la carrera actualizada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
