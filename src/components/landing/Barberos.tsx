import Image from 'next/image'
import Link from 'next/link'

interface Barbero {
  id: string
  nombre: string
  foto: string | null
  especialidades: string[]
}

interface BarberosProps {
  barberos: Barbero[]
  slug: string
}

const SPECIALTY_COLORS = ['var(--clr-yellow)', 'var(--clr-red)', 'var(--clr-green)', 'var(--clr-olive)']

export default function Barberos({ barberos, slug }: BarberosProps) {
  if (barberos.length === 0) return null

  return (
    <section
      className="py-24 px-6 md:px-12"
      id="equipo"
      style={{ borderTop: '1px solid var(--clr-border)', background: 'var(--clr-surface)' }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="mb-14">
          <p className="section-label mb-2" style={{ color: 'var(--clr-green)' }}>
            — Conoce al equipo
          </p>
          <h2
            className="font-display leading-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              color: 'var(--clr-white)',
            }}
          >
            BARBEROS
          </h2>
        </div>

        {/* Barbero cards — full-width horizontal strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {barberos.map((b, idx) => {
            const initials = b.nombre.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
            const accentColor = idx % 2 === 0 ? 'var(--clr-yellow)' : 'var(--clr-red)'

            return (
              <article
                key={b.id}
                className="group relative flex flex-col md:flex-row items-start gap-6 p-8 overflow-hidden transition-all duration-200"
                style={{ background: 'var(--clr-bg)' }}
              >
                {/* Large faded initial — decorative background */}
                <span
                  className="absolute right-4 top-2 font-display pointer-events-none select-none transition-opacity duration-300"
                  style={{
                    fontSize: 'clamp(6rem, 14vw, 12rem)',
                    lineHeight: 1,
                    color: accentColor,
                    opacity: 0.04,
                  }}
                  aria-hidden="true"
                >
                  {initials}
                </span>

                {/* Photo or initial avatar */}
                <div
                  className="relative shrink-0 w-20 h-20 md:w-28 md:h-28 overflow-hidden"
                  style={{
                    border: `2px solid ${accentColor}`,
                  }}
                >
                  {b.foto ? (
                    <Image
                      src={b.foto}
                      alt={b.nombre}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-display text-4xl"
                      style={{ background: 'var(--clr-surface-2)', color: accentColor }}
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="section-label mb-1" style={{ color: accentColor }}>
                    Barbero #{String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className="font-display text-3xl md:text-4xl uppercase leading-tight"
                    style={{ color: 'var(--clr-white)' }}
                  >
                    {b.nombre}
                  </h3>

                  {/* Specialty tags */}
                  {b.especialidades.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {b.especialidades.map((esp, i) => (
                        <span
                          key={esp}
                          className="section-label px-2.5 py-1"
                          style={{
                            border: `1px solid ${SPECIALTY_COLORS[i % SPECIALTY_COLORS.length]}`,
                            color: SPECIALTY_COLORS[i % SPECIALTY_COLORS.length],
                          }}
                        >
                          {esp}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/${slug}/agendar?barbero=${b.id}`}
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 text-xs font-semibold transition-all"
                    style={{
                      background: accentColor,
                      color: 'var(--clr-bg)',
                      boxShadow: `2px 2px 0 rgba(255,255,255,0.1)`,
                    }}
                    aria-label={`Agendar cita con ${b.nombre}`}
                  >
                    Agendar con {b.nombre.split(' ')[0]}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
