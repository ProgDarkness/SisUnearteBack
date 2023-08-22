import { dbp } from '../../postgresdb'

export default {
  Mutation: {
    insertarEstudiante: async (_, { input }) => {
      console.log(input)
      const { estatus } = input
      try {
        let signIn
        for (let i = 0; i < input.datos.length; i++) {
          console.log(input.datos[i].nombre)

          signIn = await dbp.oneOrNone(
            `CALL public.insertar_estudiante($1, $2, $3, $4, $5, $6)`,
            [
              input.datos[i].nacionalidad,
              input.datos[i].cedula,
              input.datos[i].nombre,
              input.datos[i].apellido,
              input.datos[i].sexo,
              estatus
            ]
          )
        }
        console.log('hola', signIn)
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
