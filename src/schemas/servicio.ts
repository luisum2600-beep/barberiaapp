import { z } from 'zod'

export const crearServicioSchema = z.object({
  nombre: z.string().min(2).max(100),
  descripcion: z.string().max(500).optional(),
  precio: z.number().positive().multipleOf(0.01),
  duracion_minutos: z.number().int().min(15).max(240),
  foto: z.string().url().optional(),
})

export type CrearServicioInput = z.infer<typeof crearServicioSchema>
