import { dbp2 } from '../../postgresdb'

export default {
  Mutation: {
    crearDocumentoPostulacion: async (_, { input }) => {
      const { archivo } = input
      try {
        await dbp2.none(
          `INSERT INTO public.documentos(tx_archivo, created_at) VALUES ($1, now());`,
          [archivo]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Documento registrado exitosamente'
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
