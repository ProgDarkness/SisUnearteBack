import { dbp2 } from '../../postgresdb'

export default {
  Mutation: {
    crearDocumentoPostulacion: async (_, { input }) => {
      const { archivo, extension, idUser, id_tp_documento } = input
      try {
        const archivoCargado = await dbp2.oneOrNone(
          `SELECT id_documento FROM public.documentos WHERE id_usuario = $1 AND id_requisito_documento = $2;`,
          [idUser, id_tp_documento]
        )

        if (!archivoCargado?.id_documento) {
          await dbp2.none(
            `INSERT INTO public.documentos(id_requisito_documento, tx_archivo, tx_extension, id_estatus_documento, id_usuario, created_at) VALUES ($1, $2, $3, $4, $5, now());`,
            [id_tp_documento, archivo, extension, 1, idUser]
          )
        } else {
          return {
            status: 400,
            type: 'error',
            message:
              'Ya se encuentra un documento cargado, si quiere reemplazarlo debe eliminar y volver a cargar el archivo'
          }
        }

        return {
          status: 200,
          type: 'success',
          message: 'Documento registrado exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerArchivoUsuario: async (_, { inputDatosArchivo }) => {
      const { idUser, id_tp_documento } = inputDatosArchivo
      try {
        const archivoCargado = await dbp2.oneOrNone(
          `SELECT tx_archivo FROM public.documentos WHERE id_usuario = $1 AND id_requisito_documento = $2;`,
          [idUser, id_tp_documento]
        )

        if (archivoCargado?.tx_archivo) {
          return {
            status: 200,
            type: 'success',
            message: 'Documento encontrado exitosamente',
            response: archivoCargado.tx_archivo
          }
        } else {
          return {
            status: 400,
            type: 'warn',
            message: 'no posee ningun documento cargado'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarArchivoUsuario: async (_, { inputDatosArchivo }) => {
      const { idUser, id_tp_documento } = inputDatosArchivo

      try {
        const archivoCargado = await dbp2.oneOrNone(
          `SELECT id_documento FROM public.documentos WHERE id_usuario = $1 AND id_requisito_documento = $2;`,
          [idUser, id_tp_documento]
        )

        if (archivoCargado?.id_documento) {
          await dbp2.none(
            `DELETE FROM public.documentos WHERE id_documento = $1 AND id_usuario = $2 AND id_requisito_documento = $3;`,
            [archivoCargado.id_documento, idUser, id_tp_documento]
          )

          return {
            status: 200,
            type: 'success',
            message: 'Documento eliminado exitosamente'
          }
        } else {
          return {
            status: 400,
            type: 'warn',
            message: 'No Posee Ningun Documento Cargado'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerFotoPerfilUsuario: async (_, { idUser }) => {
      try {
        const fotoperfilusuario = await dbp2.oneOrNone(
          `SELECT id_fotoperfil as id, tx_archivo as archivo
          FROM public.fotoperfil WHERE id_usuario = $1;`,
          [idUser]
        )

        return {
          status: 200,
          message: 'Foto perfil usuario encontrado',
          type: 'success',
          response: fotoperfilusuario
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    crearFotoEstudiante: async (_, { input }) => {
      const { archivo, idUsuario } = input
      try {
        const fotoperfil = await dbp2.oneOrNone(
          `SELECT id_fotoperfil FROM public.fotoperfil WHERE id_usuario = $1;`,
          [idUsuario]
        )

        if (!fotoperfil?.id_fotoperfil) {
          await dbp2.none(
            `INSERT INTO public.fotoperfil(tx_archivo, id_usuario, created_at) VALUES ($1, $2, now());`,
            [archivo, idUsuario]
          )
        } else {
          await dbp2.none(
            `UPDATE public.fotoperfil
                      SET tx_archivo = $1, updated_at = now()
                      WHERE id_usuario = $2;`,
            [archivo, idUsuario]
          )
        }

        return {
          status: 200,
          type: 'success',
          message: 'Fotografia registrada exitosamente'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarFotoEstudiante: async (_, { input }) => {
      const { idFotoEstudiante } = input
      try {
        await dbp2.none(
          `DELETE FROM public.fotoperfil WHERE id_fotoperfil = $1;`,
          [idFotoEstudiante]
        )

        return {
          status: 200,
          message: 'Fotografia eliminada exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
