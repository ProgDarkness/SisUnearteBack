import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerSedeCarreras: async () => {
      try {
        return await dbp.manyOrNone(
          `SELECT sc.id_scarrera, sc.id_sede, s.nb_sede, sc.id_carrera, c.nb_carrera
          FROM public.sede_carrera sc, public.sedes s, public.carreras c 
          WHERE sc.id_sede = s.id_sede AND sc.id_carrera = c.id_carrera;`
        )
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTodasCarreras: async () => {
      try {
        const carreras =
          await dbp.manyOrNone(`SELECT c.id_carrera as id, c.co_carrera as codigo, c.nb_carrera as nombre, tc.nb_tp_carrera as tipo, ciclo.nb_ciclo as ciclo,
          e.nb_estatus_carrera as estatus, tt.nb_titulo as titulo
          FROM public.carreras as c, public.tipo_carrera as tc, public.ciclos as ciclo, public.estatus_carrera as e, 
		      public.tipo_titulo tt
          where c.id_tp_carrera = tc.id_tp_carrera
          and c.id_ciclo = ciclo.id_ciclo
          and c.id_estatus_carrera = e.id_estatus_carrera
		      and c.id_titulo = tt.id_titulo
          and c.id_estatus_carrera = 4;`)
        return {
          status: 200,
          message: 'Listado de carreras encontradas',
          type: 'success',
          response: carreras
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTodasMallas: async () => {
      try {
        const mallas =
          await dbp.manyOrNone(`SELECT c.id_carrera as id, c.co_carrera as codigo, c.nb_carrera as nombre, tc.nb_tp_carrera as tipo, ciclo.nb_ciclo as ciclo,
          e.nb_estatus_carrera as estatus, tt.nb_titulo as titulo, s.nb_sede as sede
          FROM public.carreras as c, public.tipo_carrera as tc, public.ciclos as ciclo, public.estatus_carrera as e, 
		      public.sede_carrera sc, public.sedes s,  public.tipo_titulo tt
          WHERE c.id_tp_carrera = tc.id_tp_carrera
          and c.id_ciclo = ciclo.id_ciclo
          and c.id_estatus_carrera = e.id_estatus_carrera
          and sc.id_carrera = c.id_carrera
          and sc.id_sede = s.id_sede
		      and c.id_titulo = tt.id_titulo
          and c.id_estatus_carrera = 3;`)
        return {
          status: 200,
          message: 'Listado de mallas curriculares encontradas',
          type: 'success',
          response: mallas
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerDetalleCarrera: async (_, { input }) => {
      const { carrera } = input

      try {
        const detalleCarrerasInit = []

        const trayectosCarrera = await dbp.manyOrNone(
          `SELECT t.id_trayecto, t.nb_trayecto
          FROM public.carrera_trayecto ct, public.trayectos t
            WHERE ct.id_trayecto = t.id_trayecto AND ct.id_carrera = $1;`,
          [carrera]
        )

        const materiasCarrera = await dbp.manyOrNone(
          `SELECT cm.id_carrema, cm.id_carrera, c.nb_carrera, cm.id_materia, m.nb_materia, cm.id_trayecto
          FROM public.carrera_materia cm, public.carreras c, public.materias m
            WHERE cm.id_carrera = c.id_carrera AND cm.id_materia = m.id_materia AND cm.id_carrera = $1;`,
          [carrera]
        )

        for (let i = 0; i < materiasCarrera.length; i++) {
          const {
            id_materia,
            id_trayecto: idTrayectoMateria,
            nb_materia,
            id_carrema
          } = materiasCarrera[i]

          for (let i = 0; i < trayectosCarrera.length; i++) {
            const { id_trayecto: idtrayectocarrera, nb_trayecto } =
              trayectosCarrera[i]
            if (idtrayectocarrera === idTrayectoMateria) {
              detalleCarrerasInit.push({
                id_carrema,
                idtrayectocarrera,
                nb_trayecto,
                id_materia,
                nb_materia
              })
            } else {
              detalleCarrerasInit.push({
                id_carrema,
                idtrayectocarrera,
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
    obtenerMateriasPorCarrera: async (_, { carrera }) => {
      try {
        const materias = await dbp.manyOrNone(
          `SELECT cm.id_materia as id, m.nb_materia as nombre
          FROM public.carrera_materia cm, public.materias m 
            WHERE cm.id_carrera = $1 AND cm.id_materia = m.id_materia;`,
          [carrera]
        )

        return {
          status: 200,
          message: 'Materias encontradas',
          type: 'success',
          response: materias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTrayectosPorCarrera: async (_, { carrera }) => {
      try {
        const trayectos = await dbp.manyOrNone(
          `SELECT ct.id_trayecto as id, t.nb_trayecto as nombre
          FROM public.carrera_trayecto ct, public.trayectos t
            WHERE ct.id_trayecto = t.id_trayecto and ct.id_carrera = $1;`,
          [carrera]
        )

        return {
          status: 200,
          message: 'Trayectos encontrados',
          type: 'success',
          response: trayectos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCrudSede: async () => {
      try {
        const sedes = await dbp.manyOrNone(
          `SELECT s.id_sede, s.co_sede, s.nb_sede, s.id_geografico_sede, s.id_estatus, ep.nb_estatus_periodo as estatus
          FROM public.sedes s, public.estatus_periodo ep 
            WHERE ep.id_estatus_periodo = s.id_estatus;`
        )

        return {
          status: 200,
          message: 'Sedes encontradas',
          type: 'success',
          response: sedes
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCrudEstados: async () => {
      try {
        const estados = await dbp.manyOrNone(
          `SELECT id_estado as id, nb_estado as nombre
          FROM public.estados order by id_estado asc;`
        )

        return {
          status: 200,
          message: 'Sedes encontradas',
          type: 'success',
          response: estados
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    eliminarSedeCarrera: async (_, { idSedeCarrera, idCarrera }) => {
      try {
        const validateCarrera = await dbp.oneOrNone(
          `SELECT id_estatus_carrera
            FROM public.carreras 
              WHERE id_carrera = $1 AND id_estatus_carrera = 3;`,
          [idCarrera]
        )

        if (!validateCarrera?.id_estatus_carrera) {
          await dbp.none(
            `DELETE FROM public.sede_carrera
            WHERE id_scarrera = $1;`,
            [idSedeCarrera]
          )
        } else {
          return {
            status: 202,
            message:
              'La sede no puede ser eliminada en una carrera ya aprobada',
            type: 'warn'
          }
        }

        return {
          status: 200,
          message: 'Sede eliminada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    asignarSedeCarrera: async (_, { idCarrera, idSede }) => {
      try {
        const validateSedeCarrera = await dbp.oneOrNone(
          `SELECT id_scarrera FROM public.sede_carrera
            WHERE id_sede = $1 and id_carrera = $2;`,
          [idSede, idCarrera]
        )

        if (!validateSedeCarrera) {
          await dbp.none(
            `INSERT INTO public.sede_carrera(
                          id_sede, id_carrera, created_at, updated_at)
                          VALUES ($1, $2, now(), now());`,
            [idSede, idCarrera]
          )
        } else {
          return {
            status: 202,
            message: 'La carrera ya tiene la sede asignada',
            type: 'warn'
          }
        }

        return {
          status: 200,
          message: 'Sede asignada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    crearCarrera: async (_, { input }) => {
      const { codigo, nombre, tipo, ciclo, titulo, cantTrayectos } = input

      try {
        const idcarrera = await dbp.oneOrNone(
          `INSERT INTO public.carreras(
                      co_carrera, nb_carrera, id_tp_carrera, id_ciclo, id_titulo, visible, created_at, updated_at, id_estatus_carrera)
                      VALUES ($1, $2, $3, $4, $5, true, now(), now(), 4) RETURNING id_carrera;`,
          [codigo, nombre, tipo, ciclo, titulo]
        )

        const trayectos = await dbp.manyOrNone(
          `SELECT id_trayecto FROM trayectos order by id_trayecto asc;`
        )

        if (tipo === 1) {
          for (let i = 0; i < cantTrayectos + 1; i++) {
            await dbp.none(
              `INSERT INTO public.carrera_trayecto(id_carrera, id_trayecto) VALUES ($1, $2);`,
              [idcarrera.id_carrera, trayectos[i].id_trayecto]
            )
          }
        } else if (tipo === 2) {
          for (let i = 1; i < cantTrayectos + 1; i++) {
            await dbp.none(
              `INSERT INTO public.carrera_trayecto(id_carrera, id_trayecto) VALUES ($1, $2);`,
              [idcarrera.id_carrera, trayectos[i].id_trayecto]
            )
          }
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
          `UPDATE public.carreras
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
        const carreramateria = await dbp.manyOrNone(
          `SELECT id_carrera FROM carrera_materia cm WHERE cm.id_carrera = $1;`,
          [idcarrera]
        )

        const carrerapostulacion = await dbp.manyOrNone(
          `SELECT id_carrera FROM postulacion p WHERE p.id_carrera = $1;`,
          [idcarrera]
        )

        if (
          carreramateria[0]?.id_carrera ||
          carrerapostulacion[0]?.id_carrera
        ) {
          return {
            status: 202,
            message: 'Carrera no puede ser eliminada asociada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.sede_carrera WHERE id_carrera = $1;`,
            [idcarrera]
          )

          await dbp.none(
            `DELETE FROM public.carrera_trayecto WHERE id_carrera = $1;`,
            [idcarrera]
          )

          await dbp.none(`DELETE FROM public.carreras WHERE id_carrera = $1;`, [
            idcarrera
          ])

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
          `UPDATE public.carreras SET id_estatus_carrera = $1 WHERE id_carrera = $2;`,
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
    },
    asignarTrayectoMateria: async (_, { idCarrera, idTrayecto, idMateria }) => {
      try {
        const validateDuplicidad = await dbp.oneOrNone(
          `SELECT id_carrema FROM public.carrera_materia 
          WHERE id_carrera = $1 AND id_materia = $2;`,
          [idCarrera, idMateria]
        )

        if (validateDuplicidad?.id_carrema) {
          return {
            status: 202,
            message: 'La materia ya se encuentra asignada en otro trayecto',
            type: 'warn'
          }
        } else {
          await dbp.none(
            `INSERT INTO public.carrera_materia(
              id_carrera, id_materia, visible, id_trayecto, created_at, updated_at)
              VALUES ($1, $2, TRUE, $3, now(), now());`,
            [idCarrera, idMateria, idTrayecto]
          )

          return {
            status: 200,
            message: 'Se ha agregado la materia al Trayecto',
            type: 'success'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    desasignarTrayectoMateria: async (_, { idCarrema }) => {
      try {
        await dbp.none(
          `DELETE FROM public.carrera_materia
          WHERE id_carrema = $1;`,
          [idCarrema]
        )

        return {
          status: 200,
          message: 'Se ha eliminado la materia del Trayecto',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerSedeCarrera: async (_, { idCarrera }) => {
      try {
        const sedeCarrera = await dbp.manyOrNone(
          `SELECT id_scarrera FROM public.sede_carrera WHERE id_carrera = $1;`,
          [idCarrera]
        )

        if (sedeCarrera.length > 0) {
          return {
            status: 200,
            message: 'Encontradas las sedes de la carrera',
            type: 'success'
          }
        } else {
          return {
            status: 202,
            message: 'No hay sedes registradas para la carrera',
            type: 'warn'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    registrarSede: async (_, { InputRegSede }) => {
      try {
        const {
          co_sede,
          nb_sede,
          id_tp_via,
          nb_via,
          id_tp_zona,
          nb_zona,
          tx_direccion,
          id_zona_postal,
          id_ciudad,
          id_estado,
          id_municipio,
          id_parroquia
        } = InputRegSede

        const id_geografico = await dbp.oneOrNone(
          `INSERT INTO public.geografico_sede(
            id_tp_via, nb_via, id_tp_zona, 
            nb_zona, tx_direccion, id_zona_postal, id_ciudad, id_estado, 
            id_municipio, id_parroquia, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now(), now()) RETURNING id_geografico_sede;`,
          [
            id_tp_via,
            nb_via,
            id_tp_zona,
            nb_zona,
            tx_direccion,
            id_zona_postal,
            id_ciudad,
            id_estado,
            id_municipio,
            id_parroquia
          ]
        )

        await dbp.none(
          `INSERT INTO public.sedes(
            co_sede, nb_sede, id_geografico_sede, id_estatus, created_at, updated_at)
            VALUES ($1, $2, $3, 1, now(), now());`,
          [co_sede, nb_sede, id_geografico.id_geografico_sede]
        )

        return {
          status: 200,
          message: 'La sede se ha registrado exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarSede: async (_, { idSede }) => {
      try {
        const id_geografico = await dbp.oneOrNone(
          `SELECT id_geografico_sede
            FROM public.sedes WHERE id_sede = $1;`,
          [idSede]
        )

        await dbp.none(
          `DELETE FROM public.geografico_sede
          WHERE id_geografico_sede = $1;`,
          [id_geografico.id_geografico_sede]
        )

        await dbp.none(
          `DELETE FROM public.sedes
            WHERE id_sede = $1;`,
          [idSede]
        )

        return {
          status: 200,
          message: 'La sede se ha registrado exitosamente.',
          type: 'success'
        }
      } catch (e) {
        if (e.message.includes('r007t')) {
          return {
            status: 500,
            message: `Error: La sede se encuentra relacionada con otros datos`,
            type: 'error'
          }
        } else {
          return { status: 500, message: `Error: ${e.message}`, type: 'error' }
        }
      }
    }
  }
}
