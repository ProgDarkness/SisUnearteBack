import { dbp } from '../../postgresdb'

export default {
  Mutation: {
    insertarEstudiante: async (_, { input }) => {
      const { estatus, datos } = input
      try {
        let signIn
        for (let i = 0; i < datos.length; i++) {
          signIn = await dbp.oneOrNone(
            `CALL public.insertar_estudiante($1, $2, $3, $4, $5, $6)`,
            [
              datos[i].nacionalidad,
              datos[i].cedula,
              datos[i].nombre,
              datos[i].apellido,
              datos[i].sexo,
              estatus
            ]
          )
        }
        if (signIn) {
          return {
            status: 200,
            message: 'Datos Insertados.',
            type: 'success'
          }
        } else {
          return { status: 202, message: 'Datos No Insertados.', type: 'error' }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
