import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerPermisoPostulacion: async (_, { idUser }) => {
      try {
        let permiso = true
        const ofertas = await dbp.manyOrNone(
          `SELECT id_postulacion FROM public.postulacion WHERE id_usuario = $1;`,
          [idUser]
        )

        if (ofertas.length >= 2) {
          permiso = false
        }

        return {
          status: 200,
          message: 'Permiso encontrado',
          type: 'success',
          response: permiso
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerOfertaPostu: async (_, { carrera }) => {
      try {
        const ofertas = await dbp.manyOrNone(
          `SELECT ofe.id_oferta, ofe.id_carrera, c.nb_carrera, ofe.id_sede, s.nb_sede
          FROM public.oferta_academica ofe, public.carreras c, public.sedes s 
            WHERE ofe.id_carrera = c.id_carrera AND ofe.id_sede = s.id_sede AND ofe.id_estatus_oferta = 1;`,
          [carrera]
        )

        return {
          status: 200,
          message: 'Carreras encontrado',
          type: 'success',
          response: ofertas
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerEstatusPostulacion: async () => {
      try {
        const estatus = await dbp.manyOrNone(
          `SELECT id_estatus_postulacion as id, nb_estatus_postulacion as nombre FROM estatus_postulacion;`
        )
        return {
          status: 200,
          message: 'Estatus postulacion encontradas',
          type: 'success',
          response: estatus
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerListadoPostuladoCarrera: async () => {
      try {
        const postulados = await dbp.manyOrNone(
          `SELECT * FROM info_postulados order by idestatus;`
        )

        for (let i = 0; i < postulados.length; i++) {
          for (const key in postulados[i]) {
            const object = postulados[i]
            if (key.startsWith('fe')) {
              postulados[i][key] = new Date(object[key]).toLocaleDateString(
                'es-ES',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }
              )
            }
          }
        }
        return {
          status: 200,
          message: 'Postulados encontrados',
          type: 'success',
          response: postulados
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerPostulacionUsuario: async (_, { idUser }) => {
      try {
        const postulacionusuarios = await dbp.manyOrNone(
          `SELECT p.id_postulacion as id, u.nb_usuario as usuario, c.nb_carrera as carrera, pl.anio_periodo as periodo,
          ep.nb_estatus_postulacion as estatus, s.nb_sede as sede
          FROM public.postulacion p, public.usuarios u, public.carreras c, public.periodo_lectivo pl,
          public.estatus_postulacion ep, public.sedes s
          WHERE p.id_usuario = u.id_usuario AND 
          p.id_carrera = c.id_carrera AND
          p.id_periodo = pl.id_periodo AND
          p.id_estatus_postulacion = ep.id_estatus_postulacion AND
          p.id_sede = s.id_sede AND
           p.id_usuario = $1;`,
          [idUser]
        )

        return {
          status: 200,
          message: 'Postulacion usuario encontrado',
          type: 'success',
          response: postulacionusuarios
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  },
  Mutation: {
    crearPostulacion: async (_, { input }) => {
      const { usuario, carrera, sede, fepostulacion, idOferta } = input

      try {
        let estatus = null
        let activo = null
        let observacion = null
        estatus = 4
        activo = true
        observacion = 'CREADA'

        const idperiodo = await dbp.oneOrNone(
          `SELECT id_periodo FROM periodo_trayecto as pt WHERE pt.id_carrera = $1 AND pt.id_trayecto = 1;`,
          [carrera]
        )

        await dbp.none(
          `INSERT INTO public.postulacion(
                      id_usuario, id_carrera, id_periodo, id_sede, fe_postulacion, id_estatus_postulacion, st_activo, tx_observacion, id_oferta, created_at)
                      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, now());`,
          [
            usuario,
            carrera,
            idperiodo.id_periodo,
            sede,
            fepostulacion,
            estatus,
            activo,
            observacion,
            idOferta
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Postulacion registrada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    aprobarPostulacion: async (_, { input }) => {
      const { usuario, idpostulacion } = input

      let estatus = null
      let feaprobacion = null
      let observacion = null
      estatus = 2
      feaprobacion = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      observacion = 'APROBADA'

      try {
        const idPersonal = await dbp.oneOrNone(
          `SELECT id_personal FROM public.personal WHERE id_usuario = $1;`,
          [usuario]
        )

        await dbp.none(
          `UPDATE public.postulacion
                    SET id_estatus_postulacion = $1, id_personal_aprobacion = $2, fe_aprobacion = $3, tx_observacion = $4, updated_at = now()
                    WHERE id_postulacion = $5;`,
          [
            estatus,
            idPersonal.id_personal,
            feaprobacion,
            observacion,
            idpostulacion
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Postulacion aprobada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    rechazarPostulacion: async (_, { input }) => {
      const { observacion, idpostulacion } = input

      let estatus = null
      estatus = 3

      try {
        await dbp.none(
          `UPDATE public.postulacion
                    SET id_estatus_postulacion = $1, tx_observacion = $2
                    WHERE id_postulacion = $3;`,
          [estatus, observacion, idpostulacion]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Postulacion rechazada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
