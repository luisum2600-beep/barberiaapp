import { NextRequest, NextResponse } from 'next/server'
import { obtenerSlotsDisponibles } from '@/lib/slots'
import { z } from 'zod'

const querySchema = z.object({
  barbero_id: z.string().min(1),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  duracion_minutos: z.coerce.number().int().min(15),
})

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams)
  const parsed = querySchema.safeParse(params)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  try {
    const slots = await obtenerSlotsDisponibles(
      parsed.data.barbero_id,
      parsed.data.fecha,
      parsed.data.duracion_minutos
    )
    return NextResponse.json({ slots })
  } catch (err) {
    console.error('[disponibilidad] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
