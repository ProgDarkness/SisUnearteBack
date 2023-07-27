import {dbp} from '../../postgresdb'

export default {
    Query: {
        getMaterias: async () => {
            try {
                const materias = await dbp.manyOrNone(`SELECT id_materia as id, nb_materia as nombre FROM m005t_materias;`);
                return {status: 200, message: 'Materias encontradas', type: "success", response: materias}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        getCarreras: async () => {
            try {
                const carreras = await dbp.manyOrNone(`SELECT id_carrera as id, nb_carrera as nombre FROM m006t_carreras;`);
                return {status: 200, message: 'Carreras encontradas', type: "success", response: carreras}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    }
};