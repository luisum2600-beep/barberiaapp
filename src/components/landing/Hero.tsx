'use client'

import Image from 'next/image'
import Link from 'next/link'
import LogoFlowPE from './LogoFlowPE'

const HERO_IMG = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1800&q=85&auto=format&fit=crop'

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
  const fotoHero = barberia.fotos[0] ?? HERO_IMG

  return (
    <section
      className="relative min-h-dvh flex flex-col overflow-hidden noise-overlay"
      style={{ background: 'var(--clr-bg)' }}
      id="inicio"
    >
      {/* Foto de fondo con gradiente oscuro */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={fotoHero}
          alt=""
          fill
          className="object-cover"
          style={{ opacity: 0.22 }}
          priority
          fetchPriority="high"
        />
        {/* Gradiente que oscurece hacia abajo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.2) 40%, rgba(8,8,8,0.85) 100%)',
          }}
        />
      </div>

      {/* Líneas decorativas horizontales */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.02) 80px)',
        }}
      />

      {/* Barra de navegación */}
      <div
        className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5"
        style={{ borderBottom: '1px solid var(--clr-border)' }}
      >
        <div className="flex items-center gap-3">
          <LogoFlowPE size={32} />
          <span className="section-label" style={{ color: 'var(--clr-gray-500)' }}>
            Lima · Perú
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Servicios', anchor: '#servicios' },
            { label: 'Equipo',    anchor: '#equipo' },
            { label: 'Reseñas',  anchor: '#reseñas' },
            { label: 'Contacto', anchor: '#contacto' },
          ].map(({ label, anchor }) => (
            <a key={label} href={anchor} className="section-label nav-link">
              {label}
            </a>
          ))}
        </nav>

        <Link
          href={`/${barberia.slug}/agendar`}
          className="section-label px-4 py-2 transition-all"
          style={{
            border: '1px solid var(--clr-amber)',
            color: 'var(--clr-amber)',
          }}
        >
          Reservar
        </Link>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full px-6 md:px-12 py-12 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-center max-w-screen-xl mx-auto">

            {/* Izquierda: logo + info */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div>
                {barberia.logo ? (
                  <Image
                    src={barberia.logo}
                    alt={`Logo ${barberia.nombre}`}
                    width={110}
                    height={110}
                    className="rounded-2xl mb-5"
                  />
                ) : (
                  <LogoFlowPE size={110} className="mb-5" />
                )}
                <p className="section-label mb-2" style={{ color: 'var(--clr-amber)' }}>
                  — Barbería premium
                </p>
                <h1
                  className="font-display leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    color: 'var(--clr-cream)',
                  }}
                >
                  {barberia.nombre}
                </h1>
              </div>

              {barberia.descripcion && (
                <p
                  className="text-sm leading-relaxed max-w-xs"
                  style={{ color: 'var(--clr-gray-500)', lineHeight: 1.8 }}
                >
                  {barberia.descripcion}
                </p>
              )}

              <div className="flex flex-col gap-4">
                <Link
                  href={`/${barberia.slug}/agendar`}
                  className="inline-flex items-center gap-3 px-7 py-4 font-semibold text-sm w-fit btn-neo-primary"
                >
                  Reserva tu cita
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                        <path d="M7 1l1.5 3.5L12 5l-2.5 2.5.5 3.5L7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z"
                          fill="#C9993A" />
                      </svg>
                    ))}
                  </div>
                  <span className="section-label">5.0 · Lima</span>
                </div>
              </div>
            </div>

            {/* Derecha: tipografía gigante */}
            <div
              className="md:col-span-8 flex flex-col items-start md:items-end justify-center md:pl-8"
              style={{ borderLeft: '1px solid var(--clr-border)' }}
            >
              <div className="font-display leading-none select-none" aria-hidden="true">
                <div
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 20rem)',
                    color: 'var(--clr-cream)',
                    lineHeight: 0.88,
                    opacity: 0.92,
                  }}
                >
                  FLOW
                </div>
                <div
                  style={{
                    fontSize: 'clamp(7rem, 18vw, 20rem)',
                    color: 'var(--clr-amber)',
                    lineHeight: 0.88,
                  }}
                >
                  PE
                </div>
              </div>

              <div
                className="flex items-center gap-3 mt-6 md:mt-8"
                style={{ borderTop: '1px solid var(--clr-border)', paddingTop: '1.5rem', width: '100%', justifyContent: 'flex-end' }}
              >
                {['Cortes', 'Diseño', 'Barba'].map((tag) => (
                  <span
                    key={tag}
                    className="section-label px-3 py-1.5"
                    style={{
                      border: '1px solid var(--clr-border)',
                      color: 'var(--clr-gray-500)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="relative z-10 flex items-center justify-center pb-8 gap-2"
        style={{ borderTop: '1px solid var(--clr-border)' }}
        aria-hidden="true"
      >
        <span className="section-label pt-5">Scroll</span>
        <svg className="mt-5" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 2v10M3 8l4 4 4-4" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
