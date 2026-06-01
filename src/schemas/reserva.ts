import { z } from 'zod'

export const crearReservaSchema = z.object({
  barberia_id: z.string().min(1),
  barbero_id: z.string().min(1),
  servicio_id: z.string().min(1),
  cliente_nombre: z.string().min(2).max(100),
  cliente_telefono: z.string().regex(/^\+?[0-9]{9,15}$/),
  cliente_email: z.string().email(),
  fecha_hora: z.string().datetime({ offset: true }),
  pagar_ahora: z.boolean().default(false),
  culqi_token: z.string().optional(),
})

export type CrearReservaInput = z.infer<typeof crearReservaSchema>
