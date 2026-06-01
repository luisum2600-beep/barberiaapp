import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const barberia = await prisma.barberia.upsert({
    where: { slug: 'demo' },
    update: {},
    create: {
      slug: 'demo',
      nombre: 'Flow PE',
      descripcion: 'La barbería con más flow de Lima. Estilo, precisión y cultura de calle.',
      direccion: 'Av. Larco 345, Miraflores, Lima',
      telefono: '+51 987 654 321',
      whatsapp: '+51987654321',
      horario: {
        lunes: { apertura: '09:00', cierre: '19:00' },
        martes: { apertura: '09:00', cierre: '19:00' },
        miercoles: { apertura: '09:00', cierre: '19:00' },
        jueves: { apertura: '09:00', cierre: '19:00' },
        viernes: { apertura: '09:00', cierre: '20:00' },
        sabado: { apertura: '09:00', cierre: '18:00' },
        domingo: null,
      },
    },
  })

  console.log('✓ Barbería demo creada:', barberia.slug)

  await prisma.barbero.createMany({
    data: [
      {
        barberia_id: barberia.id,
        nombre: 'Sebastian Huaman Yomona',
        especialidades: ['Fade', 'Corte Clásico'],
        foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=face',
      },
      {
        barberia_id: barberia.id,
        nombre: 'Jhoan Vargas Collas',
        especialidades: ['Diseño', 'Degradado'],
        foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&crop=face',
      },
      {
        barberia_id: barberia.id,
        nombre: 'Romina Montes Villalobos',
        especialidades: ['Barba', 'Tratamientos'],
        foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=face',
      },
      {
        barberia_id: barberia.id,
        nombre: 'Luis Urbina Martinez',
        especialidades: ['Corte + Barba', 'Fade'],
        foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=face',
      },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Barberos demo creados')

  await prisma.servicio.createMany({
    data: [
      { barberia_id: barberia.id, nombre: 'Corte Clásico', precio: 25, duracion_minutos: 30 },
      { barberia_id: barberia.id, nombre: 'Fade + Diseño', precio: 35, duracion_minutos: 45 },
      { barberia_id: barberia.id, nombre: 'Barba', precio: 15, duracion_minutos: 20 },
      { barberia_id: barberia.id, nombre: 'Corte + Barba', precio: 45, duracion_minutos: 60 },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Servicios demo creados')

  await prisma.resena.createMany({
    data: [
      { barberia_id: barberia.id, autor: 'Juan P.', texto: 'Excelente servicio, el fade quedó perfecto.', rating: 5 },
      { barberia_id: barberia.id, autor: 'Miguel R.', texto: 'Muy profesionales, puntualidad al 100%.', rating: 5 },
      { barberia_id: barberia.id, autor: 'Carlos S.', texto: 'Buen ambiente y atención. Volvería sin duda.', rating: 4 },
    ],
    skipDuplicates: true,
  })

  console.log('✓ Reseñas demo creadas')

  await prisma.usuario.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      barberia_id: barberia.id,
      email: 'admin@demo.com',
      password: await bcrypt.hash('demo1234', 10),
      rol: 'OWNER',
    },
  })

  console.log('✓ Usuario admin demo creado: admin@demo.com / demo1234')
  console.log('✓ Seed completado')
}

main().catch(console.error).finally(() => prisma.$disconnect())
