import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitirEvento } from '@/lib/n8n'
import { z } from 'zod'

const patchSchema = z.object({
  estado: z.enum(['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA']),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const reserva = await prisma.reserva.update({
    where: { id },
    data: { estado: parsed.data.estado },
  })

  if (parsed.data.estado === 'CANCELADA') {
    await emitirEvento({
      tipo: 'reserva_cancelada',
      reserva_id: reserva.id,
      barberia_id: reserva.barberia_id,
    })
  }

  if (parsed.data.estado === 'COMPLETADA') {
    await emitirEvento({
      tipo: 'reserva_completada',
      reserva_id: reserva.id,
      barberia_id: reserva.barberia_id,
    })
  }

  return NextResponse.json({ reserva })
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const reserva = await prisma.reserva.findUnique({
    where: { id },
    include: { barbero: true, servicio: true, barberia: true },
  })

  if (!reserva) {
    return NextResponse.json({ error: 'Reserva no encontrada' }, { status: 404 })
  }

  return NextResponse.json({ reserva })
}
