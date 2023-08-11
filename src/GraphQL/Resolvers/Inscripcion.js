import {dbp} from '../../postgresdb'

export default {
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