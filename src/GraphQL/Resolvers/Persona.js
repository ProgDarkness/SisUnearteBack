import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerPersonal: async () => {
      try {
        const personal = await dbp.manyOrNone(
          `SELECT * FROM public.info_personal;`
        )
        return {
          status: 200,
          message: 'Personal encontrados',
          type: 'success',
          response: personal
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    getInfoPersonal: async (_, { idpersonal }) => {
      try {
        const estatusPersonalReg = await dbp.oneOrNone(
          `SELECT bl_registro FROM public.personal WHERE id_personal = $1;`,
          [idpersonal]
        )

        if (estatusPersonalReg?.bl_registro) {
          const infoPersonal = await dbp.oneOrNone(
            `SELECT * FROM public.info_personal ip WHERE ip.id_personal = $1;`,
            [idpersonal]
          )

          const {
            idnac,
            nacionalidad,
            cedula,
            nombre,
            apellido,
            idsexo,
            sexo,
            idcivil,
            civil,
            tlffijo,
            tlfmovil,
            correo,
            idestatus,
            estatus,
            cargahoraria,
            idtipo,
            tipo,
            idprofesion,
            profesion,
            bl_registro
          } = infoPersonal

          const RinfoPersonal = {
            nacionalidad: {
              id: idnac,
              nombre: nacionalidad
            },
            cedula,
            nombre,
            apellido,
            sexo: { id: idsexo, nombre: sexo },
            estadoCivil: { id: idcivil, nombre: civil },
            tlffijo,
            tlfmovil,
            correo,
            estatusPersonal: { id: idestatus, nombre: estatus },
            cargahoraria,
            tipo: { id: idtipo, nombre: tipo },
            profesion: { id: idprofesion, nombre: profesion },
            bl_registro
          }

          return {
            status: 200,
            type: 'success',
            message: 'Personal encontrado',
            response: RinfoPersonal
          }
        } else {
          return {
            status: 202,
            type: 'error',
            message: 'Personal no registrado'
          }
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    }
  },
  Mutation: {
    crearPersonal: async (_, { input }) => {
      const {
        nacionalidad,
        cedula,
        nombre,
        apellido,
        tlffijo,
        tlfmovil,
        correo,
        tipo,
        cargahoraria,
        profesion,
        sexo,
        civil
      } = input

      try {
        let estatus = null
        let usuario = null
        let blregistro = null
        estatus = 1
        usuario = 16
        blregistro = true

        await dbp.none(
          `INSERT INTO public.personal(
                      id_nacionalidad, ced_personal, nb_personal, ape_personal, tlf_fijo, tlf_movil, correo, id_estatus_personal, id_tp_personal, carga_horaria, id_profesion, id_tp_sexo, id_civil, id_usuario, bl_registro)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);`,
          [
            nacionalidad,
            cedula,
            nombre,
            apellido,
            tlffijo,
            tlfmovil,
            correo,
            estatus,
            tipo,
            cargahoraria,
            profesion,
            sexo,
            civil,
            usuario,
            blregistro
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Personal registrado exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    actualizarPersonal: async (_, { input }) => {
      const {
        nacionalidad,
        cedula,
        nombre,
        apellido,
        tlffijo,
        tlfmovil,
        correo,
        estatus,
        tipo,
        cargahoraria,
        profesion,
        sexo,
        civil,
        idpersonal
      } = input

      try {
        await dbp.none(
          `UPDATE public.personal
               SET id_nacionalidad = $1, ced_personal = $2, nb_personal = $3, ape_personal = $4, tlf_fijo = $5, tlf_movil = $6, 
               correo = $7, id_estatus_personal = $8, id_tp_personal = $9, carga_horaria = $10, id_profesion = $11, id_tp_sexo = $12, 
               id_civil = $13 WHERE id_personal =$14;`,
          [
            nacionalidad,
            cedula,
            nombre,
            apellido,
            tlffijo,
            tlfmovil,
            correo,
            estatus,
            tipo,
            cargahoraria,
            profesion,
            sexo,
            civil,
            idpersonal
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Personal actualizado exitosamente'
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    },
    eliminarPersonal: async (_, { input }) => {
      const { idpersonal } = input

      try {
        const personalmateria = await dbp.manyOrNone(
          `SELECT id_personal FROM docente_materia WHERE id_personal = $1;`,
          [idpersonal]
        )

        if (personalmateria?.id_personal) {
          return {
            status: 202,
            message: 'Personal no puede ser eliminada asociada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.personal WHERE id_personal = $1;`,
            [idpersonal]
          )

          return {
            status: 200,
            message: 'Personal eliminada exitosamente',
            type: 'success'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
