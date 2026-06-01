import Link from 'next/link'
import LogoFlowPE from './LogoFlowPE'

interface UbicacionProps {
  barberia: {
    nombre: string
    direccion: string | null
    telefono: string | null
    whatsapp: string | null
    google_maps_url: string | null
    horario: unknown
    slug: string
  }
}

const DIAS_ES: Record<string, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
}

export default function Ubicacion({ barberia }: UbicacionProps) {
  const horario = barberia.horario as Record<string, { apertura: string; cierre: string } | null>

  return (
    <footer
      className="py-24 px-6 md:px-12"
      id="contacto"
      style={{
        borderTop: '1px solid var(--clr-border)',
        background: 'var(--clr-surface)',
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="section-label mb-2" style={{ color: 'var(--clr-green)' }}>
            — Visítanos
          </p>
          <h2
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'var(--clr-white)',
            }}
          >
            CONTÁCTANOS
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {/* Col 1: Address + WhatsApp */}
          <div className="p-8 flex flex-col gap-6" style={{ background: 'var(--clr-bg)' }}>
            <div>
              <p className="section-label mb-3" style={{ color: 'var(--clr-yellow)' }}>Dirección</p>
              {barberia.direccion ? (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--clr-gray-200)' }}>
                  {barberia.direccion}
                </p>
              ) : (
                <p className="text-sm" style={{ color: 'var(--clr-gray-600)' }}>No disponible</p>
              )}
            </div>

            {barberia.telefono && (
              <div>
                <p className="section-label mb-1" style={{ color: 'var(--clr-yellow)' }}>Teléfono</p>
                <a
                  href={`tel:${barberia.telefono}`}
                  className="text-sm transition-colors"
                  style={{ color: 'var(--clr-gray-200)' }}
                >
                  {barberia.telefono}
                </a>
              </div>
            )}

            {barberia.whatsapp && (
              <a
                href={`https://wa.me/${barberia.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 mt-2 text-xs font-semibold transition-all w-fit"
                style={{
                  background: 'var(--clr-green)',
                  color: 'var(--clr-white)',
                  boxShadow: '3px 3px 0 rgba(255,255,255,0.08)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.552 4.103 1.519 5.832L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.371l-.36-.213-3.758.98.999-3.65-.234-.376A9.818 9.818 0 112.182 12 9.82 9.82 0 0112 21.818z"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>

          {/* Col 2: Schedule */}
          <div className="p-8" style={{ background: 'var(--clr-bg)' }}>
            <p className="section-label mb-4" style={{ color: 'var(--clr-yellow)' }}>Horarios</p>
            <div className="space-y-2">
              {Object.entries(horario).map(([dia, h]) => (
                <div
                  key={dia}
                  className="flex justify-between items-center py-1.5"
                  style={{ borderBottom: '1px solid var(--clr-border)' }}
                >
                  <span className="text-xs font-medium" style={{ color: 'var(--clr-gray-400)' }}>
                    {DIAS_ES[dia] ?? dia}
                  </span>
                  {h ? (
                    <span className="text-xs" style={{ color: 'var(--clr-white)' }}>
                      {h.apertura} – {h.cierre}
                    </span>
                  ) : (
                    <span className="section-label" style={{ color: 'var(--clr-red)' }}>
                      Cerrado
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Map or CTA */}
          <div className="p-8 flex flex-col" style={{ background: 'var(--clr-bg)' }}>
            {barberia.google_maps_url ? (
              <div className="flex-1 overflow-hidden min-h-48">
                <iframe
                  src={barberia.google_maps_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '200px', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${barberia.nombre}`}
                />
              </div>
            ) : (
              <div
                className="flex-1 flex flex-col items-center justify-center gap-4 min-h-48"
                style={{ border: '1px dashed var(--clr-border)' }}
              >
                <p className="section-label text-center">Reserva tu cita ahora</p>
                <Link
                  href={`/${barberia.slug}/agendar`}
                  className="font-display text-2xl px-6 py-3 transition-all"
                  style={{
                    background: 'var(--clr-yellow)',
                    color: 'var(--clr-bg)',
                    boxShadow: 'var(--shadow-neo)',
                  }}
                >
                  AGENDAR →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8"
          style={{ borderTop: '1px solid var(--clr-border)' }}
        >
          <div className="flex items-center gap-3">
            <LogoFlowPE size={36} />
            <span className="font-display text-xl" style={{ color: 'var(--clr-gray-600)' }}>
              {barberia.nombre}
            </span>
          </div>
          <p className="section-label" style={{ color: 'var(--clr-gray-600)' }}>
            © {new Date().getFullYear()} · Lima, Perú · Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
