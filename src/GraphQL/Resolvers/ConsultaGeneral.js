import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerMaterias: async () => {
      try {
        const materias = await dbp.manyOrNone(
          `SELECT id_materia as id, nb_materia as nombre FROM m005t_materias;`
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
          `SELECT id_carrera as id, nb_carrera as nombre FROM m006t_carreras;`
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
          `SELECT id_tp_carrera as id, nb_tp_carrera as nombre FROM m036t_tipo_carrera;`
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
          `SELECT id_estatus_carrera as id, nb_estatus_carrera as nombre FROM m045t_estatus_carrera;`
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
          `SELECT id_nacionalidad as id, co_nacionalidad as codigo, nb_nacionalidad as nombre FROM m028t_tipo_nacionalidad;`
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
          `SELECT id_tp_sexo as id, nb_tp_sexo as nombre FROM m026t_tipo_sexo;`
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
          `SELECT id_tp_discapacidad as id, nb_tp_discapacidad as nombre FROM m009t_tipo_discapacidad;`
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
          `SELECT id_ciudad as id, nb_ciudad as nombre FROM m020t_ciudades;`
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
          `SELECT id_estado as id, nb_estado as nombre FROM m001t_estados;`
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
          `SELECT id_municipio as id, nb_municipio as nombre FROM m002t_municipios;`
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
          `SELECT id_parroquia as id, nb_parroquia as nombre FROM m003t_parroquias;`
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
          `SELECT id_tp_via as id, nb_tp_via as nombre FROM m025t_tipo_via;`
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
          `SELECT id_tp_zona as id, nb_tp_zona as nombre FROM m024t_tipo_zona;`
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
          `SELECT id_tp_vivienda as id, nb_tp_vivienda as nombre FROM m021t_tipo_vivienda;`
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
          `SELECT id_pais as id, nb_pais as nombre FROM m022t_paises;`
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
          `SELECT id_zona as id, id_parroquia as parroquia, nb_zona as nombre, codigo_postal as codigo FROM m023t_zona;`
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
          `SELECT id_tp_documento as id, nb_tp_documento as nombre FROM m047t_tipo_documento;`
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
          `SELECT id_civil as id, nb_civil as nombre FROM public.m027t_estado_civil;`
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
          `SELECT id_etnia as id, nb_etnia as nombre FROM public.m051t_tipo_etnia;`
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
          `SELECT id_ciclo as id, nb_ciclo as nombre FROM public.m043t_ciclos;`
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
          `SELECT id_tp_materia as id, nb_tp_materia as nombre FROM public.m012t_tipo_materia;`
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
          `SELECT id_sede as id, nb_sede as nombre FROM public.t011t_sedes;`
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
          FROM public.r007t_sede_carrera sc, public.t011t_sedes s
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
          `SELECT id_titulo as id, nb_titulo as nombre FROM public.m052t_tipo_titulo;`
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
    }
  },
  Mutation: {
    obtenerCiudadesPorEstado: async (_, { input }) => {
      const { estado } = input
      try {
        const ciudades = await dbp.manyOrNone(
          `SELECT id_ciudad as id, nb_ciudad as nombre FROM m020t_ciudades WHERE id_estado = $1;`,
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
            `SELECT cod_estado as id, nb_estado as nombre FROM public.m001t_estados WHERE cod_pais = $1`,
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
            `SELECT id_estado_mundo as id, nb_estado_mundo as nombre FROM m049t_estado_mundo WHERE id_pais = $1;`,
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
          `SELECT id_municipio as id, nb_municipio as nombre FROM m002t_municipios WHERE id_estado = $1;`,
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
          `SELECT id_parroquia as id, nb_parroquia as nombre FROM m003t_parroquias WHERE id_municipio = $1;`,
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
                FROM public.m023t_zona WHERE id_parroquia = $1;`,
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
