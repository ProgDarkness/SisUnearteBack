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
    },
    Mutation: {
        obtenerEstudiante: async (_, {input}) => {
            const {nacionalidad, cedula} = input
            console.log(input);
            try {    
                const estudiantes = await dbp.oneOrNone(`SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM t004t_estudiantes est, m026t_tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND ced_estudiante = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`, [nacionalidad, cedula]);
                console.log(estudiantes);
                if (estudiantes) {
                    return {status: 200, message: 'Estudiante encontrado', type: "success", response: estudiantes}
                } else {
                    return {status: 202, message: 'Estudiante no encontrado', type: "error"}
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        crearEstudiante: async (_, {input}) => {
            const {nacionalidad, cedula, nombre, apellido, sexo} = input
            console.log(input);
            try {    
                
                await dbp.none(
                    `INSERT INTO t004t_estudiantes(
                      id_nac_estudiante, ced_estudiante, nb_estudiante, ape_estudiante, id_sexo_estudiante)
                      VALUES ( $1, $2, $3, $4, $5);`, [nacionalidad, cedula, nombre, apellido, sexo]
                  )
                
                const estudiantes = await dbp.oneOrNone(`SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM t004t_estudiantes est, m026t_tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND ced_estudiante = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`, [nacionalidad, cedula]);

                    return {status: 200, message: 'Estudiante encontrado', type: "success", response: estudiantes}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        obtenerDetalleCarrera: async (_, {input}) => {
            const {carrera} = input
            console.log(input);
            try {    
                const detallecarreras = await dbp.manyOrNone(`SELECT c.id_carrera AS id, c.nb_carrera AS carrera, t.nb_trayecto AS trayecto,
                m.nb_materia AS materia, p.nb_personal AS personal, ec.nb_estatus_carrera AS estatus
                FROM m006t_carreras AS c, r002t_carrera_materia AS cm, m017t_trayectos AS t, m005t_materias AS m,
                r001t_docente_materia AS dm, t003t_personal AS p, m045_estatus_carrera AS ec
                WHERE c.id_carrera = $1 AND cm.id_trayecto = t.id_trayecto AND cm.id_materia = m.id_materia AND
                dm.id_personal = p.id_personal AND dm.id_materia = m.id_materia AND ec.id_estatus_carrera = c.id_estatus_carrera;`, [carrera]);
                console.log(detallecarreras);
                if (detallecarreras) {
                    return {status: 200, message: 'Carreras encontrado', type: "success", response: detallecarreras}
                } else {
                    return {status: 202, message: 'Carreras no encontrado', type: "error"}
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        }
    }
};