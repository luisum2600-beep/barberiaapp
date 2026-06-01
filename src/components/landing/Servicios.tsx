import Link from 'next/link'

interface Servicio {
  id: string
  nombre: string
  descripcion: string | null
  precio: unknown
  duracion_minutos: number
  foto: string | null
}

interface ServiciosProps {
  servicios: Servicio[]
  slug: string
}

const ACCENT_COLORS = [
  'var(--clr-yellow)',
  'var(--clr-red)',
  'var(--clr-green)',
  'var(--clr-yellow)',
]

export default function Servicios({ servicios, slug }: ServiciosProps) {
  if (servicios.length === 0) return null

  return (
    <section
      className="py-24 px-6 md:px-12"
      id="servicios"
      style={{ borderTop: '1px solid var(--clr-border)' }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="section-label mb-2" style={{ color: 'var(--clr-yellow)' }}>
              — Lo que hacemos
            </p>
            <h2
              className="font-display leading-none"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'var(--clr-white)',
              }}
            >
              SERVICIOS
            </h2>
          </div>
          <Link
            href={`/${slug}/agendar`}
            className="section-label px-5 py-3 transition-all w-fit"
            style={{
              border: '1px solid var(--clr-yellow)',
              color: 'var(--clr-yellow)',
            }}
          >
            Ver todo →
          </Link>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {servicios.map((s, idx) => {
            const accent = ACCENT_COLORS[idx % ACCENT_COLORS.length]
            return (
              <article
                key={s.id}
                className="group flex flex-col justify-between p-7 transition-all duration-200"
                style={{
                  background: 'var(--clr-surface)',
                  minHeight: '260px',
                }}
              >
                {/* Top: index + name */}
                <div>
                  <p
                    className="font-display text-6xl leading-none mb-4 transition-colors duration-200"
                    style={{ color: 'var(--clr-border)' }}
                    aria-hidden="true"
                  >
                    0{idx + 1}
                  </p>
                  <h3
                    className="font-display text-2xl md:text-3xl leading-tight uppercase"
                    style={{ color: 'var(--clr-white)' }}
                  >
                    {s.nombre}
                  </h3>
                  {s.descripcion && (
                    <p
                      className="text-xs leading-relaxed mt-2"
                      style={{ color: 'var(--clr-gray-600)' }}
                    >
                      {s.descripcion}
                    </p>
                  )}
                </div>

                {/* Bottom: price + CTA */}
                <div className="flex items-end justify-between mt-6">
                  <div>
                    <p
                      className="font-display text-4xl leading-none"
                      style={{ color: accent }}
                    >
                      S/{Number(s.precio).toFixed(0)}
                    </p>
                    <p className="section-label mt-1">
                      {s.duracion_minutos} min
                    </p>
                  </div>
                  <Link
                    href={`/${slug}/agendar?servicio=${s.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all"
                    style={{
                      border: `1px solid ${accent}`,
                      color: accent,
                    }}
                    aria-label={`Agendar ${s.nombre}`}
                  >
                    Agendar
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Hover accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{ background: accent, transform: 'scaleX(0)', transformOrigin: 'left' }}
                  aria-hidden="true"
                />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
