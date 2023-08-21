import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerTodasMaterias: async () => {
      try {
        const materias =
          await dbp.manyOrNone(`SELECT m.id_materia as id, m.co_materia as codigo, m.nb_materia as nombre, m.nu_credito as credito, 
                                            m.hr_semanal as hora, em.nb_estatus_materia as estatus, tm.nb_tp_materia as tipo
                                            FROM public.m005t_materias as m, public.m037t_estatus_materia as em, public.m012t_tipo_materia as tm
                                            where m.id_estatus_materia = em.id_estatus_materia and m.id_tp_materia = tm.id_tp_materia;`)
        return {
          status: 200,
          message: 'Listado de materias encontradas',
          type: 'success',
          response: materias
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    Mutation: {
        crearMateria: async (_, {input}) => {
            const {codigo, nombre, credito, tipo, hora} = input
            
            try {     
                let estatus = null;
                estatus = 4;

                await dbp.none(
                    `INSERT INTO public.m005t_materias(
                      co_materia, nb_materia, nu_credito, id_tp_materia, hr_semanal, id_estatus_materia)
                      VALUES ($1, $2, $3, $4, $5, $6);`, [codigo, nombre, credito, tipo, hora, estatus])

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
      const { codigo, nombre, credito, tipo, hora, estatus, idmateria } = input

      try {
        await dbp.none(
          `UPDATE public.m005t_materias
                    SET co_materia = $1, nb_materia = $2, nu_credito = $3, id_tp_materia = $4, hr_semanal = $5, id_estatus_materia = $6
                    WHERE id_materia = $7;`,
          [codigo, nombre, credito, tipo, hora, estatus, idmateria]
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
          `SELECT * FROM r001t_docente_materia as dm WHERE dm.id_materia = $1;`,
          [idmateria]
        )

        const materiacarrera = await dbp.oneOrNone(
          `SELECT * FROM r002t_carrera_materia cm WHERE cm.id_materia = $1;`,
          [idmateria]
        )

        const materiainscripcion = await dbp.oneOrNone(
          `SELECT * FROM r003t_inscripcion_materia as im WHERE im.id_materia = $1;`,
          [idmateria]
        )

        if (materiadocente || materiacarrera || materiainscripcion) {
          return {
            status: 202,
            message:
              'Materia no puede ser eliminada encontrada asignada a otros datos',
            type: 'success'
          }
        } else {
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
