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
        },
        obtenerListadoPostuladoCarrera: async () => {
            try {
                const postulados = await dbp.manyOrNone(`
                            SELECT p.id_postulacion as id, tn.co_nacionalidad as nacionalidad, u.ced_usuario as cedula, u.nb_usuario as nombre, u.ape_usuario as apellido,
                            p.fe_postulacion as fepostulacion, ep.nb_estatus_postulacion estatus, pl.anio_periodo as periodo, tp.nb_tp_periodo as tperiodo,
                            c.nb_carrera as carrera
                            FROM t001t_usuarios as u, m028t_tipo_nacionalidad as tn, t013t_postulacion as p, 
                            r005t_fecha_estatus_postulacion as fep, m046t_estatus_postulacion as ep, t006t_periodo_lectivo as pl, 
                            m007t_tipo_periodo as tp, m006t_carreras as c
                            WHERE u.id_nacionalidad = tn.id_nacionalidad
                            AND u.id_usuario = p.id_usuario
                            AND c.id_carrera = p.id_carrera
                            AND fep.id_estatus_postulacion = ep.id_estatus_postulacion
                            AND p.id_periodo = pl.id_periodo
                            AND tp.id_tp_periodo = pl.id_tp_periodo;`);
                return {status: 200, message: 'Postulados encontrados', type: "success", response: postulados}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    }
};