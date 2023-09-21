import { dbp } from '../../postgresdb'

export default {
  Query: {
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
          SET co_electiva=$1, nb_electiva=$2, nu_credito=$3, hr_semanal=$4 updated_at=now()
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
    }
  }
}
