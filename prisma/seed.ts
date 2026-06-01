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
      { barberia_id: barberia.id, nombre: 'Carlos Mendoza', especialidades: ['Fade', 'Clásico'] },
      { barberia_id: barberia.id, nombre: 'Diego Ramos', especialidades: ['Barba', 'Diseño'] },
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
