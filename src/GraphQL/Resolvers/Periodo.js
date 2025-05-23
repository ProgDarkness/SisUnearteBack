import { dbp } from '../../postgresdb'

export default {
  Query: {
    obtenerPeriodos: async () => {
      try {
        const periodos = await dbp.manyOrNone(
          `SELECT p.id_periodo as id, p.co_periodo as codigo, tp.nb_tp_periodo as periodo, tp.id_tp_periodo as idperiodo, p.anio_periodo as anio, 
          mes.nb_mes as mesi, mes.id_mes as idmesi, mes1.nb_mes as mesf,  mes1.id_mes as idmesf,
          p.nu_semana_interperido as semana, p.tx_mensaje as mensaje, p.fe_inicio as fei, p.fe_fin as fef, 
          p.fe_ult_entrega_acta as feacta, p.fe_ult_solic_documento as fedoc, p.fe_pre_solic_grado as fepregrado, 
          p.fe_modificacion as femodificacion, p.fe_inicio_preinscripcion as feipre, p.fe_fin_preinscripcion as fefpre, 
          p.fe_inicio_inscripcion as feinsc, fe_fin_inscripcion as fefinsc, p.fe_inicio_oferta as feioferta, p.fe_fin_oferta as fefoferta, 
          p.fe_inicio_retiro as feiretiro, p.fe_fin_retiro as fefretiro, p.fe_inicio_notas as feinota, p.fe_fin_notas as fefnota, 
          estatus.nb_estatus_periodo as estatus, p.fe_inicio_postulacion as feipostulacion, p.fe_fin_postulacion as fefpostulacion
          FROM public.periodo_lectivo as p, public.tipo_periodo as tp,
          public.estatus_periodo as estatus, public.meses as mes, public.meses as mes1
          WHERE p.id_tp_periodo = tp.id_tp_periodo and
          p.id_estatus_periodo = estatus.id_estatus_periodo and p.id_mes_inicio = mes.id_mes and p.id_mes_fin = mes1.id_mes;`
        )

        for (let i = 0; i < periodos.length; i++) {
          for (const key in periodos[i]) {
            const object = periodos[i]
            if (key.startsWith('fe')) {
              periodos[i][key] = new Date(object[key]).toLocaleDateString(
                'es-ES',
                {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }
              )
            }
          }
        }

        return {
          status: 200,
          message: 'Periodos encontrados',
          type: 'success',
          response: periodos
        }
      } catch (e) {
        return { status: 500, message: e.message, type: 'error' }
      }
    }
  },
  Mutation: {
    crearPeriodo: async (_, { input }) => {
      const {
        codigo,
        tipo,
        anio,
        mesinicio,
        mesfin,
        nusemana,
        mensaje,
        feinicio,
        fefin,
        feentregaacta,
        fesolicdocumento,
        fesolicgrado,
        femodificacion,
        feiniciopreinscripcion,
        fefinpreinscripcion,
        feinicioinscripcion,
        fefininscripcion,
        feiniciooferta,
        fefinoferta,
        feinicioretiro,
        fefinretiro,
        feinicionotas,
        fefinnotas,
        feiniciopostulacion,
        fefinpostulacion
      } = input

      try {
        let visible = null
        let estatus = null
        visible = true
        estatus = 1
        await dbp.none(
          `INSERT INTO public.periodo_lectivo(
            co_periodo, id_tp_periodo, anio_periodo, id_mes_inicio, id_mes_fin, nu_semana_interperido, 
            tx_mensaje, fe_inicio, fe_fin, fe_ult_entrega_acta, fe_ult_solic_documento, fe_pre_solic_grado, 
            fe_modificacion, fe_inicio_preinscripcion, fe_fin_preinscripcion, fe_inicio_inscripcion, fe_fin_inscripcion, 
            fe_inicio_oferta, fe_fin_oferta, fe_inicio_retiro, fe_fin_retiro, fe_inicio_notas, fe_fin_notas, fe_inicio_postulacion, fe_fin_postulacion, visible, id_estatus_periodo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27);`,
          [
            codigo,
            tipo,
            anio,
            mesinicio,
            mesfin,
            nusemana,
            mensaje,
            feinicio,
            fefin,
            feentregaacta,
            fesolicdocumento,
            fesolicgrado,
            femodificacion,
            feiniciopreinscripcion,
            fefinpreinscripcion,
            feinicioinscripcion,
            fefininscripcion,
            feiniciooferta,
            fefinoferta,
            feinicioretiro,
            fefinretiro,
            feinicionotas,
            fefinnotas,
            feiniciopostulacion,
            fefinpostulacion,
            visible,
            estatus
          ]
        )

        return {
          status: 200,
          message: 'Periodo registrado exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    actualizarPeriodo: async (_, { input }) => {
      const {
        codigo,
        tipo,
        anio,
        mesinicio,
        mesfin,
        nusemana,
        mensaje,
        feinicio,
        fefin,
        feentregaacta,
        fesolicdocumento,
        fesolicgrado,
        femodificacion,
        feiniciopreinscripcion,
        fefinpreinscripcion,
        feinicioinscripcion,
        fefininscripcion,
        feiniciooferta,
        fefinoferta,
        feinicioretiro,
        fefinretiro,
        feinicionotas,
        fefinnotas,
        feiniciopostulacion,
        fefinpostulacion,
        idperiodo
      } = input

      try {
        await dbp.none(
          `UPDATE public.periodo_lectivo
            SET co_periodo = $1, id_tp_periodo = $2, anio_periodo = $3, id_mes_inicio = $4, id_mes_fin = $5, 
            nu_semana_interperido = $6, tx_mensaje = $7, fe_inicio = $8, fe_fin = $9, fe_ult_entrega_acta = $10, fe_ult_solic_documento = $11, 
            fe_pre_solic_grado = $12, fe_modificacion = $13, fe_inicio_preinscripcion = $14, fe_fin_preinscripcion = $15, fe_inicio_inscripcion = $16, 
            fe_fin_inscripcion = $17, fe_inicio_oferta = $18, fe_fin_oferta = $19, fe_inicio_retiro = $20, fe_fin_retiro = $21, fe_inicio_notas = $22, fe_fin_notas = $23,
            fe_inicio_postulacion = $24, fe_fin_postulacion = $25 WHERE id_periodo = $26;`,
          [
            codigo,
            tipo,
            anio,
            mesinicio,
            mesfin,
            nusemana,
            mensaje,
            feinicio,
            fefin,
            feentregaacta,
            fesolicdocumento,
            fesolicgrado,
            femodificacion,
            feiniciopreinscripcion,
            fefinpreinscripcion,
            feinicioinscripcion,
            fefininscripcion,
            feiniciooferta,
            fefinoferta,
            feinicioretiro,
            fefinretiro,
            feinicionotas,
            fefinnotas,
            feiniciopostulacion,
            fefinpostulacion,
            idperiodo
          ]
        )

        return {
          status: 200,
          message: 'Periodo actualizado exitosamente',
          type: 'success'
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    },
    eliminarPeriodo: async (_, { input }) => {
      const { idperiodo } = input

      try {
        const ofertaacademica = await dbp.manyOrNone(
          `SELECT id_periodo FROM oferta_academica WHERE id_periodo = $1;`,
          [idperiodo]
        )

        const ofertamateria = await dbp.manyOrNone(
          `SELECT id_periodo FROM inscripcion WHERE id_periodo = $1;`,
          [idperiodo]
        )

        if (ofertaacademica?.id_periodo || ofertamateria?.id_periodo) {
          return {
            status: 202,
            message: 'Oferta no puede ser eliminada asociada a otros datos',
            type: 'success'
          }
        } else {
          await dbp.none(
            `DELETE FROM public.periodo_lectivo WHERE id_periodo = $1;`,
            [idperiodo]
          )

          return {
            status: 200,
            message: 'Oferta eliminada exitosamente',
            type: 'success'
          }
        }
      } catch (e) {
        return { status: 500, message: `Error: ${e.message}`, type: 'error' }
      }
    }
  }
}
