import { dbp } from '../../postgresdb'

export default {
  Mutation: {
    insertarEstudiante: async (_, { input }) => {
      console.log(input)
      const { estatus } = input
      try {
        for (let i = 0; i < input.datos.length; i++) {
          console.log(input.datos[i].nombre)

          await dbp.query(
            `CALL public.insertar_estudiante($1, $2, $3, $4, $5)`,
            [
              input.datos[i].cedula,
              input.datos[i].nombre,
              input.datos[i].apellido,
              input.datos[i].sexo,
              estatus
            ]
          )
        }
        return {
          status: 200,
          message: 'Datos Insertados.',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
