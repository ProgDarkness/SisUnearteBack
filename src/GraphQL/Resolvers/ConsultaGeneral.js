import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerMaterias: async () => {
      try {
        const materias = await dbp.manyOrNone(
          `SELECT id_materia as id, nb_materia as nombre FROM materias;`
        )
        return {
          status: 200,
          message: 'Materias encontradas',
          type: 'success',
          response: materias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCarreras: async () => {
      try {
        const carreras = await dbp.manyOrNone(
          `SELECT id_carrera as id, nb_carrera as nombre FROM carreras;`
        )
        return {
          status: 200,
          message: 'Carreras encontradas',
          type: 'success',
          response: carreras
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoCarrera: async () => {
      try {
        const tiposcarreras = await dbp.manyOrNone(
          `SELECT id_tp_carrera as id, nb_tp_carrera as nombre FROM tipo_carrera;`
        )
        return {
          status: 200,
          message: 'Tipos de Carreras encontrados',
          type: 'success',
          response: tiposcarreras
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerEstatusCarrera: async () => {
      try {
        const estatuscarreras = await dbp.manyOrNone(
          `SELECT id_estatus_carrera as id, nb_estatus_carrera as nombre FROM estatus_carrera;`
        )
        return {
          status: 200,
          message: 'Estatus de Carreras encontrados',
          type: 'success',
          response: estatuscarreras
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerNacionalidades: async () => {
      try {
        const nacionalidades = await dbp.manyOrNone(
          `SELECT id_nacionalidad as id, co_nacionalidad as codigo, nb_nacionalidad as nombre FROM tipo_nacionalidad;`
        )
        return {
          status: 200,
          message: 'Nacionalidades encontradas',
          type: 'success',
          response: nacionalidades
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerSexos: async () => {
      try {
        const sexos = await dbp.manyOrNone(
          `SELECT id_tp_sexo as id, nb_tp_sexo as nombre FROM tipo_sexo;`
        )
        return {
          status: 200,
          message: 'Sexos encontrados',
          type: 'success',
          response: sexos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerDiscapacidades: async () => {
      try {
        const discapacidades = await dbp.manyOrNone(
          `SELECT id_tp_discapacidad as id, nb_tp_discapacidad as nombre FROM tipo_discapacidad;`
        )
        return {
          status: 200,
          message: 'Discapacidades encontradas',
          type: 'success',
          response: discapacidades
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCiudades: async () => {
      try {
        const estados = await dbp.manyOrNone(
          `SELECT id_ciudad as id, nb_ciudad as nombre FROM ciudades;`
        )
        return {
          status: 200,
          message: 'Estados encontrados',
          type: 'success',
          response: estados
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerEstados: async () => {
      try {
        const estados = await dbp.manyOrNone(
          `SELECT id_estado as id, nb_estado as nombre FROM estados;`
        )
        return {
          status: 200,
          message: 'Estados encontrados',
          type: 'success',
          response: estados
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerMunicipios: async () => {
      try {
        const municipios = await dbp.manyOrNone(
          `SELECT id_municipio as id, nb_municipio as nombre FROM municipios;`
        )
        return {
          status: 200,
          message: 'Municipios encontrados',
          type: 'success',
          response: municipios
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerParroquias: async () => {
      try {
        const parroquias = await dbp.manyOrNone(
          `SELECT id_parroquia as id, nb_parroquia as nombre FROM parroquias;`
        )
        return {
          status: 200,
          message: 'Parroquias encontrados',
          type: 'success',
          response: parroquias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoVia: async () => {
      try {
        const vias = await dbp.manyOrNone(
          `SELECT id_tp_via as id, nb_tp_via as nombre FROM tipo_via;`
        )
        return {
          status: 200,
          message: 'Vias encontradas',
          type: 'success',
          response: vias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoZona: async () => {
      try {
        const zonas = await dbp.manyOrNone(
          `SELECT id_tp_zona as id, nb_tp_zona as nombre FROM tipo_zona;`
        )
        return {
          status: 200,
          message: 'Zonas encontradas',
          type: 'success',
          response: zonas
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoVivienda: async () => {
      try {
        const viviendas = await dbp.manyOrNone(
          `SELECT id_tp_vivienda as id, nb_tp_vivienda as nombre FROM tipo_vivienda;`
        )
        return {
          status: 200,
          message: 'Viviendas encontradas',
          type: 'success',
          response: viviendas
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerPaises: async () => {
      try {
        const paises = await dbp.manyOrNone(
          `SELECT id_pais as id, nb_pais as nombre FROM paises;`
        )
        return {
          status: 200,
          message: 'Paises encontrados',
          type: 'success',
          response: paises
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCodigoPostal: async () => {
      try {
        const postales = await dbp.manyOrNone(
          `SELECT id_zona as id, id_parroquia as parroquia, nb_zona as nombre, codigo_postal as codigo FROM zona;`
        )
        return {
          status: 200,
          message: 'Codigos Postales encontrados',
          type: 'success',
          response: postales
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoDocumento: async () => {
      try {
        const tiposdocumentos = await dbp.manyOrNone(
          `SELECT id_tp_documento as id, nb_tp_documento as nombre FROM tipo_documento WHERE visible is true ORDER BY id_tp_documento;`
        )
        return {
          status: 200,
          message: 'Tipos de Documentos encontrados',
          type: 'success',
          response: tiposdocumentos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerEstadoCivil: async () => {
      try {
        const estadosciviles = await dbp.manyOrNone(
          `SELECT id_civil as id, nb_civil as nombre FROM public.tipo_estado_civil;`
        )
        return {
          status: 200,
          message: 'Estados civiles encontrados',
          type: 'success',
          response: estadosciviles
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerEtnia: async () => {
      try {
        const etnias = await dbp.manyOrNone(
          `SELECT id_etnia as id, nb_etnia as nombre FROM public.tipo_etnia;`
        )
        return {
          status: 200,
          message: 'Etnias encontrados',
          type: 'success',
          response: etnias
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerCiclos: async () => {
      try {
        const tpciclos = await dbp.manyOrNone(
          `SELECT id_ciclo as id, nb_ciclo as nombre FROM public.ciclos;`
        )
        return {
          status: 200,
          message: 'Tipos de Ciclos encontrados',
          type: 'success',
          response: tpciclos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoMateria: async () => {
      try {
        const tpmateria = await dbp.manyOrNone(
          `SELECT id_tp_materia as id, nb_tp_materia as nombre FROM public.tipo_materia;`
        )
        return {
          status: 200,
          message: 'Tipos de materia encontrados',
          type: 'success',
          response: tpmateria
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerSedes: async () => {
      try {
        const sedes = await dbp.manyOrNone(
          `SELECT id_sede as id, nb_sede as nombre FROM public.sedes;`
        )
        return {
          status: 200,
          message: 'Tipos de materia encontrados',
          type: 'success',
          response: sedes
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerSedesPorCarrera: async (_, { carrera }) => {
      try {
        const sedesCarrera = await dbp.manyOrNone(
          `SELECT sc.id_sede as id, s.nb_sede as nombre
          FROM public.sede_carrera sc, public.sedes s
            WHERE s.id_sede = sc.id_sede
              AND sc.id_carrera = $1;`,
          [carrera]
        )

        return {
          status: 200,
          message: 'Sedes por carrera encontradas',
          type: 'success',
          response: sedesCarrera
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoTitulo: async () => {
      try {
        const titulos = await dbp.manyOrNone(
          `SELECT id_titulo as id, nb_titulo as nombre FROM public.tipo_titulo;`
        )
        return {
          status: 200,
          message: 'Tipos de titulo encontrados',
          type: 'success',
          response: titulos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerMes: async () => {
      try {
        const meses = await dbp.manyOrNone(
          `SELECT id_mes as id, nb_mes as nombre FROM public.meses;`
        )
        return {
          status: 200,
          message: 'Meses encontrados',
          type: 'success',
          response: meses
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerProfesion: async () => {
      try {
        const profesiones = await dbp.manyOrNone(
          `SELECT id_profesion as id, nb_profesion as nombre FROM public.profesion;`
        )
        return {
          status: 200,
          message: 'Profesiones encontrados',
          type: 'success',
          response: profesiones
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoPersonal: async () => {
      try {
        const tipopersonal = await dbp.manyOrNone(
          `SELECT id_tp_personal as id, nb_tp_personal as nombre FROM public.tipo_personal;`
        )
        return {
          status: 200,
          message: 'Tipos de personal encontrados',
          type: 'success',
          response: tipopersonal
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    },
    obtenerTipoDepartamento: async () => {
      try {
        const departamentos = await dbp.manyOrNone(
          `SELECT id_departamento as id, nb_departamento as nombre
                FROM public.departamentos;`
        )
        return {
          status: 200,
          message: 'Departamentos encontrados',
          type: 'success',
          response: departamentos
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerUsuarioDocente: async () => {
      try {
        const usuarios = await dbp.manyOrNone(
          `SELECT id_usuario as id, CONCAT(nb_usuario, ' ', ape_usuario) nombre 
                FROM public.usuarios WHERE id_rol = 6;`
        )
        return {
          status: 200,
          message: 'Usuarios encontrados',
          type: 'success',
          response: usuarios
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerRoles: async () => {
      try {
        const roles = await dbp.manyOrNone(
          `SELECT id_rol as id, nb_rol as nombre 
                FROM public.roles WHERE id_rol IN (2, 4, 5, 6);`
        )
        return {
          status: 200,
          message: 'Usuarios encontrados',
          type: 'success',
          response: roles
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  },
  Mutation: {
    obtenerCiudadesPorEstado: async (_, { input }) => {
      const { estado } = input
      try {
        const ciudades = await dbp.manyOrNone(
          `SELECT id_ciudad as id, nb_ciudad as nombre FROM ciudades WHERE id_estado = $1;`,
          [estado]
        )
        return {
          status: 200,
          message: 'Ciudades encontradas',
          type: 'success',
          response: ciudades
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerEstadosPorPais: async (_, { input }) => {
      const { pais } = input
      try {
        if (pais === 239) {
          const paises = await dbp.manyOrNone(
            `SELECT cod_estado as id, nb_estado as nombre FROM public.estados WHERE cod_pais = $1`,
            [pais]
          )
          return {
            status: 200,
            message: 'Estados encontrados',
            type: 'success',
            response: paises
          }
        } else {
          const paises = await dbp.manyOrNone(
            `SELECT id_estado_mundo as id, nb_estado_mundo as nombre FROM estado_mundo WHERE id_pais = $1;`,
            [pais]
          )

          return {
            status: 200,
            message: 'Estados encontrados',
            type: 'success',
            response: paises
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerMunicipiosPorEstado: async (_, { input }) => {
      const { estado } = input
      try {
        const municipioestados = await dbp.manyOrNone(
          `SELECT id_municipio as id, nb_municipio as nombre FROM municipios WHERE id_estado = $1;`,
          [estado]
        )

        return {
          status: 200,
          message: 'Municipios encontrados por estado',
          type: 'success',
          response: municipioestados
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerParrquiasPorMunicipio: async (_, { input }) => {
      const { municipio } = input
      try {
        const parroquiamunicipios = await dbp.manyOrNone(
          `SELECT id_parroquia as id, nb_parroquia as nombre FROM parroquias WHERE id_municipio = $1;`,
          [municipio]
        )

        return {
          status: 200,
          message: 'Parroquias encontrados por municipio',
          type: 'success',
          response: parroquiamunicipios
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    obtenerZonasPorParroquias: async (_, { input }) => {
      const { parroquia } = input

      try {
        const zonasporparroquia = await dbp.manyOrNone(
          `SELECT id_zona as id, nb_zona as nombre, codigo_postal
                FROM public.zona WHERE id_parroquia = $1;`,
          parroquia
        )
        return {
          status: 200,
          message: 'Zonas encontradas por parroquia',
          type: 'success',
          response: zonasporparroquia
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
