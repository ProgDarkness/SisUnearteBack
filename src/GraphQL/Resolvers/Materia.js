import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerTodasMaterias: async () => {
      try {
        const materias = await dbp.manyOrNone(
          `SELECT m.id_materia as id, m.co_materia as codigo, m.nb_materia as nombre, m.nu_credito as credito, 
            m.hr_semanal as hora, em.nb_estatus_materia as estatus, tm.nb_tp_materia as tipo, tm.id_tp_materia as idtipo
              FROM public.materias as m, public.estatus_materia as em, public.tipo_materia as tm
                WHERE m.id_estatus_materia = em.id_estatus_materia and m.id_tp_materia = tm.id_tp_materia;`
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
    crearMateria: async (_, { input }) => {
      const { codigo, nombre, credito, tipo, hora } = input

      try {
        await dbp.none(
          `INSERT INTO public.materias(
                      co_materia, nb_materia, nu_credito, id_tp_materia, hr_semanal, id_estatus_materia, bl_prelacion, created_at, updated_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now());`,
          [codigo, nombre, credito, tipo, hora, 4, true]
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
          `UPDATE public.materias
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
        const materiadocente = await dbp.manyOrNone(
          `SELECT id_materia FROM docente_materia as dm WHERE dm.id_materia = $1;`,
          [idmateria]
        )

        const materiainscripcion = await dbp.manyOrNone(
          `SELECT id_materia FROM inscripcion_materia as im WHERE im.id_materia = $1;`,
          [idmateria]
        )

        const materiacarrera = await dbp.manyOrNone(
          `SELECT id_materia FROM public.carrera_materia WHERE id_materia = $1;`,
          [idmateria]
        )

        if (
          materiadocente[0]?.id_materia ||
          materiainscripcion[0]?.id_materia ||
          materiacarrera[0]?.id_materia
        ) {
          return {
            status: 202,
            message:
              'Materia no puede ser eliminada encontrada asignada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.carrera_materia WHERE id_materia = $1;`,
            [idmateria]
          )

          await dbp.none(`DELETE FROM public.materias WHERE id_materia = $1;`, [
            idmateria
          ])

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
