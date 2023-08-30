import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerTodasMaterias: async () => {
      try {
        const materias = await dbp.manyOrNone(
          `SELECT cm.id_carrema as idcarrema, m.id_materia as id, m.co_materia as codigo, m.nb_materia as nombre, m.nu_credito as credito, 
          m.hr_semanal as hora, em.nb_estatus_materia as estatus, tm.nb_tp_materia as tipo, tm.id_tp_materia as idtipo, ca.nb_carrera as carrera
           FROM public.m005t_materias as m, public.m037t_estatus_materia as em, public.m012t_tipo_materia as tm,
          public.r002t_carrera_materia cm, public.m006t_carreras ca
          where m.id_estatus_materia = em.id_estatus_materia and m.id_tp_materia = tm.id_tp_materia
          and cm.id_materia = m.id_materia and ca.id_carrera = cm.id_carrera order by ca.nb_carrera asc;`
        )

        return {
          status: 200,
          message: 'Listado de materias encontradas',
          type: 'success',
          response: materias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    traspasarMateria: async (_, { idCarrera, idMateria, horasSemanales }) => {
      try {
        await dbp.none(
          `INSERT INTO public.r002t_carrera_materia(
              id_carrera, id_materia, visible, hora_semanal, created_at, updated_at)
              VALUES ($1, $2, true, $3, now(), now());`,
          [idCarrera, idMateria, horasSemanales]
        )

        return {
          status: 200,
          message: 'Materia trapasada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarTraspaso: async (_, {idcarrema}) => {
      try {
        
        await dbp.none(
          `DELETE FROM public.r002t_carrera_materia
            WHERE id_carrema = $1;`,
          [idcarrema]
        )

        return {
          status: 200,
          message: 'Traspaso eliminado exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    crearMateria: async (_, { input }) => {
      const { carrera, codigo, nombre, credito, tipo, hora } = input

      try {
        const idMateria = await dbp.oneOrNone(
          `INSERT INTO public.m005t_materias(
                      co_materia, nb_materia, nu_credito, id_tp_materia, hr_semanal, id_estatus_materia, bl_prelacion, created_at, updated_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now()) RETURNING id_materia;`,
          [codigo, nombre, credito, tipo, hora, 4, true]
        )

        await dbp.none(
          `INSERT INTO public.r002t_carrera_materia(
                        id_carrera, id_materia, visible, hora_semanal, created_at, updated_at)
                        VALUES ($1, $2, $3, $4, now(), now());`,
          [carrera, idMateria.id_materia, true, hora]
        )

        return {
          status: 200,
          message: 'Materia registrada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    actualizarMateria: async (_, { input }) => {
      const { codigo, nombre, credito, tipo, hora, idmateria } = input

      try {
        await dbp.none(
          `UPDATE public.m005t_materias
                    SET co_materia = $1, nb_materia = $2, nu_credito = $3, id_tp_materia = $4, hr_semanal = $5
                    WHERE id_materia = $6;`,
          [codigo, nombre, credito, tipo, hora, idmateria]
        )

        return {
          status: 200,
          message: 'Materia actualizada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarMateria: async (_, { input }) => {
      const { idmateria } = input

      try {
        const materiadocente = await dbp.oneOrNone(
          `SELECT id_materia FROM r001t_docente_materia as dm WHERE dm.id_materia = $1;`,
          [idmateria]
        )

        const materiainscripcion = await dbp.oneOrNone(
          `SELECT id_materia FROM r003t_inscripcion_materia as im WHERE im.id_materia = $1;`,
          [idmateria]
        )

        if (materiadocente?.id_materia || materiainscripcion?.id_materia) {
          return {
            status: 202,
            message:
              'Materia no puede ser eliminada encontrada asignada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.r002t_carrera_materia WHERE id_materia = $1;`,
            [idmateria]
          )

          await dbp.none(
            `DELETE FROM public.m005t_materias WHERE id_materia = $1;`,
            [idmateria]
          )

          return {
            status: 200,
            message: 'Materia eliminada exitosamente',
            type: 'success'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
