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

const FOTOS_FALLBACK: Record<string, string> = {
  default_m_0: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=face',
  default_m_1: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&crop=face',
  default_f_0: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=face',
  default_m_2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=face',
}

const FOTO_ORDER = ['default_m_0', 'default_m_1', 'default_f_0', 'default_m_2']

function esMujer(nombre: string) {
  const nombres = ['romina', 'valeria', 'daniela', 'andrea', 'camila', 'lucia', 'maria', 'sofia']
  return nombres.some((n) => nombre.toLowerCase().startsWith(n))
}

export default function Barberos({ barberos, slug }: BarberosProps) {
  if (barberos.length === 0) return null

  return (
    <section
      className="py-24 px-6 md:px-12"
      id="equipo"
      style={{ borderTop: '1px solid var(--clr-border)', background: 'var(--clr-surface)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Encabezado */}
        <div className="mb-14">
          <p className="section-label mb-2" style={{ color: 'var(--clr-amber)' }}>
            — Conoce al equipo
          </p>
          <h2
            className="font-display leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--clr-cream)' }}
          >
            BARBEROS
          </h2>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {barberos.map((b, idx) => {
            const mujer = esMujer(b.nombre)
            const fotoKey = FOTO_ORDER[idx % FOTO_ORDER.length]
            const fotoSrc = b.foto ?? FOTOS_FALLBACK[fotoKey]
            const primerNombre = b.nombre.split(' ')[0]
            const rol = mujer ? 'Barbera' : 'Barbero'
            const numLabel = `${rol} #${String(idx + 1).padStart(2, '0')}`

            return (
              <article
                key={b.id}
                className="group relative flex flex-col md:flex-row overflow-hidden"
                style={{ background: 'var(--clr-bg)', minHeight: '280px' }}
              >
                {/* Foto */}
                <div className="relative w-full md:w-56 h-56 md:h-auto shrink-0 overflow-hidden">
                  <Image
                    src={fotoSrc}
                    alt={b.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'grayscale(20%) brightness(0.85)' }}
                  />
                  {/* Overlay amber en hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(201,153,58,0.12)' }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between p-7 flex-1">
                  <div>
                    <p className="section-label mb-2" style={{ color: 'var(--clr-amber)' }}>
                      {numLabel}
                    </p>
                    <h3
                      className="font-display text-3xl md:text-4xl uppercase leading-tight"
                      style={{ color: 'var(--clr-cream)' }}
                    >
                      {b.nombre}
                    </h3>

                    {b.especialidades.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {b.especialidades.map((esp) => (
                          <span
                            key={esp}
                            className="section-label px-2.5 py-1"
                            style={{
                              border: '1px solid var(--clr-border)',
                              color: 'var(--clr-gray-500)',
                            }}
                          >
                            {esp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/${slug}/agendar?barbero=${b.id}`}
                    className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-xs font-semibold transition-all w-fit btn-neo-primary"
                    aria-label={`Agendar cita con ${b.nombre}`}
                  >
                    Agendar con {primerNombre}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </Link>
                </div>

                {/* Línea amber lateral en hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 transition-transform duration-300 origin-top scale-y-0 group-hover:scale-y-100"
                  style={{ background: 'var(--clr-amber)' }}
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
