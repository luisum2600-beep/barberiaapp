export type EventoN8n =
  | { tipo: 'reserva_creada'; reserva_id: string; barberia_id: string }
  | { tipo: 'reserva_cancelada'; reserva_id: string; barberia_id: string }
  | { tipo: 'reserva_completada'; reserva_id: string; barberia_id: string }

export async function emitirEvento(evento: EventoN8n): Promise<void> {
  const url = process.env.N8N_WEBHOOK_URL
  const secret = process.env.N8N_WEBHOOK_SECRET

  if (!url) {
    console.warn('[n8n] N8N_WEBHOOK_URL no configurado — evento omitido:', evento.tipo)
    return
  }

  try {
    const res = await fetch(`${url}/${evento.tipo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret ?? '',
      },
      body: JSON.stringify(evento),
    })

    if (!res.ok) {
      console.error('[n8n] Error al emitir evento:', evento.tipo, res.status)
    }
  } catch (err) {
    console.error('[n8n] Fallo de conexión al emitir evento:', evento.tipo, err)
  }
}
