import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug requerido' }, { status: 400 })

  const barberia = await prisma.barberia.findUnique({
    where: { slug },
    include: { servicios: { where: { activo: true } } },
  })

  if (!barberia) return NextResponse.json({ error: 'Barbería no encontrada' }, { status: 404 })

  return NextResponse.json({ servicios: barberia.servicios })
}
