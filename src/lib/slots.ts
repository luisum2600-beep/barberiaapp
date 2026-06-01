import { prisma } from '@/lib/prisma'
import { addMinutes, startOfDay, endOfDay, parseISO, format } from 'date-fns'

const diasMap: Record<string, string> = {
  monday: 'lunes',
  tuesday: 'martes',
  wednesday: 'miercoles',
  thursday: 'jueves',
  friday: 'viernes',
  saturday: 'sabado',
  sunday: 'domingo',
}

export async function obtenerSlotsDisponibles(
  barbero_id: string,
  fecha: string,
  duracion_minutos: number
): Promise<string[]> {
  const barbero = await prisma.barbero.findUnique({
    where: { id: barbero_id },
    include: { barberia: true },
  })
  if (!barbero) return []

  const horario = barbero.barberia.horario as Record<string, { apertura: string; cierre: string } | null>
  const diaSemana = diasMap[format(parseISO(fecha), 'EEEE').toLowerCase()] ?? ''
  const horarioDia = horario[diaSemana]
  if (!horarioDia) return []

  const [hAp, mAp] = horarioDia.apertura.split(':').map(Number)
  const [hCi, mCi] = horarioDia.cierre.split(':').map(Number)

  const inicio = new Date(parseISO(fecha))
  inicio.setHours(hAp, mAp, 0, 0)
  const fin = new Date(parseISO(fecha))
  fin.setHours(hCi, mCi, 0, 0)

  const reservasDelDia = await prisma.reserva.findMany({
    where: {
      barbero_id,
      fecha_hora: { gte: startOfDay(parseISO(fecha)), lte: endOfDay(parseISO(fecha)) },
      estado: { notIn: ['CANCELADA'] },
    },
  })

  const slots: string[] = []
  let cursor = new Date(inicio)

  while (cursor < fin) {
    const slotFin = addMinutes(cursor, duracion_minutos)
    if (slotFin > fin) break

    const ocupado = reservasDelDia.some((r) => {
      const rFin = addMinutes(r.fecha_hora, duracion_minutos)
      return cursor < rFin && slotFin > r.fecha_hora
    })

    if (!ocupado) slots.push(cursor.toISOString())
    cursor = addMinutes(cursor, 30)
  }

  return slots
}
