import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerPersonal: async () => {
      try {
        const personal = await dbp.manyOrNone(
          `SELECT p.id_personal as id, p.id_nacionalidad as idnac, tn.co_nacionalidad as nacionalidad, 
          p.ced_personal as cedula, p.nb_personal as nombre, p.ape_personal as apellido,
          p.id_tp_sexo as idsexo, ts.co_tp_sexo as sexo, p.id_civil as idcivil, ec.nb_civil as civil,
          p.tlf_fijo as tlffijo, p.tlf_movil as tlfmovil,
          p.correo as correo, p.id_estatus_personal as idestatus, ep.nb_estatus_personal as estatus,
          p.carga_horaria as cargahoraria, p.id_tp_personal as idtipo, tp.nb_tp_personal as tipo, 
          p.id_profesion as idprofesion, prof.nb_profesion as profesion
          FROM public.t003t_personal p, public.m028t_tipo_nacionalidad tn, public.m010t_estatus_personal ep,
          public.m011t_profesion prof, public.m026t_tipo_sexo ts, public.m027t_estado_civil ec, public.m008t_tipo_personal tp
          where p.id_nacionalidad = tn.id_nacionalidad
          AND p.id_estatus_personal = ep.id_estatus_personal
          AND p.id_profesion = prof.id_profesion
          AND p.id_tp_sexo = ts.id_tp_sexo
          AND p.id_civil = ec.id_civil;`
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
        estatus = 1
        usuario = 16

        await dbp.none(
          `INSERT INTO public.t003t_personal(
                      id_nacionalidad, ced_personal, nb_personal, ape_personal, tlf_fijo, tlf_movil, correo, id_estatus_personal, id_tp_personal, carga_horaria, id_profesion, id_tp_sexo, id_civil, id_usuario)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`,
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
            usuario
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
          `UPDATE public.t003t_personal
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
          `SELECT id_personal FROM r001t_docente_materia WHERE id_personal = $1;`,
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
            `DELETE FROM public.t003t_personal WHERE id_personal = $1;`,
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
