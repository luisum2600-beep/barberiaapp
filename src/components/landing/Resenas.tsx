interface Resena {
  id: string
  autor: string
  texto: string
  rating: number
}

interface ResenasProps {
  resenas: Resena[]
}

export default function Resenas({ resenas }: ResenasProps) {
  if (resenas.length === 0) return null

  return (
    <section
      className="py-24 px-6 md:px-12"
      id="reseñas"
      style={{ borderTop: '1px solid var(--clr-border)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="section-label mb-2" style={{ color: 'var(--clr-amber)' }}>
              — Lo que dicen
            </p>
            <h2
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--clr-cream)' }}
            >
              RESEÑAS
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1" aria-label="Calificación promedio 5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M9 1.5l2 5h5l-4 3 1.5 5L9 12l-4.5 2.5L6 9.5l-4-3h5L9 1.5z" fill="#C9993A" />
                </svg>
              ))}
            </div>
            <span className="font-display text-3xl" style={{ color: 'var(--clr-amber)' }}>5.0</span>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {resenas.map((r, idx) => {
            const isFeatured = idx === 0
            return (
              <blockquote
                key={r.id}
                className="relative flex flex-col justify-between p-8 overflow-hidden"
                style={{
                  background: isFeatured ? 'var(--clr-amber)' : 'var(--clr-surface)',
                  minHeight: '220px',
                }}
              >
                {/* Comilla decorativa */}
                <span
                  className="absolute top-2 left-4 font-display pointer-events-none select-none"
                  style={{
                    fontSize: '8rem',
                    color: isFeatured ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.03)',
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  "
                </span>

                <div className="relative">
                  <div className="flex gap-1 mb-4" aria-label={`${r.rating} de 5 estrellas`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                        <path
                          d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
                          fill={isFeatured
                            ? i < r.rating ? '#0a0a0a' : 'rgba(0,0,0,0.2)'
                            : i < r.rating ? '#C9993A' : '#333'}
                        />
                      </svg>
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isFeatured ? 'var(--clr-bg)' : 'var(--clr-gray-500)' }}
                  >
                    &ldquo;{r.texto}&rdquo;
                  </p>
                </div>

                <footer className="mt-6">
                  <cite
                    className="font-display text-xl not-italic"
                    style={{ color: isFeatured ? 'var(--clr-bg)' : 'var(--clr-cream)' }}
                  >
                    {r.autor}
                  </cite>
                  <p
                    className="section-label mt-0.5"
                    style={{ color: isFeatured ? 'rgba(0,0,0,0.45)' : 'var(--clr-gray-700)' }}
                  >
                    Cliente verificado
                  </p>
                </footer>
              </blockquote>
            )
          })}
        </div>
      </div>
    </section>
  )
}
