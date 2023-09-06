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
    },
    getInfoUsuario: async (_, { id_usuario }) => {
      try {
        const estatusUserReg = await dbp.oneOrNone(
          `SELECT bl_registro FROM public.t001t_usuarios WHERE id_usuario = $1;`,
          [id_usuario]
        )

        if (estatusUserReg?.bl_registro) {
          const infoUser = await dbp.oneOrNone(
            `SELECT * FROM public.v001_info_usuario iu WHERE iu.id_usuario = $1;`,
            [id_usuario]
          )

          const {
            id_nacionalidad,
            co_nacionalidad,
            nb_nacionalidad,
            ced_usuario,
            nb_usuario,
            ape_usuario,
            id_tp_sexo,
            nb_tp_sexo,
            fe_nac_usuario,
            id_pais,
            nb_pais,
            id_civil,
            nb_civil,
            correo_usuario,
            id_tp_via,
            nb_tp_via,
            nb_via,
            id_tp_zona,
            nb_tp_zona,
            nb_zona,
            id_zona,
            id_tp_vivienda,
            nb_tp_vivienda,
            nu_vivienda,
            id_ciudad,
            nb_ciudad,
            id_estado,
            nb_estado,
            cod_zona_postal,
            id_municipio,
            nb_municipio,
            id_parroquia,
            nb_parroquia,
            bl_registro,
            nb2_usuario,
            ape2_usuario,
            id_tp_discapacidad,
            nb_tp_discapacidad,
            nb_etnia,
            id_etnia,
            id_pais_nac,
            pais_nac,
            id_ciudad_nac,
            ciudad_nac,
            id_estado_nac,
            estado_nac
          } = infoUser

          const RinfoUser = {
            nacionalidad: {
              id: id_nacionalidad,
              codigo: co_nacionalidad,
              nombre: nb_nacionalidad
            },
            ced_usuario,
            nb_usuario,
            ape_usuario,
            sexo: { id: id_tp_sexo, nombre: nb_tp_sexo },
            fe_nac_usuario,
            paisNac: { id: id_pais_nac, nombre: pais_nac },
            estadoNac: { id: id_estado_nac, nombre: estado_nac },
            ciudadNac: { id: id_ciudad_nac, nombre: ciudad_nac },
            pais: { id: id_pais, nombre: nb_pais },
            estadoCivil: { id: id_civil, nombre: nb_civil },
            correo_usuario,
            tpVia: { id: id_tp_via, nombre: nb_tp_via },
            nb_via,
            tpZona: { id: id_tp_zona, nombre: nb_tp_zona },
            nombZona: {
              nombre: nb_zona,
              id: id_zona,
              codigo_postal: cod_zona_postal
            },
            tpVivienda: { id: id_tp_vivienda, nombre: nb_tp_vivienda },
            nu_vivienda,
            ciudad: { id: id_ciudad, nombre: nb_ciudad },
            estado: { id: id_estado, nombre: nb_estado },
            municipio: { id: id_municipio, nombre: nb_municipio },
            parroquia: { id: id_parroquia, nombre: nb_parroquia },
            bl_registro,
            nb2_usuario,
            ape2_usuario,
            discapacidad: {
              id: id_tp_discapacidad,
              nombre: nb_tp_discapacidad
            },
            etnia: { id: id_etnia, nombre: nb_etnia }
          }

          return {
            status: 200,
            type: 'success',
            message: 'Usuario encontrado',
            response: RinfoUser
          }
        } else {
          return {
            status: 202,
            type: 'error',
            message: 'Usuario no registrado'
          }
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    }
  },
  Mutation: {
    saveUsuario: async (_, { input }) => {
      const { SECRET_KEY } = process.env
      const { usuario, clave, id_rol, nombre, apellido, cedula, nacionalidad } =
        input

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
    },
    crearUsuario: async (_, { input }) => {
      const {
        idnacionalidad,
        cedula,
        nombre,
        apellido,
        sexo,
        fenac,
        idpais,
        idcivil,
        correo,
        idtpvia,
        nbtpvia,
        idtpzona,
        nbzona,
        idtpvivienda,
        nuvivienda,
        idciudad,
        idestado,
        idmunicipio,
        idparroquia,
        idpostal,
        blregistro
      } = input

      try {
        await dbp.none(
          `INSERT INTO public.t001t_usuarios(
                id_nacionalidad, ced_usuario, nb_usuario, ape_usuario, id_tp_sexo, fe_nac_usuario, id_pais, id_civil, correo_usuario, id_tp_via, nb_via, id_tp_zona, nb_zona, id_tp_vivienda, nu_vivienda, id_ciudad, id_estado, id_municipio, id_parroquia, id_zona, bl_registro)
                VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);`,
          [
            idnacionalidad,
            cedula,
            nombre,
            apellido,
            sexo,
            fenac,
            idpais,
            idcivil,
            correo,
            idtpvia,
            nbtpvia,
            idtpzona,
            nbzona,
            idtpvivienda,
            nuvivienda,
            idciudad,
            idestado,
            idmunicipio,
            idparroquia,
            idpostal,
            blregistro
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Usuario registrado exitosamente'
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    },
    actualizarUsuario: async (_, { input }) => {
      const {
        idnacionalidad,
        cedula,
        nombre,
        apellido,
        nombre2,
        apellido2,
        sexo,
        fenac,
        idpaisorigen,
        idpais,
        idcivil,
        correo,
        idtpvia,
        nbtpvia,
        idtpzona,
        nbzona,
        idZona,
        idtpvivienda,
        nuvivienda,
        idciudad,
        idestado,
        idmunicipio,
        idparroquia,
        idpostal,
        blregistro,
        idusuario,
        idDiscapacidad,
        idEtnia,
        idEstadoNac,
        idCiudadNac
      } = input

      try {
        await dbp.none(
          `UPDATE public.t001t_usuarios
               SET id_nacionalidad = $1, ced_usuario = $2, nb_usuario = $3, ape_usuario = $4, id_tp_sexo = $5, fe_nac_usuario = $6, 
               id_pais_nac = $7, id_civil = $8, correo_usuario = $9, id_tp_via = $10, nb_via = $11, id_tp_zona = $12, 
               nb_zona = $13, id_tp_vivienda = $14, nu_vivienda = $15, id_ciudad = $16, id_estado = $17, id_municipio = $18, id_parroquia = $19, 
               cod_zona_postal = $20, bl_registro = $21, nb2_usuario = $23, ape2_usuario = $24, id_zona = $25, id_pais = $26, id_tp_discapacidad = $27,
               id_etnia = $28, id_estado_nac = $29, id_ciudad_nac = $30, updated_at = now()
               WHERE id_usuario =$22;`,
          [
            idnacionalidad,
            cedula,
            nombre,
            apellido,
            sexo,
            fenac,
            idpaisorigen,
            idcivil,
            correo,
            idtpvia || null,
            nbtpvia || null,
            idtpzona || null,
            nbzona || null,
            idtpvivienda,
            nuvivienda,
            idciudad || null,
            idestado,
            idmunicipio || null,
            idparroquia || null,
            idpostal || null,
            blregistro,
            idusuario,
            nombre2,
            apellido2,
            idZona || null,
            idpais,
            idDiscapacidad,
            idEtnia,
            idEstadoNac,
            idCiudadNac || null
          ]
        )
        return {
          status: 200,
          type: 'success',
          message: 'Usuario guardado exitosamente'
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    },
    obtenerUsuario: async (_, { input }) => {
      const { idusuario } = input

      try {
        const usuario = await dbp.oneOrNone(
          `SELECT u.id_usuario as id, tn.co_nacionalidad as nacionalidad, u.ced_usuario as cedula, u.nb_usuario as nombre, u.ape_usuario as apellido,
              ts.co_tp_sexo as sexo, u.fe_nac_usuario as fenac, pais.nb_pais as pais, ec.nb_civil as civil, u.correo_usuario as correo, tvia.nb_tp_via as nbtpbia, u.nb_via as nbvia, 
              tzona.nb_tp_zona as nbtpzona, u.nb_zona as nbzona, tvivienda.nb_tp_vivienda as nbtpvivienda, u.nu_vivienda as nuvivienda,
              c.nb_ciudad as ciudad, e.nb_estado as estado, m.nb_municipio as municipio, p.nb_parroquia as parroquia
              FROM t001t_usuarios as u, m028t_tipo_nacionalidad as tn, m026t_tipo_sexo as ts, m027t_estado_civil as ec, m022t_paises as pais,
              m025t_tipo_via as tvia, m024t_tipo_zona as tzona, m021t_tipo_vivienda as tvivienda, 
              m020t_ciudades as c, m001t_estados as e, m002t_municipios as m, m003t_parroquias as p
              WHERE u.id_nacionalidad = tn.id_nacionalidad
              and u.id_tp_sexo = ts.id_tp_sexo
              and u.id_civil = ec.id_civil
              and u.id_pais = pais.id_pais
              and u.id_tp_via = tvia.id_tp_via
              and u.id_tp_zona = tzona.id_tp_zona
              and u.id_tp_vivienda = tvivienda.id_tp_vivienda
              and u.id_ciudad = c.id_ciudad
              and u.id_estado = e.id_estado
              and u.id_municipio = m.id_municipio 
              and u.id_parroquia = p.id_parroquia
              and u.id_usuario = $1;`,
          [idusuario]
        )

        return {
          status: 200,
          type: 'success',
          message: 'Usuario encontrado',
          response: usuario
        }
      } catch (e) {
        return { status: 500, type: 'error', message: `Error: ${e.message}` }
      }
    }
  }
}
