import { dbp } from '../../postgresdb'
import { ApolloError } from 'apollo-server-core'
import CryptoJS from 'crypto-js'
import dotenv from 'dotenv'

dotenv.config()

export default {
  Query: {
    getUsuarios: async (_, __, { auth }) => {
      if (!auth) throw new ApolloError('Sesión no Válida')

      try {
        return await dbp.manyOrNone(`SELECT u.id_usuario, u.user_name, u.bl_status, r.nb_rol as rol, u.ced_usuario, u.nb_usuario, u.ape_usuario, u.created_at, u.updated_at
                                      FROM public.t001t_usuarios u, public.t002t_roles r
                                        WHERE u.id_rol = r.id_rol;`)
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    getRoles: async (_, __, { auth }) => {
      if (!auth) throw new ApolloError('Sesión no Válida')

      try {
        return await dbp.manyOrNone(`SELECT id_rol, nb_rol
                                      FROM public.t002t_roles;`)
      } catch (e) {
        throw new ApolloError(e.message)
      }
    }
  },
  Mutation: {
    saveUsuario: async (_, { input }) => {
      const { SECRET_KEY } = process.env
      const { usuario, clave, id_rol, nombre, apellido, cedula, nacionalidad } =
        input

      console.log(input)

      try {
        const claveDesencriptada = CryptoJS.AES.decrypt(
          clave,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
        const hashClave = CryptoJS.SHA256(claveDesencriptada).toString()

        try {
          await dbp.none(
            `INSERT INTO public.t001t_usuarios(
              tx_clave, user_name, bl_status, id_rol, ced_usuario, nb_usuario, ape_usuario)
              VALUES ( $1, $2, $3, $4, $5, $6, $7);`,
            [hashClave, usuario, true, id_rol, cedula, nombre, apellido]
          )

          if (id_rol === 3) {
            await dbp.none(
              `INSERT INTO public.t004t_estudiantes(
                id_nac_estudiante, ced_estudiante, nb_estudiante, ape_estudiante)
                VALUES ($1, $2, $3, $4);`,
              [nacionalidad, cedula, nombre, apellido]
            )
          }
        } catch (e) {
          if (e.constraint === 'user_name_unique') {
            return {
              status: 401,
              type: 'error',
              message: 'El nombre de usuario ya se encuentra en uso'
            }
          } else if (e.constraint === 'ced_user_unique') {
            return {
              status: 402,
              type: 'error',
              message: 'La cedula de usuario ya se encuentra en uso'
            }
          } else if (e.constraint === 'uk_ced_estudiante') {
            return {
              status: 403,
              type: 'error',
              message: 'La cedula del estudiante ya se encuentra en uso'
            }
          }
        }

        return { status: 200, type: 'success', message: 'completado' }
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    deleteUsuario: async (_, { input }, { auth }) => {
      if (!auth) throw new ApolloError('Sesión no Válida')
      const { id_usuario } = input

      try {
        await dbp.none(
          `DELETE FROM public.t001t_usuarios
          WHERE id_usuario =$1`,
          [id_usuario]
        )

        return { status: 200, type: 'success', message: 'completado' }
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    cambiarEstatus: async (_, { input }, { auth }) => {
      if (!auth) throw new ApolloError('Sesión no Válida')
      const { id_usuario } = input

      try {
        let changeStatus = null
        const status = await dbp.oneOrNone(
          `SELECT bl_status
          FROM public.t001t_usuarios
          WHERE id_usuario=$1;`,
          [id_usuario]
        )

        if (status.bl_status) {
          changeStatus = false
        } else {
          changeStatus = true
        }

        await dbp.none(
          `UPDATE public.t001t_usuarios
          SET  bl_status=$2, updated_at=now()
          WHERE id_usuario =$1`,
          [id_usuario, changeStatus]
        )

        return { status: 200, type: 'success', message: 'completado' }
      } catch (e) {
        throw new ApolloError(e.message)
      }
    }
  }
}
