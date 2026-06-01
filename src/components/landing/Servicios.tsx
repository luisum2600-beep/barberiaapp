import Image from 'next/image'
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

const SERVICIO_IMGS = [
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop',
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

        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="section-label mb-2" style={{ color: 'var(--clr-amber)' }}>
              — Lo que hacemos
            </p>
            <h2
              className="font-display leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'var(--clr-cream)' }}
            >
              SERVICIOS
            </h2>
          </div>
          <Link
            href={`/${slug}/agendar`}
            className="section-label px-5 py-3 transition-all w-fit"
            style={{ border: '1px solid var(--clr-amber)', color: 'var(--clr-amber)' }}
          >
            Agendar ahora →
          </Link>
        </div>

        {/* Grilla de servicios */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'var(--clr-border)' }}
        >
          {servicios.map((s, idx) => {
            const imgSrc = s.foto ?? SERVICIO_IMGS[idx % SERVICIO_IMGS.length]
            return (
              <article
                key={s.id}
                className="group relative flex flex-col overflow-hidden"
                style={{ background: 'var(--clr-surface)', minHeight: '380px' }}
              >
                {/* Imagen superior */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={s.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'brightness(0.75)' }}
                  />
                  {/* Número de índice sobre la imagen */}
                  <span
                    className="absolute top-3 left-4 font-display"
                    style={{
                      fontSize: '3.5rem',
                      lineHeight: 1,
                      color: 'rgba(255,255,255,0.15)',
                    }}
                    aria-hidden="true"
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex flex-col justify-between flex-1 p-6">
                  <div>
                    <h3
                      className="font-display text-2xl leading-tight uppercase mb-2"
                      style={{ color: 'var(--clr-cream)' }}
                    >
                      {s.nombre}
                    </h3>
                    {s.descripcion && (
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--clr-gray-500)' }}>
                        {s.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="flex items-end justify-between mt-5">
                    <div>
                      <p className="font-display text-3xl leading-none" style={{ color: 'var(--clr-amber)' }}>
                        S/{Number(s.precio).toFixed(0)}
                      </p>
                      <p className="section-label mt-1">{s.duracion_minutos} min</p>
                    </div>
                    <Link
                      href={`/${slug}/agendar?servicio=${s.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all"
                      style={{ border: '1px solid var(--clr-amber)', color: 'var(--clr-amber)' }}
                      aria-label={`Agendar ${s.nombre}`}
                    >
                      Agendar
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Barra de acento inferior en hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
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
