import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { emitirEvento } from '@/lib/n8n'
import { crearReservaSchema } from '@/schemas/reserva'

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const parsed = crearReservaSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { pagar_ahora, culqi_token: _token, ...datos } = parsed.data

  const reserva = await prisma.reserva.create({
    data: {
      ...datos,
      fecha_hora: new Date(datos.fecha_hora),
      estado: pagar_ahora ? 'CONFIRMADA' : 'PENDIENTE',
      pago_estado: pagar_ahora ? 'PAGADO' : null,
    },
    include: { barbero: true, servicio: true, barberia: true },
  })

  await emitirEvento({
    tipo: 'reserva_creada',
    reserva_id: reserva.id,
    barberia_id: reserva.barberia_id,
  })

  return NextResponse.json({ reserva }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const barberia_id = req.nextUrl.searchParams.get('barberia_id')
  if (!barberia_id) {
    return NextResponse.json({ error: 'barberia_id requerido' }, { status: 400 })
  }

  const reservas = await prisma.reserva.findMany({
    where: { barberia_id },
    include: { barbero: true, servicio: true },
    orderBy: { fecha_hora: 'asc' },
  })

  return NextResponse.json({ reservas })
}
