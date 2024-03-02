import { dbp } from '../../postgresdb'

export default {
  Mutation: {
    obtenerEstudiante: async (_, { input }) => {
      const { nacionalidad, cedula } = input
      try {
        const estudiantes = await dbp.oneOrNone(
          `SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM estudiantes est, tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND nu_docidentidad_est = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`,
          [nacionalidad, cedula]
        )

        if (estudiantes) {
          return {
            status: 200,
            message: 'Estudiante encontrado',
            type: 'success',
            response: estudiantes
          }
        } else {
          return {
            status: 202,
            message: 'Estudiante no encontrado',
            type: 'error'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    crearEstudiante: async (_, { input }) => {
      const { nacionalidad, cedula, nombre, apellido, sexo } = input

      try {
        await dbp.none(
          `INSERT INTO estudiantes(
                      id_nac_estudiante, nu_docidentidad_est, nb_estudiante, ape_estudiante, id_sexo_estudiante)
                      VALUES ( $1, $2, $3, $4, $5);`,
          [nacionalidad, cedula, nombre, apellido, sexo]
        )

        const estudiantes = await dbp.oneOrNone(
          `SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM estudiantes est, tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND nu_docidentidad_est = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`,
          [nacionalidad, cedula]
        )

        return {
          status: 200,
          message: 'Estudiante encontrado',
          type: 'success',
          response: estudiantes
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
