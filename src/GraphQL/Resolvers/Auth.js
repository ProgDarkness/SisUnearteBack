import { dbp } from '../../postgresdb'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ApolloError } from 'apollo-server-core'

dotenv.config()

export default {
  Query: {
    login: async (_, { input }) => {
      const { SECRET_KEY } = process.env
      const { usuario, clave } = input

      try {
        const claveDesencriptada = CryptoJS.AES.decrypt(
          clave,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
        const hashClave = CryptoJS.SHA256(claveDesencriptada).toString()

        const login = await dbp.oneOrNone(
          `SELECT u.id_usuario, u.user_name, u.bl_status, u.id_rol, u.id_nacionalidad, n.co_nacionalidad, n.nb_nacionalidad, u.nu_docidentidad_usu, u.nb_usuario, u.ape_usuario, u.created_at, u.updated_at
          FROM public.usuarios u, public.tipo_nacionalidad n WHERE user_name = $1 AND tx_clave = $2 AND u.id_nacionalidad = n.id_nacionalidad;`,
          [usuario, hashClave]
        )

        if (login) {
          const {
            id_usuario,
            user_name,
            bl_status,
            created_at,
            id_rol,
            id_nacionalidad,
            co_nacionalidad,
            nb_nacionalidad,
            nu_docidentidad_usu,
            nb_usuario,
            ape_usuario
          } = login

          const nacionalidad = {
            id: id_nacionalidad.toString(),
            codigo: co_nacionalidad,
            nombre: nb_nacionalidad
          }

          login.token = jwt.sign(
            {
              id_usuario,
              user_name,
              bl_status,
              id_rol,
              nacionalidad,
              nu_docidentidad_usu,
              nb_usuario,
              ape_usuario,
              created_at
            },
            SECRET_KEY,
            { expiresIn: 60 * 40 }
          )

          return CryptoJS.AES.encrypt(
            JSON.stringify({
              status: 200,
              message: 'Acceso permitido. Cargando Datos...',
              type: 'success',
              response: login
            }),
            SECRET_KEY
          ).toString()
        } else {
          return CryptoJS.AES.encrypt(
            JSON.stringify({
              status: 202,
              message: 'Usuario y/o Contraseña Incorrectos.',
              type: 'error'
            }),
            SECRET_KEY
          ).toString()
        }

        // SOLO PARA LA PLANTILLA:

        /* const login = {}
        login.token = jwt.sign({ usuario }, SECRET_KEY, {
          expiresIn: 60 * 10000
        })

        return CryptoJS.AES.encrypt(
          JSON.stringify({ login }),
          SECRET_KEY
        ).toString() */
      } catch (e) {
        throw new ApolloError(e.message)
      }
    },
    user: async (_, __, { auth }) => {
      if (!auth) throw new ApolloError('Sesión no válida')
      const { SECRET_KEY } = process.env
      const {
        id_usuario,
        user_name,
        bl_status,
        id_rol,
        nacionalidad,
        nu_docidentidad_usu,
        nb_usuario,
        ape_usuario,
        created_at
      } = auth
      auth.token = jwt.sign(
        {
          id_usuario,
          user_name,
          bl_status,
          id_rol,
          nacionalidad,
          nu_docidentidad_usu,
          nb_usuario,
          ape_usuario,
          created_at
        },
        SECRET_KEY,
        { expiresIn: 60 * 100000 }
      )
      return CryptoJS.AES.encrypt(JSON.stringify(auth), SECRET_KEY).toString()
    }
  }
}
