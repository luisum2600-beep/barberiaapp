import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Hero from '@/components/landing/Hero'
import Servicios from '@/components/landing/Servicios'
import Barberos from '@/components/landing/Barberos'
import Galeria from '@/components/landing/Galeria'
import Resenas from '@/components/landing/Resenas'
import Ubicacion from '@/components/landing/Ubicacion'

export const revalidate = 60

interface Props {
  params: Promise<{ barberia: string }>
}

export async function generateMetadata({ params }: Props) {
  const { barberia: slug } = await params
  const barberia = await prisma.barberia.findUnique({
    where: { slug },
  })
  if (!barberia) return {}

  return {
    title: `${barberia.nombre} — Reserva tu cita`,
    description: barberia.meta_description ?? `Agenda tu cita en ${barberia.nombre}`,
    openGraph: {
      title: barberia.nombre,
      images: barberia.logo ? [barberia.logo] : [],
    },
  }
}

export default async function LandingPage({ params }: Props) {
  const { barberia: slug } = await params
  const barberia = await prisma.barberia.findUnique({
    where: { slug },
    include: {
      barberos: { where: { activo: true } },
      servicios: { where: { activo: true } },
      resenas: { where: { activo: true } },
    },
  })

  if (!barberia) notFound()

  return (
    <main className="bg-neutral-950 text-white min-h-screen">
      <Hero barberia={barberia} />
      <Servicios servicios={barberia.servicios} slug={slug} />
      <Barberos barberos={barberia.barberos} slug={slug} />
      <Galeria fotos={barberia.fotos} />
      <Resenas resenas={barberia.resenas} />
      <Ubicacion barberia={barberia} />
    </main>
  )
}
