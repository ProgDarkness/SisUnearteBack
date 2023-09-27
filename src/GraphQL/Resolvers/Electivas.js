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
          `SELECT ce.id_carrelec, ce.id_carrera, c.nb_carrera, ce.id_electiva, e.nb_electiva, ce.id_trayecto, t.nb_trayecto,
          per.id_personal, CONCAT(per.nb_personal, ' ', per.ape_personal) as nb_personal, se.id_sede, se.nb_sede,
		  	  e.co_electiva, e.nu_credito, e.hr_semanal
               FROM public.carrera_electiva ce 
                 LEFT JOIN public.carreras c ON c.id_carrera = ce.id_carrera
                 LEFT JOIN public.trayectos t ON t.id_trayecto = ce.id_trayecto
                 LEFT JOIN public.electiva e ON e.id_electiva = ce.id_electiva
             	   LEFT JOIN public.docente_electiva de ON de.id_electiva = ce.id_electiva
                 LEFT JOIN public.personal per ON de.id_personal = per.id_personal
				         LEFT JOIN public.oferta_academica oa ON de.id_oferta = oa.id_oferta
				         LEFT JOIN public.sedes se ON se.id_sede = oa.id_sede;`
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
      const { idCarrera, idTrayecto, idElectiva, idPersonal, idSede } =
        inputAsigElectiva

      try {
        const validacionElectiva = await dbp.oneOrNone(
          `SELECT id_carrelec FROM public.carrera_electiva 
            WHERE id_carrera = $1 AND id_electiva = $2 AND id_trayecto = $3;`,
          [idCarrera, idElectiva, idTrayecto]
        )

        const idOferta = await dbp.oneOrNone(
          `SELECT id_oferta FROM public.oferta_academica 
            WHERE id_carrera = $1 AND id_sede = $2 AND id_estatus_oferta = 1;`,
          [idCarrera, idSede]
        )

        if (!validacionElectiva?.id_carrelec) {
          await dbp.none(
            `INSERT INTO public.carrera_electiva(
              id_carrera, id_electiva, visible, id_trayecto, created_at, updated_at)
              VALUES ($1, $2, TRUE, $3, now(), now());`,
            [idCarrera, idElectiva, idTrayecto]
          )

          await dbp.none(
            `INSERT INTO public.docente_electiva(
              id_electiva, id_personal, id_estatus, id_carrera, id_oferta, created_at, updated_at)
              VALUES ($1, $2, true, $3, $4, now(), now());`,
            [idElectiva, idPersonal, idCarrera, idOferta.id_oferta]
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
        const idElectiva = await dbp.oneOrNone(
          `SELECT id_electiva FROM public.carrera_electiva WHERE id_carrelec = $1;`,
          [idAsigElectiva]
        )

        await dbp.none(
          `DELETE FROM public.carrera_electiva
          WHERE id_carrelec = $1;`,
          [idAsigElectiva]
        )

        await dbp.none(
          `DELETE FROM public.docente_electiva
          WHERE id_electiva = $1;`,
          [idElectiva.id_electiva]
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
