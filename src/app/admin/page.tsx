import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function AdminDashboard() {
  const session = await auth()
  const barberia_id = session!.user.barberia_id

  const now = new Date()

  const [reservasHoy, reservasSemana, ingresosSemana] = await Promise.all([
    prisma.reserva.findMany({
      where: {
        barberia_id,
        fecha_hora: { gte: startOfDay(now), lte: endOfDay(now) },
        estado: { notIn: ['CANCELADA'] },
      },
      include: { barbero: true, servicio: true },
      orderBy: { fecha_hora: 'asc' },
    }),
    prisma.reserva.count({
      where: {
        barberia_id,
        fecha_hora: { gte: startOfWeek(now), lte: endOfWeek(now) },
        estado: { notIn: ['CANCELADA'] },
      },
    }),
    prisma.reserva.aggregate({
      where: {
        barberia_id,
        fecha_hora: { gte: startOfWeek(now), lte: endOfWeek(now) },
        pago_estado: 'PAGADO',
      },
      _sum: { pago_monto: true },
    }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          <p className="text-gray-400 text-sm mb-1">Reservas hoy</p>
          <p className="text-3xl font-black text-amber-500">{reservasHoy.length}</p>
        </div>
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          <p className="text-gray-400 text-sm mb-1">Reservas esta semana</p>
          <p className="text-3xl font-black text-amber-500">{reservasSemana}</p>
        </div>
        <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
          <p className="text-gray-400 text-sm mb-1">Ingresos esta semana</p>
          <p className="text-3xl font-black text-amber-500">
            S/ {Number(ingresosSemana._sum.pago_monto ?? 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Today's agenda */}
      <h2 className="text-lg font-bold mb-4">Agenda de hoy</h2>
      {reservasHoy.length === 0 ? (
        <p className="text-gray-500">No hay reservas para hoy.</p>
      ) : (
        <div className="space-y-3">
          {reservasHoy.map((r) => (
            <div
              key={r.id}
              className="bg-neutral-900 rounded-xl p-4 border border-neutral-800 flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{r.barbero.nombre}</p>
                <p className="text-gray-400 text-sm">{r.servicio.nombre}</p>
              </div>
              <div className="text-right">
                <p className="text-amber-500 font-bold">
                  {format(r.fecha_hora, 'HH:mm')}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    r.estado === 'CONFIRMADA'
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}
                >
                  {r.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
