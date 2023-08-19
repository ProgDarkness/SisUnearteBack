import {dbp} from '../../postgresdb'

export default {
    Query: {
        obtenerTodasCarreras: async () => {
            try {
                const carreras = await dbp.manyOrNone(`SELECT c.id_carrera as id, c.co_carrera as codigo, c.nb_carrera as nombre, tc.nb_tp_carrera as tipo, ciclo.nb_ciclo as ciclo,
                                e.nb_estatus_carrera as estatus, c.titulo_otorgado as titulo
                                FROM m006t_carreras as c, m036t_tipo_carrera as tc, m043t_ciclos as ciclo, m045t_estatus_carrera as e
                                where c.id_tp_carrera = tc.id_tp_carrera
                                and c.id_ciclo = ciclo.id_ciclo
                                and c.id_estatus_carrera = e.id_estatus_carrera;`);
                return {status: 200, message: 'Listado de carreras encontradas', type: "success", response: carreras}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        },
        obtenerTodasMaterias: async () => {
            try {
                const materias = await dbp.manyOrNone(`SELECT m.id_materia as id, m.co_materia as codigo, m.nb_materia as nombre, m.nu_credito as credito, 
                                            m.hr_semanal as hora, em.nb_estatus_materia as estatus, tm.nb_tp_materia as tipo
                                            FROM public.m005t_materias as m, public.m037t_estatus_materia as em, public.m012t_tipo_materia as tm
                                            where m.id_estatus_materia = em.id_estatus_materia and m.id_tp_materia = tm.id_tp_materia;`);
                return {status: 200, message: 'Listado de materias encontradas', type: "success", response: materias}
            } catch (e) {
                return {status: 500, message: e.message, type: "error"}
            }
        }
    },
    Mutation: {
        obtenerEstudiante: async (_, {input}) => {
            const {nacionalidad, cedula} = input
            try {    
                const estudiantes = await dbp.oneOrNone(`SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM t004t_estudiantes est, m026t_tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND ced_estudiante = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`, [nacionalidad, cedula]);
            
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
            
            try {    
                
                await dbp.none(
                    `INSERT INTO t004t_estudiantes(
                      id_nac_estudiante, ced_estudiante, nb_estudiante, ape_estudiante, id_sexo_estudiante)
                      VALUES ( $1, $2, $3, $4, $5);`, [nacionalidad, cedula, nombre, apellido, sexo])
                
                const estudiantes = await dbp.oneOrNone(`SELECT est.id_estudiante as id, est.nb_estudiante as nombre, est.ape_estudiante as apellido, tpsexo.nb_tpsexo as sexo FROM t004t_estudiantes est, m026t_tipo_sexo tpsexo WHERE id_nac_estudiante = $1 AND ced_estudiante = $2 AND est.id_sexo_estudiante = tpsexo.id_tpsexo;`, [nacionalidad, cedula]);

                    return {status: 200, message: 'Estudiante encontrado', type: "success", response: estudiantes}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        obtenerDetalleCarrera: async (_, {input}) => {
            const {carrera} = input
            
            try {    
                const detallecarreras = await dbp.manyOrNone(`SELECT c.id_carrera AS id, c.nb_carrera AS carrera, t.nb_trayecto AS trayecto,
                                            m.nb_materia AS materia, p.nb_personal AS personal, ec.nb_estatus_carrera AS estatus
                                            FROM m006t_carreras AS c, r002t_carrera_materia AS cm, m017t_trayectos AS t, m005t_materias AS m,
                                            r001t_docente_materia AS dm, t003t_personal AS p, m045t_estatus_carrera AS ec
                                            WHERE cm.id_trayecto = t.id_trayecto AND cm.id_materia = m.id_materia AND
                                            dm.id_personal = p.id_personal AND dm.id_materia = m.id_materia 
                                            AND ec.id_estatus_carrera = c.id_estatus_carrera AND c.id_carrera = $1;`, [carrera]);
                
                if (detallecarreras) {
                    return {status: 200, message: 'Carreras encontrado', type: "success", response: detallecarreras}
                } else {
                    return {status: 202, message: 'Carreras no encontrado', type: "error"}
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        crearCarrera: async (_, {input}) => {
            const {codigo, nombre, tipo, ciclo, titulo} = input
            
            try {     
                const idcarrera = await dbp.oneOrNone(
                    `INSERT INTO public.m006t_carreras(
                      co_carrera, nb_carrera, id_tp_carrera, id_ciclo, titulo_otorgado)
                      VALUES ($1, $2, $3, $4, $5) RETURNING id_carrera;`, [codigo, nombre, tipo, ciclo, titulo])

                const trayectos = await dbp.manyOrNone(`SELECT id_trayecto FROM m017t_trayectos;`);

                for(let i = 0; i < trayectos.length; i++) {
                
                await dbp.none(`INSERT INTO public.r009t_carrera_trayecto(id_carrera, id_trayecto) VALUES ($1, $2);`, [idcarrera.id_carrera, trayectos[i].id_trayecto])
                }

                return {status: 200, message: 'Carrera registrada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarCarrera: async (_, {input}) => {
            const {codigo, nombre, tipo, ciclo, titulo, idcarrera} = input
            
            try {     
                await dbp.none(
                    `UPDATE public.m006t_carreras
                    SET co_carrera = $1, nb_carrera = $2, id_tp_carrera = $3, id_ciclo = $4, titulo_otorgado = $5
                    WHERE id_carrera = $6;`, [codigo, nombre, tipo, ciclo, titulo, idcarrera])

                return {status: 200, message: 'Carrera actualizada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        eliminarCarrera: async (_, {input}) => {
            const {idcarrera} = input
            
            try {  
                const carreraperiodo = await dbp.manyOrNone(`SELECT * FROM r006t_periodo_carrera pc WHERE pc.id_carrera = $1;`, [idcarrera]);

                const carreramateria = await dbp.manyOrNone(`SELECT * FROM r002t_carrera_materia cm WHERE cm.id_carrera = $1;`, [idcarrera]);

                const carrerapostulacion = await dbp.manyOrNone(`SELECT * FROM t013t_postulacion p WHERE p.id_carrera = $1;`, [idcarrera]);

                if (carreraperiodo || carreramateria || carrerapostulacion) {
                    return {status: 202, message: 'Carrera no puede ser eliminada asociada a otros datos', type: "success"}
                } else {
                    await dbp.none(`DELETE FROM public.m006t_carreras WHERE id_carrera = $1;`, [idcarrera])

                    return {status: 200, message: 'Carrera eliminada exitosamente', type: "success"} 
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarEstatusCarrera: async (_, {input}) => {
            const {estatus, idcarrera} = input
            
            try {     
                await dbp.none(`UPDATE public.m006t_carreras SET id_estatus_carrera = $1 WHERE id_carrera = $2;`, [estatus, idcarrera])

                return {status: 200, message: 'Estatus de la carrera actualizada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        crearMateria: async (_, {input}) => {
            const {codigo, nombre, credito, tipo, hora} = input
            
            try {     
                let estatus = null;
                estatus = 4;

                await dbp.none(
                    `INSERT INTO public.m005t_materias(
                      co_materia, nb_materia, nu_credito, id_tp_materia, hr_semanal, id_estatus_materia)
                      VALUES ($1, $2, $3, $4, $5, $6);`, [codigo, nombre, credito, tipo, hora, estatus])

                return {status: 200, message: 'Materia registrada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarMateria: async (_, {input}) => {
            const {codigo, nombre, credito, tipo, hora, estatus, idmateria} = input
            
            try {     
                await dbp.none(
                    `UPDATE public.m005t_materias
                    SET co_materia = $1, nb_materia = $2, nu_credito = $3, id_tp_materia = $4, hr_semanal = $5, id_estatus_materia = $6
                    WHERE id_materia = $7;`, [codigo, nombre, credito, tipo, hora, estatus, idmateria])

                return {status: 200, message: 'Materia actualizada exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        eliminarMateria: async (_, {input}) => {
            const {idmateria} = input
            
            try {   
                
                const materiadocente = await dbp.oneOrNone(`SELECT * FROM r001t_docente_materia as dm WHERE dm.id_materia = $1;`, [idmateria]);

                const materiacarrera = await dbp.oneOrNone(`SELECT * FROM r002t_carrera_materia cm WHERE cm.id_materia = $1;`, [idmateria]);

                const materiainscripcion = await dbp.oneOrNone(`SELECT * FROM r003t_inscripcion_materia as im WHERE im.id_materia = $1;`, [idmateria]);

                if (materiadocente || materiacarrera || materiainscripcion) {
                    return {status: 202, message: 'Materia no puede ser eliminada encontrada asignada a otros datos', type: "success"}
                } else {
                    await dbp.none(`DELETE FROM public.m005t_materias WHERE id_materia = $1;`, [idmateria])

                    return {status: 200, message: 'Materia eliminada exitosamente', type: "success"}
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        }
    }
};