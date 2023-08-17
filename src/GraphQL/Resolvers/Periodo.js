import {dbp} from '../../postgresdb'

export default {
    Mutation: {
        crearPeriodo: async (_, {input}) => {
            const {codigo, tipo, anio, mesinicio, mesfin, nusemana, personal, mensaje, feinicio, fefin, feentregaacta, fesolicdocumento, fesolicgrado, feretiro, femodificacion, feiniciopreinscripcion, fefinpreinscripcion, feinicioinscripcion, fefininscripcion, feiniciooferta, fefinoferta, feinicioretiro, fefinretiro, feinicionotas, fefinnotas, trayecto} = input
            console.log(input);
            try { 
                let visible = null;
                let estatus = null;
                visible = true;
                estatus = 1;   
                await dbp.none(
                    `INSERT INTO public.t006t_periodo_lectivo(
                        co_periodo, id_tp_periodo, anio_periodo, mes_inicio_periodo, mes_fin_periodo, nu_semana_interperido, id_personal, tx_mensaje, fe_inicio, fe_fin, fe_ult_entrega_acta, fe_ult_solic_documento, fe_pre_solic_grado, fe_retiro, fe_modificacion, fe_inicio_preinscripcion, fe_fin_preinscripcion, fe_inicio_inscripcion, fe_fin_inscripcion, fe_inicio_oferta, fe_fin_oferta, fe_inicio_retiro, fe_fin_retiro, fe_inicio_notas, fe_fin_notas, visible, id_estatus_periodo, id_trayecto)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28);`, [codigo, tipo, anio, mesinicio, mesfin, nusemana, personal, mensaje, feinicio, fefin, feentregaacta, fesolicdocumento, fesolicgrado, feretiro, femodificacion, feiniciopreinscripcion, fefinpreinscripcion, feinicioinscripcion, fefininscripcion, feiniciooferta, fefinoferta, feinicioretiro, fefinretiro, feinicionotas, fefinnotas, visible, estatus, trayecto])
                
                    return {status: 200, message: 'Periodo registrado exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        actualizarPeriodo: async (_, {input}) => {
            const {codigo, tipo, anio, mesinicio, mesfin, nusemana, personal, mensaje, feinicio, fefin, feentregaacta, fesolicdocumento, fesolicgrado, feretiro, femodificacion, feiniciopreinscripcion, fefinpreinscripcion, feinicioinscripcion, fefininscripcion, feiniciooferta, fefinoferta, feinicioretiro, fefinretiro, feinicionotas, fefinnotas, visible, estatus, trayecto, idperiodo} = input
            console.log(input);
            try {    
                await dbp.none(
                    `UPDATE public.t006t_periodo_lectivo
                      SET co_periodo = $1, id_tp_periodo = $2, anio_periodo = $3, mes_inicio_periodo = $4, mes_fin_periodo = $5, 
                      nu_semana_interperido = $6, id_personal = $7, tx_mensaje = $8, fe_inicio = $9, fe_fin = $10, fe_ult_entrega_acta = $11, fe_ult_solic_documento = $12, 
                      fe_pre_solic_grado = $13, fe_retiro = $14, fe_modificacion = $15, fe_inicio_preinscripcion = $16, fe_fin_preinscripcion = $17, fe_inicio_inscripcion = $18, 
                      fe_fin_inscripcion = $19, fe_inicio_oferta = $20, fe_fin_oferta = $21, fe_inicio_retiro = $22, fe_fin_retiro = $23, fe_inicio_notas = $24, fe_fin_notas = $25, 
                      visible = $26, id_estatus_periodo = $27, id_trayecto = $28 WHERE id_periodo = $29;`, [codigo, tipo, anio, mesinicio, mesfin, nusemana, personal, mensaje, feinicio, fefin, feentregaacta, fesolicdocumento, fesolicgrado, feretiro, femodificacion, feiniciopreinscripcion, fefinpreinscripcion, feinicioinscripcion, fefininscripcion, feiniciooferta, fefinoferta, feinicioretiro, fefinretiro, feinicionotas, fefinnotas, visible, estatus, trayecto, idperiodo])
                
                    return {status: 200, message: 'Periodo actualizado exitosamente', type: "success"}
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        },
        eliminarPeriodo: async (_, {input}) => {
            const {idperiodo} = input
            console.log(input);
            try {  
                const ofertaacademica = await dbp.manyOrNone(`SELECT * FROM t008t_oferta_academica oa WHERE oa.id_periodo = $1;`, [idperiodo]);

                const ofertamateria = await dbp.manyOrNone(`SELECT * FROM t005t_inscripcion i WHERE i.id_periodo = $1;`, [idperiodo]);

                console.log(ofertaacademica);

                if (ofertaacademica || ofertamateria) {
                    return {status: 202, message: 'Oferta no puede ser eliminada asociada a otros datos', type: "success"}
                } else {
                    await dbp.none(`DELETE FROM public.t006t_periodo_lectivo WHERE id_periodo = $1;`, [idperiodo])

                    return {status: 200, message: 'Oferta eliminada exitosamente', type: "success"} 
                }
            } catch (e) {
                return {status: 500, message: `Error: ${e.message}`, type: "error"}
            }
        }
    }
};