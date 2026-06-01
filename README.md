# Barbería Landing — Demo

Sistema de reservas para barberías. Demo $0 en Vercel + Supabase free tier.

## Setup rápido

1. Clonar el repo e instalar:
```bash
npm install
```

2. Copiar variables de entorno:
```bash
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

3. Generar cliente Prisma:
```bash
npx prisma generate
```

4. Aplicar schema:
```bash
npx prisma migrate dev --name init
```

5. Cargar datos demo:
```bash
npx prisma db seed
```

6. Iniciar servidor:
```bash
npm run dev
```

7. Abrir: http://localhost:3000/demo (landing) o http://localhost:3000/admin (panel)

## Credenciales demo

- Admin: admin@demo.com / demo1234
- Landing: /demo

## Stack

Next.js 16 · Tailwind CSS · Prisma 7 · Supabase PostgreSQL · NextAuth v5 · n8n
