import {dbp} from '../../postgresdb'

export default {
    Query: {
        obtenerEstatusPostulacion: async () => {
            try {
                const estatus = await dbp.manyOrNone(`SELECT id_estatus_postulacion as id, nb_estatus_postulacion as nombre FROM m046t_estatus_postulacion;`);
                return {status: 200, message: 'Estatus postulacion encontradas', type: "success", response: estatus}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    }
};