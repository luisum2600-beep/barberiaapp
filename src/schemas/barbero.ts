import { z } from 'zod'

export const crearBarberoSchema = z.object({
  nombre: z.string().min(2).max(100),
  especialidades: z.array(z.string()).min(1),
  foto: z.string().url().optional(),
  google_calendar_id: z.string().optional(),
})

export type CrearBarberoInput = z.infer<typeof crearBarberoSchema>
