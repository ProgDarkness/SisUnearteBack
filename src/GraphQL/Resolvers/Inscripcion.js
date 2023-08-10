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
        }
    }
};