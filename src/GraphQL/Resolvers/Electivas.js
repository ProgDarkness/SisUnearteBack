import { dbp } from '../../postgresdb'

export default {
  Query: {
    getTodasElectivasDropDown: async () => {
      try {
        const electivas = await dbp.manyOrNone(
          `SELECT id_electiva as id, nb_electiva as nombre
          FROM public.electiva;`
        )

        return {
          status: 200,
          message: 'Electivas encontradas',
          type: 'success',
          response: electivas
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    getTodasElectivas: async () => {
      try {
        const electivas = await dbp.manyOrNone(
          `SELECT id_electiva, co_electiva, nb_electiva, nu_credito, hr_semanal
          FROM public.electiva;`
        )

        return {
          status: 200,
          message: 'Electivas encontradas',
          type: 'success',
          response: electivas
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    getElectivasAsignadas: async () => {
      try {
        const asigElectivas = await dbp.manyOrNone(
          `SELECT ce.id_carrelec, ce.id_carrera, c.nb_carrera, ce.id_electiva, e.nb_electiva, ce.id_trayecto, t.nb_trayecto
         FROM public.carrera_electiva ce 
           LEFT JOIN carreras c ON c.id_carrera = ce.id_carrera
           LEFT JOIN trayectos t ON t.id_trayecto = ce.id_trayecto
           LEFT JOIN electiva e ON e.id_electiva = ce.id_electiva;`
        )

        return {
          status: 200,
          message: 'Electivas encontradas',
          type: 'success',
          response: asigElectivas
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  },
  Mutation: {
    saveElectiva: async (_, { inputSaveElectiva }) => {
      const { co_electiva, nb_electiva, nu_credito, hr_semanal } =
        inputSaveElectiva

      try {
        await dbp.none(
          `INSERT INTO public.electiva(
	          co_electiva, nb_electiva, nu_credito, hr_semanal, bl_prelacion, id_estatus_materia, created_at, updated_at)
	            VALUES ($1, $2, $3, $4, TRUE, 4, now(), now());`,
          [co_electiva, nb_electiva, nu_credito, hr_semanal]
        )

        return {
          status: 200,
          message: 'Electiva registrada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    deleteElectiva: async (_, { idElectiva }) => {
      try {
        await dbp.none(
          `DELETE FROM public.electiva
          WHERE id_electiva = $1;`,
          [idElectiva]
        )

        return {
          status: 200,
          message: 'Electiva eliminada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    updateElectiva: async (_, { inputSaveElectiva }) => {
      const { id_electiva, co_electiva, nb_electiva, nu_credito, hr_semanal } =
        inputSaveElectiva

      try {
        await dbp.none(
          `UPDATE public.electiva
          SET co_electiva=$1, nb_electiva=$2, nu_credito=$3, hr_semanal=$4, updated_at=now()
          WHERE id_electiva = $5;`,
          [co_electiva, nb_electiva, nu_credito, hr_semanal, id_electiva]
        )

        return {
          status: 200,
          message: 'Electiva actualizada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    asignarElectiva: async (_, { inputAsigElectiva }) => {
      const { idCarrera, idTrayecto, idElectiva } = inputAsigElectiva

      try {
        const validacionElectiva = await dbp.oneOrNone(
          `SELECT id_carrelec FROM public.carrera_electiva 
            WHERE id_carrera = $1 AND id_electiva = $2 AND id_trayecto = $3;`,
          [idCarrera, idElectiva, idTrayecto]
        )

        if (!validacionElectiva?.id_carrelec) {
          await dbp.none(
            `INSERT INTO public.carrera_electiva(
              id_carrera, id_electiva, visible, id_trayecto, created_at, updated_at)
              VALUES ($1, $2, TRUE, $3, now(), now());`,
            [idCarrera, idElectiva, idTrayecto]
          )
        } else {
          return {
            status: 400,
            message: 'La electiva ya ha sido asignada',
            type: 'error'
          }
        }

        return {
          status: 200,
          message: 'Electiva asignada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    deleteAsignarElectiva: async (_, { idAsigElectiva }) => {
      try {
        await dbp.none(
          `DELETE FROM public.carrera_electiva
          WHERE id_carrelec = $1;`,
          [idAsigElectiva]
        )

        return {
          status: 200,
          message: 'Electiva eliminada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
