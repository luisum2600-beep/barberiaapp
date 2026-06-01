import Image from 'next/image'
import Link from 'next/link'
import LogoFlowPE from './LogoFlowPE'

interface HeroProps {
  barberia: {
    nombre: string
    descripcion: string | null
    logo: string | null
    fotos: string[]
    slug: string
  }
}

export default function Hero({ barberia }: HeroProps) {
  const fotoHero = barberia.fotos[0]

  return (
    <section
      className="relative min-h-dvh flex flex-col overflow-hidden noise-overlay"
      style={{ background: 'var(--clr-bg)' }}
      id="inicio"
    >
      {/* Background photo with heavy darken */}
      {fotoHero && (
        <Image
          src={fotoHero}
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.08 }}
          priority
          fetchPriority="high"
          aria-hidden="true"
        />
      )}

      {/* Grain lines — decorative horizontal rules */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.03) 80px)',
        }}
      />

      {/* Top bar */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: '1px solid var(--clr-border)' }}
      >
        <span className="section-label">Lima · Perú</span>
        <nav className="hidden md:flex items-center gap-8">
          {['Servicios', 'Equipo', 'Reseñas', 'Contacto'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace('ñ', 'n')}`}
              className="section-label transition-colors"
              style={{ color: 'var(--clr-gray-400)' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--clr-yellow)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'var(--clr-gray-400)')
              }
            >
              {item}
            </a>
          ))}
        </nav>
        <Link
          href={`/${barberia.slug}/agendar`}
          className="section-label px-4 py-2 transition-all"
          style={{
            border: '1px solid var(--clr-yellow)',
            color: 'var(--clr-yellow)',
          }}
        >
          Reservar
        </Link>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full px-6 md:px-12 py-12 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center max-w-screen-xl mx-auto">

            {/* Left: Logo + info */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                {barberia.logo ? (
                  <Image
                    src={barberia.logo}
                    alt={`Logo ${barberia.nombre}`}
                    width={100}
                    height={100}
                    className="rounded-2xl"
                  />
                ) : (
                  <LogoFlowPE size={100} />
                )}
                <div>
                  <p className="section-label" style={{ color: 'var(--clr-yellow)' }}>
                    Barbería
                  </p>
                  <p
                    className="font-display text-4xl leading-none mt-1"
                    style={{ color: 'var(--clr-white)' }}
                  >
                    {barberia.nombre}
                  </p>
                </div>
              </div>

              {barberia.descripcion && (
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: 'var(--clr-gray-400)' }}
                >
                  {barberia.descripcion}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <Link
                  href={`/${barberia.slug}/agendar`}
                  className="inline-flex items-center gap-3 px-6 py-4 font-semibold text-sm transition-all w-fit"
                  style={{
                    background: 'var(--clr-yellow)',
                    color: 'var(--clr-bg)',
                    boxShadow: 'var(--shadow-neo)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translate(-3px, -3px)'
                    el.style.boxShadow = '7px 7px 0 var(--clr-yellow)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = ''
                    el.style.boxShadow = 'var(--shadow-neo)'
                  }}
                >
                  Reserva tu cita
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                <div className="flex items-center gap-4 mt-1">
                  <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                        <path
                          d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
                          fill="#F5C800"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="section-label">5.0 · Lima</span>
                </div>
              </div>
            </div>

            {/* Right: Massive display type */}
            <div
              className="md:col-span-8 flex flex-col items-start md:items-end justify-center md:pl-8"
              style={{ borderLeft: '1px solid var(--clr-border)' }}
            >
              <div className="font-display leading-none select-none" aria-hidden="true">
                <div
                  className="block text-right"
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 20rem)',
                    color: 'var(--clr-white)',
                    lineHeight: 0.88,
                  }}
                >
                  FLOW
                </div>
                <div
                  className="block text-right"
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 20rem)',
                    color: 'var(--clr-yellow)',
                    lineHeight: 0.88,
                  }}
                >
                  PE
                </div>
              </div>

              <div
                className="flex items-center gap-4 mt-6 md:mt-8"
                style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.5rem', width: '100%' }}
              >
                <div className="flex gap-2 ml-auto">
                  {[
                    { color: 'var(--clr-yellow)', label: 'Cortes' },
                    { color: 'var(--clr-red)',    label: 'Diseño' },
                    { color: 'var(--clr-green)',  label: 'Barba' },
                  ].map(({ color, label }) => (
                    <span
                      key={label}
                      className="section-label px-3 py-1.5"
                      style={{
                        border: `1px solid ${color}`,
                        color,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        className="relative z-10 flex items-center justify-center pb-8 gap-2"
        style={{ borderTop: '1px solid var(--clr-border)' }}
        aria-hidden="true"
      >
        <span className="section-label pt-5">Scroll</span>
        <svg className="mt-5" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M3 8l4 4 4-4" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
