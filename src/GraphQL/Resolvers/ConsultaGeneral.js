import {dbp} from '../../postgresdb'

export default {
    Query: {
        obtenerMaterias: async () => {
            try {
                const materias = await dbp.manyOrNone(`SELECT id_materia as id, nb_materia as nombre FROM m005t_materias;`);
                return {status: 200, message: 'Materias encontradas', type: "success", response: materias}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerCarreras: async () => {
            try {
                const carreras = await dbp.manyOrNone(`SELECT id_carrera as id, nb_carrera as nombre FROM m006t_carreras;`);
                return {status: 200, message: 'Carreras encontradas', type: "success", response: carreras}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerNacionalidades: async () => {
            try {
                const nacionalidades = await dbp.manyOrNone(`SELECT id_nacionalidad as id, co_nacionalidad as codigo, nb_nacionalidad as nombre FROM m028t_tipo_nacionalidad;`);
                return {status: 200, message: 'Nacionalidades encontradas', type: "success", response: nacionalidades}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerSexos: async () => {
            try {
                const sexos = await dbp.manyOrNone(`SELECT id_tp_sexo as id, nb_tp_sexo as nombre FROM m026t_tipo_sexo;`);
                return {status: 200, message: 'Sexos encontrados', type: "success", response: sexos}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerDiscapacidades: async () => {
            try {
                const discapacidades = await dbp.manyOrNone(`SELECT id_tp_discapacidad as id, nb_tp_discapacidad as nombre FROM m009t_tipo_discapacidad;`);
                return {status: 200, message: 'Discapacidades encontradas', type: "success", response: discapacidades}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerEstados: async () => {
            try {
                const estados = await dbp.manyOrNone(`SELECT id_estado as id, nb_estado as nombre FROM m001t_estados;`);
                return {status: 200, message: 'Estados encontrados', type: "success", response: estados}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerMunicipios: async () => {
            try {
                const municipios = await dbp.manyOrNone(`SELECT id_municipio as id, nb_municipio as nombre FROM m002t_municipios;`);
                return {status: 200, message: 'Municipios encontrados', type: "success", response: municipios}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerParroquias: async () => {
            try {
                const parroquias = await dbp.manyOrNone(`SELECT id_parroquia as id, nb_parroquia as nombre FROM m003t_parroquias;`);
                return {status: 200, message: 'Parroquias encontrados', type: "success", response: parroquias}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerTipoVia: async () => {
            try {
                const vias = await dbp.manyOrNone(`SELECT id_tp_via as id, nb_tp_via as nombre FROM m025t_tipo_via;`);
                return {status: 200, message: 'Vias encontradas', type: "success", response: vias}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerTipoZona: async () => {
            try {
                const zonas = await dbp.manyOrNone(`SELECT id_tp_zona as id, nb_tp_zona as nombre FROM m024t_tipo_zona;`);
                return {status: 200, message: 'Zonas encontradas', type: "success", response: zonas}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerTipoVivienda: async () => {
            try {
                const viviendas = await dbp.manyOrNone(`SELECT id_tp_vivienda as id, nb_tp_vivienda as nombre FROM m021t_tipo_vivienda;`);
                return {status: 200, message: 'Viviendas encontradas', type: "success", response: viviendas}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerPaises: async () => {
            try {
                const paises = await dbp.manyOrNone(`SELECT id_pais as id, nb_pais as nombre FROM m022t_paises;`);
                return {status: 200, message: 'Paises encontrados', type: "success", response: paises}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerCodigoPostal: async () => {
            try {
                const postales = await dbp.manyOrNone(`SELECT id_zona as id, id_parroquia as parroquia, nb_zona as nombre, codigo_postal as codigo FROM m023t_zona;`);
                return {status: 200, message: 'Codigos Postales encontrados', type: "success", response: postales}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerTipoDocumento: async () => {
            try {
                const tiposdocumentos = await dbp.manyOrNone(`SELECT id_tp_documento as id, nb_tp_documento as nombre FROM m047t_tipo_documento;`);
                return {status: 200, message: 'Tipos de Documentos encontrados', type: "success", response: tiposdocumentos}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerOfertaAcademica: async () => {
            try {
                const ofertas = await dbp.manyOrNone(`
                                        SELECT oa.id_oferta AS id, oa.id_periodo AS periodo, p.anio_periodo AS anio, c.nb_carrera AS carrera,
                                        oa.nu_cupos AS cupos, eo.nb_estatus_oferta AS estatus
                                        FROM t008t_oferta_academica AS oa, t006t_periodo_lectivo AS p, m006t_carreras AS c, m042t_estatus_oferta AS eo
                                        WHERE oa.id_periodo = p.id_periodo AND oa.id_carrera = c.id_carrera AND oa.id_estatus_oferta = eo.id_estatus_oferta;`);
                return {status: 200, message: 'Ofertas encontradas', type: "success", response: ofertas}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    }
};