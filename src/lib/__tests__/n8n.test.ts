import { emitirEvento } from '../n8n'

describe('emitirEvento', () => {
  it('no lanza error si N8N_WEBHOOK_URL no está configurado', async () => {
    delete process.env.N8N_WEBHOOK_URL
    await expect(
      emitirEvento({ tipo: 'reserva_creada', reserva_id: 'abc', barberia_id: 'xyz' })
    ).resolves.not.toThrow()
  })

  it('llama al endpoint correcto con el tipo de evento', async () => {
    process.env.N8N_WEBHOOK_URL = 'http://localhost:5678/webhook'
    process.env.N8N_WEBHOOK_SECRET = 'test-secret'

    global.fetch = jest.fn().mockResolvedValue({ ok: true })

    await emitirEvento({ tipo: 'reserva_creada', reserva_id: 'abc', barberia_id: 'xyz' })

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5678/webhook/reserva_creada',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'x-webhook-secret': 'test-secret' }),
      })
    )
  })

  it('no lanza error si fetch falla', async () => {
    process.env.N8N_WEBHOOK_URL = 'http://localhost:5678/webhook'
    global.fetch = jest.fn().mockRejectedValue(new Error('ECONNREFUSED'))

    await expect(
      emitirEvento({ tipo: 'reserva_cancelada', reserva_id: 'abc', barberia_id: 'xyz' })
    ).resolves.not.toThrow()
  })

  it('no lanza error si respuesta no es ok', async () => {
    process.env.N8N_WEBHOOK_URL = 'http://localhost:5678/webhook'
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(
      emitirEvento({ tipo: 'reserva_completada', reserva_id: 'abc', barberia_id: 'xyz' })
    ).resolves.not.toThrow()
  })
})
