import {dbp} from '../../postgresdb'

export default {
    Query: {
        obtenerOfertaAcademica: async () => {
            try {
                const ofertas = await dbp.manyOrNone(`
                                        SELECT oa.id_oferta AS id, oa.id_periodo AS periodo, p.anio_periodo AS anio, c.nb_carrera AS carrera,
                                        oa.nu_cupos AS cupos, eo.nb_estatus_oferta AS estatus, s.nb_sede AS sede,
                                        tperiodo.nb_tp_periodo AS nbtperido, t.nb_trayecto AS trayecto, m.nb_materia AS materia
                                        FROM t008t_oferta_academica AS oa, t006t_periodo_lectivo AS p, m006t_carreras AS c, m042t_estatus_oferta AS eo,
                                        t011t_sedes AS s, m007t_tipo_periodo AS tperiodo, m017t_trayectos AS t, r002t_carrera_materia AS cm,
                                        m005t_materias AS m
                                        WHERE oa.id_periodo = p.id_periodo AND oa.id_carrera = c.id_carrera 
                                        AND oa.id_estatus_oferta = eo.id_estatus_oferta
                                        AND s.id_sede = oa.id_sede AND p.id_tp_periodo = tperiodo.id_tp_periodo
                                        AND p.id_trayecto = t.id_trayecto
                                        AND cm.id_materia = m.id_materia AND oa.id_carrera = cm.id_carrera;`);
                return {status: 200, message: 'Ofertas encontradas', type: "success", response: ofertas}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    },
    Mutation: {
        crearOferta: async (_, {input}) => {
            const {periodo, carrera, cupos, seccion, sede} = input
            console.log(input);
            try {   
                let estatus = null;
                let visible = null;
                estatus = 1;  
                visible = true;  
                await dbp.none(
                    `INSERT INTO public.t008t_oferta_academica(
                    id_periodo, id_carrera, nu_cupos, nu_seccion, id_sede, visible, id_estatus_oferta)
                    VALUES ( $1, $2, $3, $4, $5, $6, $7);`, [periodo, carrera, cupos, seccion, sede, visible, estatus])

                    return {status: 200, message: 'Oferta registrada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        }
    }
};