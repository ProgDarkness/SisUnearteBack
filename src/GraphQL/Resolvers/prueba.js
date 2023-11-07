import { dbp2 } from '../../postgresdb'

const funcionPrueba = async () => {
  const query = await dbp2.manyOrNone(`SELECT * FROM public.usuarios;`)
  console.log(query)
}

setTimeout(() => {
  funcionPrueba()
}, 3000)
