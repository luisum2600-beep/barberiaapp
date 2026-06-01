import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {fotoHero && (
        <Image
          src={fotoHero}
          alt={barberia.nombre}
          fill
          className="object-cover brightness-30"
          priority
          fetchPriority="high"
        />
      )}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {barberia.logo && (
          <Image
            src={barberia.logo}
            alt={`Logo ${barberia.nombre}`}
            width={120}
            height={120}
            className="mx-auto mb-6 rounded-full"
          />
        )}
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-4">
          {barberia.nombre}
        </h1>
        {barberia.descripcion && (
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            {barberia.descripcion}
          </p>
        )}
        <Link href={`/${barberia.slug}/agendar`}>
          <Button size="lg">Reserva tu cita</Button>
        </Link>
      </div>
    </section>
  )
}
